import { BoardTheme } from '../components/Board/theme'
import { Player } from '../types/Player'

export const doBuy = (player: Player): boolean => {
    const price: number | undefined = BoardTheme.get(player.square)?.price
    let [random1, random2, random3] = [-1, -1, -1]

    if (price && player.cash >= price) {
        random1 = Math.floor(Math.random() > 0.5 ? 1 : 0)
        random2 = Math.floor(Math.random() > 0.5 ? 1 : 0)
        random3 = Math.floor(Math.random() > 0.5 ? 1 : 0)
        console.log(`1: ${random1} | 2: ${random2} | 3: ${random3}`)

        if (
            (random1 === 1 && random2 === 1) ||
            (random1 === 1 && random3 === 1) ||
            (random2 === 1 && random3 === 1)
        ) {
            return true
        }
    }

    return false
}

export const howExitJail = (player: Player): string => {
    let [random1, random2, random3] = [-1, -1, -1]

    if (player.cash >= 50) {
        random1 = Math.floor(Math.random() > 0.5 ? 1 : 0)
        random2 = Math.floor(Math.random() > 0.5 ? 1 : 0)
        random3 = Math.floor(Math.random() > 0.5 ? 1 : 0)
        console.log(`1: ${random1} | 2: ${random2} | 3: ${random3}`)

        if (player.hasJailCard && player.jailTurns === 0) return 'card'

        if (
            (random1 === 1 && random2 === 1) ||
            (random1 === 1 && random3 === 1) ||
            (random2 === 1 && random3 === 1 && player.jailTurns === 1)
        ) {
            return 'pay'
        }
    }

    return 'dice'
}
