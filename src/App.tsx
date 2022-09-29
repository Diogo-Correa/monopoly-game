import { useEffect, useState, useContext } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Menu } from "./components/Menu";
import { ModalContextProvider } from "./contexts/create.context";
import { GameContext, GameContextProvider } from "./contexts/game.context";

function App() {
  const { hasGame } = useContext(GameContext);

  useEffect(() => {
    if (!localStorage.getItem("monopoly/players"))
      localStorage.setItem("monopoly/players", JSON.stringify([]));
    if (localStorage.getItem("monopoly/savedGame")) {
      // setGame(true);
    }
  }, []);

  return (
    <GameContextProvider>
      <ModalContextProvider>
        <div className="App">{!hasGame ? <Menu /> : <Board />}</div>
      </ModalContextProvider>
    </GameContextProvider>
  );
}

export default App;
