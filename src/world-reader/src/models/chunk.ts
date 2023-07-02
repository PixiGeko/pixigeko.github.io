import {CompressionType} from "../nbt/compression_type";

export interface Chunk {
    compressionType: CompressionType;
    remainingData: number;
    data: ChunkData;
}

export interface ChunkData {
    Level: {
      DataVersion: number;
      xPos: number;
      zPos: number;
      yPos: number;
      Status: ChunkStatus;
      LastUpdate: number;
      sections: ChunkSection[];
      block_entities: any[];
    }
}

export interface ChunkSection {
    Y: number;
    block_states: {
        palette: {
            Name: string;
            Properties: {
                [key: string]: any;
            }[];
        }[];
        data: number[];
    };
    biomes: {
        palette: string[];
        data: number[];
    };
    BlockLight: number[];
    SkyLight: number[];
}

export enum ChunkStatus {
    EMPTY = "empty",
    STRUCTURE_STARTS = "structure_starts",
    STRUCTURE_REFERENCES = "structure_references",
    BIOMES = "biomes",
    NOISE = "noise",
    SURFACE = "surface",
    CARVERS = "carvers",
    LIQUID_CARVERS = "liquid_carvers",
    FEATURES = "features",
    LIGHT = "light",
    SPAWN = "spawn",
    HEIGHTMAPS = "heightmaps ",
    FULL = "full"
}
