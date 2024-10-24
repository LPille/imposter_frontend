import React, { useContext } from "react";
import styles from "./lobby.module.scss";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

const Lobby: React.FC = () => {
  const { players, isAdmin, playerName, startGame, roomCode, logout } =
    useContext(GameContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h1>Lobby</h1>
        <Button color="primary" size="md" variant="soft" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <p>PlayerName: {playerName}</p>
      <p>id: {roomCode}</p>

      {roomCode ? <p>Logged in</p> : <p>Not logged in</p>}

      <div className={styles.listContainer}>
        <ul className={styles.list}>
          {players.map((player) => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ul>
      </div>

      <div className={styles.actionContainer}>
        <Button color="warning" size="lg" variant="soft" onClick={startGame}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
