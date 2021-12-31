export interface canContentType {
  value: number,
  name: string,
  default: boolean
}

export var canContentType: Array<canContentType> = [
  {
    value: 1,
    name: "pivo",
    default: true
  },
  {
    value: 2,
    name: "radler",
    default: false
  },
  {
    value: 3,
    name: "cider",
    default: false
  },
  {
    value: 4,
    name: "limonáda",
    default: false
  },
  {
    value: 5,
    name: "energy drink",
    default: false
  },
  {
    value: 6,
    name: "voda",
    default: false
  },
  {
    value: 7,
    name: "káva",
    default: false
  },
  {
    value: 8,
    name: "víno",
    default: false
  },
  {
    value: 9,
    name: "mix",
    default: false
  },
]
