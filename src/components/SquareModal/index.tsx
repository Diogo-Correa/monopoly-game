import { Button, Modal } from 'flowbite-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaFrown } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { ModalContext } from '../../contexts/create.context'
import { GameContext } from '../../contexts/game.context'
import { SquareType } from '../../util/SquareType'
import { BoardTheme } from '../Board/theme'
import { PlayerPin } from '../Pin'
import { SquareConfigData } from '../Square/data'
import { ColorBar } from '../Square/Squares/ColorBar'
import './style.css'

export const SquareModal = ({ id }: any) => {
    const { players, nextPlayer, atualizePlayers } = useContext(GameContext)
    const { isSquareModal, setSquareOpenModal } = useContext(ModalContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const icon: any = BoardTheme.get(id)?.icon
    const price: number | undefined = BoardTheme.get(id)?.price
    const type: SquareType | undefined = SquareConfigData.get(id)?.type
    const [owner, setOwner] = useState(-1)
    const toastId = useRef<number | string>()

    const buy = () => {
        toastId.current = toast.loading(
            `${nextPlayer?.name} is buying ${name}.`
        )

        setTimeout(() => {
            if (nextPlayer && price) {
                if (nextPlayer.cash > price) {
                    nextPlayer.cash -= price
                    nextPlayer.properties?.push(id)
                    atualizePlayers(nextPlayer)
                }
            }
        }, 2000)

        toast.update(toastId.current, {
            render: `${nextPlayer?.name} buyed ${name}`,
            type: 'success',
            autoClose: 1000,
            closeOnClick: true,
            closeButton: true,
        })
    }

    const getPropertyOwner = () => {
        players.map((player) => {
            player.properties.map((property) => {
                if (property === id) setOwner(player.id)
            })
        })
    }

    const exitJail = () => {
        if (nextPlayer) {
            nextPlayer.inJail = false
            nextPlayer.cash -= 50
            atualizePlayers(nextPlayer)
        }
    }

    useEffect(() => {
        getPropertyOwner()
    }, players)

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
                                                key={
                                                    player.id +
                                                    Math.floor(
                                                        Math.random() * 10000000
                                                    )
                                                }
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
                                type == SquareType.Utility) && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <div>
                                        <Button onClick={buy}>Buy now</Button>
                                    </div>
                                    <div>
                                        <Button color="dark">Auction</Button>
                                    </div>
                                </div>
                            )}

                        {nextPlayer &&
                            nextPlayer.square === id &&
                            owner === nextPlayer.id &&
                            (type == SquareType.Railroad ||
                                type == SquareType.Property ||
                                type == SquareType.Utility) && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                    <div>
                                        <Button onClick={buy} color="success">
                                            1 house
                                        </Button>
                                    </div>
                                </div>
                            )}

                        {nextPlayer && nextPlayer.inJail && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
                                <div>
                                    <Button onClick={exitJail} color="success">
                                        Pay $50
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}
