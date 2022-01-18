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
  private _canColor: Array<canColor> = [];
  get canColor(): Array<canColor> { return this._canColor; }
  set canColor(obj: Array<canColor>) { this._canColor = obj; }
  @Input()
  private _canContentType: Array<canContentType> = [];
  get canContentType(): Array<canContentType> { return this._canContentType; }
  set canContentType(obj: Array<canContentType>) { this._canContentType = obj; }
  @Input()
  private _canCountry: Array<canCountry> = [];
  get canCountry(): Array<canCountry> { return this._canCountry; }
  set canCountry(obj: Array<canCountry>) { this._canCountry = obj; }
  @Input()
  private _canLanguage: Array<canLanguage> = [];
  get canLanguage(): Array<canLanguage> { return this._canLanguage; }
  set canLanguage(obj: Array<canLanguage>) { this._canLanguage = obj; }
  @Input()
  private _canMaterial: Array<canMaterial> = [];
  get canMaterial(): Array<canMaterial> { return this._canMaterial; }
  set canMaterial(obj: Array<canMaterial>) { this._canMaterial = obj; }
  @Input()
  private _canSurface: Array<canSurface> = [];
  get canSurface(): Array<canSurface> { return this._canSurface; }
  set canSurface(obj: Array<canSurface>) { this._canSurface = obj; }
  @Input()
  private _canType: Array<canType> = [];
  get canType(): Array<canType> { return this._canType; }
  set canType(obj: Array<canType>) { this._canType = obj; }

  constructor() { }
}
