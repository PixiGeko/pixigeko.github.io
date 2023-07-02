import {TagConverter, TagConverterResult} from './converter';
import {TagDouble} from '../tag';

export class DoubleTagConverter extends TagConverter<TagDouble> {
  convert(buffer: Buffer, position: number): TagConverterResult<TagDouble> {
    return new TagConverterResult<TagDouble>(new TagDouble(buffer.readBigInt64BE(position)), 4);
  }
}
