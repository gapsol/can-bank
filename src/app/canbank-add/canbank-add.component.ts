/*
 * CanBank ADD
 *  form for adding new can to the database
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';
import { CanbankRecordService } from '../canbank-services/canbank-record.service';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';
import { canColor } from '../data/can-color';
import { canContentType } from '../data/can-content';
import { canCountry } from '../data/can-country';
import { canLanguage } from '../data/can-language';
import { canMaterial } from '../data/can-material';
import { canSurface } from '../data/can-surface';
import { canType } from '../data/can-type';

@Component({
  selector: 'canbank-add',
  templateUrl: './canbank-add.component.html',
  styleUrls: ['./canbank-add.component.css']
})
export class CanbankAddComponent implements OnInit {
  i18n = i18n[config.language];

  menuBtnAdd: string = '';
  canColor: Array<canColor> = [];
  coverIconColor: string = '';
  openerIconColor: string = '';

  canContentType: Array<canContentType> = [];

  canCountry: Array<canCountry> = [];
  countryIconContent: string = '';

  canLanguage: Array<canLanguage> = [];
  languageIconContent: string = '';

  canMaterial: Array<canMaterial> = [];
  materialIconColor: string = '';
  materialIconContent: string = '';

  canSurface: Array<canSurface> = [];
  surfaceIconColor: string = '';

  canType: Array<canType> = [];
  typeIconContent: string = '';

  canFormValid: boolean = false;

  canForm = new FormGroup({
    canFormType: new FormControl(0, Validators.required),
    canFormTypeDetails: new FormGroup({
      canFormDiameter: new FormControl(0),
      canFormHeight: new FormControl(0),
      canFormVolume: new FormControl(0),
      canFormVolumeFlOz: new FormControl(0),
    }),
    canFormMaterial: new FormControl(0, Validators.required),
    canFormSurface: new FormControl(0, Validators.required),
    canFormCoverColor: new FormControl(0, Validators.required),
    canFormOpenerColor: new FormControl(0, Validators.required),
    canFormBrand: new FormControl('', Validators.required),
    canFormContentName: new FormControl(''),
    canFormContentType: new FormControl(0, Validators.required),
    canFormAlcohol: new FormControl(0, Validators.required),
    canFormKeywords: new FormControl(''),
    canFormProdDate: new FormControl(''),
    canFormExpDate: new FormControl(''),
    canFormProdCountry: new FormControl(0, Validators.required),
    canFormShopCountry: new FormControl(0, Validators.required),
    canFormLanguage: new FormControl(0, Validators.required),
    canFormEan: new FormControl('', Validators.required),
    canFormFname1: new FormControl(''),
    canFormFname2: new FormControl(''),
    canFormFname3: new FormControl(''),
    canFormFname4: new FormControl(''),
    canFormFname5: new FormControl(''),
    canFormNotes: new FormControl('')
  });

  constructor(
    private router: Router,
    private canbankXC: CanbankXchangeService,
    private canbankRC: CanbankRecordService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.menuBtnAdd = 'menu-btn-active';
    this.canbankXC.checkLists()
      .then(() => {
        this.canColor = this.canbankIF.canColor;
        this.canContentType = this.canbankIF.canContentType;
        this.canCountry = this.canbankIF.canCountry;
        this.canLanguage = this.canbankIF.canLanguage;
        this.canMaterial = this.canbankIF.canMaterial;
        this.canSurface = this.canbankIF.canSurface;
        this.canType = this.canbankIF.canType;
        this.canForm.patchValue({
          canFormCoverColor: this.canColor.find(can => can.default)?.id,
          canFormOpenerColor: this.canColor.find(can => can.default)?.id,
          canFormContentType: this.canContentType.find(can => can.default)?.id,
          canFormProdCountry: this.canCountry.find(can => can.default)?.id,
          canFormShopCountry: this.canCountry.find(can => can.default)?.id,
          canFormLanguage: this.canLanguage.find(can => can.default)?.id,
          canFormMaterial: this.canMaterial.find(can => can.default)?.id,
          canFormSurface: this.canSurface.find(can => can.default)?.id,
          canFormType: this.canType.find(can => can.default)?.id
        });
        this.updateCover();
        this.updateOpener();
        this.updateContentType();
        this.updateProdCountry();
        this.updateShopCountry();
        this.updateLanguage();
        this.updateMaterial();
        this.updateSurface();
        this.updateType();
      });
  }

  /*
    sortColor() {
      this.canColor.sort((a, b) => { return (a.name > b.name) ? 1 : -1; });
    }
    sortContentType() {
      this.canContentType.sort((a, b) => { return (a.name > b.name) ? 1 : -1; });
    }
    sortCountry() {
      this.canCountry.sort((a, b) => { return (a.name > b.name) ? 1 : -1; });
    }
    sortLanguage() {
      this.canLanguage.sort((a, b) => { return (a.name > b.name) ? 1 : -1; });
    }
    sortType() {
      this.canType.sort((a, b) => { return (a.volume < b.volume) ? 1 : -1; });
    }
  */
  updateType() {
    let canFormVolumeFlOz: string;
    /*if (this.canType.length === 0) {
      this.canType = this.canbankXC.canType;
      console.log(this.canType)
      this.canForm.value.canFormType = this.canType.find(cantyp => cantyp.default)?.id;
      console.log(this.canForm.value)
    }*/
    let canObj = this.canType.find(cantyp => cantyp.id === this.canForm.value.canFormType);
    // console.log(canObj)
    if (canObj !== undefined) {
      this.typeIconContent = this.reduceVolume(canObj.volume / 1000);
      if (this.typeIconContent[0] === '0') {
        this.typeIconContent = this.typeIconContent.slice(1);
      }
      if (canObj.volumeFlOz === 0) {
        // let volumeFlOz_IM = canObj.volume / 28.4130742;
        let volumeFlOz_US = canObj.volume / 29.5735296;
        canFormVolumeFlOz = volumeFlOz_US.toFixed(3);
      } else {
        canFormVolumeFlOz = canObj.volumeFlOz.toString();
      }
      this.canForm.patchValue({
        canFormTypeDetails: {
          canFormDiameter: canObj.diameter,
          canFormHeight: canObj.height,
          canFormVolume: canObj.volume,
          canFormVolumeFlOz: canFormVolumeFlOz
        }
      });
    } else {
      this.typeIconContent = '+';
      this.canForm.patchValue({
        canFormTypeDetails: {
          canFormDiameter: '',
          canFormHeight: '',
          canFormVolume: '',
          canFormVolumeFlOz: ''
        }
      })
    }
  }

  reduceVolume(volume: number): string {
    if (volume >= 1) {
      if (Math.floor(volume) !== volume) {
        return volume.toFixed(1);
      } else {
        return volume.toFixed(0) + 'l';
      }
    } else {
      if (Math.floor(volume * 10) === volume * 10) {
        return volume.toFixed(1) + 'l';
      } else {
        return volume.toFixed(2);
      }
    }
  }

  newType() {
    // TODO: otvorit aj podpolozky na vyplnenie
  }

  updateMaterial() {
    let canObj = this.canMaterial.find(canmat => canmat.id === this.canForm.value.canFormMaterial);
    if (canObj !== undefined) {
      this.materialIconColor = 'background-color:' + canObj.color;
      this.materialIconContent = canObj.abbr;
    }
  }

  newMaterial() {
    // TODO: po pridani refreshnut zoznam
  }

  updateSurface() {
    let canObj = this.canSurface.find(cansfc => cansfc.id === this.canForm.value.canFormSurface);
    if (canObj !== undefined) {
      this.surfaceIconColor = 'background-color:' + canObj.color;
    }
  }

  newSurface() {
    // TODO: po pridani refreshnut zoznam
  }

  updateCover() {
    // TODO: zmenit tvar ikonky
    let canObj = this.canColor.find(cancol => cancol.id === this.canForm.value.canFormCoverColor);
    if (canObj !== undefined) {
      this.coverIconColor = 'background-color:' + canObj.color;
    }
  }

  updateOpener() {
    // TODO: zmenit tvar ikonky
    let canObj = this.canColor.find(cancol => cancol.id === this.canForm.value.canFormOpenerColor);
    if (canObj !== undefined) {
      this.openerIconColor = 'background-color:' + canObj.color;
    }
  }

  newColor() {
    // TODO: po pridani farby refreshnut oba zoznamy - Cover i Opener
  }

  updateBrand() {
    // TODO: vyhladavat, ci uz existuje vpisovana znacka -> ?ako zobrazit zoznam?
  }

  updateContentName() {
    // TODO: vyhladavat, ci uz existuje vpisovana znacka -> ?ako zobrazit zoznam?
  }

  updateContentType() {
    // TODO: vyhladavat, ci uz existuje vpisovana znacka -> ?ako zobrazit zoznam?
  }

  newContentType() {
    // TODO: refresh zoznamu
  }

  updateKeywords() {
    // TODO: oddelit jednotlive slova medzerami
    // TODO: filtrovat nechcene znaky
    // TODO: zobrazit slova ako bloky
  }

  updateProdCountry() {
  }

  updateShopCountry() {
  }

  // TODO: katalog krajin, ikona vlajky SVG
  newCountry() {
    // TODO: refresh zoznamu
  }

  updateLanguage() {
  }

  // TODO: katalog jazykov, ikona vlajky SVG
  newLanguage() {
    // TODO: refresh zoznamu
  }

  // TODO: zobrazit Ean graficky
  // TODO: hladat existujuce barkody podla zadavaneho textu
  displayEan() {
  }

  addCan() {
    this.canbankXC.setBank(this.canForm.value).subscribe(
      () => {
        let help: any;
        help = this.canType.find(i => i.id === this.canForm.value.canFormType);
        this.canbankRC.canFormType = help.name;
        this.canbankRC.canFormDiameter = this.canForm.value.canFormTypeDetails.canFormDiameter;
        this.canbankRC.canFormHeight = this.canForm.value.canFormTypeDetails.canFormHeight;
        this.canbankRC.canFormVolume = this.canForm.value.canFormTypeDetails.canFormVolume;
        this.canbankRC.canFormVolumeFlOz = this.canForm.value.canFormTypeDetails.canFormVolumeFlOz;
        help = this.canMaterial.find(i => i.id === this.canForm.value.canFormMaterial);
        this.canbankRC.canFormMaterial = help.name;
        help = this.canSurface.find(i => i.id === this.canForm.value.canFormSurface);
        this.canbankRC.canFormSurface = help.name;
        help = this.canColor.find(i => i.id === this.canForm.value.canFormCoverColor);
        this.canbankRC.canFormCoverColor = help.name;
        help = this.canColor.find(i => i.id === this.canForm.value.canFormOpenerColor);
        this.canbankRC.canFormOpenerColor = help.name;
        this.canbankRC.canFormBrand = this.canForm.value.canFormBrand;
        this.canbankRC.canFormContentName = this.canForm.value.canFormContentName;
        help = this.canContentType.find(i => i.id === this.canForm.value.canFormContentType);
        this.canbankRC.canFormContentType = help.name;
        this.canbankRC.canFormAlcohol = this.canForm.value.canFormAlcohol;
        this.canbankRC.canFormKeywords = this.canForm.value.canFormKeywords;
        this.canbankRC.canFormProdDate = this.canForm.value.canFormProdDate;
        this.canbankRC.canFormExpDate = this.canForm.value.canFormExpDate;
        help = this.canCountry.find(i => i.id === this.canForm.value.canFormProdCountry);
        this.canbankRC.canFormProdCountry = help.name;
        help = this.canCountry.find(i => i.id === this.canForm.value.canFormShopCountry);
        this.canbankRC.canFormShopCountry = help.name;
        help = this.canLanguage.find(i => i.id === this.canForm.value.canFormLanguage);
        this.canbankRC.canFormLanguage = help.name;
        this.canbankRC.canFormEan = this.canForm.value.canFormEan;
        this.canbankRC.canFormFname1 = this.canForm.value.canFormFname1;
        this.canbankRC.canFormFname2 = this.canForm.value.canFormFname2;
        this.canbankRC.canFormFname3 = this.canForm.value.canFormFname3;
        this.canbankRC.canFormFname4 = this.canForm.value.canFormFname4;
        this.canbankRC.canFormFname5 = this.canForm.value.canFormFname5;
        this.canbankRC.canFormNotes = this.canForm.value.canFormNotes;
        this.router.navigate(['/display']);
      },
      (err: any) => {
        console.log('add can error')
        console.error(err)
      }
    );
  }

}
