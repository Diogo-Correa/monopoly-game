import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import * as icon from "react-icons/fa";
import { Card, Tabs, Button, Badge, Avatar } from "flowbite-react";
import { GameContext } from "../../contexts/game.context";

import "./style.css";
import { Player } from "../../types/Player";

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
    <div className="all-board">
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
                <icon.FaMoneyBill size={26} className="mx-3 text-green-500" />$
                {player.cash}
                <icon.FaHouseDamage size={26} className="mx-3 text-black" />
                {player.plays}
              </div>
              <div className="text-left flex font-extrabold text-base my-3">
                <div className="mr-2">
                  {!player.isIA && <Button color="light">Roll dice</Button>}
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
      <div className="boardTable">
        <div className="board">
          <div className="center">
            <div className="community-chest-deck">
              <h2 className="label">Community Chest</h2>
              <div className="deck"></div>
            </div>

            <img src="/logo.png" className="logo title" alt="Vite logo" />
            <Button color="dark">Show log</Button>

            <div className="chance-deck">
              <h2 className="label">Chance</h2>
              <div className="deck"></div>
            </div>
          </div>

          <div className="space corner go">
            <div className="containerBoard">
              <div className="instructions">
                Collect $200.00 salary as you pass
                <div className="absolute">
                  <Avatar.Group>
                    <Avatar rounded={true} stacked={true}></Avatar>
                    <Avatar rounded={true} stacked={true}></Avatar>
                    <Avatar.Counter total={5} href="#" />
                  </Avatar.Group>
                </div>
              </div>
              <div className="go-word">go</div>
            </div>
            <icon.FaLongArrowAltLeft className="arrow" />
          </div>

          <div className="row horizontal-row bottom-row">
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar light-blue"></div>
                <div className="name">Connecticut Avenue</div>
                <div className="price">PRICE $120</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar light-blue"></div>
                <div className="name">Vermont Avenue</div>
                <div className="price">Price $100</div>
              </div>
            </div>
            <div className="space chance">
              <div className="containerBoard">
                <div className="name">Chance</div>
                <icon.FaQuestion className="drawing" />
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar light-blue"></div>
                <div className="name">Oriental Avenue</div>
                <div className="price">Price $100</div>
              </div>
            </div>
            <div className="space railroad">
              <div className="containerBoard">
                <div className="name">Reading Railroad</div>
                <icon.FaSubway className="drawing" />
                <div className="price">Price $200</div>
              </div>
            </div>
            <div className="space fee income-tax">
              <div className="containerBoard">
                <div className="name">Income Tax</div>
                <div className="diamond"></div>
                <div className="instructions">Pay 10% or $200</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar dark-purple"></div>
                <div className="name">Baltic Avenue</div>
                <div className="price">Price $50</div>
              </div>
            </div>
            <div className="space community-chest">
              <div className="containerBoard">
                <div className="name">Community Chest</div>
                <icon.FaCube className="drawing" />
                <div className="instructions">
                  Follow instructions on top card
                </div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar dark-purple"></div>
                <div className="name three-line-name">
                  Mediter- ranean Avenue
                </div>
                <div className="price">Price $50</div>
              </div>
            </div>
          </div>

          <div className="space corner jail">
            <div className="just">Just</div>
            <div className="drawing">
              <div className="containerBoard">
                <div className="name">In</div>
                <div className="window">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <icon.FaFrown className="person" />
                </div>
                <div className="name">Jail</div>
              </div>
            </div>
            <div className="visiting">Visiting</div>
          </div>

          <div className="row vertical-row left-row">
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar orange"></div>
                <div className="name">New York Avenue</div>
                <div className="price">Price $200</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar orange"></div>
                <div className="name">Tennessee Avenue</div>
                <div className="price">Price $180</div>
              </div>
            </div>
            <div className="space community-chest">
              <div className="containerBoard">
                <div className="name">Community Chest</div>
                <icon.FaCube className="drawing" />
                <div className="instructions">
                  Follow instructions on top card
                </div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar orange"></div>
                <div className="name">St. James Avenue</div>
                <div className="price">Price $180</div>
              </div>
            </div>
            <div className="space railroad">
              <div className="containerBoard">
                <div className="name long-name">Pennsylvania Railroad</div>
                <icon.FaSubway className="drawing" />
                <div className="price">Price $200</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar purple"></div>
                <div className="name">Virginia Avenue</div>
                <div className="price">Price $160</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar purple"></div>
                <div className="name">States Avenue</div>
                <div className="price">Price $140</div>
              </div>
            </div>
            <div className="space utility electric-company">
              <div className="containerBoard">
                <div className="name">Electric Company</div>
                <icon.FaLightbulb className="drawing" />
                <div className="price">Price $150</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar purple"></div>
                <div className="name">St. Charles Place</div>
                <div className="price">Price $140</div>
              </div>
            </div>
          </div>

          <div className="space corner free-parking">
            <div className="containerBoard">
              <div className="name">Free</div>
              <icon.FaCar className="drawing" />
              <div className="name">Parking</div>
            </div>
          </div>

          <div className="row horizontal-row top-row">
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar red"></div>
                <div className="name">Kentucky Avenue</div>
                <div className="price">Price $220</div>
              </div>
            </div>
            <div className="space chance">
              <div className="containerBoard">
                <div className="name">Chance</div>
                <icon.FaQuestion className="drawing blue" />
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar red"></div>
                <div className="name">Indiana Avenue</div>
                <div className="price">Price $220</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar red"></div>
                <div className="name">Illinois Avenue</div>
                <div className="price">Price $200</div>
              </div>
            </div>
            <div className="space railroad">
              <div className="containerBoard">
                <div className="name">B & O Railroad</div>
                <icon.FaSubway className="drawing" />
                <div className="price">Price $200</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar yellow"></div>
                <div className="name">Atlantic Avenue</div>
                <div className="price">Price $260</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar yellow"></div>
                <div className="name">Ventnor Avenue</div>
                <div className="price">Price $260</div>
              </div>
            </div>
            <div className="space utility waterworks">
              <div className="containerBoard">
                <div className="name">Waterworks</div>
                <icon.FaTint className="drawing" />
                <div className="price">Price $120</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar yellow"></div>
                <div className="name">Marvin Gardens</div>
                <div className="price">Price $280</div>
              </div>
            </div>
          </div>

          <div className="space corner go-to-jail">
            <div className="containerBoard">
              <div className="name">Go To</div>
              <icon.FaGavel className="drawing" />
              <div className="name">Jail</div>
            </div>
          </div>

          <div className="row vertical-row right-row">
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar green"></div>
                <div className="name">Pacific Avenue</div>
                <div className="price">Price $300</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar green"></div>
                <div className="name three-line-name">
                  North Carolina Avenue
                </div>
                <div className="price">Price $300</div>
              </div>
            </div>
            <div className="space community-chest">
              <div className="containerBoard">
                <div className="name">Community Chest</div>
                <icon.FaCube className="drawing" />
                <div className="instructions">
                  Follow instructions on top card
                </div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar green"></div>
                <div className="name long-name">Pennsylvania Avenue</div>
                <div className="price">Price $320</div>
              </div>
            </div>
            <div className="space railroad">
              <div className="containerBoard">
                <div className="name">Short Line</div>
                <icon.FaSubway className="drawing" />
                <div className="price">Price $200</div>
              </div>
            </div>
            <div className="space chance">
              <div className="containerBoard">
                <div className="name">Chance</div>
                <icon.FaQuestion className="drawing" />
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar dark-blue"></div>
                <div className="name">Park Place</div>
                <div className="price">Price $350</div>
              </div>
            </div>
            <div className="space fee luxury-tax">
              <div className="containerBoard">
                <div className="name">Luxury Tax</div>
                <icon.FaGem className="drawing" />
                <div className="instructions">Pay $75.00</div>
              </div>
            </div>
            <div className="space property">
              <div className="containerBoard">
                <div className="color-bar dark-blue"></div>
                <div className="name">Boardwalk</div>
                <div className="price">Price $400</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
