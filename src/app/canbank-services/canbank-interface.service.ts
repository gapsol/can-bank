import { Injectable, Input } from '@angular/core';

import {
  canColor,
  canContentType,
  canCountry,
  canLanguage,
  canMaterial,
  canSurface,
  canType,
  canDefault,
  canDefaults
} from '../data/can.interface';

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
  @Input()
  private _canDefault: Array<canDefault> = [];
  get canDefault(): Array<canDefault> { return this._canDefault; }
  set canDefault(obj: Array<canDefault>) {
    this._canDefault = obj;
    this.updateMe();
    this.canDefaults = {
      color: this._canDefault.find(item => item.table === 'color')!.key,
      content: this._canDefault.find(item => item.table === 'content')!.key,
      country: this._canDefault.find(item => item.table === 'country')!.key,
      language: this._canDefault.find(item => item.table === 'language')!.key,
      material: this._canDefault.find(item => item.table === 'material')!.key,
      surface: this._canDefault.find(item => item.table === 'surface')!.key,
      type: this._canDefault.find(item => item.table === 'type')!.key
    }
  }
  @Input()
  private _canDefaults: canDefaults = {
    color: 0,
    content: 0,
    country: '',
    language: '',
    material: 0,
    surface: 0,
    type: 0
  };
  get canDefaults(): canDefaults { return this._canDefaults; }
  set canDefaults(obj: canDefaults) {
    this._canDefaults = obj;
    this.updateMe();
  }

  constructor() { }

  updateMe() {
    this._isActive = true;
    this._isUpdated = new Date();
  }

}
