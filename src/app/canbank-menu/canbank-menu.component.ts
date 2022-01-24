/*
 * CanBank menu
 *
 * TODO:
 *  DECIDE width threshold for text<->icon change
 *  DECIDE whether to use text menu or icon only
 *  CREATE icons nad icon style
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';

interface menuItem {
  uri: string,
  i18n: string,
  svg: string
}

@Component({
  selector: 'canbank-menu',
  template: `
    <nav class="canbank-menu" *ngIf="isMenu">
      <div class="menu-btn" [style]="menuWidth" *ngFor="let item of menuList">
        <a [routerLink]="item.uri" routerLinkActive="menu-btn-active" class="anchor-btn">
          <span>{{ item.i18n }}</span>
        </a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./canbank-menu.component.css']
})
export class CanbankMenuComponent implements OnInit {
  i18n = i18n[config.language];
  menuList: Array<menuItem> = [
    { uri: '/home', i18n: this.i18n['menu_home'], svg: '' },
    { uri: '/add', i18n: this.i18n['menu_add'], svg: '' },
    { uri: '/find', i18n: this.i18n['menu_find'], svg: '' },
    { uri: '/categories', i18n: this.i18n['menu_categories'], svg: '' },
    { uri: '/stats', i18n: this.i18n['menu_stats'], svg: '' },
    { uri: '/settings', i18n: this.i18n['menu_settings'], svg: '' },
  ];
  menuLength: number = 100 / this.menuList.length;
  menuWidth: string = `width: calc(${this.menuLength}% - 1px);`;
  isMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isMenu = (window.location.pathname !== '/' && window.location.pathname !== '/splash');
    })
  }

}
