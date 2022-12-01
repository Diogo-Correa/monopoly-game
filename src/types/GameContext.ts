import { ReactNode } from 'react'
import { Pin } from './PinType'
import { Player } from './Player'

export type GameContextType = {
    hasGame: boolean
    pins: Pin[]
    setPins: (newState: any) => void
    setHasGame: (newState: boolean) => void
    players: Player[]
    setPlayers: (newState: any) => void
    nextPlayer: Player | null
    setNextPlayer: (newState: Player) => void
    turns: number
    setTurns: (newState: number) => void
    atualizePlayers: (newState: Player) => void
    lang: string
    setLang: (newState: string) => void
    diceRolled: boolean
    setRolled: (newState: boolean) => void
    showCard: boolean
    setShowCard: (newState: boolean) => void
    lastBrought: number
    setLastBrought: (newState: number) => void
    actionRequired: boolean
    setActionRequired: (newState: boolean) => void
    loadingId: any
    diceId: any
    finishPlay: (newState: Player) => void
    rollDice: (newState: Player) => void
}

export type GameContextProps = {
    children: ReactNode
}
