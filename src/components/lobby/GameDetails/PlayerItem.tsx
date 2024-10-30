import styles from "./gameDetails.module.scss";
import { Player } from "../../../types/Game";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import { useLogoutUserFromGame } from "../../../hooks/user/useUser";
import cx from "classnames";

interface PlayerItemProps {
  player: Player;
  isAdmin: boolean;
}

export const PlayerItem = ({ player, isAdmin }: PlayerItemProps) => {
  const { mutate: logoutUserFromGame } = useLogoutUserFromGame();

  const handleLogoutUserFromGame = (player: Player) => {
    logoutUserFromGame(player.userId);
  };

  return (
    <div
      key={player.userId}
      className={cx(styles.playerItem, isAdmin && styles.isAdmin)}
    >
      <p className={styles.playerName}>
        {player.name} {isAdmin && <span>(Admin)</span>}
      </p>
      <IconButton
        className={styles.btnDelete}
        onClick={() => handleLogoutUserFromGame(player)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};
