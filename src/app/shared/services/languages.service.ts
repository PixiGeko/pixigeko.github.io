import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {StorageKey} from "../enums/storage-key";
import {DefaultValues} from "../constants/default-values";
import {Language} from "../constants/language";

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  constructor(private storageService: StorageService) {
  }

  set currentLanguage(lang: Language) {
    this.storageService.save(StorageKey.LANGUAGE, lang);
  }
  
  get currentLanguage() {
    return this.storageService.get(StorageKey.LANGUAGE, DefaultValues.DEFAULT_LANGUAGE) as Language;
  }
}
