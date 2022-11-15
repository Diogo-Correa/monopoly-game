import { ReactNode } from 'react'
import { Pin } from './PinType'
import { Player } from './Player'

export type GameContextType = {
    hasGame: boolean
    pins: Pin[]
    setPins: (newState: any) => void
    setHasGame: (newState: boolean) => void
    isFinished: boolean
    setIsFinished: (newState: boolean) => void
    players: Player[]
    setPlayers: (newState: any) => void
    nextPlayer: Player | null
    setNextPlayer: (newState: Player) => void
    turns: number
    setTurns: (newState: number) => void
    atualizePlayers: (newState: Player) => void
}

export type GameContextProps = {
    children: ReactNode
}
