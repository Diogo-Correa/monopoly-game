import { createContext, useContext, useRef, useState } from 'react'
import { Board } from '../components/Board'
import { Menu } from '../components/Menu'
import { ModalContextProvider } from '../contexts/create.context'
import { GameContextType, GameContextProps } from '../types/GameContext'
import { Pin } from '../types/PinType'
import { Player } from '../types/Player'
import { pinsArr } from '../util/PinsArray'
import { toast } from 'react-toastify'
import { ModalContext } from '../contexts/create.context'
import { chances } from '../util/ChanceCards'
import { communities } from '../util/CommunityCards'
import * as icon from 'react-icons/fa'

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

const showStorage = localStorage.getItem('monopoly/showCard')
let initialShow = showStorage === 'true'

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
    showCard: initialShow,
    setShowCard: () => {},
    lastBrought: initialLastBrought,
    setLastBrought: () => {},
    actionRequired: initialAction,
    setActionRequired: () => {},
    loadingId: null,
    diceId: null,
    finishPlay: () => {},
    rollDice: () => {},
}

export const GameContext = createContext<GameContextType>(initialValue)

export const GameContextProvider = ({ children }: GameContextProps) => {
    const [hasGame, setHasGame] = useState(initialValue.hasGame)
    const [actionRequired, setActionRequired] = useState(
        initialValue.actionRequired
    )
    const [diceRolled, setRolled] = useState(initialValue.diceRolled)
    const [showCard, setShowCard] = useState(initialValue.showCard)
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
    const diceId = useRef<number | string>('')
    const loadingId = useRef<number | string>('')
    const cards = useRef<number | string>('')

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

    const rollDice = (player: Player) => {
        let [dice1, dice2] = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
        ]

        if (turns === 0) {
            player.orderDice = dice1 + dice2
            return atualizePlayers(player)
        } else {
            players.map((p) => {
                if (p === player) {
                    let nextSquare = player.square + dice1 + dice2

                    if (
                        player.inJail &&
                        player.jailTurns < 3 &&
                        dice1 === dice2
                    ) {
                        player.inJail = false
                        player.jailTurns = 0
                    }

                    if (
                        player.inJail &&
                        player.jailTurns < 2 &&
                        dice1 !== dice2
                    ) {
                        player.jailTurns += 1
                        atualizePlayers(player)
                        return finishPlay(player)
                    }

                    if (
                        player.inJail &&
                        player.jailTurns === 2 &&
                        dice1 !== dice2
                    ) {
                        player.cash -= 50
                        player.inJail = false
                        player.jailTurns = 0
                        toast(`${player.name} paid $50 to leave the jail.`)
                    }

                    if (nextSquare > 40) {
                        player.square = Math.abs(nextSquare - 40)
                        player.cash += 200
                    } else player.square = nextSquare

                    atualizePlayers(player)

                    toast.update(diceId.current, {
                        render: `${player.name} rolled ${dice1} and ${dice2}`,
                        type: 'success',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                    })
                }
            })
            localStorage.setItem('monopoly/diceRolled', 'true')
            setRolled(true)
            play(player)
        }
    }

    const takeACommunityCard = () => {
        let rand = Math.floor(Math.random() * communities.length) + 1
        let jailCard

        if (communities[rand].hasJailCard) {
            players.map((p) => {
                if (p.hasJailCard) jailCard = true
            })
            jailCard ? rand++ : null
        }

        return communities[rand]
    }

    const communityCard = (player: Player) => {
        cards.current = toast(`Sorting`, {
            isLoading: true,
        })

        const chanceCard = takeACommunityCard()

        if (chanceCard.collectAll) {
            player.cash += chanceCard.collectAll * players.length
            players.map((p) => {
                if (p.id != player.id) {
                    console.log(`Player: ${player.cash}`)
                    console.log(`Old Cash: ${p.cash}`)
                    p.cash -= chanceCard.collectAll
                    console.log(`New Cash: ${p.cash}`)
                    atualizePlayers(p)
                }
            })
        }

        if (chanceCard.goToJail) goToJail(player)

        if (chanceCard.hasJailCard) player.hasJailCard = true

        if (chanceCard.pay) {
            console.log(`Player cash: ${player.cash}`)
            player.cash -= chanceCard.pay
            console.log(`Player new cash: ${player.cash}`)
        }

        if (chanceCard.goTo && chanceCard.collect) {
            console.log(`Player cash: ${player.cash}`)
            if (player.square > chanceCard.goTo)
                player.cash += chanceCard.collect

            console.log(`Player new cash: ${player.cash}`)
            player.square = chanceCard.goTo
        }

        if (!chanceCard.goTo && chanceCard.collect) {
            console.log(`Player cash: ${player.cash}`)
            player.cash += chanceCard.collect
            console.log(`Player new cash: ${player.cash}`)
        }

        toast.update(cards.current, {
            render: `${chanceCard.card}`,
            isLoading: false,
            autoClose: 10000,
            icon: icon.FaCube,
            type: 'info',
        })

        atualizePlayers(player)
    }

    const takeAChanceCard = () => {
        let rand = Math.floor(Math.random() * 16) + 1
        let jailCard

        if (chances[rand].hasJailCard) {
            players.map((p) => {
                if (p.hasJailCard) jailCard = true
            })
            jailCard ? rand++ : null
        }

        return chances[rand]
    }

    const chanceCard = (player: Player) => {
        cards.current = toast(`Sorting`, {
            isLoading: true,
        })

        const chanceCard = takeAChanceCard()

        if (chanceCard.payToAll) {
            player.cash -= chanceCard.payToAll * players.length
            players.map((p) => {
                if (p.id != player.id) {
                    console.log(`Player: ${player.cash}`)
                    console.log(`Old Cash: ${p.cash}`)
                    p.cash += chanceCard.payToAll
                    console.log(`New Cash: ${p.cash}`)
                    atualizePlayers(p)
                }
            })
        }

        if (chanceCard.goToJail) goToJail(player)

        if (chanceCard.hasJailCard) player.hasJailCard = true

        if (chanceCard.pay) {
            console.log(`Player cash: ${player.cash}`)
            player.cash -= chanceCard.pay
            console.log(`Player new cash: ${player.cash}`)
        }

        if (chanceCard.goBack) player.square -= chanceCard.goBack

        if (chanceCard.goTo && chanceCard.collect) {
            console.log(`Player cash: ${player.cash}`)
            if (player.square > chanceCard.goTo)
                player.cash += chanceCard.collect

            console.log(`Player new cash: ${player.cash}`)
            player.square = chanceCard.goTo
        }

        if (!chanceCard.goTo && chanceCard.collect) {
            console.log(`Player cash: ${player.cash}`)
            player.cash += chanceCard.collect
            console.log(`Player new cash: ${player.cash}`)
        }

        toast.update(cards.current, {
            render: `${chanceCard.card}`,
            isLoading: false,
            autoClose: 10000,
            icon: icon.FaQuestion,
            type: 'warning',
        })

        atualizePlayers(player)
    }

    const goToJail = (player: Player) => {
        // Go to Jail
        setSquareOpenModal(true)
        setSquareId(11)

        player.square = 11
        player.inJail = true
        player.jailTurns = 0
        atualizePlayers(player)

        toast(`${player.name} went to jail.`, {
            type: 'error',
        })

        finishPlay(player)
    }

    const play = (player: Player) => {
        if (player.inJail) finishPlay(player)

        if (player.square === 31) {
            goToJail(player)
        }

        if (player.square === 8 || player.square === 23 || player.square === 37)
            chanceCard(player)

        if (player.square === 3 || player.square === 18 || player.square === 34)
            communityCard(player)

        setShowCard(true)
    }

    const getNextPlayer = () => {
        players.map((player, idx) => {
            if (player.id === nextPlayer?.id) {
                const nextP =
                    players[idx + 1 > players.length - 1 ? 0 : idx + 1]
                nextP.next = true
                atualizePlayers(nextP)

                if (idx + 1 > players.length - 1) {
                    const nextTurn = turns + 1
                    localStorage.setItem('monopoly/turns', String(nextTurn))
                    setTurns(nextTurn)
                }

                localStorage.setItem(
                    'monopoly/nextPlayer',
                    JSON.stringify(nextP)
                )
                setNextPlayer(nextP)
            }
        })
    }

    const finishPlay = (player: Player) => {
        toast.update(loadingId.current, {
            render: `${player.name}'s turn is over`,
            type: 'info',
            autoClose: 1000,
            isLoading: false,
        })

        toast.update(diceId.current, {
            type: 'info',
            autoClose: 1,
        })

        player.next = false
        player.plays++
        atualizePlayers(player)

        getNextPlayer()
        localStorage.setItem('monopoly/diceRolled', 'false')
        setRolled(false)
        localStorage.setItem('monopoly/lastBrought', '0')
        setLastBrought(0)
        setShowCard(false)
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
                loadingId,
                diceId,
                finishPlay,
                rollDice,
                showCard,
                setShowCard,
            }}
        >
            {children}
            <ModalContextProvider>
                <div className="App">{!hasGame ? <Menu /> : <Board />}</div>
            </ModalContextProvider>
        </GameContext.Provider>
    )
}
