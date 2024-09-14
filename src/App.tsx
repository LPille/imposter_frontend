import React, { useContext } from "react";
import Login from "./components/Login/Login";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import { GameContext, GameContextType } from "./contexts/GameContext";

const App: React.FC = () => {
  const { loggedIn, gameIsRunning } = useContext(
    GameContext
  ) as GameContextType;

  if (!loggedIn) {
    return <Login />;
  }

  if (loggedIn && !gameIsRunning) {
    return <Lobby />;
  }

  return <Game />;
};

export default App;
