import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MGDIndex, MGDIndexVersion} from "../models/models/mdg";
import {firstValueFrom} from "rxjs";

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
    return firstValueFrom(this.http.get<T>(`${MGDService.MGD_BASE_URL}/${path}`));
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
}
