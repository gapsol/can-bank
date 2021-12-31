export interface canColor {
  value: number,
  name: string,
  color: string,
  default: boolean
}

export var canColor: Array<canColor> = [
  {
    value: 1,
    name: "kov - strieborný",
    color: "silver",
    default: true
  },
  {
    value: 2,
    name: "kov - žltý",
    color: "gold",
    default: false
  },
  {
    value: 3,
    name: "modrá",
    color: "blue",
    default: false
  },
  {
    value: 4,
    name: "červená",
    color: "red",
    default: false
  },
  {
    value: 5,
    name: "žltá",
    color: "yellow",
    default: false
  },
]
