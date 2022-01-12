export interface canMaterial {
  id: number,
  name: string,
  abbr: string,
  color: string,
  default: boolean
}

export var canMaterial: Array<canMaterial> = [
  {
    id: 1,
    name: "hliník",
    abbr: "Al",
    color: "silver",
    default: true
  },
  {
    id: 2,
    name: "oceľ",
    abbr: "Fe",
    color: "gray",
    default: false
  },
]
