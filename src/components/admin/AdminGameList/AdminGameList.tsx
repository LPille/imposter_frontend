import { useState } from "react";
import styles from "./gameList.module.scss";
import { Game } from "../../../types/Game";
import { useGameList } from "../../../hooks/game/useGameList";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import cx from "classnames";
import { useGameControl } from "../../../hooks/game/useGameControl";

export const AdminGameList = () => {
  const { data: gameList } = useGameList();
  const [isOpen, setIsOpen] = useState(false);
  const { deleteGame } = useGameControl();

  const handleDeleteGame = (game: Game) => {
    deleteGame(game.gameId);
  };

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {gameList && (
        <div className={styles.gameListContainer}>
          <div
            className={cx(styles.gameListInner, isOpen && styles.open)}
            onClick={toggleList}
          >
            <div className={styles.gameListHeader}>
              <h2>Games {gameList.length}</h2>
              <KeyboardArrowDownIcon
                className={cx(styles.arrowIcon, isOpen && styles.open)}
              />
            </div>

            <ul
              className={cx(
                styles.gameList,
                isOpen ? styles.show : styles.hide
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {gameList?.map((game: Game) => (
                <li key={game.gameId} className={styles.gameItem}>
                  <span className={styles.userName}>{game.gameId}</span>
                  <IconButton
                    className={styles.btnDelete}
                    onClick={() => handleDeleteGame(game)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
