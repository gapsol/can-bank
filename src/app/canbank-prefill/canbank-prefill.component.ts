import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';

@Component({
  selector: 'canbank-prefill',
  template: `
    <div *ngIf="prefillMe" class="can-prefill-h1" (click)="canbankPrefill()">{{ prefillBtn }}</div>
  `,
  styleUrls: ['./canbank-prefill.component.css']
})
export class CanbankPrefillComponent implements OnInit {
  i18n = i18n[config.language];
  prefillMe: boolean = false;
  prefillBtn: string = this.i18n.msg_prefill;

  constructor(private canbankXC: CanbankXchangeService) { }

  ngOnInit(): void {
    /*if (that.getLevelMeterEmpty().length > 0) {
      that.prefillMe = true;
    } else {
      setTimeout(() => { that.router.navigate(['home']) }, config.tOut);
    }*/
  }

  canbankPrefill() {
    console.log('preFILL')
    this.prefillBtn = '?';
    this.canbankXC.prefillDB().subscribe(
      () => { this.afterTheEvent(); },
      (error: any) => { console.error(error); }
    );
  }

  afterTheEvent() {
    setTimeout(() => { window.location.reload(); }, config.tOut);
  }
}
