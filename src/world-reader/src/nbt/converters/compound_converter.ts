import {TagConverter, TagConverterResult} from "./converter";
import {Tag, TagCompound} from "../tag";
import {TagType} from "../tag_type";
import {convertTag} from "../../index";

export class CompoundTagConverter extends TagConverter<TagCompound> {
    convert(buffer: Buffer, position: number): TagConverterResult<TagCompound> {
        const values = {};

        let offset = 0;
        let size = 0;
        while (position + offset < buffer.length) {
            const type = buffer.readUInt8(position + offset);

            if (type === TagType.END) {
                size += 1;
                break;
            }

            const nameLength = buffer.readUInt16BE(position + offset + 1);
            const prefixSize = 1 + 2 + nameLength;
            const name = buffer.toString(
                'utf-8',
                position + offset + 3,
                position + offset + 3 + nameLength
            )

            const result = convertTag(buffer, position + offset + prefixSize, type);
            size += prefixSize + result.size;
            // @ts-ignore
            values[name] = result.tag;

            offset += prefixSize + result.size;
        }

        return new TagConverterResult<TagCompound>(new TagCompound(values), size);
    }
}
