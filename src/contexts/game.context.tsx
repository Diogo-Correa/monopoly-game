import { createContext, ReactNode, useState } from 'react'
import { Board } from '../components/Board'
import { Menu } from '../components/Menu'
import { ModalContextProvider } from '../contexts/create.context'
import { GameContextType, GameContextProps } from '../types/GameContext'
import { Pin } from '../types/PinType'
import { Player } from '../types/Player'
import { pinsArr } from '../util/PinsArray'

const playersStorage = localStorage.getItem('monopoly/players')
let initialPlayers = []
if (playersStorage) initialPlayers = JSON.parse(playersStorage)

const pinsStorage = localStorage.getItem('monopoly/pins')
let initialPins = pinsArr
if (pinsStorage) initialPins = JSON.parse(pinsStorage)

const nextStorage = localStorage.getItem('monopoly/nextPlayer')
let initialNext = null
if (nextStorage) initialNext = JSON.parse(nextStorage)

const turnsStorage = localStorage.getItem('monopoly/turns')
let initialTurns = 0
if (turnsStorage) initialTurns = Number(turnsStorage)

const initialValue: GameContextType = {
    hasGame: localStorage.getItem('monopoly/savedGame') === 'true',
    pins: initialPins,
    setPins: () => {},
    setHasGame: () => {},
    isFinished: false,
    setIsFinished: () => {},
    players: initialPlayers,
    setPlayers: () => {},
    nextPlayer: initialNext,
    setNextPlayer: () => {},
    turns: initialTurns,
    setTurns: () => {},
}

export const GameContext = createContext<GameContextType>(initialValue)

export const GameContextProvider = ({ children }: GameContextProps) => {
    const [hasGame, setHasGame] = useState(initialValue.hasGame)
    const [isFinished, setIsFinished] = useState(initialValue.isFinished)
    const [players, setPlayers] = useState<Player[]>(initialValue.players)
    const [pins, setPins] = useState<Pin[]>(initialValue.pins)
    const [nextPlayer, setNextPlayer] = useState<Player | null>(
        initialValue.nextPlayer
    )
    const [turns, setTurns] = useState<number>(initialValue.turns)

    return (
        <GameContext.Provider
            value={{
                hasGame,
                pins,
                setPins,
                setHasGame,
                isFinished,
                setIsFinished,
                players,
                setPlayers,
                nextPlayer,
                setNextPlayer,
                turns,
                setTurns,
            }}
        >
            {children}
            <ModalContextProvider>
                <div className="App">{!hasGame ? <Menu /> : <Board />}</div>
            </ModalContextProvider>
        </GameContext.Provider>
    )
}
