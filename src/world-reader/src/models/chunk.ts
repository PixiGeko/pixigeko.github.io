import {CompressionType} from '../nbt/compression_type';
import {ChunkHeader} from "../world";

export interface Chunk {
  compressionType: CompressionType;
  remainingData: number;
  data: ChunkData;
  header: ChunkHeader;
}

export interface ChunkData {
  Level: {
    DataVersion?: number;
    xPos?: number;
    zPos?: number;
    yPos?: number;
    Status?: ChunkStatus;
    LastUpdate?: number;
    Sections?: ChunkSection[];
    block_entities?: any[];
  }
}

export interface ChunkSection {
  Y: number;
  BlockStates: bigint[];
  Palette: {
    Name: string;
    Properties: {
      [key: string]: any;
    }[];
  }[];
  biomes: {
    palette: string[];
    data: number[];
  };
  BlockLight: number[];
  SkyLight: number[];
}

export enum ChunkStatus {
  EMPTY = 'empty',
  STRUCTURE_STARTS = 'structure_starts',
  STRUCTURE_REFERENCES = 'structure_references',
  BIOMES = 'biomes',
  NOISE = 'noise',
  SURFACE = 'surface',
  CARVERS = 'carvers',
  LIQUID_CARVERS = 'liquid_carvers',
  FEATURES = 'features',
  LIGHT = 'light',
  SPAWN = 'spawn',
  HEIGHTMAPS = 'heightmaps ',
  FULL = 'full'
}
