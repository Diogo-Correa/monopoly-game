import { SquareThemeData } from '../../interfaces/SquareThemeData'
import * as icon from 'react-icons/fa'
import { eng } from './langs/eng'
import { ptBr } from './langs/pt-br'

export const BoardTheme = new Map<number, SquareThemeData>()
BoardTheme.set(1, {
    name: 'Go',
    msg: 'Collect $200.00 salary as you pass',
    icon: <icon.FaLongArrowAltLeft className="drawing" />,
})
BoardTheme.set(2, {
    name: 'Mediter- ranean Avenue',
    price: 50,
    rent: 2,
    color: 'purple',
})
BoardTheme.set(3, {
    name: 'Community Chest',
    msg: 'Follow instructions on top card',
    icon: <icon.FaCube className="drawing text-blue-300" />,
})
BoardTheme.set(4, {
    name: 'Baltic Avenue',
    price: 50,
    rent: 4,
    color: 'purple',
})
BoardTheme.set(5, {
    name: 'Income Tax',
    msg: 'Pay 10% or $200',
    tax: 200,
    percent: 10,
    other: true,
})
BoardTheme.set(6, {
    name: 'Reading Railroad',
    price: 200,
    icon: <icon.FaSubway className="drawing" />,
})
BoardTheme.set(7, {
    name: 'Oriental Avenue',
    price: 100,
    rent: 6,
    color: 'cyan',
})
BoardTheme.set(8, {
    name: 'Chance',
    icon: <icon.FaQuestion className="drawing" />,
})
BoardTheme.set(9, {
    name: 'Vermont Avenue',
    price: 100,
    rent: 6,
    color: 'cyan',
})
BoardTheme.set(10, {
    name: 'Connecti- cut Avenue',
    price: 120,
    rent: 8,
    color: 'cyan',
})

BoardTheme.set(12, {
    name: 'St. Charles Place',
    price: 140,
    rent: 10,
    color: 'pink',
})
BoardTheme.set(13, {
    name: 'Electric Company',
    price: 150,
    icon: <icon.FaLightbulb className="drawing text-yellow-300" />,
})
BoardTheme.set(14, {
    name: 'States Avenue',
    price: 140,
    rent: 10,
    color: 'pink',
})
BoardTheme.set(15, {
    name: 'Virginia Avenue',
    price: 160,
    rent: 12,
    color: 'pink',
})
BoardTheme.set(16, {
    name: 'Pennsylvania Railroad',
    price: 200,
    icon: <icon.FaSubway className="drawing" />,
})
BoardTheme.set(17, {
    name: 'St. James Avenue',
    price: 180,
    rent: 14,
    color: 'orange',
})
BoardTheme.set(18, {
    name: 'Community Chest',
    msg: 'Follow instructions on top card',
    icon: <icon.FaCube className="drawing text-blue-300" />,
})
BoardTheme.set(19, {
    name: 'Tennessee Avenue',
    price: 180,
    rent: 14,
    color: 'orange',
})
BoardTheme.set(20, {
    name: 'New York Avenue',
    price: 200,
    rent: 16,
    color: 'orange',
})
BoardTheme.set(21, {
    name: 'Free',
    msg: 'Parking',
    icon: <icon.FaCar className="drawing" />,
})
BoardTheme.set(22, {
    name: 'Kentucky Avenue',
    price: 220,
    rent: 18,
    color: 'red',
})
BoardTheme.set(23, {
    name: 'Chance',
    icon: <icon.FaQuestion className="drawing" />,
})
BoardTheme.set(24, {
    name: 'Indiana Avenue',
    price: 220,
    rent: 18,
    color: 'red',
})
BoardTheme.set(25, {
    name: 'Illinois Avenue',
    price: 200,
    rent: 20,
    color: 'red',
})
BoardTheme.set(26, {
    name: 'B & O Railroad',
    price: 200,
    icon: <icon.FaSubway className="drawing" />,
})
BoardTheme.set(27, {
    name: 'Atlantic Avenue',
    price: 260,
    rent: 22,
    color: 'yellow',
})
BoardTheme.set(28, {
    name: 'Ventnor Avenue',
    price: 260,
    rent: 22,
    color: 'yellow',
})
BoardTheme.set(29, {
    name: 'Waterworks',
    price: 120,
    icon: <icon.FaTint className="drawing  text-blue-800" />,
})
BoardTheme.set(30, {
    name: 'Marvin Gardens',
    price: 280,
    rent: 24,
    color: 'yellow',
})
BoardTheme.set(31, {
    name: 'Go to',
    msg: 'Jail',
    icon: <icon.FaGavel className="drawing" />,
})
BoardTheme.set(32, {
    name: 'Pacific Avenue',
    price: 300,
    rent: 26,
    color: 'green',
})
BoardTheme.set(33, {
    name: 'North Carolina Avenue',
    price: 300,
    rent: 26,
    color: 'green',
})
BoardTheme.set(34, {
    name: 'Community Chest',
    msg: 'Follow instructions on top card',
    icon: <icon.FaCube className="drawing text-blue-300" />,
})
BoardTheme.set(35, {
    name: 'Pennsylva- nia Avenue',
    price: 320,
    rent: 28,
    color: 'green',
})
BoardTheme.set(36, {
    name: 'Short Line',
    price: 200,
    icon: <icon.FaSubway className="drawing" />,
})
BoardTheme.set(37, {
    name: 'Chance',
    icon: <icon.FaQuestion className="drawing  text-blue-700" />,
})
BoardTheme.set(38, { name: 'Park Place', price: 350, rent: 35, color: 'blue' })
BoardTheme.set(39, {
    name: 'Luxury Tax',
    msg: 'Pay $75.00',
    tax: 75,
    icon: <icon.FaGem className="drawing text-black" />,
    other: true,
})
BoardTheme.set(40, { name: 'Boardwalk', price: 400, rent: 50, color: 'blue' })
