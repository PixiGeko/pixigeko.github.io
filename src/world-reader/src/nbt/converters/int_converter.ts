import {TagConverter, TagConverterResult} from "./converter";
import {TagInt} from "../tag";

export class IntTagConverter extends TagConverter<TagInt> {
    convert(buffer: Buffer, position: number): TagConverterResult<TagInt> {
        return new TagConverterResult<TagInt>(new TagInt(buffer.readInt32BE(position)), 4);
    }
}