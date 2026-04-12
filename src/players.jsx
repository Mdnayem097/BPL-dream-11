import { use } from "react";
import Player from "./player";

const Players = ({
  playersPromise,
  handleSelectPlayer,
  handleRemovePlayer,
  selectedPlayers,
  showSelected
}) => {
  const PlayersData = use(playersPromise);

  const displayPlayers = showSelected ? selectedPlayers : PlayersData;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 w-10/12 m-auto">
      {
        displayPlayers.map((player) => (
          <Player
            key={player.id}
            singelPlayer={player}
            handleRemovePlayer={handleRemovePlayer}
            handleSelectPlayer={handleSelectPlayer}
            selectedPlayers={selectedPlayers}
          />
        ))
      }
    </div>
  );
};

export default Players;