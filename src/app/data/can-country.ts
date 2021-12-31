export interface canCountry {
  value: number,
  name: string,
  abbr: string,
  default: boolean
}

export var canCountry: Array<canCountry> = [
  {
    value: 1,
    name: "Slovensko",
    abbr: "SK",
    default: true
  },
  {
    value: 2,
    name: "Česko",
    abbr: "CZ",
    default: false
  },
  {
    value: 3,
    name: "Poľsko",
    abbr: "PL",
    default: false
  },
  {
    value: 4,
    name: "Maďarsko",
    abbr: "HU",
    default: false
  },
  {
    value: 5,
    name: "Nemecko",
    abbr: "DE",
    default: false
  },
  {
    value: 6,
    name: "Rakúsko",
    abbr: "AT",
    default: false
  },
  {
    value: 7,
    name: "Francúzsko",
    abbr: "FR",
    default: false
  },
  {
    value: 8,
    name: "Španielsko",
    abbr: "ES",
    default: false
  },
  {
    value: 9,
    name: "Ukrajina",
    abbr: "UA",
    default: false
  },
]
