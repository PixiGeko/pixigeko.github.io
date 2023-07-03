import {TagType} from "../world-reader/src/nbt/tag_type";

export class TagTypeError extends Error {
  constructor(type: TagType) {
    super(`Tag type ${type} is unknown`);
  }
}
