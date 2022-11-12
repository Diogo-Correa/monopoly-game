import { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import * as icon from 'react-icons/fa'
import {
    Card,
    Tabs,
    Button,
    Badge,
    Avatar,
    Timeline,
    Tooltip,
} from 'flowbite-react'
import { GameContext } from '../../contexts/game.context'

import { Player } from '../../types/Player'
import { GameBoard } from '../GameBoard'
import { PlayerPin } from '../Pin'

export function Board() {
    const { setHasGame, players, setPlayers, pins } = useContext(GameContext)

    const rollDice = (player: Player) => {
        const playersStorage = localStorage.getItem('monopoly/players')
        const playerState = [...players]
        const actualSquare = playerState[Number(player.id)].square
        let nextSquare = 0

        let [dice1, dice2] = [0, 0]
        dice1 = Math.floor(Math.random() * 6) + 1
        dice2 = Math.floor(Math.random() * 6) + 1

        nextSquare = actualSquare + dice1 + dice2

        if (nextSquare < 40) playerState[Number(player.id)].square = nextSquare
        else playerState[Number(player.id)].square = dice1 + dice2

        localStorage.setItem('monopoly/players', JSON.stringify(playerState))
        setPlayers(playerState)

        console.log(`Player rolled ${dice1} and ${dice2}`)
    }

    const handleControl = (player: Player) => {
        let updatedPlayer = player
        let playerState = [...players]
        const playerStorage = localStorage.getItem('monopoly/players')
        let playerArr
        updatedPlayer.isIA = !updatedPlayer.isIA
        if (playerStorage) {
            // Remove from storage
            playerArr = JSON.parse(playerStorage)
            playerArr.splice(playerArr.indexOf(player), 1)
            playerArr.push(updatedPlayer)
            localStorage.setItem('monopoly/players', JSON.stringify(playerArr))

            playerState.splice(playerState.indexOf(player), 1)
            playerState.push(updatedPlayer)
            setPlayers(playerState)

            toast(`Player ${player.name} has been updated.`, {
                type: 'success',
            })
        }
    }

    const finishGame = () => {
        localStorage.setItem('monopoly/savedGame', 'false')
        localStorage.setItem('monopoly/players', '[]')
        localStorage.removeItem('monopoly/pins')
        setHasGame(false)
        setPlayers([])
    }

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
                                    {!player.isIA && (
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
