import {FormArray, FormControl} from "@angular/forms";
import {NbtChunk} from "deepslate";

export interface WorldAnalyzerSettingsForm {
  dimension: FormControl<WorldAnalyzerDimension | null>;
  blockFilters: FormArray<FormControl<string | null>>;
  minHeight: FormControl<number | null>;
  maxHeight: FormControl<number | null>;
  maxRegion: FormControl<number | null>;
}

export interface WorldAnalyzerResultsForm {
  backgroundColor: FormControl<string | null>;
  legendColor: FormControl<string | null>;
}

export interface WorldAnalyzerChunk {
  chunk: NbtChunk | undefined | null;
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
