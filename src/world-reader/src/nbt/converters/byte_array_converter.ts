import {TagConverter, TagConverterResult} from "./converter";
import {TagByteArray} from "../tag";

export class ByteArrayTagConverter extends TagConverter<TagByteArray> {
    convert(buffer: Buffer, position: number): TagConverterResult<TagByteArray> {
        const arrayLength = buffer.readInt32BE(position);

        const items: number[] = [];
        for (let i = 0; i < arrayLength; i++) {
            items.push(buffer.readInt8(position + i + 4)); // position + (i * 1b) + 4b of arrayLength
        }

        return new TagConverterResult<TagByteArray>(
            new TagByteArray(items),
            arrayLength * 1 + 4
        );
    }
}