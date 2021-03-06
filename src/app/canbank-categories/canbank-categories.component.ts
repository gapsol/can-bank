/*
 * CanBank CATEGORIES
 *  OVERVIEW of categories/types
 *  MODIFY the lists content
 */
import { Component, OnInit } from '@angular/core';
import { CanbankXchangeService } from '../canbank-services-x/canbank-xchange.service';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

import { canColor } from '../data/can.interface';
import { canContentType } from '../data/can.interface';
import { canCountry } from '../data/can.interface';
import { canLanguage } from '../data/can.interface';
import { canMaterial } from '../data/can.interface';
import { canSurface } from '../data/can.interface';
import { canType } from '../data/can.interface';
import { FormGroup } from '@angular/forms';

interface category {
  type: string,
  class: string,
  name: string,
  color: string,
  data: any
}
interface menuItem {
  type: string,
  uri: string,
  i18n: string,
  count: number
}

@Component({
  selector: 'canbank-categories',
  template: `
  <div class="sub-screen">
    <h1 class="title">canCategories</h1>

    <nav class="canbank-menu">
      <div class="menu-btn" *ngFor="let item of menuList">
        <a [routerLink]="item.uri" class="anchor-btn">
          <span>{{ item.i18n }}</span>
        </a>
        <span class="ctg-badge" *ngIf="item.count!==-1">{{ item.count }}</span>
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
    { type: 'type', uri: '/ctgtype', i18n: this.i18n['ctg_type'], count: -1 },
    { type: 'content', uri: '/ctgcontent', i18n: this.i18n['ctg_content_type'], count: -1 },
    { type: 'material', uri: '/ctgmaterial', i18n: this.i18n['ctg_material'], count: -1 },
    { type: 'surface', uri: '/ctgsurface', i18n: this.i18n['ctg_surface'], count: -1 },
    { type: 'color', uri: '/ctgcolor', i18n: this.i18n['ctg_color'], count: -1 },
    { type: 'country', uri: '/ctgcountry', i18n: this.i18n['ctg_country'], count: -1 },
    { type: 'language', uri: '/ctglanguage', i18n: this.i18n['ctg_language'], count: -1 },
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
    // TODO: remove timeouts
    setTimeout(() => { this.getCanTypes(); }, Math.random() * config.tOut);
    setTimeout(() => { this.getCanCTypes(); }, Math.random() * config.tOut);
    setTimeout(() => { this.getCanMaterials(); }, Math.random() * config.tOut);
    setTimeout(() => { this.getCanSurfaces(); }, Math.random() * config.tOut);
    setTimeout(() => { this.getCanColors(); }, Math.random() * config.tOut);
    setTimeout(() => { this.getCanCountries(); }, Math.random() * config.tOut);
    setTimeout(() => { this.getCanLanguages(); }, Math.random() * config.tOut);
  }

  getCanTypes() {
    this.canbankXC.getCount('type').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'type');
        if (help) help.count = response.count;
      }
    );
  }

  getCanCTypes() {
    this.canbankXC.getCount('content').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'content');
        if (help) help.count = response.count;
      }
    );
  }

  getCanMaterials() {
    this.canbankXC.getCount('material').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'material');
        if (help) help.count = response.count;
      }
    );
  }

  getCanSurfaces() {
    this.canbankXC.getCount('surface').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'surface');
        if (help) help.count = response.count;
      }
    );
  }

  getCanColors() {
    this.canbankXC.getCount('color').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'color');
        if (help) help.count = response.count;
      }
    );
  }

  getCanCountries() {
    this.canbankXC.getCount('country').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'country');
        if (help) help.count = response.count;
      }
    );
  }

  getCanLanguages() {
    this.canbankXC.getCount('language').subscribe(
      (response: any) => {
        let help = this.menuList.find(i => i.type === 'language');
        if (help) help.count = response.count;
      }
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
