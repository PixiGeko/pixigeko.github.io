import {Inject, Injectable} from "@angular/core";
import {Settings, SettingsClasses} from "../models/settings";
import {Theme} from "../constants/theme";
import {Language} from "../constants/language";
import {TranslateService} from "@ngx-translate/core";
import {DOCUMENT} from "@angular/common";
import {DefaultValues} from "../constants/default-values";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private KEY = 'settings';
  
  settings!: Settings;
  
  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const defaultSettings = this.defaultSettings;

    const currentSettingsAsString = localStorage.getItem(this.KEY);
    if(!currentSettingsAsString) {
      this.settings = defaultSettings;
    } else {
      try {
        this.settings = {
          ...defaultSettings,
          ...JSON.parse(currentSettingsAsString) as Settings
        };
      } catch (e) {
        this.settings = defaultSettings;
      }
    }
    this.saveSettings();
  }
  
  saveSettings() {
    localStorage.setItem(this.KEY, JSON.stringify(this.settings));
  }
  
  initSettings() {
    this.document.body.classList.add(this.settings.theme);
    this.translateService.use(this.settings.language);
    
    if(this.settings.events.use_text_color) this.document.body.classList.add(SettingsClasses.SHOW_EVENT_TEXTS_COLOR);
    if(this.settings.events.show_event_banner) this.document.body.classList.add(SettingsClasses.SHOW_EVENT_BANNER);
  }

  private get defaultSettings() : Settings {
    return {
      theme: DefaultValues.THEME,
      language: DefaultValues.LANGUAGE,
      events: {
        use_text_color: DefaultValues.USE_TEXT_COLOR,
        show_event_banner: DefaultValues.SHOW_EVENT_BANNER
      }
    }
  }
}
