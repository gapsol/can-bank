import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanbankSplashComponent } from './canbank-splash/canbank-splash.component';
import { CanbankFlashComponent } from './canbank-flash/canbank-flash.component';
import { CanbankHeadComponent } from './canbank-head/canbank-head.component';
import { CanbankMenuComponent } from './canbank-menu/canbank-menu.component';
import { CanbankHomeComponent } from './canbank-home/canbank-home.component';
import { CanbankAddComponent } from './canbank-add/canbank-add.component';
import { CanbankFindComponent } from './canbank-find/canbank-find.component';
import { CanbankCategoriesComponent } from './canbank-categories/canbank-categories.component';
import { CanbankFormColorComponent } from './canbank-categories/canbank-form-color/canbank-form-color.component';
import { CanbankFormContentComponent } from './canbank-categories/canbank-form-content/canbank-form-content.component';
import { CanbankFormCountryComponent } from './canbank-categories/canbank-form-country/canbank-form-country.component';
import { CanbankFormLanguageComponent } from './canbank-categories/canbank-form-language/canbank-form-language.component';
import { CanbankFormMaterialComponent } from './canbank-categories/canbank-form-material/canbank-form-material.component';
import { CanbankFormSurfaceComponent } from './canbank-categories/canbank-form-surface/canbank-form-surface.component';
import { CanbankFormTypeComponent } from './canbank-categories/canbank-form-type/canbank-form-type.component';
import { CanbankStatsComponent } from './canbank-stats/canbank-stats.component';
import { CanbankPrefillComponent } from './canbank-prefill/canbank-prefill.component';
import { CanbankDisplayComponent } from './canbank-display/canbank-display.component';
import { CanbankSettingsComponent } from './canbank-settings/canbank-settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    CanbankSplashComponent,
    CanbankFlashComponent,
    CanbankHeadComponent,
    CanbankMenuComponent,
    CanbankHomeComponent,
    CanbankAddComponent,
    CanbankFindComponent,
    CanbankCategoriesComponent,
    CanbankFormColorComponent,
    CanbankFormContentComponent,
    CanbankFormCountryComponent,
    CanbankFormLanguageComponent,
    CanbankFormMaterialComponent,
    CanbankFormSurfaceComponent,
    CanbankFormTypeComponent,
    CanbankStatsComponent,
    CanbankPrefillComponent,
    CanbankDisplayComponent,
    CanbankSettingsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
