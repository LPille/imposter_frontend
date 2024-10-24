import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import "./App.scss";
import { GameContext } from "./contexts/GameContext";

function App() {
  /*   const { isInLobby, playerName, setPlayerName, setRoomCode, setIsInLobby } =
    useGame(); */

  const { playerName, setRoomCode, isInLobby, setIsInLobby, setPlayerName } =
    useContext(GameContext);

  useEffect(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    const savedRoomCode = localStorage.getItem("roomCode");

    if (savedPlayerName && savedRoomCode) {
      setPlayerName(savedPlayerName);
      setRoomCode(savedRoomCode);
      setIsInLobby(true);
    }
  }, [setPlayerName, setRoomCode, setIsInLobby]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!playerName ? <Login /> : <Navigate to="/lobby" />}
        />
        <Route
          path="/lobby"
          element={
            playerName && isInLobby ? <Lobby /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/game"
          element={
            playerName && isInLobby ? <Game /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
