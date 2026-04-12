import "./App.css";
import logo from "./assets/logo.png";
import dolar from "./assets/dollar_1.png";
import backgroun from "./assets/bg-shadow.png";
import baner from "./assets/banner-main.png";
import Players from "./players";
import { Suspense, useState } from "react";

const fetchPlayers = fetch("/data.json").then((res) => res.json());

function App() {
  const PlayersPromise = fetchPlayers;

  const [coin, SetCoin] = useState(5000000);
  const [SelectedCount, SetSelectedCount] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showSelected, setShowSelected] = useState(false);

  const handleSelectPlayer = (player) => {
    const price = Number(player.price);
    const exists = selectedPlayers.find((p) => p.id === player.id);

    if (exists) {
      alert("Player already selected ❌");
      return;
    }

    if (coin >= price) {
      SetCoin((prev) => prev - price);
      SetSelectedCount((prev) => prev + 1);

      setSelectedPlayers((prev) => [...prev, player]);
    } else {
      alert("Not enough coin ❌");
    }
  };

  const handleRemovePlayer = (player) => {
    const price = Number(player.price);

    setSelectedPlayers((prev) => prev.filter(p => p.id !== player.id));
    SetCoin(prev => prev + price);
    SetSelectedCount(prev => prev - 1);
  };

  return (
    <>
      <nav className="w-10/12 m-auto">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>Fixture</a>
                </li>
                <li>
                  <a>Teams</a>
                </li>
                <li>
                  <a>Schedules</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">
              <img src={logo} />
            </a>
          </div>
          <div className="navbar-end ">
            <ul className="menu menu-horizontal gap-7 px-1 hidden lg:flex">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Fixture</a>
              </li>
              <li>
                <a>Teams</a>
              </li>
              <li>
                <a>Schedules</a>
              </li>
            </ul>
            <div className="flex gap-2 justify-center items-center ml-10 font-bold">
              <span id="CurentBlance">{coin}</span>
              <li> Coin </li>
              <img className="w-5 h-5" src={dolar} />
            </div>
          </div>
        </div>
      </nav>

      <div className="w-10/12 m-auto relative flex flex-col items-center">
        <img
          className="w-full  h-full rounded-2xl absolute -z-10"
          src={backgroun}
        />
        <img src={baner} className="m-auto w-40 pt-10" />
        <h2 className="text-center font-bold md:font-bold mt-5 text-3xl">
          Assemble Your Ultimate Dream 11 Cricket Team
        </h2>
        <p className="mt-5 font-bold text-lg">
          Beyond Boundaries Beyond Limits
        </p>
        <button className="btn btn-warning mt-5 mb-14 text-black">
          Claim Free Credit
        </button>
      </div>

      <div className="w-10/12 m-auto flex justify-between mt-15 mb-8">
        <div>
          <p className="font-bold text-2xl">Available Players</p>
        </div>
        <div>
          <button
            className="btn btn-soft btn-warning text-black"
            onClick={() => setShowSelected(false)}
          >
            Available
          </button>
          <button
            className="btn btn-soft btn-warning text-black"
            onClick={() => setShowSelected(true)}
          >
            Selected {SelectedCount}
          </button>
        </div>
      </div>

      <Suspense
        fallback={<span className="loading loading-spinner loading-xl"></span>}
      >
        <Players
          handleSelectPlayer={handleSelectPlayer}
          handleRemovePlayer={handleRemovePlayer}
          playersPromise={PlayersPromise}
          selectedPlayers={selectedPlayers}
          showSelected={showSelected}
        ></Players>
      </Suspense>
    </>
  );
}

export default App;
