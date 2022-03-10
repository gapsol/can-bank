import { canMaterial } from "./can.interface";

export var canMaterials: Array<canMaterial> = [
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
