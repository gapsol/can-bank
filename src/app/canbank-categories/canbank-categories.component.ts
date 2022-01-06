import { Component, OnInit } from '@angular/core';

import { canColor } from '../data/can-color';
import { canContentType } from '../data/can-content';
import { canCountry } from '../data/can-country';
import { canLanguage } from '../data/can-language';
import { canMaterial } from '../data/can-material';
import { canSurface } from '../data/can-surface';
import { canType } from '../data/can-type';

@Component({
  selector: 'canbank-categories',
  templateUrl: './canbank-categories.component.html',
  styleUrls: ['./canbank-categories.component.css']
})
export class CanbankCategoriesComponent implements OnInit {
  categories = [
    { type: 'Type', data: canType },
    { type: 'Content type', data: canContentType },
    { type: 'Material', data: canMaterial },
    { type: 'Surface', data: canSurface },
    { type: 'Color', data: canColor },
    { type: 'Country', data: canCountry },
    { type: 'Language', data: canLanguage },
  ]

  constructor() { }

  ngOnInit() {
    console.log('CATEGORIES component')
  }

  canCategories() { }
}
