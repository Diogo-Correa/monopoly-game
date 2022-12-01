import { createContext, ReactNode, useEffect, useState } from 'react'
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

const lastBroughtStorage = localStorage.getItem('monopoly/lastBrought')
let initialLastBrought = 0
if (lastBroughtStorage) initialLastBrought = Number(lastBroughtStorage)

const langStorage = localStorage.getItem('monopoly/lang')
let initialLang = 'eng'
if (langStorage) initialLang = langStorage

const rolledStorage = localStorage.getItem('monopoly/diceRolled')
let initialRolled = rolledStorage === 'true'

const actionStorage = localStorage.getItem('monopoly/actionRequired')
let initialAction = actionStorage === 'true'

const initialValue: GameContextType = {
    hasGame: localStorage.getItem('monopoly/savedGame') === 'true',
    pins: initialPins,
    setPins: () => {},
    setHasGame: () => {},
    players: initialPlayers,
    setPlayers: () => {},
    nextPlayer: initialNext,
    setNextPlayer: () => {},
    turns: initialTurns,
    setTurns: () => {},
    atualizePlayers: () => {},
    lang: initialLang,
    setLang: () => {},
    diceRolled: initialRolled,
    setRolled: () => {},
    lastBrought: initialLastBrought,
    setLastBrought: () => {},
    actionRequired: initialAction,
    setActionRequired: () => {},
}

export const GameContext = createContext<GameContextType>(initialValue)

export const GameContextProvider = ({ children }: GameContextProps) => {
    const [hasGame, setHasGame] = useState(initialValue.hasGame)
    const [actionRequired, setActionRequired] = useState(
        initialValue.actionRequired
    )
    const [diceRolled, setRolled] = useState(initialValue.diceRolled)
    const [players, setPlayers] = useState<Player[]>(initialValue.players)
    const [pins, setPins] = useState<Pin[]>(initialValue.pins)
    const [nextPlayer, setNextPlayer] = useState<Player | null>(
        initialValue.nextPlayer
    )
    const [turns, setTurns] = useState<number>(initialValue.turns)
    const [lastBrought, setLastBrought] = useState<number>(
        initialValue.lastBrought
    )
    const [lang, setLang] = useState<string>(initialValue.lang)

    const atualizePlayers = (player: Player) => {
        const playersState = [...players]

        playersState.map((oldPlayer) => {
            const index = playersState.indexOf(oldPlayer)
            if (oldPlayer.id === player.id) playersState[index] = player

            localStorage.setItem(
                'monopoly/players',
                JSON.stringify(playersState)
            )
            setPlayers(playersState)
        })
    }

    return (
        <GameContext.Provider
            value={{
                hasGame,
                pins,
                setPins,
                setHasGame,
                players,
                setPlayers,
                nextPlayer,
                setNextPlayer,
                turns,
                setTurns,
                atualizePlayers,
                lang,
                setLang,
                diceRolled,
                setRolled,
                lastBrought,
                setLastBrought,
                actionRequired,
                setActionRequired,
            }}
        >
            {children}
            <ModalContextProvider>
                <div className="App">{!hasGame ? <Menu /> : <Board />}</div>
            </ModalContextProvider>
        </GameContext.Provider>
    )
}
