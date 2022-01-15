import { Component } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

@Component({
  selector: 'canbank-display',
//  template: `<p>DISPLAY</p>`,
  templateUrl: './canbank-display.component.html',
  styleUrls: ['./canbank-display.component.css']
})
export class CanbankDisplayComponent {
  i18n = i18n[config.language];
  canFormType: number = -1;
  canFormDiameter: number = -1;
  canFormHeight: number = -1;
  canFormVolume: number = -1;
  canFormVolumeFlOz: number = -1;
  canFormMaterial: number = -1;
  canFormSurface: number = -1;
  canFormCoverColor: number = -1;
  canFormOpenerColor: number = -1;
  canFormBrand: string = '';
  canFormContentName: string = '';
  canFormContentType: number = -1;
  canFormAlcohol: number = -1;
  canFormKeywords: string = '';
  canFormProdDate: number = -1;
  canFormExpDate: number = -1;
  canFormProdCountry: number = -1;
  canFormShopCountry: number = -1;
  canFormLanguage: number = -1;
  canFormEan: string = '';
  canFormFname1: any;
  canFormFname2: any;
  canFormFname3: any;
  canFormFname4: any;
  canFormFname5: any;
  canFormNotes: string = '';

  constructor() { }

}
