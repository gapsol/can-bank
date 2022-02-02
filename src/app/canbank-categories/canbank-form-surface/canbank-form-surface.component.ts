import { Component, OnInit } from '@angular/core';

import { CanbankCategoriesComponent } from '../canbank-categories.component';

@Component({
  selector: 'canbank-form-surface',
  templateUrl: './canbank-form-surface.component.html',
  styleUrls: ['./canbank-form-surface.component.css']
})
export class CanbankFormSurfaceComponent implements OnInit {
  show: boolean = false;

  constructor(/*private categFF: CanbankCategoriesComponent*/) { }

  ngOnInit() {
  }

  toggleMe() {
   // this.categFF.toggleMe(3, this.show);
  }
}
