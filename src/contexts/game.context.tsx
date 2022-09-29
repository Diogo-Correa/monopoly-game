import { createContext, ReactNode, useState } from "react";

type GameContext = {
  hasGame: boolean;
  savedGame: {
    nextPlayer: number;
    setNextPlayer: (newState: number) => number;
    rounds: number;
    setRounds: (newState: number) => void;
  };
  isFinished: boolean;
  setIsFinished: (newState: boolean) => void;
};

type GameContextProps = {
  children: ReactNode;
};

const initialValue: GameContext = {
  hasGame: false,
  savedGame: {},
  isFinished: false,
  setIsFinished: () => {},
};

export const GameContext = createContext<GameContext>(initialValue);

export const GameContextProvider = ({ children }: GameContextProps) => {
  const [hasGame, setHasGame] = useState(initialValue.hasGame);
  const [savedGame, setSavedGame] = useState(initialValue.savedGame);
  const [isFinished, setIsFinished] = useState(initialValue.isFinished);

  return (
    <GameContext.Provider
      value={{ hasGame, savedGame, setSavedGame, isFinished, setIsFinished }}
    >
      {children}
    </GameContext.Provider>
  );
};
