import {AfterViewInit, Component, Inject} from '@angular/core';
import {ThemesService} from "./services/themes.service";
import {DOCUMENT} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {LanguagesService} from "./services/languages.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private themeService: ThemesService,
    private languageService: LanguagesService,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngAfterViewInit() {
    this.document.body.classList.add(this.themeService.currentTheme);
    this.translateService.use(this.languageService.currentLanguage);
  }
}
