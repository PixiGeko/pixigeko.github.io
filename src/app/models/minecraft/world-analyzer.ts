import {FormArray, FormControl} from "@angular/forms";
import {Chunk, NbtChunk} from "deepslate";

export interface WorldAnalyzerSettingsForm {
  dimension: FormControl<WorldAnalyzerDimension | null>;
  blockFilters: FormArray<FormControl<string | null>>;
  minHeight: FormControl<number | null>;
  maxHeight: FormControl<number | null>;
  maxRegion: FormControl<number | null>;
}

export interface WorldAnalyzerBlockFilter {
  name: string;
}

export interface WorldAnalyzerChunk {
  chunk: NbtChunk | undefined;
  skipped: boolean;
  empty: boolean;
  error: boolean;
  analyzed: boolean;
}

export interface WorldAnalyzerDimension {
  name: string;
  path: string;
}

export const DIMENSIONS: WorldAnalyzerDimension[] = [
  {
    name: 'overworld',
    path: 'region'
  },
  {
    name: 'nether',
    path: 'DIM-1/region'
  },
  {
    name: 'end',
    path: 'DIM1/region'
  }
];

// ----------------------------------------- //
//                    STATS                  //
// ----------------------------------------- //
export interface WorldAnalyzeStats {
  palette: string[];
  blocksPerHeight: number[][];
}
