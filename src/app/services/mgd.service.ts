import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MGDIndex, MGDIndexVersion} from "../models/mdg";

@Injectable({
  providedIn: 'root'
})
export class MGDService {
  static MGD_BASE_URL = 'https://raw.githubusercontent.com/PixiGeko/Minecraft-generated-data/master';

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get<MGDIndex>(`${MGDService.MGD_BASE_URL}/index.json`);
  }

  loadJson<T>(path: string) {
    return this.http.get<T>(`${MGDService.MGD_BASE_URL}/${path}`);
  }

  loadVersionJson<T>(version: MGDIndexVersion, path: string) {
    return this.loadJson<T>(`${version.path}/${path}`);
  }

  loadMGVersionJson<T>(version: MGDIndexVersion, path: string) {
    return this.loadVersionJson<T>(version, `minecraft-generated/${path}`);
  }

  loadCGVersionJson<T>(version: MGDIndexVersion, path: string) {
    return this.loadVersionJson<T>(version, `custom-generated/${path}`);
  }

  loadTxt(path: string) {
    return this.http.get(`${MGDService.MGD_BASE_URL}/${path}`, {responseType: 'text'});
  }

  loadVersionTxt(version: MGDIndexVersion, path: string) {
    return this.loadTxt(`${version.path}/${path}`);
  }

  loadMGVersionTxt(version: MGDIndexVersion, path: string) {
    return this.loadVersionTxt(version, `minecraft-generated/${path}`);
  }

  loadCGVersionTxt(version: MGDIndexVersion, path: string) {
    return this.loadVersionTxt(version, `custom-generated/${path}`);
  }
}
