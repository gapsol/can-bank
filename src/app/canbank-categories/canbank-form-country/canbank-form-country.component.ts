import { Component, OnInit } from '@angular/core';

import { CanbankCategoriesComponent } from '../canbank-categories.component';

@Component({
  selector: 'canbank-form-country',
  templateUrl: './canbank-form-country.component.html',
  styleUrls: ['./canbank-form-country.component.css']
})
export class CanbankFormCountryComponent implements OnInit {
  show: boolean = false;

  constructor(/*private categFF: CanbankCategoriesComponent*/) { }

  ngOnInit() {
  }

  /*toggleMe() {
    this.categFF.toggleMe(5, this.show);
  }*/
}
