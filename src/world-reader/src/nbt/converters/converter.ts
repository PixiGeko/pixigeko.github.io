import {Tag} from "../tag";
import {ToJSON} from "../../utils/toJSON";


export abstract class TagConverter<T extends Tag<any>> {
    abstract convert(buffer: Buffer, position: number): TagConverterResult<T>;
}

export class TagConverterResult<T extends Tag<any>>  implements ToJSON {
    constructor(public tag: T, public size: number) {
    }

    toJSON() {
        return this.tag;
    }
}