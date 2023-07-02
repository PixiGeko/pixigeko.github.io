import {TagConverter, TagConverterResult} from './converter';
import {TagLong} from '../tag';

export class LongTagConverter extends TagConverter<TagLong> {
  convert(buffer: Buffer, position: number): TagConverterResult<TagLong> {
    return new TagConverterResult<TagLong>(new TagLong(buffer.readBigInt64BE(position)), 8);
  }
}
