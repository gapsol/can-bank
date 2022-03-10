import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXcountryService } from '../../canbank-services-x/canbank-xcountry.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canCountry } from '../../data/can.interface';

interface styledCountry extends canCountry {
  style: string,
  class: string
}

@Component({
  selector: 'canbank-form-country',
  templateUrl: './canbank-form-country.component.html',
  styleUrls: ['../canbank-categories.component.css']
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
    private canbankXCty: CanbankXcountryService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanCountries(),
      error => console.error(error)
    )
  }

  getCanCountries(): void {
    this.canbankXCty.getCountry().subscribe(
      () => {
        this.canCountryRows = [];
        let dftCountry = this.canbankIF.canDefaults['country'];
        this.canbankIF.canCountry.forEach(e => {
          let eStyle = 'background-color:silver;';
          let eClass = (dftCountry === e.abbr) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftCountry !== e.abbr);
          this.canCountryRows.push({
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

  deleteCanCountry(abbr: string) {
    if (confirm('You are about to delete record')) {
      this.canbankXCty.deleteCountry(abbr).subscribe(
        () => this.getCanCountries(),
        error => console.error(error)
      )
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
      this.canbankXCty.setCountry(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanCountries(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanCountry(abbr: string): void {
    let country = this.canbankIF.canCountry.find(e => e.abbr === abbr);
    if (country === undefined || country.default === true) { return }
    this.canForm.value.canFormAbbr = country.abbr;
    this.canbankXCty.defaultCountry(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanCountries(),
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
