/*
* CAN-BANK HOME PAGE
*  welcome page of the app
*  shows basic info from database
*/
import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { CanbankXchangeService } from '../canbank-services/canbank-xchange.service';
import { CanbankLanguageService } from '../canbank-services/canbank-language.service';
import { canBank } from '../data/can-bank';
import { canCountry } from '../data/can-country';
import { canType } from '../data/can-type';

@Component({
  selector: 'canbank-home',
  templateUrl: './canbank-home.component.html',
  styleUrls: ['./canbank-home.component.css']
})
export class CanbankHomeComponent implements OnInit {
  printCan: Array<string> = [];
  langCan: string = '';
  tIntCan: any;
  printType: Array<string> = [];
  langType: string = '';
  tIntTyp: any;
  printCountry: Array<string> = [];
  langCountry: string = '';
  tIntCty: any;
  printOldest: Array<string> = [];
  langOldest: string = '';
  tIntOld: any;
  printNewest: Array<string> = [];
  langNewest: string = '';
  tIntNew: any;
  now: any;

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankLS: CanbankLanguageService
  ) { }

  ngOnInit() {
    this.demoCount();
    if (!config.isDemo) {
      this.now = new Date();
      this.getCans();
      this.getTypes();
      this.getCountries();
      this.getOldest();
      this.getNewest();
    }
  }

  afterTheEvent(fnc: Function, arg: any, tInt: any) {
    let time: any = new Date();
    let dt = time - this.now;
    if (config.tOut - dt > 0) {
      setInterval(() => {
        clearInterval(tInt);
        let that = this;
        fnc(that, arg);
      }, config.tOut - dt);
    }
  }

  getCans() {
    this.canbankXC.getCount('bank').subscribe(
      (response: any) => {
        if (response['count'] !== '0') {
          this.afterTheEvent(this.displayCans, +response['count'], this.tIntCan);
        } else {
          clearInterval(this.tIntCan);
          this.printCan = ['0'];
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  displayCans(that: any, result: number) {
    that.langCan = that.canbankLS.langGetWordCount('can', result);
    that.printCan = result.toString().split('');
  }

  getTypes() {
    this.canbankXC.getCount('type').subscribe(
      (response: any) => {
        if (response['count'] !== '0') {
          this.afterTheEvent(this.displayTypes, +response['count'], this.tIntTyp);
        } else {
          clearInterval(this.tIntTyp);
          this.printType = ['0'];
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  displayTypes(that: any, result: number) {
    that.printType = result.toString().split('');
    that.langType = that.canbankLS.langGetWordCount('type', result);
  }

  getCountries() {
    this.canbankXC.getCount('country').subscribe(
      (response: any) => {
        if (response['count'] !== '0') {
          this.afterTheEvent(this.displayCountries, +response['count'], this.tIntCty);
        } else {
          clearInterval(this.tIntCty);
          this.printCountry = ['0'];
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  displayCountries(that: any, result: number) {
    that.printCountry = result.toString().split('');
    that.langCountry = that.canbankLS.langGetWordCount('country', result);
  }

  getOldest() {
    let d = new Date('1993-6-13');
    this.canbankXC.getOldest().subscribe(
      (response: any) => {
        if (response['count'] !== 0) {
          d = new Date(response['count']);
          this.afterTheEvent(this.displayOldest, d, this.tIntOld);
        } else {
          clearInterval(this.tIntOld);
          this.printOldest = ['-'];
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  displayOldest(that: any, d: Date) {
    let month = d.getMonth() + 1;
    let result = d.getDate() + '.' + month + '.' + d.getFullYear();
    that.printOldest = result.split('');
    that.langOldest = that.canbankLS.langGetWordCount('oldest');
  }

  getNewest() {
    let d = new Date(Date.now());
    this.canbankXC.getNewest().subscribe(
      (response: any) => {
        if (response['count'] !== 0) {
          d = new Date(response['count']);
          this.afterTheEvent(this.displayNewest, d, this.tIntNew);
        } else {
          clearInterval(this.tIntNew);
          this.printNewest = ['-'];
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  displayNewest(that: any, d: Date) {
    let month = d.getMonth() + 1;
    let result = d.getDate() + '.' + month + '.' + d.getFullYear();
    that.printNewest = result.split('');
    that.langNewest = that.canbankLS.langGetWordCount('newest');
  }

  sCanOldest(): Date {
    let oldest = new Date();
    canBank.forEach((can) => {
      let next = new Date(can.prod_date);
      if (next < oldest) {
        oldest = next;
      }
    })
    return oldest;
  }

  sCanNewest(): Date {
    let newest = new Date(0);
    canBank.forEach((can) => {
      let next = new Date(can.prod_date);
      if (next > newest) {
        newest = next;
      }
    })
    return newest;
  }

  /*
  * functions for demo effects
  */
  demoCount() {
    this.langCan = this.canbankLS.langGetWordCount('can', 5);
    this.tIntCan = setInterval(() => {
      this.printCan = this.genNum();
    }, 147);
    this.langType = this.canbankLS.langGetWordCount('type', 5);
    this.tIntTyp = setInterval(() => {
      this.printType = this.genNum();
    }, 147);
    this.langCountry = this.canbankLS.langGetWordCount('country', 5);
    this.tIntCty = setInterval(() => {
      this.printCountry = this.genNum();
    }, 147);
    this.langOldest = this.canbankLS.langGetWordCount('oldest');
    this.tIntOld = setInterval(() => {
      this.printOldest = this.genDat();
    }, 147);
    this.langNewest = this.canbankLS.langGetWordCount('newest');
    this.tIntNew = setInterval(() => {
      this.printNewest = this.genDat();
    }, 147);
    setTimeout(() => {
      clearInterval(this.tIntCan);
      clearInterval(this.tIntTyp);
      clearInterval(this.tIntCty);
      clearInterval(this.tIntOld);
      clearInterval(this.tIntNew);
    }, 1471);
  }

  genNum(): Array<string> {
    let arr = [];
    arr.push((Math.round(Math.random() * 9 + 1)).toString());
    return arr;
  }

  genDat(): Array<string> {
    let year = Math.round(1993 + 30 * Math.random());
    let month = Math.round(12 * Math.random());
    let day = Math.round(30 * Math.random());
    let datum = day + '.' + month + '.' + year;
    return datum.split('');
  }

}
