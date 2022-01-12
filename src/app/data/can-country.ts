export interface canCountry {
  id: number,
  name: string,
  abbr: string,
  default: boolean
}

export var canCountry: Array<canCountry> = [
  {
    id: 1,
    name: "Slovensko",
    abbr: "SK",
    default: true
  },
  {
    id: 2,
    name: "Česko",
    abbr: "CZ",
    default: false
  },
  {
    id: 3,
    name: "Poľsko",
    abbr: "PL",
    default: false
  },
  {
    id: 4,
    name: "Maďarsko",
    abbr: "HU",
    default: false
  },
  {
    id: 5,
    name: "Nemecko",
    abbr: "DE",
    default: false
  },
  {
    id: 6,
    name: "Rakúsko",
    abbr: "AT",
    default: false
  },
  {
    id: 7,
    name: "Francúzsko",
    abbr: "FR",
    default: false
  },
  {
    id: 8,
    name: "Španielsko",
    abbr: "ES",
    default: false
  },
  {
    id: 9,
    name: "Ukrajina",
    abbr: "UA",
    default: false
  },
]
