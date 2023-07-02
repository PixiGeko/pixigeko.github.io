export abstract class Tag<T> {
  constructor(public readonly value: T) {
  }

  toJSON() {
    return this.value;
  }
}

export class TagEnd extends Tag<void> {
}

export class TagByte extends Tag<number> {
}

export class TagShort extends Tag<number> {
}

export class TagInt extends Tag<number> {
}

export class TagLong extends Tag<bigint> {
}

export class TagFloat extends Tag<number> {
}

export class TagDouble extends Tag<bigint> {
}

export class TagByteArray extends Tag<number[]> {
}

export class TagString extends Tag<string> {
}

export class TagList extends Tag<Tag<any>[]> {
}

export class TagCompound extends Tag<{ [key: string]: Tag<any> }> {
}

export class TagIntArray extends Tag<number[]> {
}

export class TagLongArray extends Tag<bigint[]> {
}
