import {BlockState, NbtChunk, NbtType} from "deepslate";

export abstract class ChunkHelper {
  static NEW_FORMAT_DATA_VERSION = 2844;

  static helperFromChunk(chunk: NbtChunk): ChunkHelper {
    const dataVersion = chunk.getRoot().getNumber('DataVersion');

    if (dataVersion < ChunkHelper.NEW_FORMAT_DATA_VERSION) return new Pre21w43aChunkHelper(chunk);
    return new Post21w43aChunkHelper(chunk);
  }

  constructor(public chunk: NbtChunk) {
  }

  abstract forEachBlock(blockCallBack: (block: BlockState, pos: { x: number; y: number; z: number }) => void): ForEachBlockStatus;

  get root() {
    return this.chunk.getRoot();
  }
}

export class Pre21w43aChunkHelper extends ChunkHelper {
  forEachBlock(blockCallBack: (block: BlockState, pos: { x: number; y: number; z: number }) => void): ForEachBlockStatus {
    const sections = this.root.getCompound('Level').getList('Sections', NbtType.Compound);

    const filledSections = sections.filter(section => {
      const palette = section.has('Palette') && section.getList('Palette', NbtType.Compound);
      return palette && palette.filter(state => state.getString('Name') !== 'minecraft:air').length > 0;
    });

    if (filledSections.length === 0) {
      return ForEachBlockStatus.SKIPPED;
    }

    const minY = 16 * Math.min(...filledSections.map(s => s.getNumber('Y')));
    const maxY = 16 * Math.max(...filledSections.map(s => s.getNumber('Y')));

    for (const section of filledSections) {
      const states = section;
      if (!states.has('Palette') || !states.has('BlockStates')) {
        continue;
      }

      const yOffset = section.getNumber('Y') * 16;
      const palette = states.getList('Palette', NbtType.Compound);
      const blockStates = states.getLongArray('BlockStates');

      const bits = Math.max(4, Math.ceil(Math.log2(palette.length)));
      const bitMask = BigInt(Math.pow(2, bits) - 1);
      const perLong = Math.floor(64 / bits);

      let i = 0;
      let data = BigInt(0);
      for (let j = 0; j < 4096; j += 1) {
        if (j % perLong === 0) {
          data = blockStates.get(i)?.toBigInt() ?? BigInt(0);
          i += 1;
        }
        const index = Number((data >> BigInt(bits * (j % perLong))) & bitMask);
        const state = palette.get(index);
        if (state) {
          const pos: { x: number; y: number; z: number } = {
            x: j & 0xF,
            y: yOffset + (j >> 8),
            z: (j >> 4) & 0xF
          };

          const block = BlockState.fromNbt(state);
          blockCallBack(block, pos);
        }
      }
    }

    return ForEachBlockStatus.OK;
  }
}

export class Post21w43aChunkHelper extends ChunkHelper {
  forEachBlock(blockCallBack: (block: BlockState, pos: { x: number; y: number; z: number }) => void): ForEachBlockStatus {
    const sections = this.root.getList('sections', NbtType.Compound);

    const filledSections = sections.filter(section => {
      const palette = section.getCompound('block_states').getList('palette', NbtType.Compound);
      return palette && palette.filter(state => state.getString('Name') !== 'minecraft:air').length > 0;
    });

    if (filledSections.length === 0) {
      return ForEachBlockStatus.SKIPPED;
    }

    const minY = 16 * Math.min(...filledSections.map(s => s.getNumber('Y')));
    const maxY = 16 * Math.max(...filledSections.map(s => s.getNumber('Y')));

    const K_palette = 'palette';
    const K_data = 'data';

    for (const section of filledSections) {
      const states = section.getCompound('block_states');
      if (!states.has(K_palette) || !states.has(K_data)) {
        continue;
      }

      const yOffset = section.getNumber('Y') * 16;
      const palette = states.getList(K_palette, NbtType.Compound);
      const blockStates = states.getLongArray(K_data);

      const bits = Math.max(4, Math.ceil(Math.log2(palette.length)));
      const bitMask = BigInt(Math.pow(2, bits) - 1);
      const perLong = Math.floor(64 / bits);

      let i = 0;
      let data = BigInt(0);
      for (let j = 0; j < 4096; j += 1) {
        if (j % perLong === 0) {
          data = blockStates.get(i)?.toBigInt() ?? BigInt(0);
          i += 1;
        }
        const index = Number((data >> BigInt(bits * (j % perLong))) & bitMask);
        const state = palette.get(index);
        if (state) {
          const pos: { x: number; y: number; z: number } = {
            x: j & 0xF,
            y: yOffset + (j >> 8),
            z: (j >> 4) & 0xF
          };

          const block = BlockState.fromNbt(state);
          blockCallBack(block, pos);
        }
      }
    }

    return ForEachBlockStatus.OK;
  }
}

export enum ForEachBlockStatus {
  OK,
  SKIPPED,
  ERROR
}
