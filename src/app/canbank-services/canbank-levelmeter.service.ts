import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanbankLevelmeterService {

  @Input()
  private _levelDb: string = '';
  get levelDb(): string { return this._levelDb; }
  set levelDb(str: string) { this._levelDb = str; }
  @Input()
  private _levelDt: string = '';
  get levelDt(): string { return this._levelDt; }
  set levelDt(str: string) { this._levelDt = str; }
  @Input()
  private _levelL1: string = '';
  get levelL1(): string { return this._levelL1; }
  set levelL1(str: string) { this._levelL1 = str; }
  @Input()
  private _levelL2: string = '';
  get levelL2(): string { return this._levelL2; }
  set levelL2(str: string) { this._levelL2 = str; }
  @Input()
  private _levelL3: string = '';
  get levelL3(): string { return this._levelL3; }
  set levelL3(str: string) { this._levelL3 = str; }
  @Input()
  private _levelL4: string = '';
  get levelL4(): string { return this._levelL4; }
  set levelL4(str: string) { this._levelL4 = str; }
  @Input()
  private _levelL5: string = '';
  get levelL5(): string { return this._levelL5; }
  set levelL5(str: string) { this._levelL5 = str; }
  @Input()
  private _levelL6: string = '';
  get levelL6(): string { return this._levelL6; }
  set levelL6(str: string) { this._levelL6 = str; }
  @Input()
  private _levelL7: string = '';
  get levelL7(): string { return this._levelL7; }
  set levelL7(str: string) { this._levelL7 = str; }

constructor() { }

}