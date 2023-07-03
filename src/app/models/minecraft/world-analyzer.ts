import {WorldChunk} from '../../../world-reader/src/world';

export interface WorldAnalyzerRegion {
  chunks?: WorldAnalyzerChunk[];
  file: File;
}

export interface WorldAnalyzerChunk {
  chunk: WorldChunk | null;
  skipped: boolean;
  analyzed: boolean;
  error?: string;
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
