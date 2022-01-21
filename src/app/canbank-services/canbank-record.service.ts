import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanbankRecordService {

  @Input()
  private _isActive: boolean = false;
  get isActive(): boolean { return this._isActive; }
  set isActive(state: boolean) { this._isActive = state; }
  @Input()
  private _isUpdated: Date = new Date();
  get isUpdated(): Date { return this._isUpdated; }
  set isUpdated(date: Date) { this._isUpdated = date; }

  @Input()
  private _canFormType: string = '';
  get canFormType(): string { return this._canFormType; }
  set canFormType(value: string) {
    this._canFormType = value;
    this.updateMe();
  }
  @Input()
  private _canFormDiameter: string = '';
  get canFormDiameter(): string { return this._canFormDiameter; }
  set canFormDiameter(value: string) {
    this._canFormDiameter = value;
    this.updateMe();
  }
  @Input()
  private _canFormHeight: string = '';
  get canFormHeight(): string { return this._canFormHeight; }
  set canFormHeight(value: string) {
    this._canFormHeight = value;
    this.updateMe();
  }
  @Input()
  private _canFormVolume: string = '';
  get canFormVolume(): string { return this._canFormVolume; }
  set canFormVolume(value: string) {
    this._canFormVolume = value;
    this.updateMe();
  }
  @Input()
  private _canFormVolumeFlOz: string = '';
  get canFormVolumeFlOz(): string { return this._canFormVolumeFlOz; }
  set canFormVolumeFlOz(value: string) {
    this._canFormVolumeFlOz = value;
    this.updateMe();
  }
  @Input()
  private _canFormMaterial: string = '';
  get canFormMaterial(): string { return this._canFormMaterial; }
  set canFormMaterial(value: string) {
    this._canFormMaterial = value;
    this.updateMe();
  }
  @Input()
  private _canFormSurface: string = '';
  get canFormSurface(): string { return this._canFormSurface; }
  set canFormSurface(value: string) {
    this._canFormSurface = value;
    this.updateMe();
  }
  @Input()
  private _canFormCoverColor: string = '';
  get canFormCoverColor(): string { return this._canFormCoverColor; }
  set canFormCoverColor(value: string) {
    this._canFormCoverColor = value;
    this.updateMe();
  }
  @Input()
  private _canFormOpenerColor: string = '';
  get canFormOpenerColor(): string { return this._canFormOpenerColor; }
  set canFormOpenerColor(value: string) {
    this._canFormOpenerColor = value;
    this.updateMe();
  }
  @Input()
  private _canFormBrand: string = '';
  get canFormBrand(): string { return this._canFormBrand; }
  set canFormBrand(value: string) {
    this._canFormBrand = value;
    this.updateMe();
  }
  @Input()
  private _canFormContentName: string = '';
  get canFormContentName(): string { return this._canFormContentName; }
  set canFormContentName(value: string) {
    this._canFormContentName = value;
    this.updateMe();
  }
  @Input()
  private _canFormContentType: string = '';
  get canFormContentType(): string { return this._canFormContentType; }
  set canFormContentType(value: string) {
    this._canFormContentType = value;
    this.updateMe();
  }
  @Input()
  private _canFormAlcohol: string = '';
  get canFormAlcohol(): string { return this._canFormAlcohol; }
  set canFormAlcohol(value: string) {
    this._canFormAlcohol = value;
    this.updateMe();
  }
  @Input()
  private _canFormKeywords: string = '';
  get canFormKeywords(): string { return this._canFormKeywords; }
  set canFormKeywords(value: string) {
    this._canFormKeywords = value;
    this.updateMe();
  }
  @Input()
  private _canFormProdDate: string = '';
  get canFormProdDate(): string { return this._canFormProdDate; }
  set canFormProdDate(value: string) {
    this._canFormProdDate = value;
    this.updateMe();
  }
  @Input()
  private _canFormExpDate: string = '';
  get canFormExpDate(): string { return this._canFormExpDate; }
  set canFormExpDate(value: string) {
    this._canFormExpDate = value;
    this.updateMe();
  }
  @Input()
  private _canFormProdCountry: string = '';
  get canFormProdCountry(): string { return this._canFormProdCountry; }
  set canFormProdCountry(value: string) {
    this._canFormProdCountry = value;
    this.updateMe();
  }
  @Input()
  private _canFormShopCountry: string = '';
  get canFormShopCountry(): string { return this._canFormShopCountry; }
  set canFormShopCountry(value: string) {
    this._canFormShopCountry = value;
    this.updateMe();
  }
  @Input()
  private _canFormLanguage: string = '';
  get canFormLanguage(): string { return this._canFormLanguage; }
  set canFormLanguage(value: string) {
    this._canFormLanguage = value;
    this.updateMe();
  }
  @Input()
  private _canFormEan: string = '';
  get canFormEan(): string { return this._canFormEan; }
  set canFormEan(value: string) {
    this._canFormEan = value;
    this.updateMe();
  }
  @Input()
  private _canFormFname1: string = '';
  get canFormFname1(): string { return this._canFormFname1; }
  set canFormFname1(value: string) {
    this._canFormFname1 = value;
    this.updateMe();
  }
  @Input()
  private _canFormFname2: string = '';
  get canFormFname2(): string { return this._canFormFname2; }
  set canFormFname2(value: string) {
    this._canFormFname2 = value;
    this.updateMe();
  }
  @Input()
  private _canFormFname3: string = '';
  get canFormFname3(): string { return this._canFormFname3; }
  set canFormFname3(value: string) {
    this._canFormFname3 = value;
    this.updateMe();
  }
  @Input()
  private _canFormFname4: string = '';
  get canFormFname4(): string { return this._canFormFname4; }
  set canFormFname4(value: string) {
    this._canFormFname4 = value;
    this.updateMe();
  }
  @Input()
  private _canFormFname5: string = '';
  get canFormFname5(): string { return this._canFormFname5; }
  set canFormFname5(value: string) {
    this._canFormFname5 = value;
    this.updateMe();
  }
  @Input()
  private _canFormNotes: string = '';
  get canFormNotes(): string { return this._canFormNotes; }
  set canFormNotes(value: string) {
    this._canFormNotes = value;
    this.updateMe();
  }

  constructor() { }

  updateMe() {
    this._isActive = true;
    this._isUpdated = new Date();
  }

}
