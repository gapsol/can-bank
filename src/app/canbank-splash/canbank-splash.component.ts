  /*
  * DESCRIPTION:
  * CAN-BANK SPLASH PAGE
  * starting app
  * checking existence of the database and tables
  * checking integrity of the database and tables
  * loading basic set of interface data
  *
  * TODO:
  * try some requests timing for LM visual effects
  * move levelmeter specific functions to LM service
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
  flashMe: boolean = false;
  prefillMe: boolean = false;

  canbankUrl: string = '';

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankLM: CanbankLevelmeterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkDbTb();
  }

  checkDbTb() {
    this.setLevelMeterDb('running');
    this.canbankXC.getState().subscribe(
      () => {
        this.getLevelMeterDb();
        if (this.canbankLM.levelDb === 'error') {
          this.setLevelMeter('error');
          this.errorMessage[0] = this.canbankXC.canbankMessage;
          this.flashMe = this.canbankXC.flashMe;
        } else if (this.canbankLM.levelDt === 'error') {
          this.setLevelMeterLst('error');
          for (let i = 0; i < this.canbankXC.canbankMessage.length; i++) {
            this.errorMessage[i] = this.canbankXC.canbankMessage[i];
          }
          this.flashMe = this.canbankXC.flashMe;
        } else {
          this.successMessage = this.canbankXC.canbankMessage;
          let that = this;
          setTimeout(() => { that.checkLists(that); }, config.tOut);
        }
      },
      (error: any) => {
        console.error(error)
        this.setLevelMeter('error');
        this.errorMessage[0] = this.canbankXC.canbankMessage;
      }
    )
  }

  checkLists(that: any) {
    that.setLevelMeterLst('running');
    that.canbankXC.getColor().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL1 = that.canbankLM.levelL1; }
    )
    that.canbankXC.getContentType().subscribe(
      () => { },
      (error: any) => { console.error(error); },
      () => { that.levelMeter.levelL2 = that.canbankLM.levelL2; }
    )
    that.canbankXC.getCountry().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL3 = that.canbankLM.levelL3; }
    )
    that.canbankXC.getLanguage().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL4 = that.canbankLM.levelL4; }
    )
    that.canbankXC.getMaterial().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL5 = that.canbankLM.levelL5; }
    )
    that.canbankXC.getSurface().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL6 = that.canbankLM.levelL6; }
    )
    that.canbankXC.getType().subscribe(
      () => { },
      (error: any) => { console.error(error) },
      () => { that.levelMeter.levelL7 = that.canbankLM.levelL7; }
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
    this.levelMeter.levelDb = this.canbankLM.levelDb;
    this.levelMeter.levelDt = this.canbankLM.levelDt;
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
      that.prefillMe = true;
    } else {
      setTimeout(() => {
        that.router.navigate(['home'])
      }, config.tOut);
    }
  }

}
