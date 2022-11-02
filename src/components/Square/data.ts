import { SquareType } from '../../util/SquareType'
import { BoardSection } from '../../util/BoardSection'
import { SquareConfigData } from '../../interfaces/SquareConfigData'

const squareGroupColor = new Map<number, string>([
    [1, 'dark-purple'],
    [2, 'light-blue'],
    [3, 'purple'],
    [4, 'orange'],
    [5, 'red'],
    [6, 'yellow'],
    [7, 'green'],
    [8, 'dark-blue'],
])

const SquareConfigData = new Map<number, SquareConfigData>()

// Bottom squares
SquareConfigData.set(1, { type: SquareType.Go, section: BoardSection.Corner })
SquareConfigData.set(2, {
    type: SquareType.Property,
    section: BoardSection.Bottom,
    groupId: 1,
})
SquareConfigData.set(3, {
    type: SquareType.Chest,
    section: BoardSection.Bottom,
})
SquareConfigData.set(4, {
    type: SquareType.Property,
    section: BoardSection.Bottom,
    groupId: 1,
})
SquareConfigData.set(5, {
    type: SquareType.Utility,
    section: BoardSection.Bottom,
})

SquareConfigData.set(6, {
    type: SquareType.Railroad,
    section: BoardSection.Bottom,
    groupId: 10,
})

SquareConfigData.set(7, {
    type: SquareType.Property,
    section: BoardSection.Bottom,
    groupId: 2,
})
SquareConfigData.set(8, {
    type: SquareType.Chance,
    section: BoardSection.Bottom,
})
SquareConfigData.set(9, {
    type: SquareType.Property,
    section: BoardSection.Bottom,
    groupId: 2,
})
SquareConfigData.set(10, {
    type: SquareType.Property,
    section: BoardSection.Bottom,
    groupId: 2,
})

SquareConfigData.set(11, {
    type: SquareType.Jail,
    section: BoardSection.Corner,
})

SquareConfigData.set(12, {
    type: SquareType.Property,
    section: BoardSection.Left,
    groupId: 3,
})
SquareConfigData.set(13, {
    type: SquareType.Utility,
    section: BoardSection.Left,
})
SquareConfigData.set(14, {
    type: SquareType.Property,
    section: BoardSection.Left,
    groupId: 3,
})
SquareConfigData.set(15, {
    type: SquareType.Property,
    section: BoardSection.Left,
    groupId: 3,
})

SquareConfigData.set(16, {
    type: SquareType.Railroad,
    section: BoardSection.Left,
    groupId: 10,
})

SquareConfigData.set(17, {
    type: SquareType.Property,
    section: BoardSection.Left,
    groupId: 4,
})
SquareConfigData.set(18, { type: SquareType.Chest, section: BoardSection.Left })
SquareConfigData.set(19, {
    type: SquareType.Property,
    section: BoardSection.Left,
    groupId: 4,
})
SquareConfigData.set(20, {
    type: SquareType.Property,
    section: BoardSection.Left,
    groupId: 4,
})

SquareConfigData.set(21, {
    type: SquareType.FreePark,
    section: BoardSection.Corner,
})

SquareConfigData.set(22, {
    type: SquareType.Property,
    section: BoardSection.Top,
    groupId: 5,
})
SquareConfigData.set(23, { type: SquareType.Chance, section: BoardSection.Top })
SquareConfigData.set(24, {
    type: SquareType.Property,
    section: BoardSection.Top,
    groupId: 5,
})
SquareConfigData.set(25, {
    type: SquareType.Property,
    section: BoardSection.Top,
    groupId: 5,
})

SquareConfigData.set(26, {
    type: SquareType.Railroad,
    section: BoardSection.Top,
    groupId: 10,
})

SquareConfigData.set(27, {
    type: SquareType.Property,
    section: BoardSection.Top,
    groupId: 6,
})
SquareConfigData.set(28, {
    type: SquareType.Property,
    section: BoardSection.Top,
    groupId: 6,
})
SquareConfigData.set(29, {
    type: SquareType.Utility,
    section: BoardSection.Top,
})
SquareConfigData.set(30, {
    type: SquareType.Property,
    section: BoardSection.Top,
    groupId: 6,
})

SquareConfigData.set(31, {
    type: SquareType.GoToJail,
    section: BoardSection.Corner,
})

SquareConfigData.set(32, {
    type: SquareType.Property,
    section: BoardSection.Right,
    groupId: 7,
})
SquareConfigData.set(33, {
    type: SquareType.Property,
    section: BoardSection.Right,
    groupId: 7,
})
SquareConfigData.set(34, {
    type: SquareType.Chest,
    section: BoardSection.Right,
})
SquareConfigData.set(35, {
    type: SquareType.Property,
    section: BoardSection.Right,
    groupId: 7,
})

SquareConfigData.set(36, {
    type: SquareType.Railroad,
    section: BoardSection.Right,
    groupId: 10,
})

SquareConfigData.set(37, {
    type: SquareType.Chance,
    section: BoardSection.Right,
})

SquareConfigData.set(38, {
    type: SquareType.Property,
    section: BoardSection.Right,
    groupId: 8,
})
SquareConfigData.set(39, {
    type: SquareType.Utility,
    section: BoardSection.Right,
})
SquareConfigData.set(40, {
    type: SquareType.Property,
    section: BoardSection.Right,
    groupId: 8,
})

export { SquareConfigData, squareGroupColor }
