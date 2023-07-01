import {Component} from '@angular/core';
import {FileUtils} from "../../../utils/FileUtils";
import {WorldRegion} from "../../../../world-reader/src/world";
import {WorldAnalyzerChunk} from "../../../models/minecraft/world-analyzer";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-world-analyzer',
  templateUrl: './world-analyzer.component.html',
  styleUrls: ['./world-analyzer.component.scss']
})
export class WorldAnalyzerComponent {
  OVERWORLD_FOLDER = "region";
  END_FOLDER = "DIM1/region";
  NETHER_FOLDER = "DIM-1/region";

  selectedFolder: string = this.OVERWORLD_FOLDER;

  status: Status = {
    isAnalyzing: false,
    isAnalyzed: false,
    files: [],
    fileUploadError: null,
    worldName: null,
    overworldFiles: [],
    netherFiles: [],
    endFiles: []
  };

  chunks: WorldAnalyzerChunk[] = [];

  filesSelected($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (!input.files) return;

    const files: File[] = [];
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files.item(i);
      if (file) files.push(file);
    }

    this.status.files = files;
    this.filesUpdated();
  }

  async startAnalyze() {
    this.status.isAnalyzing = true;

    for (let r of this.status.overworldFiles.slice(0, 1)) {
      console.log(r);
      const buffer = await firstValueFrom(FileUtils.readFileAsBuffer(r));
      if (buffer.length === 0) continue;
      const region = new WorldRegion(buffer);
      this.chunks = region.chunks.map(c => {
        return {
          chunk: c,
          skipped: false,
          analyzed: false
        }
      });

      for (let chunk of this.chunks) {
        if (!chunk.chunk) continue;
        chunk.chunk.initData();
        new Promise(resolve => setTimeout(resolve, 10));
        
        chunk.analyzed = true;
      }
    }

    this.status.isAnalyzing = false;
    this.status.isAnalyzed = true;
  }

  get canUploadFiles() {
    return !this.status.isAnalyzing;
  }

  get canStartAnalyze() {
    return !this.status.isAnalyzing && this.status.files.length;
  }

  private filesUpdated() {
    this.restart();

    if (!this.status.files?.length) this.status.fileUploadError = 'minecraft.world_analyzer.no_files';

    this.status.worldName = this.status.files[0].webkitRelativePath.split('/')[0];

    this.status.overworldFiles = this.status.files.filter(f => f.webkitRelativePath.match(`${this.status.worldName}/${this.OVERWORLD_FOLDER}/.*\.mca`));
    this.status.netherFiles = this.status.files.filter(f => f.webkitRelativePath.match(`${this.status.worldName}/${this.NETHER_FOLDER}/.*\.mca`));
    this.status.endFiles = this.status.files.filter(f => f.webkitRelativePath.match(`${this.status.worldName}/${this.END_FOLDER}/.*\.mca`));
  }

  private restart() {
    this.status.isAnalyzing = false;
    this.status.isAnalyzed = false;
    this.status.fileUploadError = null;
    this.status.worldName = null;
    this.status.overworldFiles = [];
    this.status.netherFiles = [];
    this.status.endFiles = [];
  }
}

interface Status {
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  files: File[],
  fileUploadError: string | null;
  worldName: string | null;
  overworldFiles: File[];
  netherFiles: File[];
  endFiles: File[];
}
