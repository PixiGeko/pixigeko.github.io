import {TagConverter, TagConverterResult} from "./converter";
import {TagByte} from "../tag";

export class ByteTagConverter extends TagConverter<TagByte> {
    convert(buffer: Buffer, position: number) : TagConverterResult<TagByte> {
        return new TagConverterResult<TagByte>(new TagByte(buffer.readInt8(position)), 1);
    }
}