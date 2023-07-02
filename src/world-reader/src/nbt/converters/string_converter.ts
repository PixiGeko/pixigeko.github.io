import {TagConverter, TagConverterResult} from './converter';
import {TagString} from '../tag';

export class StringTagConverter extends TagConverter<TagString> {
  convert(buffer: Buffer, position: number): TagConverterResult<TagString> {
    const stringLength = buffer.readUInt16BE(position);

    return new TagConverterResult<TagString>(new TagString(buffer.toString('utf-8', position + 2, position + 2 + stringLength)), stringLength + 2);
  }
}
