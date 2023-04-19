import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {registerLocaleData} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MinecraftHomeComponent} from './minecraft/minecraft-home.component';
import {EarthquakeHomeComponent} from './earthquake/earthquake-home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from "@angular/material/core";
import {GoogleMapsModule} from "@angular/google-maps";
import { DatanalyzerComponent } from './minecraft/components/datanalyzer/datanalyzer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NavbarItemComponent } from './shared/components/navbar-item/navbar-item.component';
import { CodaHomeComponent } from './coda/coda-home.component';
import {MatStepperModule} from "@angular/material/stepper";
import { PreviousNextComponent } from './shared/components/previous-next/previous-next.component';
import { DropzoneComponent } from './shared/components/dropzone/dropzone.component';
import {CdkDropList} from "@angular/cdk/drag-drop";
import { DragAndDropDirective } from './shared/directives/drag-and-drop.directive';
import { StepperComponent } from './shared/components/stepper/stepper.component';
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true
};

registerLocaleData(localeEn, 'en');
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    MinecraftHomeComponent,
    EarthquakeHomeComponent,
    DatanalyzerComponent,
    HomeComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    NavbarComponent,
    NavbarItemComponent,
    CodaHomeComponent,
    PreviousNextComponent,
    DropzoneComponent,
    DragAndDropDirective,
    StepperComponent,
  ],
  imports: [
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
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    GoogleMapsModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    CdkDropList,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: globalRippleConfig
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  static injector: Injector;
  constructor(private injector: Injector) {
    AppModule.injector = injector;
  }

}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
