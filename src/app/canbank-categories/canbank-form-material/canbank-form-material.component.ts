import { Component, OnInit } from '@angular/core';

import { CanbankCategoriesComponent } from '../canbank-categories.component';

@Component({
  selector: 'canbank-form-material',
  templateUrl: './canbank-form-material.component.html',
  styleUrls: ['./canbank-form-material.component.css']
})
export class CanbankFormMaterialComponent implements OnInit {
  show: boolean = false;

  constructor(/*private categFF: CanbankCategoriesComponent*/) { }

  ngOnInit() {
  }

  toggleMe() {
  //  this.categFF.toggleMe(2, this.show);
  }
}
