import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankRecordService } from '../canbank-services/canbank-record.service';

@Component({
  selector: 'canbank-display',
  templateUrl: './canbank-display.component.html',
  styleUrls: ['./canbank-display.component.css']
})
export class CanbankDisplayComponent implements OnInit {
  i18n = i18n[config.language];
  canFormType: string = '';
  canFormDiameter: string = '';
  canFormHeight: string = '';
  canFormVolume: string = '';
  canFormVolumeFlOz: string = '';
  canFormMaterial: string = '';
  canFormSurface: string = '';
  canFormCoverColor: string = '';
  canFormOpenerColor: string = '';
  canFormBrand: string = '';
  canFormContentName: string = '';
  canFormContentType: string = '';
  canFormAlcohol: string = '';
  canFormKeywords: string = '';
  canFormProdDate: string = '';
  canFormExpDate: string = '';
  canFormProdCountry: string = '';
  canFormShopCountry: string = ''
  canFormLanguage: string = '';
  canFormEan: string = '';
  canFormFname1: string = '';
  canFormFname2: string = '';
  canFormFname3: string = '';
  canFormFname4: string = '';
  canFormFname5: string = '';
  canFormNotes: string = '';

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
