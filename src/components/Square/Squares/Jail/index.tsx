import { ComponentProps, FC, useContext } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { FaFrown } from 'react-icons/fa'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const Jail: React.FC<SquareProps> = ({ id }) => {
    const { players } = useContext(GameContext)
    return (
        <>
            <div className="just">Just</div>
            <div className="drawing">
                <div className="containerBoard">
                    <div className="name">In</div>
                    <div className="window">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <FaFrown className="person" />
                    </div>
                    <div className="name">Jail</div>
                </div>
            </div>
            <div className="visiting">Visiting</div>

            <div className="absolute flex w-auto justify-between my-32">
                {players.map(
                    (player) =>
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
        </>
    )
}
