import { ComponentProps, FC, useContext } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { ColorBar } from '../ColorBar'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const Go: React.FC<SquareProps> = ({ id }) => {
    const { players } = useContext(GameContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const icon: FC<ComponentProps<'svg'>> | undefined = BoardTheme.get(id)?.icon
    return (
        <>
            <div className="containerBoard">
                <div className="instructions">
                    Collect $200.00 salary as you pass
                </div>
                <div className="go-word">go</div>
            </div>
            <div className="flex w-auto justify-between">
                {players.map(
                    (player) =>
                        player.square === id && (
                            <PlayerPin
                                id={player.pin}
                                name={''}
                                selected={false}
                                key={player.square}
                            />
                        )
                )}
            </div>
            <FaLongArrowAltLeft className="arrow" />
        </>
    )
}
