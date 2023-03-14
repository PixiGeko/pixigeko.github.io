import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {registerLocaleData} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MinecraftHomeComponent } from './minecraft/minecraft-home.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { EarthquakeHomeComponent } from './earthquake/earthquake-home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

registerLocaleData(localeEn, 'en');
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    MinecraftHomeComponent,
    ToolbarComponent,
    EarthquakeHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    }),
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
