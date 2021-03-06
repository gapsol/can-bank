import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXchangeService } from '../canbank-services-x/canbank-xchange.service';
import { CanbankMessageService } from '../canbank-services/canbank-message.service';

@Component({
  selector: 'canbank-flash',
  template: `
    <div *ngIf="flashMe">
      <h1 class="title" class="can-flash-plus" [class]="canFlashMinus" (click)="canbankCreate()">+</h1>
      <div class="can-flash-h1" *ngFor="let item of flashMessage">{{ item }}</div>
    </div>
  `,
  styleUrls: ['./canbank-flash.component.css']
})
export class CanbankFlashComponent implements OnInit {
  i18n = i18n[config.language];
  flashMe: boolean = false;
  flashMessage: string[] = [];
  canFlashMinus: string = '';

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankMsg: CanbankMessageService,
  ) { }

  ngOnInit() {
    // TODO: => onChange
    let tInt = setInterval(() => {
      this.flashMe = this.canbankMsg.flashMe;
      this.flashMessage[0] = this.canbankMsg.flashMessage;
      if (this.flashMe) {
        clearInterval(tInt);
      }
    }, 250);
  }

  canbankCreate() {
    this.canFlashMinus = 'can-flash-minus';
    this.flashMessage = [];
    this.flashMessage[0] = i18n.msg_create;

    // TODO: change these dots...
    let tInt = setInterval(() => { this.flashMessage[1] += '. '; }, config.tOut);

    this.canbankXC.createDB().subscribe(
      (response: any) => {
        switch (response['status']) {
          case 'success':
            this.flashMessage[0] = this.i18n.msg_created;
            setTimeout(() => {
              this.canbankMsg.canbankMessage = '';
              window.location.reload();
            }, config.tOut);
            break;
          case 'error':
            this.flashMessage[0] = this.i18n.msg_creation_failed;
            this.flashMessage[1] = response['message'];
            break;
          default:
            this.flashMessage[0] = this.i18n.msg_unknown_status;
        }
      },
      (error: any) => {
        this.flashMessage[0] = this.i18n.msg_creation_failed;
        this.flashMessage[1] = this.canbankMsg.canbankMessage;
        console.error(error);
      },
      () => { clearInterval(tInt); }
    );
  }

}
