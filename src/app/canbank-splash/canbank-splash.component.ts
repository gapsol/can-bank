import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { config } from '../config/config';
import { CanbankXsService } from '../canbank-xs/canbank-xs.service';
import { levelMeter } from '../canbank-xs/levelmeter';

@Component({
  selector: 'canbank-splash',
  templateUrl: './canbank-splash.component.html',
  styleUrls: ['./canbank-splash.component.css']
})
export class CanbankSplashComponent implements OnInit {
  levelMeter = levelMeter;
  successMessage: string = '';
  errorMessage: string[] = [];
  flashMe: boolean = false;
  fillMe: boolean = false;

  canbankUrl: string = '';

  constructor(
    private canbankXS: CanbankXsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkDbTb();
  }

  checkDbTb() {
    this.setLevelMeterDb('running');
    this.canbankXS.getState().subscribe(
      (response: any) => {
        this.getLevelMeterDb();
        if (this.canbankXS.levelDb === 'error') {
          this.setLevelMeter('error');
          this.errorMessage[0] = this.canbankXS.canbankMessage;
          this.flashMe = this.canbankXS.flashMe;
        } else if (this.canbankXS.levelDt === 'error') {
          this.setLevelMeterLst('error');
          for (let i = 0; i < this.canbankXS.canbankMessage.length; i++) {
            this.errorMessage[i] = this.canbankXS.canbankMessage[i];
          }
          this.flashMe = this.canbankXS.flashMe;
        } else {
          this.successMessage = this.canbankXS.canbankMessage;
          let that = this;
          setTimeout(() => { that.checkLists(that); }, config.tOut);
        }
      },
      (error: any) => {
        console.error(error)
        this.setLevelMeter('error');
        this.errorMessage[0] = this.canbankXS.canbankMessage;
      }
    )
  }

  checkLists(that: any) {
    that.setLevelMeterLst('running');
    that.canbankXS.getColor().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL1 = that.canbankXS.levelL1; }
    )
    that.canbankXS.getContentType().subscribe(
      () => { },
      (error: any) => { console.error(error); },
      () => { that.levelMeter.levelL2 = that.canbankXS.levelL2; }
    )
    that.canbankXS.getCountry().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL3 = that.canbankXS.levelL3; }
    )
    that.canbankXS.getLanguage().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL4 = that.canbankXS.levelL4; }
    )
    that.canbankXS.getMaterial().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL5 = that.canbankXS.levelL5; }
    )
    that.canbankXS.getSurface().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL6 = that.canbankXS.levelL6; }
    )
    that.canbankXS.getType().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL7 = that.canbankXS.levelL7; }
    )
    that.afterTheEvent(that.getLevelMeterState, 9, that.checkFlash);
  }

  setLevelMeter(state: string) {
    this.setLevelMeterDb(state);
    this.setLevelMeterLst(state);
  }

  getLevelMeter() {
    this.getLevelMeterDb();
    this.getLevelMeterLst();
  }

  setLevelMeterDb(state: string) {
    this.levelMeter.levelDb =
      this.levelMeter.levelDt = state;
  }

  getLevelMeterDb() {
    this.levelMeter.levelDb = this.canbankXS.levelDb;
    this.levelMeter.levelDt = this.canbankXS.levelDt;
  }

  setLevelMeterLst(state: string) {
    this.levelMeter.levelL1 =
      this.levelMeter.levelL2 =
      this.levelMeter.levelL3 =
      this.levelMeter.levelL4 =
      this.levelMeter.levelL5 =
      this.levelMeter.levelL6 =
      this.levelMeter.levelL7 = state;
  }

  getLevelMeterLst() {
    this.levelMeter.levelL1 = this.canbankXS.levelL1;
    this.levelMeter.levelL2 = this.canbankXS.levelL2;
    this.levelMeter.levelL3 = this.canbankXS.levelL3;
    this.levelMeter.levelL4 = this.canbankXS.levelL4;
    this.levelMeter.levelL5 = this.canbankXS.levelL5;
    this.levelMeter.levelL6 = this.canbankXS.levelL6;
    this.levelMeter.levelL7 = this.canbankXS.levelL7;
  }

  getLevelMeterState(that: any): number {
    let n = 0;
    for (let [key, val] of Object.entries(that.levelMeter)) {
      if (val !== '') { n++; }
    }
    return n;
  }

  getLevelMeterEmpty(): Array<string> {
    let list = [];
    for (let [key, val] of Object.entries(this.levelMeter)) {
      if (val === 'empty') {
        list.push(key);
      }
    }
    return list;
  }

  afterTheEvent(compFnc: Function, compVal: any, callBack: Function) {
    let tInt = setInterval(() => {
      if (compFnc(this) === compVal) {
        clearInterval(tInt);
        callBack(this);
      }
    }, 100);
  }

  checkFlash(that: any) {
    if (that.getLevelMeterEmpty().length > 0) {
      that.fillMe = true;
    } else {
      setTimeout(() => {
        that.router.navigate(['home'])
      }, config.tOut);
    }
  }

}
