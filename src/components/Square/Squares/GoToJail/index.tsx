import { ComponentProps, FC, useContext } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { FaGavel } from 'react-icons/fa'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const GoToJail: React.FC<SquareProps> = ({ id }) => {
    const { players } = useContext(GameContext)
    return (
        <div className="containerBoard">
            <div className="name">Go To</div>
            <FaGavel className="drawing" />
            <div className="name">Jail</div>

            <div className="absolute flex w-auto justify-between my-32">
                {players.map(
                    (player) =>
                        player.square === id && (
                            <PlayerPin
                                id={player.pin}
                                name={''}
                                selected={false}
                                key={`pin-` + player.square}
                            />
                        )
                )}
            </div>
        </div>
    )
}
