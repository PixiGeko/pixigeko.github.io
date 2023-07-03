import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {registerLocaleData} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MinecraftHomeComponent} from './components/minecraft/minecraft-home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MAT_RIPPLE_GLOBAL_OPTIONS, MatRippleModule, RippleGlobalOptions} from '@angular/material/core';
import {GoogleMapsModule} from '@angular/google-maps';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {ToolbarComponent} from './components/shared/toolbar/toolbar.component';
import {NavbarItemComponent} from './components/shared/navbar-item/navbar-item.component';
import {MatStepperModule} from '@angular/material/stepper';
import {PreviousNextComponent} from './components/shared/previous-next/previous-next.component';
import {DropzoneComponent} from './components/shared/dropzone/dropzone.component';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {DragAndDropDirective} from './directives/drag-and-drop.directive';
import {StepperComponent} from './components/shared/stepper/stepper.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {DatassetsDownloadComponent} from './components/minecraft/datassets-download/datassets-download.component';
import {PageUnderConstructComponent} from './components/shared/page-under-construct/page-under-construct.component';
import {ContactsHomeComponent} from './components/others/contacts/contacts-home.component';
import {SettingsComponent} from './components/others/settings/settings.component';
import {McProjects} from './components/minecraft/mgd-repositories/mc-projects';
import {WorldAnalyzerComponent} from './components/minecraft/world-analyzer/world-analyzer.component';
import {NavBarComponent} from './components/shared/nav-bar/nav-bar.component';
import {BaseControlComponent} from './components/shared/form-controls/base-control/base-control.component';
import {KeyValueComponent} from './components/shared/key-value/key-value.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {
  WorldAnalyzerSettingsStepComponent
} from './components/minecraft/world-analyzer/world-analyzer-settings-step/world-analyzer-settings-step.component';
import {
  WorldAnalyzerAnalyzeStepComponent
} from './components/minecraft/world-analyzer/world-analyzer-analyze-step/world-analyzer-analyze-step.component';
import {
  WorldAnalyzerResultsStepComponent
} from './components/minecraft/world-analyzer/world-analyzer-results-step/world-analyzer-results-step.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true
};

registerLocaleData(localeEn, 'en');
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    MinecraftHomeComponent,
    HomeComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    NavbarItemComponent,
    PreviousNextComponent,
    DropzoneComponent,
    DragAndDropDirective,
    StepperComponent,
    DatassetsDownloadComponent,
    PageUnderConstructComponent,
    ContactsHomeComponent,
    SettingsComponent,
    McProjects,
    WorldAnalyzerComponent,
    NavBarComponent,
    BaseControlComponent,
    KeyValueComponent,
    WorldAnalyzerSettingsStepComponent,
    WorldAnalyzerAnalyzeStepComponent,
    WorldAnalyzerResultsStepComponent,
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
    MatExpansionModule,
    MatCardModule,
    MatTooltipModule,
    MatRadioModule,
    MatSnackBarModule,
    MatRippleModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: globalRippleConfig
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: {
        appearance: 'outline'
      }
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
