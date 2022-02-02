import { Component, OnInit } from '@angular/core';

import { CanbankCategoriesComponent } from '../canbank-categories.component';

@Component({
  selector: 'canbank-form-content',
  templateUrl: './canbank-form-content.component.html',
  styleUrls: ['./canbank-form-content.component.css']
})
export class CanbankFormContentComponent implements OnInit {
  show: boolean = false;

  constructor(/*private categFF: CanbankCategoriesComponent*/) { }

  ngOnInit() {
  }

  toggleMe() {
   // this.categFF.toggleMe(1, this.show);
  }
}
