import { Community } from "./community.type"
import { Role } from "./role.type"

export type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    birthdate: Date
    gender: Number
    role: Role
    loggedInCommunity: Community
}