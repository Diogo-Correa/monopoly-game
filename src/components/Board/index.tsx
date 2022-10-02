import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import * as icon from "react-icons/fa";
import { Card, Tabs, Button, Badge, Avatar, Timeline } from "flowbite-react";
import { GameContext } from "../../contexts/game.context";

import { Player } from "../../types/Player";
import { GameBoard } from "../GameBoard";

export function Board() {
  const { hasGame, setHasGame } = useContext(GameContext);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleControl = (player: Player) => {
    let updatedPlayer = player;
    let playerState = [...players];
    const playerStorage = localStorage.getItem("monopoly/players");
    let playerArr;
    updatedPlayer.isIA = !updatedPlayer.isIA;
    if (playerStorage) {
      // Remove from storage
      playerArr = JSON.parse(playerStorage);
      playerArr.splice(playerArr.indexOf(player), 1);
      playerArr.push(updatedPlayer);
      localStorage.setItem("monopoly/players", JSON.stringify(playerArr));

      playerState.splice(playerState.indexOf(player), 1);
      playerState.push(updatedPlayer);
      setPlayers(playerState);

      toast(`Player ${player.name} has been updated.`, { type: "success" });
    }
  };

  const finishGame = () => {
    localStorage.setItem("monopoly/savedGame", "false");
    setHasGame(false);
  };

  useEffect(() => {
    const playerStorage = localStorage.getItem("monopoly/players");
    if (playerStorage) setPlayers(JSON.parse(playerStorage));
  }, []);

  return (
    <div className="text-black">
      <Card>
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          {players?.map((player) => (
            <Tabs.Item
              active={player.next ? true : false}
              title={
                <>
                  <Badge color={player.pinColor}>{player.name}</Badge>
                  <Badge color="gray">{String(player.plays)}</Badge>
                </>
              }
              icon={!player.isIA ? icon.FaGamepad : icon.FaRobot}
            >
              <div className="text-left flex space-between font-extrabold text-base">
                <>
                <icon.FaMoneyBill size={26} className="mx-3 text-green-500" />$
                {player.cash}
                <icon.FaHouseDamage size={26} className="mx-3 text-black" />
                {player.plays}
                </>
              </div>
              <div className="text-left flex font-extrabold text-base my-3">
                <div className="mr-2">
                  {!player.isIA && <Button color="light"><icon.FaDice size={20} className="mr-2"/> Roll dice</Button>}
                </div>
                {!player.isIA && (
                  <Button color="dark" onClick={() => handleControl(player)}>
                    Surrender
                  </Button>
                )}
                {player.isIA && (
                  <Button color="dark" onClick={() => handleControl(player)}>
                    Get control
                  </Button>
                )}
              </div>
            </Tabs.Item>
          ))}

          <Tabs.Item title="Game" icon={icon.FaCog}>
            <Button color="dark" onClick={finishGame}>
              Finish
            </Button>
          </Tabs.Item>
        </Tabs.Group>
      </Card>
      
      <GameBoard />
      
    </div>
  );
}
