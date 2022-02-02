import { Component, OnInit } from '@angular/core';

import { CanbankCategoriesComponent } from '../canbank-categories.component';

@Component({
  selector: 'canbank-form-language',
  templateUrl: './canbank-form-language.component.html',
  styleUrls: ['./canbank-form-language.component.css']
})
export class CanbankFormLanguageComponent implements OnInit {
  show: boolean = false;

  constructor(/*private categFF: CanbankCategoriesComponent*/) { }

  ngOnInit() {
  }

  toggleMe() {
  //  this.categFF.toggleMe(6, this.show);
  }
}
