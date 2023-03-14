import {AfterViewInit, Component, Inject} from '@angular/core';
import {ThemesService} from "./shared/services/themes.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private themeService: ThemesService, @Inject(DOCUMENT) private document: Document) {
  }
  ngAfterViewInit() {
    this.document.body.classList.add(this.themeService.currentTheme);
  }
}
