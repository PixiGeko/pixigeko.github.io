import {TagConverter, TagConverterResult} from './converter';
import {TagEnd} from '../tag';

export class EndTagConverter extends TagConverter<TagEnd> {
  convert(buffer: Buffer, position: number): TagConverterResult<TagEnd> {
    return new TagConverterResult<TagEnd>(null, 0);
  }
}
