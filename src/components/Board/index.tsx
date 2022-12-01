import { useEffect, useState, useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import * as icon from 'react-icons/fa'
import { Card, Tabs, Button, Badge, Tooltip, ListGroup } from 'flowbite-react'
import { GameContext } from '../../contexts/game.context'

import { Player } from '../../types/Player'
import { GameBoard } from '../GameBoard'
import { PlayerPin } from '../Pin'
import { ModalContext } from '../../contexts/create.context'
import { Jail } from '../Square/Squares/Jail'
import { doBuy } from '../../util/IA'
import { chances } from '../../util/ChanceCards'
import { communities } from '../../util/CommunityCards'

export function Board() {
    const {
        setHasGame,
        players,
        setPlayers,
        pins,
        nextPlayer,
        setNextPlayer,
        turns,
        setTurns,
        atualizePlayers,
        lang,
        setLang,
        diceRolled,
        setRolled,
        setLastBrought,
    } = useContext(GameContext)
    const { setSquareOpenModal, setSquareId } = useContext(ModalContext)
    const diceId = useRef<number | string>('')
    const loadingId = useRef<number | string>('')
    const cards = useRef<number | string>('')

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

    const turn = (player: Player) => {
        if (player.inJail) {
            diceId.current = toast(
                `${nextPlayer?.name} is in Jail. Waitinig for your decision.`,
                {
                    type: 'default',
                    closeButton: false,
                    closeOnClick: false,
                    icon: icon.FaDice,
                    autoClose: 60000,
                    pauseOnFocusLoss: false,
                }
            )
        } else {
            if (!diceRolled) {
                diceId.current = toast(
                    `Waiting for ${nextPlayer?.name} to roll the dice`,
                    {
                        type: 'default',
                        closeButton: false,
                        closeOnClick: false,
                        icon: icon.FaDice,
                        autoClose: 60000,
                        pauseOnFocusLoss: false,
                    }
                )
            } else {
                diceId.current = toast(
                    `Waiting for ${nextPlayer?.name} finish turn`,
                    {
                        type: 'default',
                        closeButton: false,
                        closeOnClick: false,
                        icon: icon.FaDice,
                        autoClose: 60000,
                        pauseOnFocusLoss: false,
                    }
                )
            }
        }

        if (player.isIA) setTimeout(() => rollDice(player), 10000)
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
        if (player.square === 31) {
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
    }

    const play = (player: Player) => {
        if (player.inJail) finishPlay(player)

        goToJail(player)

        if (player.square === 8 || player.square === 23 || player.square === 37)
            chanceCard(player)

        if (player.square === 3 || player.square === 18 || player.square === 34)
            communityCard(player)

        showCard(player)
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
    }

    const selectOrder = () => {
        let qtd = players.length - 1
        let orderPlayers = [...players]
        while (qtd >= 0) {
            let player = orderPlayers[qtd]
            /* diceId.current = toast(
                `Waiting for ${player.name} to roll the dice`,
                {
                    type: 'default',
                    closeButton: false,
                    closeOnClick: false,
                    autoClose: false,
                    icon: icon.FaDice,
                    pauseOnFocusLoss: false,
                }
            ) */
            rollDice(player)
            qtd--
        }

        orderPlayers = orderPlayers.sort((a, b) => {
            if (a.orderDice && b.orderDice)
                return a.orderDice < b.orderDice ? 1 : -1
            return 0
        })

        if (qtd < 0) {
            orderPlayers[0].next = true
            localStorage.setItem('monopoly/turns', '1')
            localStorage.setItem(
                'monopoly/nextPlayer',
                JSON.stringify(orderPlayers[0])
            )
            localStorage.setItem(
                'monopoly/players',
                JSON.stringify(orderPlayers)
            )
            setPlayers(orderPlayers)
            setNextPlayer(orderPlayers[0])
            setTurns(1)
        }
    }

    const handleControl = (player: Player) => {
        if (player.next)
            return toast(`Its ${player.name}'s round, u can't do it now`, {
                type: 'warning',
            })

        player.isIA = !player.isIA
        atualizePlayers(player)

        toast(`Player ${player.name} has been updated.`, {
            type: 'success',
        })
    }

    const handleChangeTheme = () => {
        if (lang === 'eng') {
            localStorage.setItem('monopoly/lang', 'pt-br')
            setLang('pt-br')
        }
        if (lang === 'pt-br') {
            localStorage.setItem('monopoly/lang', 'eng')
            setLang('eng')
        }
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

    const showCard = (player: Player) => {
        setSquareOpenModal(true)
        setSquareId(player.square)
    }

    const finishGame = () => {
        localStorage.setItem('monopoly/savedGame', 'false')
        localStorage.setItem('monopoly/players', '[]')
        localStorage.setItem('monopoly/turns', '0')
        localStorage.removeItem('monopoly/nextPlayer')
        localStorage.removeItem('monopoly/pins')
        setHasGame(false)
        setPlayers([])
    }

    useEffect(() => {
        if (turns > 0) {
            loadingId.current = toast.loading(`Its ${nextPlayer?.name}'s turn`)
            if (nextPlayer) turn(nextPlayer)
        } else {
            selectOrder()
            toast('Order of players selected')
        }
    }, [nextPlayer])

    return (
        <div className="text-black">
            <Card>
                <Tabs.Group aria-label="Tabs with underline" style="underline">
                    {players?.map((player) => (
                        <Tabs.Item
                            active={player.next ? true : false}
                            key={player.id}
                            title={
                                <>
                                    <Tooltip
                                        content={
                                            player.name
                                                ? player.name
                                                : pins[player.pin].name
                                        }
                                        placement="top"
                                        key={player.pin}
                                    >
                                        <Badge>
                                            <PlayerPin
                                                id={player.pin}
                                                name={''}
                                                selected={false}
                                            />
                                        </Badge>
                                    </Tooltip>
                                </>
                            }
                            icon={!player.isIA ? icon.FaGamepad : icon.FaRobot}
                        >
                            <div className="text-left flex space-between font-extrabold text-base">
                                <>
                                    <icon.FaMoneyBill
                                        size={26}
                                        className="mx-3 text-green-500"
                                    />
                                    ${player.cash}
                                    <icon.FaHouseDamage
                                        size={26}
                                        className="mx-3 text-black"
                                    />
                                    {player.plays}
                                </>
                            </div>
                            <div className="text-left flex font-extrabold text-base my-3">
                                <div className="mr-2">
                                    {!player.isIA &&
                                        player.next &&
                                        !diceRolled && (
                                            <Button
                                                color="light"
                                                onClick={() => rollDice(player)}
                                            >
                                                <icon.FaDice
                                                    size={20}
                                                    className="mr-2"
                                                />{' '}
                                                Roll dice
                                            </Button>
                                        )}
                                    {!player.isIA && player.next && diceRolled && (
                                        <Button
                                            color="warning"
                                            onClick={() => finishPlay(player)}
                                        >
                                            <icon.FaDice
                                                size={20}
                                                className="mr-2"
                                            />{' '}
                                            Finish turn
                                        </Button>
                                    )}
                                </div>
                                {!player.isIA && (
                                    <Button
                                        color="dark"
                                        onClick={() => handleControl(player)}
                                    >
                                        Surrender
                                    </Button>
                                )}
                                {player.isIA && (
                                    <Button
                                        color="dark"
                                        onClick={() => handleControl(player)}
                                    >
                                        Get control
                                    </Button>
                                )}
                            </div>
                        </Tabs.Item>
                    ))}

                    <Tabs.Item title="Game" icon={icon.FaCog}>
                        <div className="w-full text-center">
                            <ListGroup>
                                <ListGroup.Item
                                    icon={icon.FaGlobeAmericas}
                                    onClick={handleChangeTheme}
                                >
                                    Change theme
                                </ListGroup.Item>
                                <ListGroup.Item icon={icon.FaCog}>
                                    Settings
                                </ListGroup.Item>
                                <ListGroup.Item
                                    icon={icon.FaDoorClosed}
                                    onClick={finishGame}
                                >
                                    Finish game
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Tabs.Item>
                </Tabs.Group>
            </Card>

            <GameBoard />
        </div>
    )
}
