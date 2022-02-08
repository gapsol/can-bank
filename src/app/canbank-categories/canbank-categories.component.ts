/*
 * CanBank CATEGORIES
 *  OVERVIEW of categories/types
 *  MODIFY the lists content
 *
 * TODO:
 *  get info from database
 *  modification forms
 *  ? offline/local
 */
import { Component, OnInit } from '@angular/core';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

import { canColor } from '../data/can-color';
import { canContentType } from '../data/can-content';
import { canCountry } from '../data/can-country';
import { canLanguage } from '../data/can-language';
import { canMaterial } from '../data/can-material';
import { canSurface } from '../data/can-surface';
import { canType } from '../data/can-type';
import { FormGroup } from '@angular/forms';

interface category {
  type: string,
  class: string,
  name: string,
  color: string,
  data: any
}
interface menuItem {
  uri: string,
  i18n: string
}

@Component({
  selector: 'canbank-categories',
  template: `
  <div class="sub-screen">
    <h1>canCategories</h1>

    <nav class="canbank-menu">
      <div class="menu-btn" *ngFor="let item of menuList">
        <a [routerLink]="item.uri" class="anchor-btn"><!-- routerLinkActive="menu-btn-active" -->
          <span>{{ item.i18n }}</span>
        </a>
      </div>
    </nav>
    <router-outlet></router-outlet>
</div>
`,
  styleUrls: ['./canbank-categories.component.css']
})
export class CanbankCategoriesComponent implements OnInit {
  i18n = i18n[config.language];
  menuList: Array<menuItem> = [
    { uri: '/ctgtype', i18n: this.i18n['ctg_type'] },
    { uri: '/ctgcontent', i18n: this.i18n['ctg_content_type'] },
    { uri: '/ctgmaterial', i18n: this.i18n['ctg_material'] },
    { uri: '/ctgsurface', i18n: this.i18n['ctg_surface'] },
    { uri: '/ctgcolor', i18n: this.i18n['ctg_color'] },
    { uri: '/ctgcountry', i18n: this.i18n['ctg_country'] },
    { uri: '/ctglanguage', i18n: this.i18n['ctg_language'] },
  ];
  /*    { type: 'Can type', class: "can-type", data: canType },
      { type: 'Content type', class: "content-type", data: canContentType },
      { type: 'Material', class: "material", data: canMaterial },
      { type: 'Surface', class: "surface", data: canSurface },
      { type: 'Color', class: "color", data: canColor },
      { type: 'Country', class: "country", data: canCountry },
      { type: 'Language', class: "language", data: canLanguage },*/
      canTypeName: string = '';
      canContentTypeName: string = '';
      canMaterialName: string = '';
      canMaterialColor: string = '';
      canSurfaceName: string = '';
      canSurfaceColor: string = '';
      canColorName: string = '';
      canColorColor: string = '';
      canCountryName: string = '';
      canLanguageName: string = '';
      categories: category[] = [];
      show: boolean[] = [];
      invalid: boolean[] = [true, true, true, true, true, true, true];

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanTypes();
  }

  getCanTypes() {
    this.canbankXC.getType(0).subscribe(
      () => {
        this.categories.push({ type: "Type", class: "type", name: '', color: '', data: this.canbankIF.canType });
        this.getCanCTypes();
      }
    );
  }

  getCanCTypes() {
    this.canbankXC.getContentType(0).subscribe(
      () => {
        this.categories.push({ type: "Content type", class: "content", name: '', color: '', data: this.canbankIF.canContentType });
        this.getCanMaterials();
      }
    );
  }

  getCanMaterials() {
    this.canbankXC.getMaterial(0).subscribe(
      () => {
        this.categories.push({ type: "Material", class: "material", name: '', color: '', data: this.canbankIF.canMaterial });
        this.getCanSurfaces();
      }
    );
  }

  getCanSurfaces() {
    this.canbankXC.getSurface(0).subscribe(
      () => {
        this.categories.push({ type: "Surface", class: "surface", name: '', color: '', data: this.canbankIF.canSurface });
        this.getCanColors();
      }
    );
  }

  getCanColors() {
    this.canbankXC.getColor(0).subscribe(
      () => {
        this.categories.push({ type: "Color", class: "color", name: '', color: '', data: this.canbankIF.canColor });
        this.getCanCountries();
      }
    );
  }

  getCanCountries() {
    this.canbankXC.getCountry(0).subscribe(
      () => {
        this.categories.push({ type: "Country", class: "country", name: '', color: '', data: this.canbankIF.canCountry });
        this.getCanLanguages();
      }
    );
  }

  getCanLanguages() {
    this.canbankXC.getLanguage(0).subscribe(
      () => { this.categories.push({ type: "Language", class: "language", name: '', color: '', data: this.canbankIF.canLanguage }); }
    );
  }

  toggleMe(id: number, show: boolean) {
    if (this.show[id]) {
      this.show[id] = false;
    } else {
      for (let i = 0; i < this.show.length; i++) {
        this.show[i] = false;
      }
      this.show[id] = true;
    }
  }

  saveCtg(obj: category) {
    console.warn(obj)
    switch (obj.class) {
      case 'type':
      case 'content':
      case 'material':
      case 'surface':
      case 'color':
      case 'country':
      case 'language':
        // this.canbankXC.setLanguage();
    }
  }

  validate(obj: category) {
    console.log(obj)
  }

}
