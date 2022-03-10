import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXlanguageService } from '../../canbank-services-x/canbank-xlanguage.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canLanguage } from '../../data/can.interface';

interface styledLanguage extends canLanguage {
  style: string,
  class: string,
}

@Component({
  selector: 'canbank-form-language',
  templateUrl: './canbank-form-language.component.html',
  styleUrls: ['../canbank-categories.component.css']
})
export class CanbankFormLanguageComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormAbbr: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canLanguageRows: styledLanguage[] = [];
  openClass: string = '';

  constructor(
    private canbankXLng: CanbankXlanguageService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanLanguages(),
      error => console.error(error)
    )
  }

  getCanLanguages(): void {
    this.canbankXLng.getLanguage().subscribe(
      () => {
        this.canLanguageRows = [];
        let dftLang = this.canbankIF.canDefaults['language'];
        this.canbankIF.canLanguage.forEach(e => {
          let eStyle = 'background-color:silver;';
          let eClass = (dftLang === e.abbr) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftLang !== e.abbr)
          this.canLanguageRows.push({
            abbr: e.abbr,
            name: e.name,
            default: eDefault,
            removable: eRemove,
            style: eStyle,
            class: eClass
          })
        })
        window.scroll(0, 0);
      },
      error => console.error(error)
    )
  }

  deleteCanLanguage(abbr: string) {
    if (confirm('You are about to delete record')) {
      this.canbankXLng.deleteLanguage(abbr).subscribe(
        () => this.getCanLanguages(),
        error => console.error(error)
      )
    }
  }

  checkCanLanguage(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, language)
    return true;
  }

  submitCanLanguage(): void {
    // TODO:
    // language valid only when so far not exists
    // language valid only when it fits htmllanguages array
    // load ISO langs tab
    if (this.checkCanLanguage()) {
      this.canbankXLng.setLanguage(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanLanguages(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanLanguage(abbr: string): void {
    let language = this.canbankIF.canLanguage.find(e => e.abbr === abbr);
    if (language === undefined || language.default === true) { return }
    this.canForm.value.canFormAbbr = language.abbr;
    this.canbankXLng.defaultLanguage(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanLanguages(),
          error => console.error(error)
        )
      },
      error => console.error(error)
    )
  }

  openForm() {
    this.openClass = 'btn-open';
    setTimeout(() => {
      let element = document.getElementById('openBtn');
      if (element) { element.scrollIntoView(true) }
    })
  }

}
