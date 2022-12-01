import { ComponentProps, FC, useContext, useEffect } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { ColorBar } from '../ColorBar'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const Go: React.FC<SquareProps> = ({ id }) => {
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const { players, turns } = useContext(GameContext)
    return (
        <>
            <div className="containerBoard">
                <div className="instructions">{msg}</div>
                <div className="go-word">go</div>
            </div>
            <div className="flex w-auto justify-between">
                {players.map(
                    (player) =>
                        player.square === id &&
                        turns > 0 && (
                            <PlayerPin
                                id={player.pin}
                                name={''}
                                selected={false}
                                key={player.pin}
                            />
                        )
                )}
            </div>
            <FaLongArrowAltLeft className="arrow" />
        </>
    )
}
