/*
* DESCRIPTION:
* CAN-BANK SPLASH PAGE
* starting app
* checking existence of the database and tables
* checking integrity of the database and tables
* loading basic set of interface data
*
TODO:
* try some requests timing for LM visual effects
* move levelmeter specific functions to LM service
* Try to change calling strategy in checkLists fnc
* Look at afterTheEvent function, whether is optimal
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { config } from '../config/config';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';
import { CanbankLevelmeterService } from '../canbank-services/canbank-levelmeter.service';

@Component({
  selector: 'canbank-splash',
  templateUrl: './canbank-splash.component.html',
  styleUrls: ['./canbank-splash.component.css']
})
export class CanbankSplashComponent implements OnInit {
  levelMeter = this.canbankLM.levelMeter;
  successMessage: string = '';
  errorMessage: string[] = [];

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankLM: CanbankLevelmeterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkDb();
  }

  checkDb(): void {
    this.setLevelMeterDb('running');
    this.canbankXC.getState().subscribe(
      () => {
        this.getLevelMeterDb();
        this.successMessage = this.canbankXC.canbankMessage;
        let that = this;
        setTimeout(() => {
          this.checkLists(that);
        }, config.tOut);
      },
      (error: any) => {
        console.error(error);
        if (this.canbankLM.levelDa === 'error') {
          this.setLevelMeter('error');
        } else if (this.canbankLM.levelDb === 'error') {
          this.levelMeter.levelDa = this.canbankLM.levelDa;
          this.levelMeter.levelDb = this.canbankLM.levelDb;
          this.setLevelMeterLst('error');
        }
        this.errorMessage[0] = this.canbankXC.canbankMessage;
      }
    )
  }

  checkLists(that: any): void {
    that.setLevelMeterLst('running');
    that.canbankXC.getBank(0).subscribe(
      () => { that.levelMeter.levelL0 = that.canbankLM.levelL0; },
      (error: any) => {
        that.levelMeter.levelL0 = that.canbankLM.levelL0;
        console.error(error);
      }
    )
    that.canbankXC.getColor(0).subscribe(
      () => { that.levelMeter.levelL1 = that.canbankLM.levelL1; },
      (error: any) => {
        that.levelMeter.levelL1 = that.canbankLM.levelL1;
        console.error(error);
      }
    )
    that.canbankXC.getContentType(0).subscribe(
      () => { that.levelMeter.levelL2 = that.canbankLM.levelL2; },
      (error: any) => {
        that.levelMeter.levelL2 = that.canbankLM.levelL2;
        console.error(error);
      }
    )
    that.canbankXC.getCountry(0).subscribe(
      () => { that.levelMeter.levelL3 = that.canbankLM.levelL3; },
      (error: any) => {
        that.levelMeter.levelL3 = that.canbankLM.levelL3;
        console.error(error);
      }
    )
    that.canbankXC.getLanguage(0).subscribe(
      () => { that.levelMeter.levelL4 = that.canbankLM.levelL4; },
      (error: any) => {
        that.levelMeter.levelL4 = that.canbankLM.levelL4;
        console.error(error);
      }
    )
    that.canbankXC.getMaterial(0).subscribe(
      () => { that.levelMeter.levelL5 = that.canbankLM.levelL5; },
      (error: any) => {
        that.levelMeter.levelL5 = that.canbankLM.levelL5;
        console.error(error);
      }
    )
    that.canbankXC.getSurface(0).subscribe(
      () => { that.levelMeter.levelL6 = that.canbankLM.levelL6; },
      (error: any) => {
        that.levelMeter.levelL6 = that.canbankLM.levelL6;
        console.error(error);
      }
    )
    that.canbankXC.getType(0).subscribe(
      () => { that.levelMeter.levelL7 = that.canbankLM.levelL7; },
      (error: any) => {
        that.levelMeter.levelL7 = that.canbankLM.levelL7;
        console.error(error);
      }
    )
    that.afterTheEvent(that.getLevelMeterState, 10, that.checkFlash);
  }

  setLevelMeter(state: string): void {
    this.setLevelMeterDb(state);
    this.setLevelMeterLst(state);
  }

  getLevelMeter(): void {
    this.getLevelMeterDb();
    this.getLevelMeterLst();
  }

  setLevelMeterDb(state: string): void {
    this.levelMeter.levelDa =
      this.levelMeter.levelDb = state;
  }

  getLevelMeterDb(): void {
    this.levelMeter.levelDa = this.canbankLM.levelDa;
    this.levelMeter.levelDb = this.canbankLM.levelDb;
  }

  setLevelMeterLst(state: string): void {
    this.levelMeter.levelL0 =
      this.levelMeter.levelL1 =
      this.levelMeter.levelL2 =
      this.levelMeter.levelL3 =
      this.levelMeter.levelL4 =
      this.levelMeter.levelL5 =
      this.levelMeter.levelL6 =
      this.levelMeter.levelL7 = state;
  }

  getLevelMeterLst(): void {
    this.levelMeter.levelL0 = this.canbankLM.levelL0;
    this.levelMeter.levelL1 = this.canbankLM.levelL1;
    this.levelMeter.levelL2 = this.canbankLM.levelL2;
    this.levelMeter.levelL3 = this.canbankLM.levelL3;
    this.levelMeter.levelL4 = this.canbankLM.levelL4;
    this.levelMeter.levelL5 = this.canbankLM.levelL5;
    this.levelMeter.levelL6 = this.canbankLM.levelL6;
    this.levelMeter.levelL7 = this.canbankLM.levelL7;
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

  afterTheEvent(compFnc: Function, compVal: any, callBack: Function): void {
    let tInt = setInterval(() => {
      if (compFnc(this) === compVal) {
        clearInterval(tInt);
        callBack(this);
      }
    }, 100);
  }

  checkFlash(that: any): void {
    // if (that.getLevelMeterEmpty().length === 0) {
    setTimeout(() => { that.router.navigate(['home']) }, config.tOut);
    // }
  }

}
