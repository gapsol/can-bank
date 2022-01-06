import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXsService } from '../canbank-xs/canbank-xs.service';

@Component({
  selector: 'canbank-flash',
  template: `
    <h1 class="can-flash-plus" (click)="canbankCreate()">+</h1>
    <div class="can-flash-h1" *ngFor="let item of flashMessage">{{ item }}</div>
  `,
  styleUrls: ['./canbank-flash.component.css']
})
export class CanbankFlashComponent implements OnInit {
  i18n = i18n[config.language];
  flashMessage: string[] = [];

  constructor(
    private canbankXS: CanbankXsService
  ) { }

  ngOnInit() {
    this.flashMessage[0] = this.canbankXS.flashMessage;
  }

  canbankCreate() {
    this.flashMessage = [];
    this.flashMessage[0] = i18n.msg_create;

    // TODO: change these dots...
    let tInt = setInterval(() => { this.flashMessage[1] += '.'; }, config.tOut);

    this.canbankXS.createDB().subscribe(
      (response: any) => {
        switch (response['status']) {
          case 'success':
            this.flashMessage[0] = this.i18n.msg_created;
            setTimeout(() => {
              this.canbankXS.canbankMessage = '';
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
        this.flashMessage[1] = this.canbankXS.canbankMessage;
        console.error(error);
      },
      () => { clearInterval(tInt); }
    );
  }

}
