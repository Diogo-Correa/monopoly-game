import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import * as icon from "react-icons/io5";
import {
  Button,
  Modal,
  TextInput,
  Label,
  Select,
  Badge,
  Tooltip,
} from "flowbite-react";
import { Player } from "../../types/Player";
import { ModalContext } from "../../contexts/create.context";

export function CreateModal() {
  const { isOpenModal, setIsOpenModal } = useContext(ModalContext);
  const [id, setId] = useState(0);
  const [qtd, setQtd] = useState(2);
  const [playerName, setPlayerName] = useState("");
  const [playerPin, setPlayerPin] = useState("");

  const [players, setPlayers] = useState<Player[]>([]);
  const [pins, setPins] = useState([
    "failure",
    "gray",
    "indigo",
    "info",
    "pink",
    "purple",
    "success",
  ]);

  const onHandleChangeQtd = (e: any) => {
    const qtd = e.target.value;

    if (qtd < 2)
      toast("The minimum number of players is 2.", { type: "error" });
    if (qtd > 8)
      toast("The maximum number of players is 8.", { type: "error" });
    else setQtd(e.target.value);
  };

  const onHandleChangePlayerName = (e: any) => {
    setPlayerName(e.target.value);
  };

  const onHandleChangePlayerPin = (e: any) => {
    setPlayerPin(e.target.value);
  };

  const addPlayer = () => {
    if (playerPin === "")
      return toast("Choose a valid pin color!", { type: "error" });

    if (players.length < qtd) {
      const newPlayer: Player = {
        id: id,
        name: playerName,
        cash: 1500,
        inJail: false,
        pinColor: playerPin,
        isIA: false,
        plays: 0,
        next: false,
      };

      localStorage.setItem(
        "monopoly/players",
        JSON.stringify([...players, newPlayer])
      );
      setPlayers((prevState) => [...prevState, newPlayer]);
      toast("Player added.", { type: "success" });

      setPlayerName("");
      setPlayerPin("");
      pins.splice(pins.indexOf(playerPin), 1);

      setId(id + 1);
    } else toast("Player limit exceeded.", { type: "error" });
  };

  const removePlayer = (player: Player) => {
    const playerStorage = localStorage.getItem("monopoly/players");
    let playerArr;

    if (playerStorage) {
      let playerState = [...players];

      // Remove from storage
      playerArr = JSON.parse(playerStorage);
      playerArr.splice(playerArr.indexOf(player), 1);
      localStorage.setItem("monopoly/players", JSON.stringify(playerArr));

      // Update state
      playerState.splice(playerState.indexOf(player), 1);
      setPlayers(playerState);

      toast(`Player ${player.name} has been removed.`, { type: "success" });
    }
  };

  const newGame = () => {};

  useEffect(() => {
    const playerStorage = localStorage.getItem("monopoly/players");
    if (playerStorage) setPlayers(JSON.parse(playerStorage));
  }, []);

  return (
    <Modal
      show={isOpenModal}
      size="md"
      popup={true}
      onClose={() => setIsOpenModal(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Set game configurations
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="qtd" value="Players quantity" />
            </div>
            <TextInput
              id="qtd"
              defaultValue={qtd ? qtd : 2}
              required={true}
              type="number"
              min={2}
              max={8}
              icon={icon.IoGameController}
              onChange={onHandleChangeQtd}
            />
          </div>

          <div className="flex justify-between">
            {players.map((player) => (
              <Tooltip content={player.name} placement="top">
                <Badge
                  icon={icon.IoCheckmarkOutline}
                  color="success"
                  onClick={() => removePlayer(player)}
                />
              </Tooltip>
            ))}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Player name" />
            </div>
            <TextInput
              id="name"
              value={playerName != "" ? playerName : ""}
              type="text"
              required={true}
              icon={icon.IoAt}
              onChange={onHandleChangePlayerName}
            />
          </div>
          <div id="select">
            <div className="mb-2 block">
              <Label htmlFor="pins" value="Pin color" />
              <Select
                id="pins"
                required={true}
                icon={icon.IoPin}
                value={playerPin != "" ? playerPin : ""}
                onChange={onHandleChangePlayerPin}
              >
                <option value="">Choose pin color</option>
                {pins.map((pin) => (
                  <option
                    value={pin}
                    key={`text-${pin}`}
                    className={`text-${pin}`}
                  >
                    {pin}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <Button color="success" onClick={addPlayer}>
              Add player
            </Button>
            {players.length > 0 && (
              <Button color="dark" onClick={newGame}>
                Create Game
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
