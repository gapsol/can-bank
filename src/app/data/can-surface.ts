export interface canSurface {
  id: number,
  name: string,
  color: string,
  default: boolean
}

export var canSurface: Array<canSurface> = [
  {
    id: 1,
    name: "lesklý",
    color: "lightgray",
    default: true
  },
  {
    id: 2,
    name: "matný",
    color: "silver",
    default: false
  },
  {
    id: 3,
    name: "fólia",
    color: "yellow",
    default: false
  },
  {
    id: 4,
    name: "papier",
    color: "white",
    default: false
  },
]
