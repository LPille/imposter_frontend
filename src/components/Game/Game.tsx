import React, { useEffect, useState, useContext } from "react";
import { GameContext, GameContextType } from "../../contexts/GameContext";
import styles from "./game.module.scss";

const Game: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [isImposter, setIsImposter] = useState<boolean>(false);
  const { currentWord, imposter, user, handleNextRound, handleStopGame } =
    useContext(GameContext) as GameContextType;

  useEffect(() => {
    if (imposter?.id === user?.id) {
      setWord("imposter");
      setIsImposter(true);
    } else {
      setWord(currentWord);
      setIsImposter(false);
    }
  }, [user, imposter, currentWord]);

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
      <h1>Game {user?.name}</h1>
      {isImposter ? <p>Imposter</p> : <p>{word}</p>}
      <button onClick={clickNextRound}>Next Round</button>
      <button onClick={clickStopGame}>Stop Game</button>
    </div>
  );
};

export default Game;
