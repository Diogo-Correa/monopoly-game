import { useEffect, useState, useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import * as icon from 'react-icons/fa'
import { ModalContext } from '../../contexts/create.context'
import { ColorBar } from '../Square/Squares/ColorBar'
import { BoardTheme } from '../Board/theme'
import {
    Card,
    Tabs,
    Button,
    Badge,
    Tooltip,
    ListGroup,
    Accordion,
} from 'flowbite-react'
import { GameContext } from '../../contexts/game.context'

import { Player } from '../../types/Player'
import { GameBoard } from '../GameBoard'
import { PlayerPin } from '../Pin'

export function Board() {
    const { setSquareOpenModal, setSquareId } = useContext(ModalContext)
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
        actionRequired,
        loadingId,
        diceId,
        finishPlay,
        rollDice,
        showCard,
    } = useContext(GameContext)

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

        if (player.isIA) {
            setTimeout(() => rollDice(player), 10000)
        }
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

    const finishGame = () => {
        localStorage.setItem('monopoly/savedGame', 'false')
        localStorage.setItem('monopoly/players', '[]')
        localStorage.setItem('monopoly/turns', '0')
        localStorage.removeItem('monopoly/nextPlayer')
        localStorage.removeItem('monopoly/pins')
        localStorage.removeItem('monopoly/diceRolled')
        localStorage.removeItem('monopoly/lastBrought')
        localStorage.removeItem('monopoly/actionRequired')
        setHasGame(false)
        setPlayers([])
    }

    const showCardSquare = (player: Player) => {
        setSquareOpenModal(true)
        setSquareId(player.square)
    }

    useEffect(() => {
        if (nextPlayer && showCard) return showCardSquare(nextPlayer)
        if (turns === 0) {
            selectOrder()
            toast('Order of players selected')
        }
        if (turns > 0 && !diceRolled) {
            loadingId.current = toast.loading(`Its ${nextPlayer?.name}'s turn`)
            if (nextPlayer) turn(nextPlayer)
        }
    }, [nextPlayer, showCard])

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

                            <div className="text-left flex space-between font-extrabold text-base my-5">
                                <Accordion>
                                    <Accordion.Panel>
                                        <Accordion.Title>
                                            Properties
                                        </Accordion.Title>
                                        <Accordion.Content>
                                            {player.properties.map(
                                                (property) => (
                                                    <div className="">
                                                        <ColorBar
                                                            id={property}
                                                        />
                                                        <div>
                                                            {
                                                                BoardTheme.get(
                                                                    property
                                                                )?.name
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                </Accordion>
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
                                            disabled={
                                                actionRequired ? true : false
                                            }
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
