import { FC, useContext, useEffect, useRef } from 'react'
import { BoardTheme } from '../../../Board/theme'
import { SquareProps } from '../../../../interfaces/SquareProps'
import { GameContext } from '../../../../contexts/game.context'
import { PlayerPin } from '../../../Pin'

export const Utility: React.FC<SquareProps> = ({ id }) => {
    const { players } = useContext(GameContext)
    const name: string | undefined = BoardTheme.get(id)?.name
    const msg: string | undefined = BoardTheme.get(id)?.msg
    const price: number | undefined = BoardTheme.get(id)?.price
    const icon: any = BoardTheme.get(id)?.icon
    const other: any = BoardTheme.get(id)?.other
    return (
        <>
            <div className="containerBoard">
                <div className="name">{name}</div>
                {icon}
                <div className="price">{price && `Price $${price}`}</div>
                {other && <div className="diamond"></div>}
                <div className="instructions">{msg && msg}</div>
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
        </>
    )
}
