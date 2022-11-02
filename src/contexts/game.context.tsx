import { createContext, ReactNode, useState } from 'react'
import { Board } from '../components/Board'
import { Menu } from '../components/Menu'
import { ModalContextProvider } from '../contexts/create.context'
import { GameContextType, GameContextProps } from '../types/GameContext'
import { Player } from '../types/Player'

const playersStorage = localStorage.getItem('monopoly/players')
let initialPlayers = []
if (playersStorage) initialPlayers = JSON.parse(playersStorage)

const initialValue: GameContextType = {
    hasGame: localStorage.getItem('monopoly/savedGame') === 'true',
    setHasGame: () => {},
    isFinished: false,
    setIsFinished: () => {},
    players: initialPlayers,
    setPlayers: () => {},
}

export const GameContext = createContext<GameContextType>(initialValue)

export const GameContextProvider = ({ children }: GameContextProps) => {
    const [hasGame, setHasGame] = useState(initialValue.hasGame)
    const [isFinished, setIsFinished] = useState(initialValue.isFinished)
    const [players, setPlayers] = useState<Player[]>(initialValue.players)

    return (
        <GameContext.Provider
            value={{
                hasGame,
                setHasGame,
                isFinished,
                setIsFinished,
                players,
                setPlayers,
            }}
        >
            {children}
            <ModalContextProvider>
                <div className="App">{!hasGame ? <Menu /> : <Board />}</div>
            </ModalContextProvider>
        </GameContext.Provider>
    )
}
