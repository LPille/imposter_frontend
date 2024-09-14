import React, { useContext } from "react";
import { GameContext, GameContextType } from "../../contexts/GameContext";
import styles from "./lobby.module.scss";
import Button from "@mui/joy/Button";

const Lobby: React.FC = () => {
  const { users, user, handleStartGame, loggedIn, handleLogOut } = useContext(
    GameContext
  ) as GameContextType;

  const clickStartGame = () => {
    handleStartGame();
  };

  const clickLogOut = () => {
    handleLogOut();
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h1>Lobby</h1>
        <Button color="primary" size="md" variant="soft" onClick={clickLogOut}>
          Log out
        </Button>
      </div>
      <p>User: {user?.name}</p>
      <p>id: {user?.id}</p>

      {loggedIn ? <p>Logged in</p> : <p>Not logged in</p>}

      <div className={styles.listContainer}>
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      <div className={styles.actionContainer}>
        <Button
          color="warning"
          size="lg"
          variant="soft"
          onClick={clickStartGame}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
