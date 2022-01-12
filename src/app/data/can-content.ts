export interface canContentType {
  id: number,
  name: string,
  default: boolean
}

export var canContentType: Array<canContentType> = [
  {
    id: 1,
    name: "pivo",
    default: true
  },
  {
    id: 2,
    name: "radler",
    default: false
  },
  {
    id: 3,
    name: "cider",
    default: false
  },
  {
    id: 4,
    name: "limonáda",
    default: false
  },
  {
    id: 5,
    name: "energy drink",
    default: false
  },
  {
    id: 6,
    name: "voda",
    default: false
  },
  {
    id: 7,
    name: "káva",
    default: false
  },
  {
    id: 8,
    name: "víno",
    default: false
  },
  {
    id: 9,
    name: "mix",
    default: false
  },
]
