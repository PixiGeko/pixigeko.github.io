import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {Theme} from "../constants/theme";
import {StorageKey} from "../enums/storage-key";
import {DefaultValues} from "../constants/default-values";

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  constructor(private storageService: StorageService) {
  }

  set currentTheme(theme: Theme) {
    this.storageService.save(StorageKey.THEME, theme);
  }

  get currentTheme() {
    return this.storageService.get(StorageKey.THEME, DefaultValues.DEFAULT_THEME) as Theme;
  }
}
