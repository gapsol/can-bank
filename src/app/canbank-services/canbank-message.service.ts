import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanbankMessageService {

  constructor() { }

  @Input()
  private _canbankMessage: string = '';
  get canbankMessage(): string { return this._canbankMessage; }
  set canbankMessage(msg: string) { this._canbankMessage = msg; }
  @Input()
  private _flashMessage: string = '';
  get flashMessage(): string { return this._flashMessage; }
  set flashMessage(msg: string) { this._flashMessage = msg; }
  @Input()
  private _flashMe: boolean = false;
  get flashMe(): boolean { return this._flashMe; }
  set flashMe(msg: boolean) { this._flashMe = msg; }

}
