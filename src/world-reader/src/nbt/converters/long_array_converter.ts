import {TagConverter, TagConverterResult} from "./converter";
import {TagLongArray} from "../tag";

export class LongArrayTagConverter extends TagConverter<TagLongArray> {
    convert(buffer: Buffer, position: number): TagConverterResult<TagLongArray> {
        const arrayLength = buffer.readInt32BE(position);

        const items: bigint[] = [];
        for (let i = 0; i < arrayLength; i++) {
            items.push(buffer.readBigInt64BE(position + i * 8 + 4)); // position + (i * 8b) + 4b of arrayLength
        }

        return new TagConverterResult<TagLongArray>(new TagLongArray(items), arrayLength * 8 + 4);
    }
}