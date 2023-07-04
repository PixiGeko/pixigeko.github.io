import {Component, Input, NgZone} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {WorldAnalyzerService} from "../../../../services/world-analyzer.service";
import {defer, firstValueFrom, Observable} from "rxjs";
import {FileUtils} from "../../../../utils/FileUtils";
import {NbtRegion} from "deepslate";
import {MiscUtils} from "../../../../utils/MiscUtils";
import {WorldAnalyzerChunk} from "../../../../models/minecraft/world-analyzer";
import {ChunkHelper, ForEachBlockStatus} from "../../../../models/minecraft/nbt-helper/chunk-helper";

@Component({
  selector: 'app-world-analyzer-analyze-step[stepper]',
  templateUrl: './world-analyzer-analyze-step.component.html',
  styleUrls: ['./world-analyzer-analyze-step.component.scss']
})
export class WorldAnalyzerAnalyzeStepComponent {
  @Input() stepper: MatStepper;

  static CHUNKS_PER_REGION = 32 * 32;

  currentRegionChunks: WorldAnalyzerChunk[];
  currentChunk: WorldAnalyzerChunk;

  constructor(public worldAnalyzerService: WorldAnalyzerService) {
    worldAnalyzerService.analyzeStarted.subscribe(() => {
      this.startAnalyse();
    });
  }

  async startAnalyse() {
    this.worldAnalyzerService.analyzing = true;
    
    const maxRegions = this.worldAnalyzerService.settingsForm.controls.maxRegion.value ?? this.worldAnalyzerService.regionFilesToAnalyze.length;
    for (let i = 0; i < maxRegions; i++) {
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
        });
      }

      // analyze chunks
      for (const chunk of this.currentRegionChunks) {
        if (!chunk.chunk) continue;
        try {
          await new Promise(resolve => {
            setTimeout(() => {
              this.analyzeChunk(chunk);
              resolve(null);
            }, 1);
          });
        } catch (e) {
          console.error(e);
          chunk.error = true;
        }
      }
    }

    this.stepper.selected!.completed = true;
    this.stepper.next();
    this.worldAnalyzerService.analyzeFinished.emit();
  }

  private analyzeChunk(c: WorldAnalyzerChunk) {
    this.currentChunk = c;
    const root = c.chunk?.getRoot();
    if (!root) {
      c.skipped = true;
      return;
    }

    const chunk = ChunkHelper.helperFromChunk(c.chunk!);

    const status = chunk.forEachBlock((block, pos) => {
      this.worldAnalyzerService.addBlock(block, pos.y);
    });

    switch (status) {
      case ForEachBlockStatus.OK:
        c.analyzed = true;
        break;
      case ForEachBlockStatus.SKIPPED:
        c.skipped = true;
        break;
      case ForEachBlockStatus.ERROR:
        c.error = true;
        break;
    }
    
    c.chunk = null;
  }
}
