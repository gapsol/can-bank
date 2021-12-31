import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CanbankXsService } from './canbank-xs/canbank-xs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'can-bank';
  showSplash: boolean = true;

  constructor(
    private router: Router,
    private canbankXS: CanbankXsService
  ) {}

  ngOnInit() {
    console.log('APP component')
    this.canbankInit();
  }

  canbankInit(): void {
    this.canbankXS.getState().subscribe(
      (response: any) => {
        console.log(response['status'])
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
                this.showSplash = false;
                this.router.navigate(['home']);
              }
          }, 100);
        } else {
          this.showSplash = false;
          this.router.navigate(['flash']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
