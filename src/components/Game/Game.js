import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import styles from "./Game.module.scss";

function Game() {
  const [word, setWord] = useState("");
  const [isImposter, setIsImposter] = useState(false);
  const {
    currentWord,
    imposter,
    user,
    handleNextRound,
    handleStopGame,
    socket,
  } = useContext(GameContext);

  useEffect(() => {
    if (imposter.id === user.id) {
      setWord("imposter");
      setIsImposter(true);
    } else {
      setWord(currentWord);
      setIsImposter(false);
    }
  }, [user, imposter, currentWord, socket]);

  const clickNextRound = () => {
    console.log("Next Round");
    handleNextRound();
  };

  const clickStopGame = () => {
    console.log("Stop Game");
    handleStopGame();
  };

  return (
    <div className={styles.container}>
      <h1>Game {user.name}</h1>
      {isImposter ? <p>Imposter</p> : <p>{word}</p>}
      <button onClick={clickNextRound}>Next Round</button>
      <button onClick={clickStopGame}>StopGame</button>
    </div>
  );
}

export default Game;
