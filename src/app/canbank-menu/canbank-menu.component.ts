import { Component, OnInit } from '@angular/core';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

interface menuItem {
  uri: string,
  i18n: string
}

@Component({
  selector: 'canbank-menu',
  template: `
    <nav class="canbank-menu">
      <div class="menu-btn" [style]="menuWidth" *ngFor="let item of menuList">
        <a [routerLink]="item.uri" routerLinkActive="menu-btn-active" class="anchor-btn">[ {{ item.i18n }} ]</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./canbank-menu.component.css']
})
export class CanbankMenuComponent implements OnInit {
  i18n = i18n[config.language];
  menuList: Array<menuItem> = [
    {uri: '/home',        i18n: this.i18n['menu_home']},
    {uri: '/add',         i18n: this.i18n['menu_add']},
    {uri: '/find',        i18n: this.i18n['menu_find']},
    {uri: '/categories',  i18n: this.i18n['menu_categories']},
    {uri: '/stats',       i18n: this.i18n['menu_stats']},
    {uri: '/settings',    i18n: this.i18n['menu_settings']},
  ];
  menuLength: number = 100 / this.menuList.length;
  menuWidth: string = `width: calc(${this.menuLength}% - 1px);`;

  constructor() { }

  ngOnInit(): void {
    console.log('MENU component')
  }

}
