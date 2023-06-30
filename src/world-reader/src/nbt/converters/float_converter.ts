import {TagConverter, TagConverterResult} from "./converter";
import {TagFloat} from "../tag";

export class FloatTagConverter extends TagConverter<TagFloat> {
    convert(buffer: Buffer, position: number): TagConverterResult<TagFloat> {
        return new TagConverterResult<TagFloat>(new TagFloat(buffer.readInt32BE(position)), 4);
    }
}