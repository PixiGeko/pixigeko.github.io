import {TagConverter, TagConverterResult} from './nbt/converters/converter';
import {TagType} from './nbt/tag_type';
import {EndTagConverter} from './nbt/converters/end_converter';
import {ByteTagConverter} from './nbt/converters/byte_converter';
import {ShortTagConverter} from './nbt/converters/short_converter';
import {IntTagConverter} from './nbt/converters/int_converter';
import {LongTagConverter} from './nbt/converters/long_converter';
import {FloatTagConverter} from './nbt/converters/float_converter';
import {DoubleTagConverter} from './nbt/converters/double_converter';
import {ByteArrayTagConverter} from './nbt/converters/byte_array_converter';
import {StringTagConverter} from './nbt/converters/string_converter';
import {ListTagConverter} from './nbt/converters/list_converter';
import {CompoundTagConverter} from './nbt/converters/compound_converter';
import {IntArrayTagConverter} from './nbt/converters/int_array_converter';
import {LongArrayTagConverter} from './nbt/converters/long_array_converter';
import {TagEnd} from "./nbt/tag";
import {TagTypeError} from "../../app/error";

export const CONVERTERS = new Map<TagType, TagConverter<any>>;
CONVERTERS.set(TagType.END, new EndTagConverter());
CONVERTERS.set(TagType.BYTE, new ByteTagConverter());
CONVERTERS.set(TagType.SHORT, new ShortTagConverter());
CONVERTERS.set(TagType.INT, new IntTagConverter());
CONVERTERS.set(TagType.LONG, new LongTagConverter());
CONVERTERS.set(TagType.FLOAT, new FloatTagConverter());
CONVERTERS.set(TagType.DOUBLE, new DoubleTagConverter());
CONVERTERS.set(TagType.BYTE_ARRAY, new ByteArrayTagConverter());
CONVERTERS.set(TagType.STRING, new StringTagConverter());
CONVERTERS.set(TagType.LIST, new ListTagConverter());
CONVERTERS.set(TagType.COMPOUND, new CompoundTagConverter());
CONVERTERS.set(TagType.INT_ARRAY, new IntArrayTagConverter());
CONVERTERS.set(TagType.LONG_ARRAY, new LongArrayTagConverter());

export function convertTag(buffer: Buffer, position: number, type: TagType) {
  const converter = CONVERTERS.get(type);

  if (!converter) {
    throw new TagTypeError(type);
  }

  return converter.convert(buffer, position);
}
