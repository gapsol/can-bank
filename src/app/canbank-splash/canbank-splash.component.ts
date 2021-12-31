import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { CanbankXsService } from '../canbank-xs/canbank-xs.service';
import { levelMeter } from '../canbank-xs/levelmeter';

@Component({
  selector: 'canbank-splash',
  templateUrl: './canbank-splash.component.html',
  styleUrls: ['./canbank-splash.component.css']
})
export class CanbankSplashComponent implements OnInit, OnChanges {
  splashMessage: string = '';
  rotationChar: string = '';
  rotationClass: string = '';
  levelMeter = levelMeter;

  constructor(private canbankXS: CanbankXsService) { }

  ngOnChanges(changes: SimpleChanges): void {
      for (const prop in changes) {
        console.log(prop)
      }
  }

  ngOnInit() {
    console.log('SPLASH component')
    this.rotationChar = 'O';
    this.splashMessage = '';
    let index: number = 0;
    let tInt = setInterval(() => {
      index = (index < 315) ? index + 45 : 0;
      this.rotationClass = `rotate${index}`;
      if (this.canbankXS.canbankMessage !== '') {
        this.splashMessage = this.canbankXS.canbankMessage;

        this.levelMeter.forEach((item) => {
          switch (item.levelId) {
            case 'levelDb': item.levelClass = this.canbankXS.levelDb; break;
            case 'levelTb': item.levelClass = this.canbankXS.levelTb; break;
            case 'levelL1': item.levelClass = this.canbankXS.levelL1; break;
            case 'levelL2': item.levelClass = this.canbankXS.levelL2; break;
            case 'levelL3': item.levelClass = this.canbankXS.levelL3; break;
            case 'levelL4': item.levelClass = this.canbankXS.levelL4; break;
            case 'levelL5': item.levelClass = this.canbankXS.levelL5; break;
            case 'levelL6': item.levelClass = this.canbankXS.levelL6; break;
            case 'levelL7': item.levelClass = this.canbankXS.levelL7; break;
          }
        })

        if (this.canbankXS.canColor.length !== 0
          && this.canbankXS.canContentType.length !== 0
          && this.canbankXS.canCountry.length !== 0
          && this.canbankXS.canLanguage.length !== 0
          && this.canbankXS.canMaterial.length !== 0
          && this.canbankXS.canSurface.length !== 0
          && this.canbankXS.canType.length !== 0
          || this.canbankXS.canbankMessage.includes('Unknown Error')) {
            this.rotationChar = '';
            clearInterval(tInt);
          }
      }
    }, 100);
  }

}
