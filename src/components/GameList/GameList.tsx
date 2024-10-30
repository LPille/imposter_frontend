import styles from "./gameList.module.scss";
import cx from "classnames";
import { useGameList } from "../../hooks/game/useGameList";
import { Game } from "../../types/Game";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/joy/IconButton";
import { useGame } from "../../hooks/game/useGameActions";

export const GameList = () => {
  const { data: gameList } = useGameList();
  const { joinGame } = useGame();

  return (
    <div className={styles.gameListContainer}>
      {gameList && (
        <div className={cx(styles.gameListInner)}>
          <div className={styles.gameListHeader}>
            <h2>{gameList.length} Games</h2>
          </div>
          <ul className={styles.gameList} onClick={(e) => e.stopPropagation()}>
            {gameList?.map((game: Game) => (
              <li key={game.gameId} className={styles.gameItem}>
                <span className={styles.userName}>{game.gameId}</span>
                <IconButton
                  className={styles.btnLogIn}
                  onClick={() => joinGame(game.gameId)}
                >
                  <span>Join</span>
                  <LoginIcon fontSize="small" />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
