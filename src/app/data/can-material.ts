export interface canMaterial {
  value: number,
  name: string,
  abbr: string,
  color: string,
  default: boolean
}

export var canMaterial: Array<canMaterial> = [
  {
    value: 1,
    name: "hliník",
    abbr: "Al",
    color: "silver",
    default: true
  },
  {
    value: 2,
    name: "oceľ",
    abbr: "Fe",
    color: "gray",
    default: false
  },
]
