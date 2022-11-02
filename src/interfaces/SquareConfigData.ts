import { BoardSection } from '../util/BoardSection'
import { SquareType } from '../util/SquareType'

export interface SquareConfigData {
    readonly type: SquareType
    readonly section: BoardSection
    readonly groupId?: number
}
