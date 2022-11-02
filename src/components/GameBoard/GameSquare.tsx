import { FC, useContext } from 'react'
import { SquareConfigData } from '../Square/data'
import { Square } from '../Square'
import { SquareType } from '../../util/SquareType'
import { SquareProps } from '../../interfaces/SquareProps'
import { ModalContext } from '../../contexts/create.context'

export const GameSquare: FC<SquareProps> = ({ id }) => {
    const { setSquareOpenModal, setSquareId } = useContext(ModalContext)

    const squareType: SquareType = SquareConfigData.get(id)?.type!

    const squareTypeClass = new Map<SquareType, string>([
        [SquareType.Railroad, 'railroad'],
        [SquareType.Chance, 'chance'],
        [SquareType.Chest, 'community-chest'],
        [SquareType.Go, 'corner go'],
        [SquareType.GoToJail, 'corner go-to-jail'],
        [SquareType.Jail, 'corner jail'],
        [SquareType.Property, 'property'],
        [SquareType.FreePark, 'corner free-parking'],
        [SquareType.Utility, 'utility'],
    ])

    const getSpaceClassName = () => {
        return `space ${squareTypeClass.get(squareType)}`
    }

    const showCard = () => {
        setSquareOpenModal(true)
        setSquareId(id)
    }

    return (
        <div
            className={`hover:cursor-pointer hover:bg-gray-400 ${getSpaceClassName()}`}
            onClick={showCard}
        >
            <Square id={id} />
        </div>
    )
}
