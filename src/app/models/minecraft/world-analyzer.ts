import {WorldChunk} from '../../../world-reader/src/world';

export interface WorldAnalyzerChunk {
  chunk: WorldChunk | null;
  skipped: boolean;
  analyzed: boolean;
}
