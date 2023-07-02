import {TagConverter, TagConverterResult} from './converter';
import {TagShort} from '../tag';

export class ShortTagConverter extends TagConverter<TagShort> {
  convert(buffer: Buffer, position: number): TagConverterResult<TagShort> {
    return new TagConverterResult<TagShort>(new TagShort(buffer.readInt16BE(position)), 2);
  }
}
