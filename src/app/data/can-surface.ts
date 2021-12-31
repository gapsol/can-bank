export interface canSurface {
  value: number,
  name: string,
  color: string,
  default: boolean
}

export var canSurface: Array<canSurface> = [
  {
    value: 1,
    name: "lesklý",
    color: "lightgray",
    default: true
  },
  {
    value: 2,
    name: "matný",
    color: "silver",
    default: false
  },
  {
    value: 3,
    name: "fólia",
    color: "yellow",
    default: false
  },
  {
    value: 4,
    name: "papier",
    color: "white",
    default: false
  },
]
