export interface canColor {
  id: number,
  name: string,
  color: string,
  default: boolean
}

export var canColor: Array<canColor> = [
  {
    id: 1,
    name: "kov - strieborný",
    color: "silver",
    default: true
  },
  {
    id: 2,
    name: "kov - zlatý",
    color: "gold",
    default: false
  },
  {
    id: 3,
    name: "modrá",
    color: "blue",
    default: false
  },
  {
    id: 4,
    name: "červená",
    color: "red",
    default: false
  },
  {
    id: 5,
    name: "žltá",
    color: "yellow",
    default: false
  },
  {
    id: 6,
    name: "čierna",
    color: "black",
    default: false
  },
]
