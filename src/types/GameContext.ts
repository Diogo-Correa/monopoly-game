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
}

export type GameContextProps = {
    children: ReactNode
}
