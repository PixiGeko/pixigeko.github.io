import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {Theme} from '../../../constants/theme';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Language} from '../../../constants/language';
import {DOCUMENT} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {ToolbarComponent} from '../../shared/toolbar/toolbar.component';
import {SettingsClasses} from '../../../models/settings';
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('themeSwitcher', {read: ElementRef}) element: ElementRef | undefined;

  themes = Theme;
  languages = Language;

  constructor(
    private settingsService: SettingsService,
    private translateService: TranslateService,
    private eventService: EventsService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngAfterViewInit() {
    if (this.element) {
      this.element.nativeElement.querySelector('#themeSwitcher .mdc-switch__icon--on').firstChild.setAttribute('d', ToolbarComponent.moon);
      this.element.nativeElement.querySelector('#themeSwitcher .mdc-switch__icon--off').firstChild.setAttribute('d', ToolbarComponent.sun);
    }
  }

  changeTheme(event: MatSlideToggleChange) {
    if (event.checked) {
      this.settingsService.settings.theme = Theme.DARK;
      this.document.body.classList.remove(Theme.LIGHT);
      this.document.body.classList.add(Theme.DARK);
    } else {
      this.settingsService.settings.theme = Theme.LIGHT;
      this.document.body.classList.remove(Theme.DARK);
      this.document.body.classList.add(Theme.LIGHT);
    }
    this.saveSettings();
  }

  changeLang(lang: Language) {
    this.settingsService.settings.language = lang;
    this.translateService.use(lang);
    this.saveSettings();
  }

  changeEventUseTextColor(event: MatSlideToggleChange) {
    this.settings.events.use_text_color = event.checked;
    if (event.checked) this.document.body.classList.add(SettingsClasses.SHOW_EVENT_TEXTS_COLOR);
    else this.document.body.classList.remove(SettingsClasses.SHOW_EVENT_TEXTS_COLOR);
    this.saveSettings();
  }

  changeEventShowBanner(event: MatSlideToggleChange) {
    this.settings.events.show_event_banner = event.checked;
    if (event.checked) this.document.body.classList.add(SettingsClasses.SHOW_EVENT_BANNER);
    else this.document.body.classList.remove(SettingsClasses.SHOW_EVENT_BANNER);
    this.saveSettings();
  }

  saveSettings() {
    this.settingsService.saveSettings();
  }

  get hasActiveEvent() {
    return this.eventService.hasActiveEvent();
  }

  get settings() {
    return this.settingsService.settings;
  }
}
