import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canLanguage } from '../../data/can-language';

interface styledLanguage extends canLanguage {
  style: string,
  class: string
}

@Component({
  selector: 'canbank-form-language',
  templateUrl: './canbank-form-language.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-language.component.css']
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
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanLanguages();
  }

  getCanLanguages(): void {
    this.canbankXC.getLanguage(0).subscribe(
      () => {
        this.canLanguageRows = [];
        this.canbankIF.canLanguage.forEach((e) => {
          let eStyle = 'background-color:silver;';
          let eClass = (e.default) ? 'btn-default' : '';
          this.canLanguageRows.push({
            id: e.id,
            name: e.name,
            abbr: e.abbr,
            default: e.default,
            style: eStyle,
            class: eClass
          });
        });
        window.scroll(0, 0);
      },
      (error: any) => { console.error(error); }
    );
  }

  deleteCanLanguage(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteLanguage(id).subscribe(
        () => { this.getCanLanguages(); },
        (error: any) => { console.error(error); }
      );
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
      this.canbankXC.setLanguage(this.canForm.value).subscribe(
        () => { this.getCanLanguages(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanLanguage(id: number): void {
    let language = this.canbankIF.canLanguage.find(e => e.id === id);
    if (language === undefined || language.default === true) { return }
    this.canForm.value.canFormId = language.id;
    this.canForm.value.canFormName = language.name;
    this.canForm.value.canFormAbbr = language.abbr;
    this.canForm.value.canFormDefault = 1;
    this.canbankXC.updateLanguage(this.canForm.value).subscribe(
      () => { this.getCanLanguages(); },
      (error: any) => { console.error(error); }
    );
  }

  openForm() {
    this.openClass = 'btn-open';
    setTimeout(() => {
      let element = document.getElementById('openBtn');
      if (element) {
        element.scrollIntoView(true);
      }
    });
  }

}
