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

  public get<T>(key: StorageKey, defaultValue?: T) {
    return (localStorage.getItem(key) ?? defaultValue) as T;
  }

  public remove(key: StorageKey) {
    return localStorage.removeItem(key);
  }
}
