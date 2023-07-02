import {TagConverter, TagConverterResult} from './converter';
import {TagList} from '../tag';
import {TagType} from '../tag_type';
import {convertTag} from '../../index';

export class ListTagConverter extends TagConverter<TagList> {
  convert(buffer: Buffer, position: number): TagConverterResult<TagList> {
    const listType: TagType = buffer.readInt8(position);
    const listLength = listType === TagType.END ? 0 : buffer.readInt32BE(position + 1);

    const items: TagConverterResult<any>[] = [];

    let offset = 5;
    for (let i = 0; i < listLength; i++) {
      const tag = convertTag(buffer, position + offset, listType);
      offset += tag.size;
      items.push(tag);
    }

    return new TagConverterResult<TagList>(new TagList(items.map(i => i.tag)), items.map(i => i.size).reduce((sum, a) => sum + a, 0) + 1 + 4);
  }
}
