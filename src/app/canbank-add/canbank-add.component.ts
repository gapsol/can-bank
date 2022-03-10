/*
 * CanBank ADD
 *  form for adding new can to the database
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXbankService } from '../canbank-services-x/canbank-xbank.service';
import { CanbankXchangeService } from '../canbank-services-x/canbank-xchange.service';
import { CanbankRecordService } from '../canbank-services/canbank-record.service';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';
import {
  canColor,
  canContentType,
  canCountry,
  canLanguage,
  canMaterial,
  canSurface,
  canType,
  canDefaults
} from '../data/can.interface';

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
  // TODO: vvv
  canCountry: Array<canCountry> = [];
  prodCountryIconContent: string = '';
  shopCountryIconContent: string = '';
  canLanguage: Array<canLanguage> = [];
  languageIconContent: string = '';
  // TODO: ^^^
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
    // TODO: remove BRAND INPUT
    canFormBrand: new FormControl('BRAND INPUT', Validators.required),
    canFormContentName: new FormControl(''),
    canFormContentType: new FormControl(0, Validators.required),
    canFormAlcohol: new FormControl(0, Validators.required),
    canFormKeywords: new FormControl(''),
    canFormProdDate: new FormControl(''),
    canFormExpDate: new FormControl(''),
    canFormProdCountry: new FormControl(config.country, Validators.required),
    canFormShopCountry: new FormControl(config.country, Validators.required),
    canFormLanguage: new FormControl(config.language, Validators.required),
    // TODO: remove 3141592653
    canFormEan: new FormControl('3141592653', Validators.required),
    canFormNotes: new FormControl(''),
    canFormFname1: new FormControl(''),
    canFormFname2: new FormControl(''),
    canFormFname3: new FormControl(''),
    canFormFname4: new FormControl(''),
    canFormFname5: new FormControl(''),
  });
  fileList: File[] = [];
  progress: number[] = [0, 0, 0, 0, 0, 0];

  constructor(
    private router: Router,
    private canbankXB: CanbankXbankService,
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
          canFormCoverColor: this.canColor.find(item => item.id === this.canbankIF.canDefaults.color)!.id,
          canFormOpenerColor: this.canColor.find(item => item.id === this.canbankIF.canDefaults.color)!.id,
          canFormContentType: this.canContentType.find(item => item.id === this.canbankIF.canDefaults.content)!.id,
          // countries & languages read from settings and/or from geolocation what about ^^^ default settings
          canFormProdCountry: this.canCountry.find(item => item.abbr === this.canbankIF.canDefaults.country)!.abbr,
          canFormShopCountry: this.canCountry.find(item => item.abbr === this.canbankIF.canDefaults.country)!.abbr,
          canFormLanguage: this.canLanguage.find(item => item.abbr === this.canbankIF.canDefaults.language)!.abbr,
          canFormMaterial: this.canMaterial.find(item => item.id === this.canbankIF.canDefaults.material)!.id,
          canFormSurface: this.canSurface.find(item => item.id === this.canbankIF.canDefaults.surface)!.id,
          canFormType: this.canType.find(item => item.id === this.canbankIF.canDefaults.type)!.id
        });
        // this.geoLocation();
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

  fileCatch(event: any, index: number) {
    console.log('fileCatch event', index)
    let file = event.target.files.item(0);
    if ((file.size / 1048576) <= config.maxUploadSize) {
      console.log('f:info: ', file.name, file.size, file.type);
      this.fileList[index] = event.target.files.item(0);
      /*let info = { id: 2, name: 'raja' }
      formData.append('file', file, file.name);
      formData.append('id', '2');
      formData.append('tz', new Date().toISOString())
      formData.append('update', '2')
      formData.append('info', JSON.stringify(info))*/
      //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
    } else {
      // TODO: Error message
      console.error('file size', file.size, '> maximum');
      switch (index) {
        case 1:
          this.canForm.value.canFormFname1 = '';
          break;
        case 2:
          this.canForm.value.canFormFname2 = '';
          break;
        case 3:
          this.canForm.value.canFormFname3 = '';
          break;
        case 4:
          this.canForm.value.canFormFname4 = '';
          break;
        case 5:
          this.canForm.value.canFormFname5 = '';
          break;
      }
    }
  }

  addCan() {
    console.log('addCan')
    this.canbankXB.setBank(this.canForm.value).subscribe({
      next(response) { console.log(response); },
      error(error) { console.error(error); },
      complete() { console.log('completed'); }
    })
    /*this.uploadAdded.subscribe({
      next() { },
      error(error) { },
      complete() { }
    });*/
  }

  uploadAdded = new Observable(subscriber => {
    const formData = new FormData();
    this.fileList.forEach((file, index) => {
      formData.append('file' + index, file, file.name);
      subscriber.next(
        this.canbankXB.uploadBank(formData).subscribe(
          response => {
            console.log(response);
            this.progress[index] = response.progress;
            return response;
          },
          error => { console.log(error); return error; }
        )
      )
    })
    subscriber.complete();
  })

  displayAdded() {
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
    /*help = this.canCountry.find(i => i.id === this.canForm.value.canFormProdCountry);
    this.canbankRC.canFormProdCountry = help.name;
    help = this.canCountry.find(i => i.id === this.canForm.value.canFormShopCountry);
    this.canbankRC.canFormShopCountry = help.name;
    help = this.canLanguage.find(i => i.id === this.canForm.value.canFormLanguage);
    this.canbankRC.canFormLanguage = help.name;*/
    this.canbankRC.canFormEan = this.canForm.value.canFormEan;
    this.canbankRC.canFormFname1 = this.canForm.value.canFormFname1;
    this.canbankRC.canFormFname2 = this.canForm.value.canFormFname2;
    this.canbankRC.canFormFname3 = this.canForm.value.canFormFname3;
    this.canbankRC.canFormFname4 = this.canForm.value.canFormFname4;
    this.canbankRC.canFormFname5 = this.canForm.value.canFormFname5;
    this.canbankRC.canFormNotes = this.canForm.value.canFormNotes;
    this.router.navigate(['/display']);
  }
  /***onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
    }
  }
  */
  /*uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file.data /*, filename*///); // Blob
  /*
  formData.append('userpic', myFileInput.files[0], 'chris.jpg');
  formData.append('userpic[]', myFileInput.files[0], 'chris1.jpg');
  formData.append('userpic[]', myFileInput.files[1], 'chris2.jpg');
  /
  file.inProgress = true;
  this.canbankXC.upload(formData).subscribe(
    (event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    }
  );
  }

  private uploadFiles() {
  this.fileUpload.nativeElement.value = '';
  this.files.forEach(file => {
    this.uploadFile(file);
  });
  }

  onClick() {
  const fileUpload = this.fileUpload.nativeElement;
  fileUpload.onchange = () => {
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      this.files.push({ data: file, inProgress: false, progress: 0 });
    }
    this.uploadFiles();
  };
  fileUpload.click();
  }*/

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
      })
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
    let canObj = this.canColor.find(cancol => cancol.id === this.canForm.value.canFormCoverColor);
    if (canObj !== undefined) {
      this.coverIconColor = 'background-color:' + canObj.color;
    }
  }

  updateOpener() {
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

  // TODO: create alternative to Google geolocation API
  // some grid approximation
  // list ordering by GPS grid
  geoLocation() {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      success => console.log(success),
      error => console.error(error)
    );
  }

  // country codes are uppercase
  updateProdCountry() {
    let flagObj = this.canCountry.find(item => item.abbr === this.canForm.value.canFormProdCountry);
    if (flagObj !== undefined) {
      flagObj.abbr = flagObj.abbr;
      this.prodCountryIconContent = `url(./assets/flags/${flagObj.abbr.toLowerCase()}.svg)`;
    } else {
      this.prodCountryIconContent = '';
    }
  }

  updateShopCountry() {
    let flagObj = this.canCountry.find(item => item.abbr === this.canForm.value.canFormShopCountry);
    if (flagObj !== undefined) {
      flagObj.abbr = flagObj.abbr;
      this.shopCountryIconContent = `url(./assets/flags/${flagObj.abbr.toLowerCase()}.svg)`;
    } else {
      this.shopCountryIconContent = '';
    }
  }

  newCountry() {
    // TODO: add from global list
  }

  // language codes are lowercase
  updateLanguage() {
    let flagObj = this.canLanguage.find(item => item.abbr === this.canForm.value.canFormLanguage);
    if (flagObj !== undefined) {
      flagObj.abbr = flagObj.abbr;
      this.languageIconContent = `url(/assets/flags/${flagObj.abbr}.svg)`;
    } else {
      this.languageIconContent = '';
    }
  }

  newLanguage() {
    // TODO: add from global list
  }

  // TODO: display EAN image
  // TODO: look for existing barcodes during inserting EAN code
  displayEan() {
  }

}
