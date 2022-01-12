export interface canLanguage {
  id: number,
  name: string,
  abbr: string,
  default: boolean
}

export var canLanguage: Array<canLanguage> = [
  {
    id: 1,
    name: "slovenský",
    abbr: "sk",
    default: true
  },
  {
    id: 2,
    name: "český",
    abbr: "cz",
    default: false
  },
  {
    id: 3,
    name: "poľský",
    abbr: "pl",
    default: false
  },
  {
    id: 4,
    name: "maďarský",
    abbr: "hu",
    default: false
  },
  {
    id: 5,
    name: "nemecký",
    abbr: "de",
    default: false
  },
  {
    id: 6,
    name: "francúzsky",
    abbr: "fr",
    default: false
  },
  {
    id: 7,
    name: "španielsky",
    abbr: "es",
    default: false
  },
  {
    id: 8,
    name: "katalánsky",
    abbr: "ca",
    default: false
  },
  {
    id: 9,
    name: "anglický",
    abbr: "en",
    default: false
  },
  {
    id: 10,
    name: "ruský",
    abbr: "ru",
    default: false
  },
]
