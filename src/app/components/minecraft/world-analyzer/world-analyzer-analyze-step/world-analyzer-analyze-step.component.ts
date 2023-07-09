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
  currentRegionFile: File;

  constructor(public worldAnalyzerService: WorldAnalyzerService) {
    worldAnalyzerService.analyzeStarted.subscribe(() => {
      this.startAnalyse();
    });
  }

  async startAnalyse() {
    this.worldAnalyzerService.analyzing = true;
    
    const maxRegions = this.worldAnalyzerService.settingsForm.controls.maxRegion.value ?? this.worldAnalyzerService.regionFilesToAnalyze.length;
    for (let i = 0; i < maxRegions; i++) {
      this.currentRegionFile = this.worldAnalyzerService.regionFilesToAnalyze[i];
      const buffer = await firstValueFrom(FileUtils.readFileAsBuffer(this.currentRegionFile));
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
      for (let chunk of this.currentRegionChunks) {
        if (!chunk.chunk) continue;
        try {
          this.analyzeChunk(chunk);
        } catch (e) {
          console.error(e);
          chunk.error = true;
        }
        
        // TODO: memory leak :(
        if(chunk.analyzed) {
          await MiscUtils.sleep(1);
        }
      }

      // trying to fix (a bit) the memory leak
      const highestTimeoutId = setTimeout(";");
      for (let i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i);
      }
      
      await MiscUtils.sleep(500);
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
