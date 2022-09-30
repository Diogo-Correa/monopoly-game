import { createContext, ReactNode, useState } from "react";
import { Board } from "../components/Board";
import { Menu } from "../components/Menu";
import { ModalContextProvider } from "../contexts/create.context";

type GameContext = {
  hasGame: boolean;
  setHasGame: (newState: boolean) => void;
  isFinished: boolean;
  setIsFinished: (newState: boolean) => void;
};

type GameContextProps = {
  children: ReactNode;
};

const initialValue: GameContext = {
  hasGame: localStorage.getItem("monopoly/savedGame") === "true",
  setHasGame: () => {},
  isFinished: false,
  setIsFinished: () => {},
};

export const GameContext = createContext<GameContext>(initialValue);

export const GameContextProvider = ({ children }: GameContextProps) => {
  const [hasGame, setHasGame] = useState(initialValue.hasGame);
  const [isFinished, setIsFinished] = useState(initialValue.isFinished);

  return (
    <GameContext.Provider
      value={{
        hasGame,
        setHasGame,
        isFinished,
        setIsFinished,
      }}
    >
      {children}
      <ModalContextProvider>
        <div className="App">{!hasGame ? <Menu /> : <Board />}</div>
      </ModalContextProvider>
    </GameContext.Provider>
  );
};
