import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  canbankUrl: string = '';

  constructor(
    private canbankXS: CanbankXsService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('SPLASH component')
    this.checkDbTb();
  }

  checkDbTb() {
    this.setLevelMeterDb('running');
    this.canbankXS.getState().subscribe(
      () => {
        console.log('getState resolved');
        this.copyLevelMeterDb();
        if (this.canbankXS.levelDb === 'error') {
          this.setLevelMeter('error');
          this.errorMessage[0] = this.canbankXS.canbankMessage;
          this.flashMe = this.canbankXS.flashMe;
        } else if (this.canbankXS.levelDt === 'error') {
          this.setLevelMeterLst('error');
          for (let i=0; i<this.canbankXS.canbankMessage.length; i++) {
            this.errorMessage[i] = this.canbankXS.canbankMessage[i];
          }
          this.flashMe = this.canbankXS.flashMe;
        } else {
          this.checkLists();
        }
      },
      (error: any) => {
        console.error(error)
        console.log('getState rejected')
        this.setLevelMeter('error');
        this.errorMessage[0] = this.canbankXS.canbankMessage;
      }
    )
  }

  checkLists() {
    this.setLevelMeterLst('running');
    this.canbankXS.getColor(0).subscribe(
      () => {},
      (error) => { console.error(error) },
      () => { this.levelMeter.levelL1 = this.canbankXS.levelL1; }
    )
    this.canbankXS.getContentType(0).subscribe(
      () => {},
      (error) => { console.error(error); },
      () => { this.levelMeter.levelL2 = this.canbankXS.levelL2; }
    )
    this.canbankXS.getCountry(0).subscribe(
      () => {},
      (error) => { console.error(error) },
      () => { this.levelMeter.levelL3 = this.canbankXS.levelL3; }
    )
    this.canbankXS.getLanguage(0).subscribe(
      () => {},
      (error) => { console.error(error) },
      () => { this.levelMeter.levelL4 = this.canbankXS.levelL4; }
    )
    this.canbankXS.getMaterial(0).subscribe(
      () => {},
      (error) => { console.error(error) },
      () => { this.levelMeter.levelL5 = this.canbankXS.levelL5; }
    )
    this.canbankXS.getSurface(0).subscribe(
      () => {},
      (error) => { console.error(error) },
      () => { this.levelMeter.levelL6 = this.canbankXS.levelL6; }
   )
    this.canbankXS.getType(0).subscribe(
      () => {},
      (error) => { console.error(error) },
      () => { this.levelMeter.levelL7 = this.canbankXS.levelL7; }
    )
  }

  setLevelMeter(state: string) {
    this.setLevelMeterDb(state);
    this.setLevelMeterLst(state);
  }

  copyLevelMeter() {
    this.copyLevelMeterDb();
    this.copyLevelMeterLst();
  }

  setLevelMeterDb(state: string) {
    this.levelMeter.levelDb =
    this.levelMeter.levelDt = state;
  }

  copyLevelMeterDb() {
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

  copyLevelMeterLst() {
    this.levelMeter.levelL1 = this.canbankXS.levelL1;
    this.levelMeter.levelL2 = this.canbankXS.levelL2;
    this.levelMeter.levelL3 = this.canbankXS.levelL3;
    this.levelMeter.levelL4 = this.canbankXS.levelL4;
    this.levelMeter.levelL5 = this.canbankXS.levelL5;
    this.levelMeter.levelL6 = this.canbankXS.levelL6;
    this.levelMeter.levelL7 = this.canbankXS.levelL7;
  }

  /*canbankInit(): void {
    this.levelMeter.levelDb = this.levelMeter.levelDt = 'running';
    this.canbankXS.getState().subscribe(
      (response: any) => {
        if (response['status'] === 'success') {
          this.canbankXS.getLists();
          // TODO: onChange - finished lists requests
          let tInt = setInterval(() => {
            if (this.canbankXS.canColor.length !== 0
              && this.canbankXS.canContentType.length !== 0
              && this.canbankXS.canCountry.length !== 0
              && this.canbankXS.canLanguage.length !== 0
              && this.canbankXS.canMaterial.length !== 0
              && this.canbankXS.canSurface.length !== 0
              && this.canbankXS.canType.length !== 0) {
                clearInterval(tInt);
                // this.router.navigate(['home']);
              }
          }, 125);
        } else {
          this.router.navigate(['flash']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  readXchange() {
    this.successMessage = this.canbankXS.canbankMessage;

    this.levelMeter.levelDb = this.canbankXS.levelDb;
    this.levelMeter.levelDt = this.canbankXS.levelDt;
    this.levelMeter.levelL1 = this.canbankXS.levelL1;
    this.levelMeter.levelL2 = this.canbankXS.levelL2;
    this.levelMeter.levelL3 = this.canbankXS.levelL3;
    this.levelMeter.levelL4 = this.canbankXS.levelL4;
    this.levelMeter.levelL5 = this.canbankXS.levelL5;
    this.levelMeter.levelL6 = this.canbankXS.levelL6;
    this.levelMeter.levelL7 = this.canbankXS.levelL7;
  }

  isFinished() {
    return (
      this.canbankXS.canColor.length !== 0
      && this.canbankXS.canContentType.length !== 0
      && this.canbankXS.canCountry.length !== 0
      && this.canbankXS.canLanguage.length !== 0
      && this.canbankXS.canMaterial.length !== 0
      && this.canbankXS.canSurface.length !== 0
      && this.canbankXS.canType.length !== 0
      || this.canbankXS.canbankMessage.toLowerCase().includes('error')
    );
  }*/
}
