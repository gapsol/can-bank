import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

@Component({
  selector: 'canbank-display',
//  template: `<p>DISPLAY</p>`,
  templateUrl: './canbank-display.component.html',
  styleUrls: ['./canbank-display.component.css']
})
export class CanbankDisplayComponent implements OnInit {
  i18n = i18n[config.language];
  canFormType: any;
  canFormDiameter: any;
  canFormHeight: any;
  canFormVolume: any;
  canFormVolumeFlOz: any;
  canFormMaterial: any;
  canFormSurface: any;
  canFormCoverColor: any;
  canFormOpenerColor: any;
  canFormBrand: any;
  canFormContentName: any;
  canFormContentType: any;
  canFormAlcohol: any;
  canFormKeywords: any;
  canFormProdDate: any;
  canFormExpDate: any;
  canFormCountry: any;
  canFormLanguage: any;
  canFormEan: any;
  canFormFname1: any;
  canFormFname2: any;
  canFormFname3: any;
  canFormFname4: any;
  canFormFname5: any;
  canFormNotes: any;

  constructor() { }

  ngOnInit() {
  }

}
