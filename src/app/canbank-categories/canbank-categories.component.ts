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

import { canColor } from '../data/can-color';
import { canContentType } from '../data/can-content';
import { canCountry } from '../data/can-country';
import { canLanguage } from '../data/can-language';
import { canMaterial } from '../data/can-material';
import { canSurface } from '../data/can-surface';
import { canType } from '../data/can-type';

interface category {
  type: string,
  class: string,
  data: any
}

@Component({
  selector: 'canbank-categories',
  templateUrl: './canbank-categories.component.html',
  styleUrls: ['./canbank-categories.component.css']
})
export class CanbankCategoriesComponent implements OnInit {
  categories: category[] = [];
  /*    { type: 'Can type', class: "can-type", data: canType },
      { type: 'Content type', class: "content-type", data: canContentType },
      { type: 'Material', class: "material", data: canMaterial },
      { type: 'Surface', class: "surface", data: canSurface },
      { type: 'Color', class: "color", data: canColor },
      { type: 'Country', class: "country", data: canCountry },
      { type: 'Language', class: "language", data: canLanguage },*/
  show: boolean[] = [];

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
        this.categories.push({ type: "Type", class: "type", data: this.canbankIF.canType });
        this.getCanCTypes();
      }
    );
  }

  getCanCTypes() {
    this.canbankXC.getContentType(0).subscribe(
      () => {
        this.categories.push({ type: "Content type", class: "content", data: this.canbankIF.canContentType });
        this.getCanMaterials();
      }
    );
  }

  getCanMaterials() {
    this.canbankXC.getMaterial(0).subscribe(
      () => {
        this.categories.push({ type: "Material", class: "material", data: this.canbankIF.canMaterial });
        this.getCanSurfaces();
      }
    );
  }

  getCanSurfaces() {
    this.canbankXC.getSurface(0).subscribe(
      () => {
        this.categories.push({ type: "Surface", class: "surface", data: this.canbankIF.canSurface });
        this.getCanColors();
      }
    );
  }

  getCanColors() {
    this.canbankXC.getColor(0).subscribe(
      () => {
        this.categories.push({ type: "Color", class: "color", data: this.canbankIF.canColor });
        this.getCanCountries();
      }
    );
  }

  getCanCountries() {
    this.canbankXC.getCountry(0).subscribe(
      () => {
        this.categories.push({ type: "Country", class: "country", data: this.canbankIF.canCountry });
        this.getCanLanguages();
      }
    );
  }

  getCanLanguages() {
    this.canbankXC.getLanguage(0).subscribe(
      () => { this.categories.push({ type: "Language", class: "language", data: this.canbankIF.canLanguage }); }
    );
  }

  toggleMe(id: number) {
    if (this.show[id]) {
      this.show[id] = false;
    } else {
      for (let i = 0; i < this.show.length; i++) {
        this.show[i] = false;
      }
      this.show[id] = true;
    }
  }
}
