import {Injectable} from '@angular/core';
import {StorageKey} from "../enums/storage-key";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  public save(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  public get(key: StorageKey, defaultValue?: string) {
    return localStorage.getItem(key) ?? defaultValue;
  }

  public remove(key: StorageKey) {
    return localStorage.removeItem(key);
  }
}
