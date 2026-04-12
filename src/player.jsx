import React from "react";

const player = ({
  singelPlayer,
  handleSelectPlayer,
  handleRemovePlayer,
  selectedPlayers
}) => {
  return (
    <div className="m-2 bg-amber-100 mb-5 rounded-2xl p-4">
      <img src={singelPlayer.image} className="rounded-2xl mb-3" />
      <h1 className="text-2xl font-bold">Name: {singelPlayer.name}</h1>
      <p className="mb-5">Country: {singelPlayer.country}</p>
      <div className="flex justify-between">
        <div className="flex flex-col h-full">
          <p className="font-bold">Rating</p>
          <p className="font-semibold">{singelPlayer.batting_style}</p>
          <p className="font-semibold">Price: ${singelPlayer.price}</p>
        </div>
        <div className="mt-auto">
          <button
            className="btn btn-error"
            onClick={() => handleRemovePlayer(singelPlayer)}
            disabled={selectedPlayers.length === 0}
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() => handleSelectPlayer(singelPlayer)}
            disabled={selectedPlayers?.some((p) => p.id === singelPlayer.id)}
          >
            {selectedPlayers?.some((p) => p.id === singelPlayer.id)
              ? "Selected"
              : "Choose Player"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default player;
