import {Observable} from "rxjs";
import { Buffer } from 'buffer';

export class FileUtils {
  static readFileAsBuffer(file: File) {
    return new Observable<Buffer>(observer => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        observer.next(Buffer.from(fileReader.result as ArrayBuffer));
      }

      fileReader.readAsArrayBuffer(file);
    })
  }
}
