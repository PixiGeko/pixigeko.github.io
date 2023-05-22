import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {
  }
  
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
  
  readBuffer(url: string) {
    return this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }
}
