import { ComponentProps, FC, useContext } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const Railroad: React.FC<SquareProps> = ({ id }) => {
    const { players } = useContext(GameContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const price: number | undefined = BoardTheme.get(id)?.price
    const icon: FC<ComponentProps<'svg'>> | undefined = BoardTheme.get(id)?.icon
    return (
        <div className="containerBoard">
            <div className="name">{name}</div>
            <>{icon}</>
            <div className="price">Price ${price}</div>

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
