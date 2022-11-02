import { ComponentProps, FC } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { FaGavel } from 'react-icons/fa'

export const GoToJail: React.FC<SquareProps> = ({ id }) => {
    return (
        <div className="containerBoard">
            <div className="name">Go To</div>
            <FaGavel className="drawing" />
            <div className="name">Jail</div>
        </div>
    )
}
