import { Modal } from 'flowbite-react'
import { useContext } from 'react'
import { ModalContext } from '../../contexts/create.context'
import { GameContext } from '../../contexts/game.context'
import { BoardTheme } from '../Board/theme'
import { PlayerPin } from '../Pin'
import { ColorBar } from '../Square/Squares/ColorBar'
import './style.css'

export const SquareModal = ({ id }: any) => {
    const { players } = useContext(GameContext)
    const { isSquareModal, setSquareOpenModal } = useContext(ModalContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const icon: any = BoardTheme.get(id)?.icon
    const price: number | undefined = BoardTheme.get(id)?.price

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
                        <p>{msg}</p>
                        <hr />
                        <b>Players in this place:</b>
                        <div className="flex justify-center p-4">
                            {players.map(
                                (player) =>
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
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}
