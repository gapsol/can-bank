import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXsService } from '../canbank-services/canbank-xs.service';

@Component({
  selector: 'canbank-fill',
  template: `
    <div class="can-fill-h1" (click)="canbankPreFill()">{{ fillBtn }}</div>
  `,
  styleUrls: ['./canbank-fill.component.css']
})
export class CanbankFillComponent implements OnInit {
  i18n = i18n[config.language];
  fillBtn: string = this.i18n.msg_fill;

  constructor(private canbankXS: CanbankXsService) { }

  ngOnInit(): void {
    console.log('FILL component')
  }

  canbankPreFill() {
    console.log('preFILL')
    this.fillBtn = '?';
    this.canbankXS.preFillDB().subscribe(
      () => { this.afterTheEvent(); },
      (error: any) => { console.error(error); }
    );
  }

  afterTheEvent() {
    setTimeout(() => { window.location.reload(); }, config.tOut);
  }
}
