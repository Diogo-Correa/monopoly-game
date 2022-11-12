import { FC } from 'react'
import { Pin } from '../../types/PinType'
import * as icon from 'react-icons/fa'

export const PlayerPin: FC<Pin> = ({ id }) => {
    const getPin = () => {
        if (id === 0) return <icon.FaDog size={26} className="text-red-700" />
        if (id === 1) return <icon.FaCat size={26} className="text-stone-700" />
        if (id === 2) return <icon.FaCrow size={26} className="text-zinc-800" />
        if (id === 3)
            return <icon.FaFish size={26} className="text-green-700" />
        if (id === 4)
            return <icon.FaDragon size={26} className="text-yellow-700" />
        if (id === 5)
            return <icon.FaHippo size={26} className="text-indigo-700" />
        if (id === 6)
            return <icon.FaHorse size={26} className="text-yellow-900" />
        if (id === 7) return <icon.FaFrog size={26} className="text-lime-700" />

        return <icon.FaBus size={26} />
    }

    return getPin()
}
