import {TagConverter, TagConverterResult} from "./converter";
import {TagIntArray} from "../tag";

export class IntArrayTagConverter extends TagConverter<TagIntArray> {
    convert(buffer: Buffer, position: number): TagConverterResult<TagIntArray> {
        const arrayLength = buffer.readInt32BE(position);

        const items: number[] = [];
        for (let i = 0; i < arrayLength; i++) {
            items.push(buffer.readInt32BE(position + i * 4 + 4)); // position + (i * 4b) + 4b of arrayLength
        }

        return new TagConverterResult<TagIntArray>(new TagIntArray(items), arrayLength * 4 + 4);
    }
}