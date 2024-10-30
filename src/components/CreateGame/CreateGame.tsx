import { useState } from "react";
import styles from "./createGame.module.scss";
import Button from "@mui/joy/Button";
import {} from "react-router-dom";
import { useGame } from "../../hooks/game/useGameActions";
import { useUserDetails } from "../../hooks/user/useUser";

import { Input } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";
import { GameList } from "../GameList/GameList";

export const CreateGame = () => {
  const { data: user } = useUserDetails();

  const [gameCode, setGameCode] = useState("");
  const { createGame, joinGame } = useGame();

  const handleJoinGame = () => {
    console.log("Lobby joinGame", user);
    if (user) {
      joinGame(gameCode);
    }
  };

  const handleCreateGame = () => {
    const gameId = uuidv4().slice(0, 4);
    console.log("Lobby createGame", gameId);
    if (user) {
      createGame(gameId);
    }
  };

  return (
    <div className={styles.gameContainer}>
      <h2>Create or join a Game</h2>
      <div className={styles.actionContainer}>
        <div className={styles.createGameButton}>
          <Button
            color="warning"
            size="lg"
            variant="soft"
            onClick={handleCreateGame}
          >
            Create Game
          </Button>
        </div>
        <div className={styles.joinGameButton}>
          <Input
            color="warning"
            sx={{ "--Input-decoratorChildHeight": "45px" }}
            placeholder="Game Code"
            size="lg"
            variant="soft"
            onChange={(e) => setGameCode(e.target.value)}
            value={gameCode}
            endDecorator={
              <Button
                variant="solid"
                color="warning"
                onClick={() => handleJoinGame()}
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Join Game
              </Button>
            }
          />
        </div>
      </div>
      <GameList />
    </div>
  );
};
