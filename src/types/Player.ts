export type Player = {
    id: number
    name: String
    cash: number
    inJail: boolean
    pin: number
    isIA: boolean
    plays: number
    next: boolean
    square: number
    orderDice?: number
    properties: number[]
    jailTurns: number
    hasJailCard?: boolean
}
