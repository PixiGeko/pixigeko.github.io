import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readFile(file: File) {
    return new Promise<string>(resolve => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(String(fileReader.result));
        console.log(fileReader.result);
      }
      fileReader.readAsText(file);
    });
  }
}
