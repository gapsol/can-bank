import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankRecordService } from '../canbank-services/canbank-record.service';

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
  canFormProdCountry: any;
  canFormShopCountry: any;
  canFormLanguage: any;
  canFormEan: any;
  canFormFname1: any;
  canFormFname2: any;
  canFormFname3: any;
  canFormFname4: any;
  canFormFname5: any;
  canFormNotes: any;

  constructor(private canbankRC: CanbankRecordService) { }

  ngOnInit(): void {
    this.canFormType = this.canbankRC.canFormType;
    this.canFormDiameter = this.canbankRC.canFormDiameter;
    this.canFormHeight = this.canbankRC.canFormHeight;
    this.canFormVolume = this.canbankRC.canFormVolume;
    this.canFormVolumeFlOz = this.canbankRC.canFormVolumeFlOz;
    this.canFormMaterial = this.canbankRC.canFormMaterial;
    this.canFormSurface = this.canbankRC.canFormSurface;
    this.canFormCoverColor = this.canbankRC.canFormCoverColor;
    this.canFormOpenerColor = this.canbankRC.canFormOpenerColor;
    this.canFormBrand = this.canbankRC.canFormBrand;
    this.canFormContentName = this.canbankRC.canFormContentName;
    this.canFormContentType = this.canbankRC.canFormContentType;
    this.canFormAlcohol = this.canbankRC.canFormAlcohol;
    this.canFormKeywords = this.canbankRC.canFormKeywords;
    this.canFormProdDate = this.canbankRC.canFormProdDate;
    this.canFormExpDate = this.canbankRC.canFormExpDate;
    this.canFormProdCountry = this.canbankRC.canFormProdCountry;
    this.canFormShopCountry = this.canbankRC.canFormShopCountry;
    this.canFormLanguage = this.canbankRC.canFormLanguage;
    this.canFormEan = this.canbankRC.canFormEan;
    this.canFormFname1 = this.canbankRC.canFormFname1;
    this.canFormFname2 = this.canbankRC.canFormFname2;
    this.canFormFname3 = this.canbankRC.canFormFname3;
    this.canFormFname4 = this.canbankRC.canFormFname4;
    this.canFormFname5 = this.canbankRC.canFormFname5;
    this.canFormNotes = this.canbankRC.canFormNotes;
  }

}
