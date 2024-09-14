import React, { useContext } from "react";
import { GameContext, GameContextType } from "../../contexts/GameContext"; // Assuming GameContextType exists
import styles from "./Lobby.module.scss";
import Button from "@mui/joy/Button";
import { logOut } from "../../assets/icons/icons";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Lobby: React.FC = () => {
  // Adding types to destructured values from GameContext
  const { users, user, handleStartGame, loggedIn, handleLogOut } =
    useContext<GameContextType>(GameContext);

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
          width="100%"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
