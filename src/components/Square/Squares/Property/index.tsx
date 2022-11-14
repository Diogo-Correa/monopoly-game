import { FC, useContext } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { ColorBar } from '../ColorBar'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const Property: React.FC<SquareProps> = ({ id }) => {
    const { players } = useContext(GameContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const price: number | undefined = BoardTheme.get(id)?.price
    return (
        <div className="containerBoard">
            <ColorBar id={id} />
            <div className="name">{name}</div>
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
