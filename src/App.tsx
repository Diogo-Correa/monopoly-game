import { useEffect, useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Menu } from './components/Menu'
import { ModalContextProvider } from './contexts/CreateModal'

function App() {

  const [savedGame, setGame] = useState(true)

  useEffect(() => {
    if(!localStorage.getItem("monopoly/players")) localStorage.setItem("monopoly/players", JSON.stringify([]));
    if(localStorage.getItem("monopoly/savedGame")) {
      setGame(true);
    }
  }, [])

  return (
    <ModalContextProvider>
      <div className="App">
        {
          !savedGame ? <Menu /> : <Board />
        }
      </div>
    </ModalContextProvider>
  )
}

export default App
