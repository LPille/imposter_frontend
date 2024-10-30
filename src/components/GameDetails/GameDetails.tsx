import styles from "./gameDetails.module.scss";
import { Player, Game } from "../../types/Game";
import Button from "@mui/joy/Button";
import { useGameDetail } from "../../hooks/game/useGameDetails";
import { useAtom } from "jotai";
import { gameIdAtom } from "../../atoms/gameAtom";
import IconButton from "@mui/joy/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGameLogout } from "../../hooks/game/useGameLogout";
import { PlayerItem } from "./PlayerItem";
import { useGameControl } from "../../hooks/game/useGameControl";
import cx from "classnames";
import { GameControls } from "../GameControls/GameControls";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useNavigate } from "react-router-dom";

export const GameDetails = () => {
  const [currentGameId] = useAtom(gameIdAtom);
  const navigate = useNavigate();

  const { game } = useGameDetail(currentGameId ?? "");
  const logoutGame = useGameLogout();

  const handleLeaveGame = () => {
    logoutGame();
  };

  const handleNavigatToGame = () => {
    navigate("/game");
  };
  return (
    <div
      className={cx(
        styles.gameContainer,
        game?.gameRunning && styles.gameIsRunning
      )}
    >
      {game && currentGameId && (
        <div className={styles.gameDetails}>
          <div className={styles.gameInfos}>
            <h2>
              Game <span>{game.gameId}</span>
            </h2>

            <IconButton
              className={styles.btnLogout}
              onClick={() => handleLeaveGame()}
            >
              Leave
              <LogoutIcon fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.playerDetailsContainer}>
            <div className={styles.playerDetails}>
              <div className={styles.playerDetailsHeader}>
                <h3>{game.players.length} Players in Game</h3>
              </div>
              <div>
                <ul className={styles.playerList}>
                  {game.players &&
                    game.players.map((player: Player) => (
                      <PlayerItem
                        key={player.userId}
                        player={player}
                        isAdmin={player.userId === game.admin.userId}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </div>
          {game.gameRunning && (
            <Button
              className={styles.navigateButton}
              variant="outlined"
              onClick={handleNavigatToGame}
            >
              <p>Navigate to Game</p>
              <DoubleArrowIcon fontSize="medium" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
