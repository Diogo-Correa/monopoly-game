import { useEffect, useState, useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import * as icon from 'react-icons/fa'
import { Card, Tabs, Button, Badge, Tooltip } from 'flowbite-react'
import { GameContext } from '../../contexts/game.context'

import { Player } from '../../types/Player'
import { GameBoard } from '../GameBoard'
import { PlayerPin } from '../Pin'

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
    } = useContext(GameContext)
    const diceId = useRef<number | string>('')
    const loadingId = useRef<number | string>('')

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

                    if (nextSquare > 40)
                        player.square = Math.abs(nextSquare - 40)
                    else player.square = nextSquare

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

            play(player)
        }
    }

    const turn = (player: Player) => {
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

        if (player.isIA) setTimeout(() => rollDice(player), 10000)
    }

    const play = (player: Player) => {
        toast.update(loadingId.current, {
            render: `${player.name}'s turn is over`,
            type: 'info',
            autoClose: 1000,
            isLoading: false,
        })

        player.next = false
        player.plays++
        atualizePlayers(player)

        getNextPlayer()
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

    const getNextPlayer = () => {
        if (nextPlayer) {
            const nextIndex = players.indexOf(nextPlayer) + 1
            const nextP =
                players[nextIndex > players.length - 1 ? 0 : nextIndex]
            nextP.next = true
            atualizePlayers(nextP)

            if (nextIndex > players.length - 1) {
                const nextTurn = turns + 1
                localStorage.setItem('monopoly/turns', String(nextTurn))
                setTurns(nextTurn)
            }

            localStorage.setItem('monopoly/nextPlayer', JSON.stringify(nextP))
            setNextPlayer(nextP)
        }
    }

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
                                                key={player.pin}
                                            />
                                        </Badge>
                                    </Tooltip>
                                </>
                            }
                            icon={!player.isIA ? icon.FaGamepad : icon.FaRobot}
                            key={player.pin}
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
                                    {!player.isIA && player.next && (
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
                        <Button color="dark" onClick={finishGame}>
                            Finish
                        </Button>
                    </Tabs.Item>
                </Tabs.Group>
            </Card>

            <GameBoard />
        </div>
    )
}
