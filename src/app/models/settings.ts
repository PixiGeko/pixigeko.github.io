import {Theme} from '../constants/theme';
import {Language} from '../constants/language';

export interface Settings {
  theme: Theme;
  language: Language;
  events: {
    use_text_color: boolean;
    show_event_banner: boolean;
  };
  world_analyzer: {
    background_color: string;
    legend_color: string;
  }
}

export enum SettingsClasses {
  SHOW_EVENT_TEXTS_COLOR = 'withEventTextColor',
  SHOW_EVENT_BANNER = 'withEventBanner',
}
