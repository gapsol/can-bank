import { Injectable, Input } from '@angular/core';

import { canColor } from '../data/can-color';
import { canContentType } from '../data/can-content';
import { canCountry } from '../data/can-country';
import { canLanguage } from '../data/can-language';
import { canMaterial } from '../data/can-material';
import { canSurface } from '../data/can-surface';
import { canType } from '../data/can-type';

@Injectable({
  providedIn: 'root'
})
export class CanbankInterfaceService {

  @Input()
  private _isActive: boolean = false;
  get isActive(): boolean { return this._isActive; }
  set isActive(state: boolean) { this._isActive = state; }
  @Input()
  private _isUpdated: Date = new Date();
  get isUpdated(): Date { return this._isUpdated; }
  set isUpdated(date: Date) { this._isUpdated = date; }

  @Input()
  private _canColor: Array<canColor> = [];
  get canColor(): Array<canColor> { return this._canColor; }
  set canColor(obj: Array<canColor>) {
    this._canColor = obj;
    this.updateMe();
  }
  @Input()
  private _canContentType: Array<canContentType> = [];
  get canContentType(): Array<canContentType> { return this._canContentType; }
  set canContentType(obj: Array<canContentType>) {
    this._canContentType = obj;
    this.updateMe();
  }
  @Input()
  private _canCountry: Array<canCountry> = [];
  get canCountry(): Array<canCountry> { return this._canCountry; }
  set canCountry(obj: Array<canCountry>) {
    this._canCountry = obj;
    this.updateMe();
  }
  @Input()
  private _canLanguage: Array<canLanguage> = [];
  get canLanguage(): Array<canLanguage> { return this._canLanguage; }
  set canLanguage(obj: Array<canLanguage>) {
    this._canLanguage = obj;
    this.updateMe();
  }
  @Input()
  private _canMaterial: Array<canMaterial> = [];
  get canMaterial(): Array<canMaterial> { return this._canMaterial; }
  set canMaterial(obj: Array<canMaterial>) {
    this._canMaterial = obj;
    this.updateMe();
  }
  @Input()
  private _canSurface: Array<canSurface> = [];
  get canSurface(): Array<canSurface> { return this._canSurface; }
  set canSurface(obj: Array<canSurface>) {
    this._canSurface = obj;
    this.updateMe();
  }
  @Input()
  private _canType: Array<canType> = [];
  get canType(): Array<canType> { return this._canType; }
  set canType(obj: Array<canType>) {
    this._canType = obj;
    this.updateMe();
  }

  constructor() { }

  updateMe() {
    this._isActive = true;
    this._isUpdated = new Date();
  }

}
