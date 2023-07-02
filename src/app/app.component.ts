import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {EventsService} from './services/events.service';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private settingsService: SettingsService,
    private translateService: TranslateService,
    private eventsService: EventsService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    this.document.body.classList.add(...this.eventsService.getActivesEvents());
  }

  ngAfterViewInit() {
    this.settingsService.initSettings();
  }
}
