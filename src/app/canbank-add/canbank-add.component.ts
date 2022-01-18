import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';
import { CanbankRecordService } from '../canbank-services/canbank-record.service';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';

@Component({
  selector: 'canbank-add',
  templateUrl: './canbank-add.component.html',
  styleUrls: ['./canbank-add.component.css']
})
export class CanbankAddComponent implements OnInit {
  i18n = i18n[config.language];

  menuBtnAdd: string = '';
  canColor = this.canbankIF.canColor;
  coverIconColor: string = ''; // read from default?
  openerIconColor: string = ''; // read from default?

  canContentType = this.canbankIF.canContentType;

  canCountry = this.canbankIF.canCountry;
  countryIconContent: string = '';

  canLanguage = this.canbankIF.canLanguage;
  languageIconContent: string = '';

  canMaterial = this.canbankIF.canMaterial;
  materialIconColor: string = '';
  materialIconContent: string = '';

  canSurface = this.canbankIF.canSurface;
  surfaceIconColor: string = '';

  canType = this.canbankIF.canType;
  typeIconContent: string = '';

  canFormValid: boolean = false;

  canReqDiameter: boolean = false;
  canReqHeight: boolean = false;
  canReqVolume: boolean = false;
  canReqVolumeFlOz: boolean = false;

  canForm = new FormGroup({
    canFormType: new FormControl(
      this.canType.find(cantyp => cantyp.default)?.id,
      Validators.required
    ),
    canFormTypeDetails: new FormGroup({
      canFormDiameter: new FormControl(''),
      canFormHeight: new FormControl(''),
      canFormVolume: new FormControl(''),
      canFormVolumeFlOz: new FormControl(''),
    }),
    canFormMaterial: new FormControl(
      this.canMaterial.find(canmat => canmat.default)?.id,
      Validators.required
    ),
    canFormSurface: new FormControl(
      this.canSurface.find(cansur => cansur.default)?.id,
      Validators.required
    ),
    canFormCoverColor: new FormControl(
      this.canColor.find(cancol => cancol.default)?.id,
      Validators.required
    ),
    canFormOpenerColor: new FormControl(
      this.canColor.find(cancol => cancol.default)?.id,
      Validators.required
    ),
    canFormBrand: new FormControl('',
      Validators.required),
    canFormContentName: new FormControl(''),
    canFormContentType: new FormControl(
      this.canbankIF.canContentType.find(canctp => canctp.default)?.id,
      Validators.required
    ),
    canFormAlcohol: new FormControl(0,
      Validators.required),
    canFormKeywords: new FormControl(''),
    canFormProdDate: new FormControl(''),
    canFormExpDate: new FormControl(''),
    canFormProdCountry: new FormControl(
      this.canbankIF.canCountry.find(canctr => canctr.default)?.id,
      Validators.required
    ),
    canFormShopCountry: new FormControl(
      this.canbankIF.canCountry.find(canctr => canctr.default)?.id,
      Validators.required
    ),
    canFormLanguage: new FormControl(
      this.canbankIF.canLanguage.find(canlang => canlang.default)?.id,
      Validators.required
    ),
    canFormEan: new FormControl('',
      Validators.required),
    canFormFname1: new FormControl(''),
    canFormFname2: new FormControl(''),
    canFormFname3: new FormControl(''),
    canFormFname4: new FormControl(''),
    canFormFname5: new FormControl(''),
    canFormNotes: new FormControl('')
  });

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankRC: CanbankRecordService,
    private canbankIF: CanbankInterfaceService
    ) { }

  ngOnInit() {
    this.menuBtnAdd = 'menu-btn-active';

    /* use for basic sets from local file
          this.sortColor();
          this.sortContentType();
          this.sortCountry();
          this.sortLanguage();
          this.sortType();
    */
    this.canbankXC.checkLists();
    this.updateType();
    this.updateMaterial();
    this.updateSurface();
    this.updateCover();
    this.updateOpener();
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
    let canObj = this.canType.find(cantyp => cantyp.id == this.canForm.value.canFormType);
    // console.log(canObj)
    if (canObj !== undefined) {
      this.typeIconContent = this.reduceVolume(canObj.volume / 1000);
      if (this.typeIconContent[0] == '0') {
        this.typeIconContent = this.typeIconContent.slice(1);
      }
      if (canObj.volumeFlOz == 0) {
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
    let canObj = this.canMaterial.find(canmat => canmat.id == this.canForm.value.canFormMaterial);
    this.materialIconColor = (canObj !== undefined) ? 'input-icon-' + canObj.color : 'input-icon-transparent';
    this.materialIconContent = (canObj !== undefined) ? canObj.abbr : '?';
  }

  newMaterial() {
    // TODO: po pridani refreshnut zoznam
  }

  updateSurface() {
    let canObj = this.canSurface.find(cansfc => cansfc.id == this.canForm.value.canFormSurface);
    this.surfaceIconColor = (canObj !== undefined) ? 'input-icon-' + canObj.color : 'input-icon-transparent';
  }

  newSurface() {
    // TODO: po pridani refreshnut zoznam
  }

  updateCover() {
    // TODO: zmenit tvar ikonky
    let canObj = this.canColor.find(cancol => cancol.id == this.canForm.value.canFormCoverColor);
    this.coverIconColor = (canObj !== undefined) ? 'input-icon-' + canObj.color : 'input-icon-transparent';
  }

  updateOpener() {
    // TODO: zmenit tvar ikonky
    let canObj = this.canColor.find(cancol => cancol.id == this.canForm.value.canFormOpenerColor);
    this.openerIconColor = (canObj !== undefined) ? 'input-icon-' + canObj.color : 'input-icon-transparent';
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

  // TODO: katalog krajin, ikona vlajky SVG
  newCountry() {
    // TODO: refresh zoznamu
  }

  updateProdCountry() {
  }

  updateShopCountry() {
  }

  // TODO: katalog jazykov, ikona vlajky SVG
  newLanguage() {
    // TODO: refresh zoznamu
  }

  updateLanguage() {
  }

  // TODO: zobrazit Ean graficky
  // TODO: hladat existujuce barkody podla zadavaneho textu
  updateEan() {
  }

  /*errHand(e: HttpErrorResponse) {
    console.error('Prosto error: ' + e);
    return throwError('Error');
  }*/
  canAdd() {
    // TODO: desatinne bodky a cisla zjednotit/prijat
    // TODO: zapis lokal/server
    // TODO: sync lokal-server
    /*console.warn('ADD submitted!');
    console.log(this.canForm.value);


    console.warn('POST');
    console.log(
      this.http.post<any>('https://www.gapsolutions.sk/api-can-bank/post.php', {
        'objectpost':'post',
      }, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      })
      .subscribe(data => {
        this.postId = data.id;
        console.log(this.postId);
    })
      //.pipe(catchError(this.errHand))
    );*/
    //let result: Observable<object> = this.config.getGapSol();
    //console.log(result);
    /* console.warn('ADD GET');
    console.log(this.http.get('https://www.gapsolutions.sk/api-can-bank/get.php', {observe: 'body', responseType: 'json'}));
    console.warn('GET RQ observed!');
    let obser = of(this.http.get('https://www.gapsolutions.sk/api-can-bank/request.php', {observe: 'body', responseType: 'json'}));
    obser.subscribe(
      x => console.log(x),
      err => console.error(err),
      () => console.warn('completed')
    );*/
    // console.log(obser);
  }

  addCan(/*f: NgForm*/) {
    console.log('fn addCan activated')
    this.canbankXC.setBank(this.canForm.value).subscribe(
      (data: any) => {
        console.log('add can data')
        console.log(data)
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormDiameter = this.canForm.value.canFormDiameter;
        /*this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;
        this.canbankRC.canFormType = this.canForm.value.canFormType;*/
//        window.location.pathname = '/display';
      },
      (err: any) => {
        console.log('add can error')
        console.error(err)
      }
    );
    //    this.resetAlerts();

    /*this.canbankFindService.store(this.can).subscribe(
      (res) => {
        // Update the list of cars
        this.cans.push(res)

        // Inform the user
        this.success = 'Created successfully';
        console.log('Created successfully');
        console.log(this.cans)

        // Reset the form f.reset();
      },
      (err) => {
        this.error = err.message;
        console.error(err);
      }
    );*/
  }

}
