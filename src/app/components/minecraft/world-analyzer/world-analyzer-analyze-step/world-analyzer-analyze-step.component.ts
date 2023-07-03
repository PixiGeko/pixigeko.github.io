import {Component, Input, NgZone} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {WorldAnalyzerService} from "../../../../services/world-analyzer.service";
import {firstValueFrom} from "rxjs";
import {FileUtils} from "../../../../utils/FileUtils";
import {BlockState, NbtRegion, NbtType} from "deepslate";
import {MiscUtils} from "../../../../utils/MiscUtils";
import {WorldAnalyzerChunk} from "../../../../models/minecraft/world-analyzer";

@Component({
  selector: 'app-world-analyzer-analyze-step[stepper]',
  templateUrl: './world-analyzer-analyze-step.component.html',
  styleUrls: ['./world-analyzer-analyze-step.component.scss']
})
export class WorldAnalyzerAnalyzeStepComponent {
  @Input() stepper: MatStepper;

  static CHUNKS_PER_REGION = 32 * 32;
  static VERSION_21w43a = 2844

  minHeight: number | null;
  maxHeight: number | null;
  blockFilters: string[];

  currentRegionChunks: WorldAnalyzerChunk[];
  currentChunk: WorldAnalyzerChunk;

  constructor(public worldAnalyzerService: WorldAnalyzerService, private ngZone: NgZone) {
    worldAnalyzerService.analyzeStart.subscribe(() => {
      this.minHeight = this.worldAnalyzerService.settingsForm.controls.minHeight.value;
      this.maxHeight = this.worldAnalyzerService.settingsForm.controls.maxHeight.value;
      this.blockFilters = this.worldAnalyzerService.settingsForm.controls.blockFilters.controls.map(f => f.value) as string[];

      this.startAnalyse();
    })
  }

  async startAnalyse() {
    this.worldAnalyzerService.analyzing = true;

    const maxRegions = this.worldAnalyzerService.settingsForm.controls.maxRegion.value ?? this.worldAnalyzerService.regionFilesToAnalyze.length;
    for (let i = 0; i < maxRegions; i++){
      let regionFile = this.worldAnalyzerService.regionFilesToAnalyze[i];
      const buffer = await firstValueFrom(FileUtils.readFileAsBuffer(regionFile));
      const region = NbtRegion.read(buffer);

      // init chunks
      this.currentRegionChunks = [];
      for (let iChunk = 0; iChunk < WorldAnalyzerAnalyzeStepComponent.CHUNKS_PER_REGION; iChunk++) {
        const chunk = region.getChunk(iChunk);
        this.currentRegionChunks.push({
          chunk: chunk,
          skipped: false,
          empty: !chunk,
          error: false,
          analyzed: false
        })
      }

      // analyze chunks
      for (const chunk of this.currentRegionChunks) {
        if (!chunk.chunk) continue;
        try {
          this.analyzeChunk(chunk);
        } catch (e) {
          console.error(e);
          chunk.error = true;
        }

        await MiscUtils.sleep(1); // avoid freeze
      }
    }

    // @ts-ignore
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  private analyzeChunk(c: WorldAnalyzerChunk) {
    this.currentChunk = c;
    const root = c.chunk?.getRoot();
    if (!root) {
      c.skipped = true;
      return;
    }

    const dataVersion = root.getNumber('DataVersion');
    const N = dataVersion >= WorldAnalyzerAnalyzeStepComponent.VERSION_21w43a;

    const sections = N
      ? root.getList('sections', NbtType.Compound)
      : root.getCompound('Level').getList('Sections', NbtType.Compound);

    const filledSections = sections.filter(section => {
      const palette = N
        ? section.getCompound('block_states').getList('palette', NbtType.Compound)
        : section.has('Palette') && section.getList('Palette', NbtType.Compound)
      return palette &&
        palette.filter(state => state.getString('Name') !== 'minecraft:air')
          .length > 0
    });

    if (filledSections.length === 0) {
      c.skipped = true;
      return;
    }

    const minY = 16 * Math.min(...filledSections.map(s => s.getNumber('Y')));
    const maxY = 16 * Math.max(...filledSections.map(s => s.getNumber('Y')));

    const K_palette = N ? 'palette' : 'Palette';
    const K_data = N ? 'data' : 'BlockStates';

    for (const section of filledSections) {
      const states = N ? section.getCompound('block_states') : section
      if (!states.has(K_palette) || !states.has(K_data)) {
        continue;
      }

      const yOffset = section.getNumber('Y') * 16 - minY
      const palette = states.getList(K_palette, NbtType.Compound)
      const blockStates = states.getLongArray(K_data)

      const bits = Math.max(4, Math.ceil(Math.log2(palette.length)))
      const bitMask = BigInt(Math.pow(2, bits) - 1)
      const perLong = Math.floor(64 / bits)

      let i = 0
      let data = BigInt(0)
      for (let j = 0; j < 4096; j += 1) {
        if (j % perLong === 0) {
          data = blockStates.get(i)?.toBigInt() ?? BigInt(0)
          i += 1
        }
        const index = Number((data >> BigInt(bits * (j % perLong))) & bitMask)
        const state = palette.get(index)
        if (state) {
          const pos: { x: number; y: number; z: number } = {
            x: j & 0xF,
            y: yOffset + (j >> 8),
            z: (j >> 4) & 0xF
          };

          if (this.minHeight !== null && pos.y < this.minHeight) continue;
          if (this.maxHeight !== null && pos.y > this.maxHeight) continue;

          const block = BlockState.fromNbt(state);
          const fullBlockName = `${block.getName().namespace}:${block.getName().path}`;

          this.worldAnalyzerService.addBlock(fullBlockName, pos.y);
        }
      }
    }

    c.analyzed = true;
  }
}
