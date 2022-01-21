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

  ngOnInit() {
    console.log('FIND component');
    this.find = '';
  }

  ngModelChange() {
    console.log('ngModelChange')
  }
  getCans(): void {
    console.log('getCans')
  };

  ngOnChanges() {
    console.log(this.find);
  }

  canFind() {
    console.log('canFind')
    this.canList = [];
    if (this.find.length >= 3) {
      this.canbankXC.getBank(0, this.find)
        .subscribe(
          (response: any) => {
            console.log(response);
            response['data'].forEach((element: any) => {
              let item = element;
              item.text = element.brand + ' (' + element.id + ')';
              this.canList.push(item);
              console.log(this.canList[0].id)
            });
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
    /*    let r = Math.random() * 10;
        for (let i = 0; i < r; i++) {
          this.canList.push('' + Math.random());
        }*/
  }

  canDisplay(id: number) {
    let display = this.canList.find(item => item.id == id);
    console.log(display)
    if (display !== undefined) {
      this.canbankRC.canFormType = (display.type) ? this.canbankIF.canType[display.type].name : '';
      this.canbankRC.canFormDiameter = display.diameter.toString();
      this.canbankRC.canFormHeight = display.height.toString();
      this.canbankRC.canFormVolume = display.volume.toString();
      this.canbankRC.canFormVolumeFlOz = display.volumeFlOz.toString();
      this.canbankRC.canFormMaterial = (display.material) ? this.canbankIF.canMaterial[display.material].name : '';
      this.canbankRC.canFormSurface = (display.surface) ? this.canbankIF.canSurface[display.surface].name : '';
      this.canbankRC.canFormCoverColor = (display.cover_color) ? this.canbankIF.canColor[display.cover_color].name : '';
      this.canbankRC.canFormOpenerColor = (display.opener_color) ? this.canbankIF.canColor[display.opener_color].name : '';
      this.canbankRC.canFormBrand = display.brand;
      this.canbankRC.canFormContentName = display.content_name;
      this.canbankRC.canFormContentType = (display.content_type) ? this.canbankIF.canContentType[display.content_type].name : '';
      this.canbankRC.canFormAlcohol = display.alcohol.toString();
      this.canbankRC.canFormKeywords = display.keywords;
      this.canbankRC.canFormProdDate = display.prod_date;
      this.canbankRC.canFormExpDate = display.exp_date;
      this.canbankRC.canFormProdCountry = (display.prod_country) ? this.canbankIF.canCountry[display.prod_country].name : '';
      this.canbankRC.canFormShopCountry = (display.shop_country) ? this.canbankIF.canCountry[display.shop_country].name : '';
      this.canbankRC.canFormLanguage = (display.language) ? this.canbankIF.canLanguage[display.language].name : '';
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
