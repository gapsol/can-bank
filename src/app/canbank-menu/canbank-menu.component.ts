import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

@Component({
  selector: 'canbank-menu',
  templateUrl: './canbank-menu.component.html',
  styleUrls: ['./canbank-menu.component.css']
})
export class CanbankMenuComponent implements OnInit {
  i18n = i18n[config.language];
  showMenu = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('MENU component')
    if (this.router.url == '/flash') {
      this.showMenu = false;
    }
  }

}
