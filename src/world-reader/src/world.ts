import {CompressionType} from './nbt/compression_type';
import {TagCompound} from './nbt/tag';
import {TagType} from './nbt/tag_type';
import {convertTag} from './index';
import {TagConverterResult} from './nbt/converters/converter';
import {ToJSON} from './utils/toJSON';
import {worldJsonReplacer} from './utils/json_replacer';
import {Region} from './models/region';
import {Chunk} from './models/chunk';
import {Buffer} from 'buffer';
import * as fflate from 'fflate';

export const SECTOR_SIZE = 4096;
export const TIMESTAMP_BASE_OFFSET = 4096;

export class WorldRegion implements ToJSON {
  public chunks: (WorldChunk | null)[] = [];

  constructor(private regionBuffer: Buffer) {
    this.initChunks();
  }

  private initChunks() {
    for (let i = 0; i < 4096; i += 4) {
      const header: ChunkHeader = {
        sectorOffset: (this.regionBuffer.readUInt8(i) << 16) + (this.regionBuffer.readUInt8(i + 1) << 8) + this.regionBuffer.readUInt8(i + 2),
        sectorCount: this.regionBuffer.readUInt8(i + 3),
        timestamp: this.regionBuffer.readUInt32BE(i + TIMESTAMP_BASE_OFFSET)
      };

      const start = header.sectorOffset * SECTOR_SIZE;
      const end = (header.sectorOffset + header.sectorCount) * SECTOR_SIZE;

      const chunkBuffer = this.regionBuffer.slice(start, end);

      if (chunkBuffer.length === 0) this.chunks.push(null); // ignore empty chunks
      else this.chunks.push(new WorldChunk(header, chunkBuffer));
    }
  }

  public chunkAtIndex(index: number) {
    if (index < 0 || index > this.chunks.length) throw new Error('Index out of bound');

    const chunk = this.chunks[index];

    if (!chunk) return null;

    if (!chunk.isLoaded) chunk.initData();
    return this.chunks[index];
  }

  public chunkAtCoordinates(x: number, z: number) {
    const offset = 4 * ((x % 32) + (z % 32) * 32);
    return this.chunks.find(c => c?.header?.sectorOffset === offset);
  }

  toJSON() {
    return {
      chunks: this.chunks.filter(c => c)
    };
  }

  asObject() {
    return JSON.parse(JSON.stringify(this, worldJsonReplacer)) as Region;
  }
}

export class WorldChunk implements ToJSON {
  public remainingChunkData!: number;
  public compressionType!: CompressionType;
  public chunkData!: Buffer;
  public chunkTag!: TagConverterResult<TagCompound>;

  private _isLoaded = false;

  constructor(public header: ChunkHeader, public chunkBuffer: Buffer) {

  }

  public async initData() {
    if (this.isLoaded) return;
    this.remainingChunkData = this.chunkBuffer.readInt32BE(0);
    this.compressionType = this.chunkBuffer.readInt8(4);
    this.chunkData = this.chunkBuffer.slice(5);

    if (![CompressionType.ZLIB, CompressionType.UNCOMPRESSED].includes(this.compressionType)) {
      throw new Error(`Compression type ${this.compressionType} is unknown`);
    }

    switch (this.compressionType) {
      case CompressionType.ZLIB:
        const decompressedData = fflate.decompressSync(this.chunkBuffer.slice(5));
        this.chunkData = Buffer.from(decompressedData);
        break;
      case CompressionType.UNCOMPRESSED:
        this.chunkData = this.chunkBuffer.slice(5);
        break;
    }

    this.chunkTag = convertTag(this.chunkData, 0, TagType.COMPOUND);

    this._isLoaded = true;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  toJSON() {
    return {
      compressionType: this.compressionType,
      remainingData: this.remainingChunkData,
      data: this.chunkTag?.tag?.value['']
    };
  }

  asObject() {
    return JSON.parse(JSON.stringify(this, worldJsonReplacer)) as Chunk;
  }
}

export interface ChunkHeader {
  sectorOffset: number;
  sectorCount: number;
  timestamp: number;
}
