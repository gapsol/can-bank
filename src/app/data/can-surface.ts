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
    color: "#fff0b0",
    default: true
  },
  {
    id: 2,
    name: "matný",
    color: "#b0b0b0",
    default: false
  },
  {
    id: 3,
    name: "fólia",
    color: "#b0b0ff",
    default: false
  },
  {
    id: 4,
    name: "papier",
    color: "#ffffff",
    default: false
  },
]
