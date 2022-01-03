import { Component, OnInit } from '@angular/core';

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
  flashMessage: string[] = [];

  constructor(
    private canbankXS: CanbankXsService
  ) {}

  ngOnInit() {
    console.log('FLASH component')

    this.flashMessage[0] = this.canbankXS.flashMessage;
    // TODO: onChange?
    /*let tInt = setInterval(() => {
      if (this.canbankXS.canbankMessage !== '') {
        if (this.canbankXS.canbankMessage.includes('Unknown database')) {
          this.flashMessage[0] = 'Database doesn\'t exist';
          this.flashMessage[1] = 'Let\'s create it!';
        } else if (this.canbankXS.canbankMessage.includes('Table') && this.canbankXS.canbankMessage.includes('doesn\'t exist')) {
          this.flashMessage[0] = this.canbankXS.canbankMessage;
          this.flashMessage[1] = 'Check or recreate database!';
        } else {
          this.flashMessage[0] = this.canbankXS.canbankMessage;
          this.flashMessage[1] = '';
        }
        clearInterval(tInt);
      }
    }, 250);*/
  }

  canbankCreate() {
    console.log('create canbank');
    this.flashMessage = [];
    this.flashMessage[0] = 'Creating database';

    // TODO: change these dots...
    let tInt = setInterval(() => {
      this.flashMessage[1] += '.';
    }, 333);

    this.canbankXS.createDB().subscribe(
      (res: any) => {
        console.log(res);
        switch (res['status']) {
          case 'success':
            this.flashMessage[0] = 'Database created';
            setTimeout(() => {
              this.canbankXS.canbankMessage = '';
              window.location.reload();
            }, 500);
            break;
          case 'error':
            this.flashMessage[0] = 'Creation failed';
            this.flashMessage[1] = res['message'];
            break;
          default:
            this.flashMessage[0] = 'Unknown status!';
            this.flashMessage[1] = 'Look at the console';
        }
      },
      (err: any) => {
        this.flashMessage[0] = 'Creation failed';
        this.flashMessage[1] = this.canbankXS.canbankMessage;
        console.error(err);
      },
      () => {
        clearInterval(tInt);
      }
    );
  }

}
