import { Timeline } from 'flowbite-react'
import { GameSquare } from './GameSquare'
import * as icon from 'react-icons/fa'

import './style.css'

export const GameBoard = () => {
    const bottom: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    const left: number[] = [20, 19, 18, 17, 16, 15, 14, 13, 12]
    const top: number[] = [22, 23, 24, 25, 26, 27, 28, 29, 30]
    const right: number[] = [32, 33, 34, 35, 36, 37, 38, 39, 40]

    return (
        <div className="all-board">
            <div className="boardTable">
                <div className="board">
                    <div className="center">
                        <div className="community-chest-deck">
                            <h2 className="label">Community Chest</h2>
                            <div className="deck flex justify-center items-center hover:cursor-pointer hover:text-blue-200 hover:border-blue-200">
                                <icon.FaCube size={50} />
                            </div>
                        </div>

                        <img
                            src="/logo.png"
                            className="logo title"
                            alt="Vite logo"
                        />

                        <div className="chance-deck">
                            <h2 className="label">Chance</h2>
                            <div className="deck flex justify-center items-center hover:cursor-pointer hover:text-red-600 hover:border-red-600">
                                <icon.FaQuestion size={50} />
                            </div>
                        </div>

                        <div className="log-deck bg-slate-100 overflow-y-auto overflow-x-hidden overflow-scroll">
                            <Timeline>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>
                                            <span className="text-indigo-700">
                                                October 2022
                                            </span>
                                        </Timeline.Time>
                                        <Timeline.Title>
                                            PlayerName turn
                                        </Timeline.Title>
                                        <Timeline.Body>
                                            Roll dices and takes double six; Buy
                                            ST. JAMES AVENUE;
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                            </Timeline>
                        </div>
                    </div>

                    <GameSquare id={1} key={1} />

                    <div className="row horizontal-row bottom-row">
                        {bottom.map((square) => (
                            <>
                                <GameSquare id={square} key={square} />
                            </>
                        ))}
                    </div>

                    <GameSquare id={11} key={11} />

                    <div className="row vertical-row left-row">
                        {left.map((square) => (
                            <GameSquare id={square} key={square} />
                        ))}
                    </div>

                    <GameSquare id={21} key={21} />

                    <div className="row horizontal-row top-row">
                        {top.map((square) => (
                            <GameSquare id={square} key={square} />
                        ))}
                    </div>

                    <GameSquare id={31} key={31} />

                    <div className="row vertical-row right-row">
                        {right.map((square) => (
                            <GameSquare id={square} key={square} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
