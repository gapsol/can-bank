import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanbankSplashComponent } from './canbank-splash/canbank-splash.component';
import { CanbankFlashComponent } from './canbank-flash/canbank-flash.component';
import { CanbankHeadComponent } from './canbank-head/canbank-head.component';
import { CanbankMenuComponent } from './canbank-menu/canbank-menu.component';
// TODO: remove body
import { CanbankBodyComponent } from './canbank-body/canbank-body.component';
import { CanbankHomeComponent } from './canbank-home/canbank-home.component';
import { CanbankAddComponent } from './canbank-add/canbank-add.component';
import { CanbankFindComponent } from './canbank-find/canbank-find.component';
import { CanbankCategoriesComponent } from './canbank-categories/canbank-categories.component';
import { CanbankStatsComponent } from './canbank-stats/canbank-stats.component';
import { CanbankFillComponent } from './canbank-fill/canbank-fill.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    CanbankSplashComponent,
    CanbankFlashComponent,
    CanbankHeadComponent,
    CanbankMenuComponent,
    // TODO: remove body
    CanbankBodyComponent,
    CanbankHomeComponent,
    CanbankAddComponent,
    CanbankFindComponent,
    CanbankCategoriesComponent,
    CanbankStatsComponent,
    CanbankFillComponent,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
