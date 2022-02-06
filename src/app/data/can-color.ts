export interface canColor {
  id: number,
  name: string,
  color: string,
  code: string,
  default: boolean
}

export var canColor: Array<canColor> = [
  {
    id: 1,
    name: "kov - strieborný",
    color: "silver",
    code: "",
    default: true
  },
  {
    id: 2,
    name: "kov - zlatý",
    color: "gold",
    code: "",
    default: false
  },
  {
    id: 3,
    name: "modrá",
    color: "blue",
    code: "",
    default: false
  },
  {
    id: 4,
    name: "červená",
    color: "red",
    code: "",
    default: false
  },
  {
    id: 5,
    name: "žltá",
    color: "yellow",
    code: "",
    default: false
  },
  {
    id: 6,
    name: "čierna",
    color: "black",
    code: "",
    default: false
  },
]
