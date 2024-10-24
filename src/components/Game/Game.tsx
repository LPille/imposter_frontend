import React, { useEffect, useState, useContext } from "react";
import styles from "./game.module.scss";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

const Game: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [isImposter, setIsImposter] = useState<boolean>(false);

  const {
    players,
    isAdmin,
    playerName,
    startGame,
    stopGame,
    nextRound,
    roomCode,
    logout,
  } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Game {playerName}</h1>
      {isImposter ? <p>Imposter</p> : <p>{word}</p>}
      {isAdmin && (
        <div className={styles.adminActions}>
          <button onClick={nextRound}>Next Round</button>
          <button onClick={stopGame}>Stop Game</button>
        </div>
      )}
    </div>
  );
};

export default Game;
