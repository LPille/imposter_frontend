import styles from "./gameDetails.module.scss";
import { Player, Game } from "../../types/Game";
import Button from "@mui/joy/Button";
import { useGameDetail } from "../../hooks/game/useGameDetails";
import { useAtom } from "jotai";
import { currentGameIdAtom } from "../../atoms/gameAtom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import { User } from "../../types/User";
import { useLogoutUserFromGame } from "../../hooks/user/useUser";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGameLogout } from "../../hooks/game/useGameLogout";

export const GameDetails = () => {
  const [currentGameId] = useAtom(currentGameIdAtom);

  const { game } = useGameDetail(currentGameId ?? "");
  const { mutate: logoutUserFromGame } = useLogoutUserFromGame();
  const logoutGame = useGameLogout();

  const handleStartGame = (game: Game) => {
    console.log("Lobby startGame", game);
  };

  const handleLogoutUserFromGame = (user: User) => {
    logoutUserFromGame(user.userId);
  };

  const handleLeaveGame = () => {
    logoutGame();
  };

  return (
    <div className={styles.gameContainer}>
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
                <h3>{game.players.length} Players</h3>
              </div>
              <div>
                <ul className={styles.playerList}>
                  {game.players &&
                    game.players.map((player: Player) => (
                      <li key={player.userId} className={styles.playerItem}>
                        <span className={styles.playerName}>{player.name}</span>
                        <IconButton
                          className={styles.btnDelete}
                          onClick={() => handleLogoutUserFromGame(player)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {game.gameRunning ? (
            <p>Game is in progress...</p>
          ) : (
            <Button
              variant="solid"
              color="success"
              onClick={() => handleStartGame(game)}
            >
              Start Game
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
