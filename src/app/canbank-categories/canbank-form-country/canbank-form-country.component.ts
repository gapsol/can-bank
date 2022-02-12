import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canCountry } from '../../data/can-country';

interface styledCountry extends canCountry {
  style: string,
  class: string
}

@Component({
  selector: 'canbank-form-country',
  templateUrl: './canbank-form-country.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-country.component.css']
})
export class CanbankFormCountryComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormAbbr: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canCountryRows: styledCountry[] = [];
  openClass: string = '';

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanCountries();
  }

  getCanCountries(): void {
    this.canbankXC.getCountry(0).subscribe(
      () => {
        this.canCountryRows = [];
        this.canbankIF.canCountry.forEach((e) => {
          let eStyle = 'background-color:silver;';
          let eClass = (e.default) ? 'btn-default' : '';
          this.canCountryRows.push({
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

  deleteCanCountry(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteCountry(id).subscribe(
        () => { this.getCanCountries(); },
        (error: any) => { console.error(error); }
      );
    }
  }

  checkCanCountry(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, country)
    return true;
  }

  submitCanCountry(): void {
    // TODO:
    // country valid only when so far not exists
    // country valid only when it fits htmlcountrys array
    if (this.checkCanCountry()) {
      this.canbankXC.setCountry(this.canForm.value).subscribe(
        () => { this.getCanCountries(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanCountry(id: number): void {
    let country = this.canbankIF.canCountry.find(e => e.id === id);
    if (country === undefined || country.default === true) { return }
    this.canForm.value.canFormId = country.id;
    this.canForm.value.canFormName = country.name;
    this.canForm.value.canFormAbbr = country.abbr;
    this.canForm.value.canFormDefault = 1;
    this.canbankXC.updateCountry(this.canForm.value).subscribe(
      () => { this.getCanCountries(); },
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
