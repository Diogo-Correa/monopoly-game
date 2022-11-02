import { Modal } from 'flowbite-react'
import { useContext } from 'react'
import { ModalContext } from '../../contexts/create.context'
import { BoardTheme } from '../Board/theme'
import { ColorBar } from '../Square/Squares/ColorBar'
import './style.css'

export const SquareModal = ({ id }: any) => {
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
                        <small>{price && `Price $${price}`}</small>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}
