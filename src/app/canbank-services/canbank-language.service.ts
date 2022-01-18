import { Injectable } from '@angular/core';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CanbankLanguageService {

  constructor() { }

  langGetWordCount(word: string, count?: number): string {
    switch (config.language) {
      case 'sk':
        return this.skSwitch(word, count);
      case 'en':
      default:
        return this.enSwitch(word, count);
    }
  }

  skSwitch(word: string, count?: number): string {
    switch (word) {
      case 'can':
        switch (count) {
          case 1:
            return 'plechovka';
          case 2:
          case 3:
          case 4:
            return 'plechovky';
          default:
            return 'plechoviek';
        }
      case 'type':
        switch (count) {
          case 1:
            return 'typ';
          case 2:
          case 3:
          case 4:
            return 'typy';
          default:
            return 'typov';
        }
      case 'country':
        switch (count) {
          case 1:
            return 'krajina';
          case 2:
          case 3:
          case 4:
            return 'krajiny';
          default:
            return 'krajín';
        }
      case 'newest':
        return 'najnovšia';
      case 'oldest':
        return 'najstaršia';
      default:
        return '???';
    }
  }

  enSwitch(word: string, count?: number): string {
    switch (word) {
      case 'can':
        switch (count) {
          case 1:
            return 'can';
          default:
            return 'cans';
        }
      case 'type':
        switch (count) {
          case 1:
            return 'type';
          default:
            return 'types';
        }
      case 'country':
        switch (count) {
          case 1:
            return 'country';
          default:
            return 'countries';
        }
      case 'newest':
        return 'newest';
      case 'oldest':
        return 'oldest';
      default:
        return '???';
    }
  }

}
