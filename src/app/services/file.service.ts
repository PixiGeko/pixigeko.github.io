import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {
  }

  readFile(file: File) {
    return new Promise<string>(resolve => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(String(fileReader.result));
      };
      fileReader.readAsText(file);
    });
  }

  readBuffer(url: string) {
    return this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }
}
