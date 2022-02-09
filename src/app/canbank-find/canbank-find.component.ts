/*
 * CanBank FIND
 *  form for finding can in database
 *
  TODO:
 *  MODIFY styling
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { canBank } from '../data/can-bank';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';
import { CanbankRecordService } from '../canbank-services/canbank-record.service';

interface canList extends canBank {
  text: string
}
@Component({
  selector: 'canbank-find',
  templateUrl: './canbank-find.component.html',
  styleUrls: ['./canbank-find.component.css']
})
export class CanbankFindComponent implements OnInit {
  i18n = i18n[config.language];
  find: string = '';
  canList: canList[] = [];

  constructor(
    private router: Router,
    private canbankIF: CanbankInterfaceService,
    private canbankXC: CanbankXchangeService,
    private canbankRC: CanbankRecordService
  ) { }

  ngOnInit(): void {
    if (!this.canbankIF.isActive) {
      this.canbankXC.checkLists();
    };
  }

  canFind() {
    this.canList = [];
    if (this.find.length >= 3) {
      this.canbankXC.getBank(0, this.find)
        .subscribe(
          (response: any) => {
            response['list'].forEach((element: any) => {
              let item = element;
              item.text = element.brand + ' [' + element.id + ']';
              this.canList.push(item);
            });
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }

  canDisplay(id: number) {
    let help: any;
    let display = this.canList.find(item => item.id === id);
    if (display) {
      help = this.canbankIF.canType.find(i => i.id === display?.type);
      this.canbankRC.canFormType = (help) ? help.name : '';
      this.canbankRC.canFormDiameter = display.diameter.toString();
      this.canbankRC.canFormHeight = display.height.toString();
      this.canbankRC.canFormVolume = display.volume.toString();
      this.canbankRC.canFormVolumeFlOz = display.volumeFlOz.toString();
      help = this.canbankIF.canMaterial.find(i => i.id === display?.material);
      this.canbankRC.canFormMaterial = (help) ? help.name : '';
      help = this.canbankIF.canSurface.find(i => i.id === display?.surface);
      this.canbankRC.canFormSurface = (help) ? help.name : '';
      help = this.canbankIF.canColor.find(i => i.id === display?.cover_color);
      this.canbankRC.canFormCoverColor = (help) ? help.name : '';
      help = this.canbankIF.canColor.find(i => i.id === display?.opener_color);
      this.canbankRC.canFormOpenerColor = (help) ? help.name : '';
      this.canbankRC.canFormBrand = display.brand;
      this.canbankRC.canFormContentName = display.content_name;
      help = this.canbankIF.canContentType.find(i => i.id === display?.content_type);
      this.canbankRC.canFormContentType = (help) ? help.name : '';
      this.canbankRC.canFormAlcohol = display.alcohol.toString();
      this.canbankRC.canFormKeywords = display.keywords;
      this.canbankRC.canFormProdDate = display.prod_date;
      this.canbankRC.canFormExpDate = display.exp_date;
      help = this.canbankIF.canCountry.find(i => i.id === display?.prod_country);
      this.canbankRC.canFormProdCountry = (help) ? help.name : '';
      help = this.canbankIF.canCountry.find(i => i.id === display?.shop_country);
      this.canbankRC.canFormShopCountry = (help) ? help.name : '';
      help = this.canbankIF.canLanguage.find(i => i.id === display?.language)
      this.canbankRC.canFormLanguage = (help) ? help.name : '';
      this.canbankRC.canFormEan = display.ean;
      this.canbankRC.canFormFname1 = display.fname1;
      this.canbankRC.canFormFname2 = display.fname2;
      this.canbankRC.canFormFname3 = display.fname3;
      this.canbankRC.canFormFname4 = display.fname4;
      this.canbankRC.canFormFname5 = display.fname5;
      this.canbankRC.canFormNotes = display.notes;

      this.router.navigate(['/display']);
    }
  }
}
