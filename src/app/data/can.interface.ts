export interface canBank {
  id: number,
  type: number,
  diameter: number,
  height: number,
  volume: number,
  volumeFlOz: number,
  material: number,
  surface: number,
  cover_color: number,
  opener_color: number,
  brand: string,
  content_name: string,
  content_type: number,
  alcohol: number,
  keywords: string,
  prod_date: string,
  exp_date: string,
  prod_country: number,
  shop_country: number,
  language: number,
  ean: string,
  fname1: string,
  fname2: string,
  fname3: string,
  fname4: string,
  fname5: string,
  notes: string
}

export interface canColor {
  id: number,
  name: string,
  color: string,
  code: string,
  default: boolean,
  removable: boolean
}

export interface canContentType {
  id: number,
  name: string,
  default: boolean,
  removable: boolean
}

export interface canCountry {
  name: string,
  abbr: string
  default: boolean,
  removable: boolean
}

export interface canLanguage {
  name: string,
  abbr: string,
  default: boolean,
  removable: boolean
}

export interface canMaterial {
  id: number,
  name: string,
  abbr: string,
  color: string,
  default: boolean,
  removable: boolean
}

export interface canSurface {
  id: number,
  name: string,
  color: string,
  default: boolean,
  removable: boolean
}

export interface canType {
  id: number,
  name: string,
  diameter: number,
  height: number,
  volume: number,
  volumeFlOz: number,
  default: boolean,
  removable: boolean
}

export type defaultKey = number | string;

export interface canDefault {
  table: string,
  key: defaultKey
}

export interface canDefaults {
  color: defaultKey,
  content: defaultKey,
  country: defaultKey,
  language: defaultKey,
  material: defaultKey,
  surface: defaultKey,
  type: defaultKey
}
