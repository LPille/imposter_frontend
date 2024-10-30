import styles from "./game-controls.module.scss";
import cx from "classnames";
import { Game } from "../../types/Game";
import IconButton from "@mui/joy/IconButton";
import { useGameControl } from "../../hooks/game/useGameControl";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface GameControlsProps {
  game: Game;
}

export const GameControls = ({ game }: GameControlsProps) => {
  const { startGame, stopGame, nextRound } = useGameControl();

  const handleStartGame = () => {
    console.log("GameControls startGame");
    startGame(game.gameId);
  };

  const handleStopGame = () => {
    console.log("GameControls stopGame");
    stopGame(game.gameId);
  };

  const handleNextRound = () => {
    nextRound(game.gameId);
    console.log("GameControls nextWord");
  };

  return (
    <>
      {game.gameRunning ? (
        <div className={styles.gameControlsContainer}>
          <div className={styles.gameIsRunning}>
            {/*             <Button variant="outlined" color="error" onClick={handleStopGame}>
              Lobby
            </Button> */}

            <IconButton
              className={styles.iconContainer}
              aria-label="next icon"
              onClick={handleNextRound}
            >
              <SkipNextIcon />
              <p>Next Round</p>
            </IconButton>

            <IconButton
              className={styles.iconContainer}
              aria-label="pause icon"
              onClick={handleStopGame}
            >
              <PauseIcon />
              <p>Stop Game</p>
            </IconButton>
          </div>
        </div>
      ) : (
        /*      <Button variant="outlined" color="success" onClick={handleStartGame}>
          Start Game
        </Button> */
        <div className={styles.startGameContainer} onClick={handleStartGame}>
          <p> Start Game</p>
          <PlayArrowIcon />
        </div>
      )}
    </>
  );
};
