export interface ServerInterface {
    id: number
    // Define other properties of the Server model here
}

export interface KeyInterface {
    id: number
    internal_id: string
    type: number
    createdAt: Date
    validTill: Date
    address: string
    server?: ServerInterface | null
    serverId?: number | null
    user?: UserInterface | null
    userId?: number | null
}
export interface UserInterface {
    id: number
    username: string
    telegramId: string
    email?: string
    createdAt: Date
    keys: KeyInterface[]
    role: number
    image: undefined | string
}
