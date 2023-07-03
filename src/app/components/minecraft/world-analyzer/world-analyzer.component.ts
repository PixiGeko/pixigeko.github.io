import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FileUtils} from '../../../utils/FileUtils';
import {WorldRegion} from '../../../../world-reader/src/world';
import {
  DIMENSIONS,
  WorldAnalyzerChunk,
  WorldAnalyzerDimension,
  WorldAnalyzerRegion
} from '../../../models/minecraft/world-analyzer';
import {firstValueFrom} from 'rxjs';
import {MiscUtils} from "../../../utils/MiscUtils";
import {Chunk, ChunkStatus} from "../../../../world-reader/src/models/chunk";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NbtRegion} from "deepslate";

@Component({
  selector: 'app-world-analyzer',
  templateUrl: './world-analyzer.component.html',
  styleUrls: ['./world-analyzer.component.scss']
})
export class WorldAnalyzerComponent {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  displayedColumns = ['name', 'path', 'size'];

  dataSource = new MatTableDataSource<File>;

  dimensions = DIMENSIONS;
  selectedDimension?: WorldAnalyzerDimension;

  status: Status = {
    isAnalyzing: false,
    isAnalyzed: false,
    files: [],
    fileUploadError: null,
    worldName: null,
    dimensionFiles: {}
  };

  currentRegion!: WorldAnalyzerRegion;
  currentChunk!: WorldAnalyzerChunk;

  filesSelected($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (!input.files || !input.files.length) return;

    this.restart();

    const files: File[] = [];
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files.item(i);
      if (file) files.push(file);
    }

    this.status.files = files;
    this.status.worldName = this.status.files[0].webkitRelativePath.split('/')[0];

    this.status.dimensionFiles = {};
    for (let dimension of this.dimensions) {
      this.status.dimensionFiles[dimension.name] = this.status.files.filter(f => f.webkitRelativePath.match(`${this.status.worldName}/${dimension.path}/.*\.mca`))
    }
  }

  selectedDimensionChange(dimension: WorldAnalyzerDimension) {
    this.dataSource.data = this.status.dimensionFiles[dimension.name];
  }

  async startAnalyze() {
    this.status.isAnalyzing = true;
    
    if(!this.selectedDimension) return;

    for (const regionFile of this.status.dimensionFiles[this.selectedDimension.name]) {
      this.currentRegion = {
        file: regionFile
      }

      const buffer = await firstValueFrom(FileUtils.readFileAsBuffer(regionFile));
      const r = NbtRegion.read(buffer);
      if (buffer.length === 0) continue;

      const region = new WorldRegion(buffer);
      this.currentRegion.chunks = region.chunks.map(c => {
        return {
          chunk: c,
          skipped: false,
          analyzed: false
        };
      });

      for (const regionChunk of this.currentRegion.chunks) {
        if (!regionChunk.chunk) {
          continue;
        }

        if (regionChunk.chunk.header.sectorOffset === 0 && regionChunk.chunk.header.size === 0) {
          regionChunk.skipped = true;
          continue;
        }

        this.currentChunk = regionChunk;

        try {
          await regionChunk.chunk.initData();

          const chunk = regionChunk.chunk.asObject();

          if (chunk.data.Level.Status !== ChunkStatus.FULL) {
            regionChunk.skipped = true;
            continue;
          }
          
          await this.analyzeChunk(chunk);

          regionChunk.analyzed = true;
          await MiscUtils.sleep(1);
        } catch (e) {
          const error = `[R${this.currentSectionX}:${this.currentSectionZ} | C${this.currentChunk.chunk?.header.sectorOffset}] ${(e as Error).message}`;
          console.warn(error);
          regionChunk.error = error;
        }
      }
    }

    this.status.isAnalyzing = false;
    this.status.isAnalyzed = true;
  }
  
  get currentSectionX() {
    return this.currentRegion.file.name.split('.')[1];
  }

  get currentSectionZ() {
    return this.currentRegion.file.name.split('.')[2];
  }

  private async analyzeChunk(chunk: Chunk) {
    for (let section of chunk.data.Level?.Sections ?? []) {
      if (section.BlockStates) {
        const indexes = this.extractPalette(section.BlockStates, section.Palette);
        if(indexes.length > 4096) console.log(indexes.map(i => section.Palette[i]))
      }
    }
  }

  private extractPalette(data: bigint[], palette: any[]): number[] {
    if (palette.length === 1) {
      // "If only one block state is present in the palette, this field is not required and the block fills the whole section"
      return Array(4096).fill(0);
    }

    const bitsPerIndex = Math.ceil(Math.log2(palette.length)); // Nombre de bits nécessaires pour représenter les indices
    const mask = BigInt((1 << bitsPerIndex) - 1); // Masque de bits pour extraire les bits de l'indice

    const indices: number[] = [];

    for (const number of data) {
      let remainingBits: bigint = BigInt(bitsPerIndex);

      while (remainingBits !== 0n) {
        const index = Number(remainingBits & BigInt(mask)); // Extraction de l'indice avec le masque de bits
        indices.push(index);
        remainingBits >>= BigInt(bitsPerIndex); // Décalage à droite pour passer à l'indice suivant
      }
    }

    return indices;
  }

  get canUploadFiles() {
    return !this.status.isAnalyzing;
  }

  get canStartAnalyze() {
    return !this.status.isAnalyzing && this.status.files.length && this.selectedDimension;
  }

  get shouldShowTable() {
    return this.selectedDimension;
  }

  private restart() {
    this.selectedDimension = undefined;
    this.status.files = [];
    this.status.isAnalyzing = false;
    this.status.isAnalyzed = false;
    this.status.fileUploadError = null;
    this.status.worldName = null;
    this.status.dimensionFiles = {};
  }
}

interface Status {
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  files: File[],
  fileUploadError: string | null;
  worldName: string | null;
  dimensionFiles: {
    [key: string]: File[];
  };
}
