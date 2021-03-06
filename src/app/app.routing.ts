import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CanbankSplashComponent } from './canbank-splash/canbank-splash.component';
import { CanbankFlashComponent } from './canbank-flash/canbank-flash.component';
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
import { CanbankSettingsComponent } from './canbank-settings/canbank-settings.component';
import { CanbankDisplayComponent } from './canbank-display/canbank-display.component';

const canbankRoutes: Routes = [
  { path: 'splash', component: CanbankSplashComponent },
  { path: 'flash', component: CanbankFlashComponent },
  { path: 'home', component: CanbankHomeComponent },
  { path: 'add', component: CanbankAddComponent },
  { path: 'find', component: CanbankFindComponent },
  { path: 'categories', component: CanbankCategoriesComponent },
  { path: 'ctgcolor', component: CanbankFormColorComponent },
  { path: 'ctgcontent', component: CanbankFormContentComponent },
  { path: 'ctgcountry', component: CanbankFormCountryComponent },
  { path: 'ctglanguage', component: CanbankFormLanguageComponent },
  { path: 'ctgmaterial', component: CanbankFormMaterialComponent },
  { path: 'ctgsurface', component: CanbankFormSurfaceComponent },
  { path: 'ctgtype', component: CanbankFormTypeComponent },
  { path: 'stats', component: CanbankStatsComponent },
  { path: 'settings', component: CanbankSettingsComponent },
  { path: 'display', component: CanbankDisplayComponent },
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: '**', redirectTo: 'splash', pathMatch: 'full' },
];

// export const AppRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(canbankRoutes,
      { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
