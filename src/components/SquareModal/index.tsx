import { Button, Checkbox, Modal } from 'flowbite-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaFrown } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { ModalContext } from '../../contexts/create.context'
import { GameContext } from '../../contexts/game.context'
import { doBuy, howExitJail } from '../../util/IA'
import { SquareType } from '../../util/SquareType'
import { BoardTheme } from '../Board/theme'
import { PlayerPin } from '../Pin'
import { SquareConfigData } from '../Square/data'
import { ColorBar } from '../Square/Squares/ColorBar'
import './style.css'

export const SquareModal = ({ id }: any) => {
    const {
        players,
        nextPlayer,
        atualizePlayers,
        diceRolled,
        lastBrought,
        setLastBrought,
        setActionRequired,
        finishPlay,
        rollDice,
    } = useContext(GameContext)
    const { isSquareModal, setSquareOpenModal } = useContext(ModalContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const icon: any = BoardTheme.get(id)?.icon
    const tax: any = BoardTheme.get(id)?.tax
    const percent: any = BoardTheme.get(id)?.percent
    const price: number | undefined = BoardTheme.get(id)?.price
    const rent: number | undefined = BoardTheme.get(id)?.rent
    const color: string | undefined = BoardTheme.get(id)?.color
    const type: SquareType | undefined = SquareConfigData.get(id)?.type
    let other: boolean
    BoardTheme.get(id)?.other ? (other = true) : (other = false)
    const [owner, setOwner] = useState(-1)
    const toastId = useRef<number | string>('')

    const checkMonopoly = (properties: any) => {
        let hasMonopoly = false
        if (
            color === 'purple' &&
            properties.includes(2) &&
            properties.includes(4)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'cyan' &&
            properties.includes(7) &&
            properties.includes(9) &&
            properties.includes(10)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'pink' &&
            properties.includes(12) &&
            properties.includes(14) &&
            properties.includes(15)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'orange' &&
            properties.includes(17) &&
            properties.includes(19) &&
            properties.includes(20)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'red' &&
            properties.includes(22) &&
            properties.includes(24) &&
            properties.includes(25)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'yellow' &&
            properties.includes(27) &&
            properties.includes(28) &&
            properties.includes(30)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'green' &&
            properties.includes(32) &&
            properties.includes(33) &&
            properties.includes(35)
        ) {
            hasMonopoly = true
        }
        if (
            color === 'blue' &&
            properties.includes(38) &&
            properties.includes(40)
        ) {
            hasMonopoly = true
        }

        return hasMonopoly
    }

    const pay = (option: string) => {
        toastId.current = toast.loading(
            `${nextPlayer?.name} is paying ${name}.`
        )

        setTimeout(() => {
            let hasMonopoly = false
            let ownerP
            if (nextPlayer && rent && option === 'rent') {
                if (nextPlayer.cash >= rent) {
                    if (type === SquareType.Property) {
                        players.map((player) => {
                            if (player.id === owner) ownerP = player
                            if (!hasMonopoly)
                                hasMonopoly = checkMonopoly(player.properties)
                        })
                        if (!hasMonopoly) {
                            nextPlayer.cash -= rent
                            if (ownerP) {
                                ownerP!.cash += rent
                                atualizePlayers(ownerP)
                            }
                        }
                        if (hasMonopoly) {
                            nextPlayer.cash -= rent * 2
                            if (ownerP) {
                                ownerP!.cash += rent * 2
                                atualizePlayers(ownerP)
                            }
                        }
                    }
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} paid rent in ${name}`,
                        type: 'success',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                } else {
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} went bankrupt!`,
                        type: 'error',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                }
            }
            if (nextPlayer && tax && option === 'tax') {
                if (nextPlayer.cash >= tax) {
                    nextPlayer.cash -= tax
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} paid ${name}`,
                        type: 'success',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                } else {
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} went bankrupt!`,
                        type: 'error',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                }
            }
            if (nextPlayer && tax && option === 'percent') {
                let total = nextPlayer.cash

                nextPlayer.properties.map((property) => {
                    const price: number | undefined =
                        BoardTheme.get(property)?.price
                    if (price) total += price
                })

                if (nextPlayer.cash >= total * 0.1) {
                    nextPlayer.cash -= total * 0.1
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} paid $${
                            total * 0.1
                        } to ${name}`,
                        type: 'success',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                } else {
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} went bankrupt!`,
                        type: 'error',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                }
            }
        }, 2000)
        nextPlayer && atualizePlayers(nextPlayer)
        localStorage.setItem('monopoly/actionRequired', 'false')
        setActionRequired(false)
    }

    const buy = () => {
        toastId.current = toast.loading(
            `${nextPlayer?.name} is buying ${name}.`
        )

        setTimeout(() => {
            if (nextPlayer && price) {
                if (nextPlayer.cash >= price) {
                    nextPlayer.cash -= price
                    nextPlayer.properties?.push(id)
                    atualizePlayers(nextPlayer)
                    localStorage.setItem('monopoly/lastBrought', id)
                    setLastBrought(id)
                    toast.update(toastId.current, {
                        render: `${nextPlayer?.name} brought ${name}`,
                        type: 'success',
                        autoClose: 1000,
                        closeOnClick: true,
                        closeButton: true,
                        isLoading: false,
                    })
                }
            }
        }, 2000)
    }

    const getPropertyOwner = () => {
        players.map((player) => {
            player.properties.map((property) => {
                if (property === id) setOwner(player.id)
            })
        })
    }

    const exitJail = (option: string) => {
        if (nextPlayer) {
            if (option === 'card') {
                nextPlayer.hasJailCard = false
                nextPlayer.inJail = false
                nextPlayer.jailTurns = 0
            }
            if (option === 'pay') {
                nextPlayer.cash -= 50
                nextPlayer.inJail = false
                nextPlayer.jailTurns = 0
            }
            if (option === 'dice') rollDice(nextPlayer)
            atualizePlayers(nextPlayer)
        }
    }

    const turnIA = () => {
        if (nextPlayer) {
            if (nextPlayer.inJail) {
                exitJail(howExitJail(nextPlayer))
            }

            if (
                owner === -1 &&
                owner !== nextPlayer.id &&
                nextPlayer.square === id
            ) {
                if (doBuy(nextPlayer)) buy()
            }

            if (owner !== -1 && nextPlayer.id !== owner) {
                if (
                    nextPlayer &&
                    nextPlayer.square === id &&
                    owner !== -1 &&
                    owner !== nextPlayer.id &&
                    (type == SquareType.Railroad ||
                        type == SquareType.Property ||
                        type == SquareType.Utility) &&
                    !other &&
                    diceRolled
                )
                    pay('rent')

                if (
                    nextPlayer &&
                    nextPlayer.square === id &&
                    type == SquareType.Utility &&
                    other &&
                    diceRolled
                )
                    pay('tax')
            }
            setTimeout(() => {
                finishPlay(nextPlayer)
                setSquareOpenModal(false)
            }, 3000)
        }
    }

    useEffect(() => {
        getPropertyOwner()

        if (nextPlayer && nextPlayer.isIA) turnIA()

        if (nextPlayer && !nextPlayer.isIA) {
            if (
                (nextPlayer.square === id &&
                    owner !== -1 &&
                    owner !== nextPlayer.id &&
                    (type == SquareType.Railroad ||
                        type == SquareType.Property ||
                        type == SquareType.Utility) &&
                    diceRolled) ||
                (nextPlayer.square === id &&
                    type == SquareType.Utility &&
                    diceRolled)
            ) {
                setActionRequired(true)
                localStorage.setItem('monopoly/actionRequired', 'true')
            } else {
                setActionRequired(false)
                localStorage.setItem('monopoly/actionRequired', 'false')
            }
        }
    }, [])

    return (
        <Modal
            show={isSquareModal}
            size="sm"
            popup={true}
            onClose={() => setSquareOpenModal(false)}
        >
            <Modal.Header></Modal.Header>
            <div className="text-black">
                <Modal.Body>
                    <div className="modal-square">
                        <div className="flex justify-center p-4">
                            {players.map(
                                (player) =>
                                    player.id === owner && (
                                        <div className="mr-3">
                                            <PlayerPin
                                                id={player.pin}
                                                name={''}
                                                selected={false}
                                                key={`player-PINO-
                                                    ${player.id}
                                                    `}
                                            />
                                        </div>
                                    )
                            )}
                        </div>
                        <ColorBar id={id} />
                        <h2>{name}</h2>
                        <div className="icon">{icon}</div>

                        {id === 11 && (
                            <div className="containerBoard">
                                <div className="window">
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <FaFrown className="person" />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-center items-center mt-5">
                            {players.map(
                                (player) =>
                                    player.inJail &&
                                    player.square === id && (
                                        <PlayerPin
                                            id={player.pin}
                                            name={''}
                                            selected={false}
                                            key={`pin-` + player.pin}
                                        />
                                    )
                            )}
                        </div>

                        <p>{msg}</p>
                        <hr />
                        {id != 11 ? (
                            <b>Players in this place:</b>
                        ) : (
                            <b>Just Visiting:</b>
                        )}
                        <div className="flex justify-center p-4">
                            {players.map(
                                (player) =>
                                    !player.inJail &&
                                    player.square === id && (
                                        <div className="mr-3">
                                            <PlayerPin
                                                id={player.pin}
                                                name={''}
                                                selected={false}
                                                key={`player-PINO-FUCK-
                                                    ${player.id}
                                                    `}
                                            />
                                        </div>
                                    )
                            )}
                        </div>
                        <small>{price && `Price $${price}`}</small>
                        {nextPlayer &&
                            nextPlayer.square === id &&
                            owner === -1 &&
                            (type == SquareType.Railroad ||
                                type == SquareType.Property ||
                                type == SquareType.Utility) &&
                            !other &&
                            diceRolled && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <div>
                                        <Button onClick={buy}>Buy now</Button>
                                    </div>
                                </div>
                            )}
                        {nextPlayer &&
                            nextPlayer.square === id &&
                            owner !== -1 &&
                            owner !== nextPlayer.id &&
                            (type == SquareType.Railroad ||
                                type == SquareType.Property ||
                                type == SquareType.Utility) &&
                            !other &&
                            diceRolled && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <div>
                                        <Button onClick={() => pay('rent')}>
                                            Pay rent ${rent}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        {nextPlayer &&
                            nextPlayer.square === id &&
                            type == SquareType.Utility &&
                            other &&
                            diceRolled && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <div>
                                        {percent && (
                                            <Button
                                                onClick={() => pay('percent')}
                                                color="dark"
                                            >
                                                Pay {percent}%
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        <Button onClick={() => pay('tax')}>
                                            Pay ${tax}
                                        </Button>
                                    </div>
                                </div>
                            )}

                        {nextPlayer &&
                            nextPlayer.square === id &&
                            owner === nextPlayer.id &&
                            type === SquareType.Property &&
                            lastBrought !== id && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <div>
                                        <Button onClick={buy} color="success">
                                            1 house
                                        </Button>
                                    </div>
                                </div>
                            )}

                        {nextPlayer &&
                            nextPlayer.inJail &&
                            type == SquareType.Jail &&
                            nextPlayer.jailTurns < 3 && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <p>
                                        Jail turns: {nextPlayer.jailTurns + 1}
                                    </p>
                                    {nextPlayer.jailTurns === 0 && (
                                        <ul>
                                            <li>Pay $50 and roll the dices</li>
                                            <li>Use 'Get Out of Jail Free'</li>
                                            <li>Get doubles on the dices</li>
                                        </ul>
                                    )}
                                    {nextPlayer.jailTurns === 1 && (
                                        <ul>
                                            <li>Pay $50 and roll the dices</li>
                                            <li>Get doubles on the dices</li>
                                        </ul>
                                    )}
                                    {nextPlayer.jailTurns === 2 && (
                                        <ul>
                                            <li>
                                                Get doubles on the dices or pay
                                                $50
                                            </li>
                                        </ul>
                                    )}
                                    <div>
                                        {nextPlayer.jailTurns < 2 && (
                                            <Button
                                                onClick={() => exitJail(`pay`)}
                                                color="success"
                                            >
                                                Pay $50
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        {nextPlayer.hasJailCard &&
                                            nextPlayer.jailTurns < 1 && (
                                                <Button
                                                    onClick={() =>
                                                        exitJail('card')
                                                    }
                                                    color="dark"
                                                >
                                                    Get Out of Jail Free
                                                </Button>
                                            )}
                                    </div>
                                </div>
                            )}
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}
