// src/App.js
import React, { useContext } from "react";
import Login from "./components/Login/Login";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import { GameContext } from "./contexts/GameContext";

function App() {
  const { loggedIn, gameIsRunning } = useContext(GameContext);

  if (!loggedIn) {
    return <Login />;
  }

  if (loggedIn && !gameIsRunning) {
    return <Lobby />;
  }

  return <Game />;
}

export default App;
