export interface canLanguage {
  value: number,
  name: string,
  abbr: string,
  default: boolean
}

export var canLanguage: Array<canLanguage> = [
  {
    value: 1,
    name: "slovenský",
    abbr: "sk",
    default: true
  },
  {
    value: 2,
    name: "český",
    abbr: "cz",
    default: false
  },
  {
    value: 3,
    name: "poľský",
    abbr: "pl",
    default: false
  },
  {
    value: 4,
    name: "maďarský",
    abbr: "hu",
    default: false
  },
  {
    value: 5,
    name: "nemecký",
    abbr: "de",
    default: false
  },
  {
    value: 6,
    name: "francúzsky",
    abbr: "fr",
    default: false
  },
  {
    value: 7,
    name: "španielsky",
    abbr: "es",
    default: false
  },
  {
    value: 8,
    name: "katalánsky",
    abbr: "ca",
    default: false
  },
  {
    value: 9,
    name: "anglický",
    abbr: "en",
    default: false
  },
  {
    value: 10,
    name: "ruský",
    abbr: "ru",
    default: false
  },
]
