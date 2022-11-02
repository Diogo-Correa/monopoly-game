import { useEffect, useState, useContext } from "react";
import "./App.css";
import { GameContextProvider } from "./contexts/game.context";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("monopoly/players"))
      localStorage.setItem("monopoly/players", JSON.stringify([]));
    if (!localStorage.getItem("monopoly/savedGame")) {
      localStorage.setItem("monopoly/savedGame", "false");
    }
  }, []);

  return <GameContextProvider>{""}</GameContextProvider>;
}

export default App;
