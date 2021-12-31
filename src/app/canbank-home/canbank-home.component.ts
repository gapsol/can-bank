import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { CanbankXsService } from '../canbank-xs/canbank-xs.service';
import { CanbankLangService } from '../canbank-xs/canbank-lang.service';
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

  constructor(
    private canbankXS: CanbankXsService,
    private canbankLS: CanbankLangService
    ) { }

  ngOnInit() {
    console.log('HOME component');

    if (!config.isDemo) {
      this.startCount();
    }
    this.getCans();
    this.getTypes();
    this.getCountries();
    this.getOldest();
    this.getNewest();
  }

  startCount() {
    this.langCan = this.canbankLS.langGetWordCount('can', 5);
    this.tIntCan = setInterval(() => {
      this.printCan = this.genNum();
    }, 100);
    this.langType = this.canbankLS.langGetWordCount('type', 5);
    this.tIntTyp = setInterval(() => {
      this.printType = this.genNum();
    }, 100);
    this.langCountry = this.canbankLS.langGetWordCount('country', 5);
    this.tIntCty = setInterval(() => {
      this.printCountry = this.genNum();
    }, 100);
    this.langOldest = this.canbankLS.langGetWordCount('oldest');
    this.tIntOld = setInterval(() => {
      this.printOldest = this.genDat();
    }, 100);
    this.langNewest = this.canbankLS.langGetWordCount('newest');
    this.tIntNew = setInterval(() => {
      this.printNewest = this.genDat();
    }, 100);
  }

  genNum(): Array<string> {
    let arr = [];
    arr.push((Math.round(Math.random() * 9)).toString());
    return arr;
  }

  genDat(): Array<string> {
    let year = Math.round(1993 + 30 * Math.random());
    let month = Math.round(12 * Math.random());
    let day = Math.round(30 * Math.random());
    let datum = day + '.' + month + '.' + year;
    return datum.split('');
  }

  getCans() {
    if (config.isDemo) {
      this.displayCans(canBank.length);
    } else {
      this.canbankXS.getCount('bank').subscribe(
        (res: any) => {
          this.displayCans(+res['count']);
        },
        (err: any) => {
          console.error(err);
        },
        () => {
          clearInterval(this.tIntCan);
        }
      );
    }
  }

  displayCans(result: number) {
    this.langCan = this.canbankLS.langGetWordCount('can', result);
    this.printCan = result.toString().split('');
  }

  getTypes() {
    if (config.isDemo) {
      this.displayTypes(canType.length);
    } else {
      this.canbankXS.getCount('type').subscribe(
        (res: any) => {
          this.displayTypes(+res['count']);
        },
        (err: any) => {
          console.error(err);
        },
        () => {
          clearInterval(this.tIntTyp);
        }
      );
    }
  }

  displayTypes(result: number) {
    this.printType = result.toString().split('');
    this.langType = this.canbankLS.langGetWordCount('type', result);
  }

  getCountries() {
    if (config.isDemo) {
      this.displayCountries(canCountry.length);
    } else {
      this.canbankXS.getCount('country').subscribe(
        (res: any) => {
          this.displayCountries(+res['count']);
        },
        (err: any) => {
          console.error(err);
        },
        () => {
          clearInterval(this.tIntCty);
        }
      );
    }
  }

  displayCountries(result: number) {
    this.printCountry = result.toString().split('');
    this.langCountry = this.canbankLS.langGetWordCount('country', result);
  }

  getOldest() {
    let d = new Date('1993-6-13');
    if (config.isDemo) {
      d = this.sCanOldest();
      this.displayOldest(d);
    } else {
      this.canbankXS.getOldest().subscribe(
        (res: any) => {
          if (res['count'] !== 0) {
            d = new Date(res['count']) ;
            this.displayOldest(d);
          } else {
            this.printOldest = ['-'];
          }
        },
        (err: any) => {
          console.error(err);
        },
        () => {
          clearInterval(this.tIntOld);
        }
      );
    }
  }

  displayOldest(d: Date) {
    let month = d.getMonth() + 1;
    let result = d.getDate() + '.' + month + '.' + d.getFullYear();
    this.printOldest = result.split('');
    this.langOldest = this.canbankLS.langGetWordCount('oldest');
  }

  getNewest() {
    let d = new Date(Date.now());
    if (config.isDemo) {
      d = this.sCanNewest();
      this.displayNewest(d);
    } else {
      this.canbankXS.getNewest().subscribe(
        (res: any) => {
          if (res['count'] !== 0) {
            d = new Date(res['count']);
            this.displayNewest(d);
          } else {
            this.printNewest = ['-'];
          }
        },
        (err: any) => {
          console.error(err);
        },
        () => {
          clearInterval(this.tIntNew);
        }
      );
    }
  }

  displayNewest(d: Date) {
    let month = d.getMonth() + 1;
    let result = d.getDate() + '.' + month + '.' + d.getFullYear();
    this.printNewest = result.split('');
    this.langNewest = this.canbankLS.langGetWordCount('newest');
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

}
