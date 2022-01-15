import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class canbankRecordService {

  @Input()
  private _canFormType: number = -1;
  get canFormType(): number { return this._canFormType; }
  set canFormType(value: number) { this._canFormType = value; }
  @Input()
  private _canFormDiameter: number = -1;
  get canFormDiameter(): number { return this._canFormDiameter; }
  set canFormDiameter(value: number) { this._canFormDiameter = value; }
  @Input()
  private _canFormHeight: number = -1;
  get canFormHeight(): number { return this._canFormHeight; }
  set canFormHeight(value: number) { this._canFormHeight = value; }
  @Input()
  private _canFormVolume: number = -1;
  get canFormVolume(): number { return this._canFormVolume; }
  set canFormVolume(value: number) { this._canFormVolume = value; }
  @Input()
  private _canFormVolumeFlOz: number = -1;
  get canFormVolumeFlOz(): number { return this._canFormVolumeFlOz; }
  set canFormVolumeFlOz(value: number) { this._canFormVolumeFlOz = value; }
  @Input()
  private _canFormMaterial: number = -1;
  get canFormMaterial(): number { return this._canFormMaterial; }
  set canFormMaterial(value: number) { this._canFormMaterial = value; }
  @Input()
  private _canFormSurface: number = -1;
  get canFormSurface(): number { return this._canFormSurface; }
  set canFormSurface(value: number) { this._canFormSurface = value; }
  @Input()
  private _canFormCoverColor: number = -1;
  get canFormCoverColor(): number { return this._canFormCoverColor; }
  set canFormCoverColor(value: number) { this._canFormCoverColor = value; }
  @Input()
  private _canFormOpenerColor: number = -1;
  get canFormOpenerColor(): number { return this._canFormOpenerColor; }
  set canFormOpenerColor(value: number) { this._canFormOpenerColor = value; }
  @Input()
  private _canFormBrand: string = '';
  get canFormBrand(): string { return this._canFormBrand; }
  set canFormBrand(value: string) { this._canFormBrand = value; }
  @Input()
  private _canFormContentName: string = '';
  get canFormContentName(): string { return this._canFormContentName; }
  set canFormContentName(value: string) { this._canFormContentName = value; }
  @Input()
  private _canFormContentType: number = -1;
  get canFormContentType(): number { return this._canFormContentType; }
  set canFormContentType(value: number) { this._canFormContentType = value; }
  @Input()
  private _canFormAlcohol: number = -1;
  get canFormAlcohol(): number { return this._canFormAlcohol; }
  set canFormAlcohol(value: number) { this._canFormAlcohol = value; }
  @Input()
  private _canFormKeywords: string = '';
  get canFormKeywords(): string { return this._canFormKeywords; }
  set canFormKeywords(value: string) { this._canFormKeywords = value; }
  @Input()
  private _canFormProdDate: number = -1;
  get canFormProdDate(): number { return this._canFormProdDate; }
  set canFormProdDate(value: number) { this._canFormProdDate = value; }
  @Input()
  private _canFormExpDate: number = -1;
  get canFormExpDate(): number { return this._canFormExpDate; }
  set canFormExpDate(value: number) { this._canFormExpDate = value; }
  @Input()
  private _canFormProdCountry: number = -1;
  get canFormProdCountry(): number { return this._canFormProdCountry; }
  set canFormProdCountry(value: number) { this._canFormProdCountry = value; }
  @Input()
  private _canFormShopCountry: number = -1;
  get canFormShopCountry(): number { return this._canFormShopCountry; }
  set canFormShopCountry(value: number) { this._canFormShopCountry = value; }
  @Input()
  private _canFormLanguage: number = -1;
  get canFormLanguage(): number { return this._canFormLanguage; }
  set canFormLanguage(value: number) { this._canFormLanguage = value; }
  @Input()
  private _canFormEan: string = '';
  get canFormEan(): string { return this._canFormEan; }
  set canFormEan(value: string) { this._canFormEan = value; }
  @Input()
  private _canFormFname1: string = '';
  get canFormFname1(): string { return this._canFormFname1; }
  set canFormFname1(value: string) { this._canFormFname1 = value; }
  @Input()
  private _canFormFname2: string = '';
  get canFormFname2(): string { return this._canFormFname2; }
  set canFormFname2(value: string) { this._canFormFname2 = value; }
  @Input()
  private _canFormFname3: string = '';
  get canFormFname3(): string { return this._canFormFname3; }
  set canFormFname3(value: string) { this._canFormFname3 = value; }
  @Input()
  private _canFormFname4: string = '';
  get canFormFname4(): string { return this._canFormFname4; }
  set canFormFname4(value: string) { this._canFormFname4 = value; }
  @Input()
  private _canFormFname5: string = '';
  get canFormFname5(): string { return this._canFormFname5; }
  set canFormFname5(value: string) { this._canFormFname5 = value; }
  @Input()
  private _canFormNotes: string = '';
  get canFormNotes(): string { return this._canFormNotes; }
  set canFormNotes(value: string) { this._canFormNotes = value; }

constructor() { }

}
