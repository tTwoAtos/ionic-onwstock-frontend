import { Emplacement } from "./emplacement.type"

export type Community = {
    id: string
    name: string
    cityCode: string
    emplacements: Emplacement[]
    nbProducts?: number
}