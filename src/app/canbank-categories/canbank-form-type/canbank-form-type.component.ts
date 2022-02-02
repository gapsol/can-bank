import { Component, OnInit } from '@angular/core';

import { CanbankCategoriesComponent } from '../canbank-categories.component';

@Component({
  selector: 'canbank-form-type',
  templateUrl: './canbank-form-type.component.html',
  styleUrls: ['./canbank-form-type.component.css']
})
export class CanbankFormTypeComponent implements OnInit {
  show: boolean = false;

  constructor(/*private categFF: CanbankCategoriesComponent*/) { }

  ngOnInit() {
  }

  toggleMe() {
  //  this.categFF.toggleMe(0, this.show);
  }
}
