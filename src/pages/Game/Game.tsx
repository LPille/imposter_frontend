import styles from "./game.module.scss";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/joy/IconButton";
import { useGameDetail } from "../../hooks/game/useGameDetails";
import { useAtom } from "jotai";
import { gameIdAtom } from "../../atoms/gameAtom";
import { GameControls } from "../../components/GameControls/GameControls";
import { userIdAtom } from "../../atoms/userAtom";
import { blurWordAtom } from "../../atoms/blurWordAtom";
import cx from "classnames";
import useRandomMeme from "../../services/useRandomMeme";
import { memes } from "../../features";

const Game = () => {
  const [userId] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const [currentGameId] = useAtom(gameIdAtom);
  const [blurWord, setBlurWord] = useAtom(blurWordAtom);

  //const [isHeldDown, setIsHeldDown] = useState(false);

  const { game } = useGameDetail(currentGameId ?? "");

  const { memeUrl, fetchMeme } = useRandomMeme();

  const handleBackToLobby = () => {
    navigate("/lobby");
  };

  /*   const handleMouseDown = () => {
    setIsHeldDown(true);
  };

  const handleMouseUp = () => {
    setIsHeldDown(false);
  }; */

  const toggleBlurWord = () => {
    if (!blurWord) fetchMeme();
    setBlurWord(!blurWord);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameHeader} onClick={handleBackToLobby}>
        <IconButton className={styles.btnLogout}>
          <LogoutIcon fontSize="small" />
        </IconButton>
        <h1>Lobby</h1>
      </div>

      <div
        className={cx(styles.wordContainer)}
        onClick={toggleBlurWord}
        /*    onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp} */
      >
        <div className={cx(styles.blurContainer, blurWord && styles.blurWord)}>
          {memes && (
            <img src={memeUrl} alt="Random Meme" className={styles.memeImage} />
          )}
        </div>
        {game &&
          userId &&
          (game.imposter.includes(userId) ? (
            <h1>Imposter</h1>
          ) : (
            <h1>{game.word}</h1>
          ))}
      </div>

      {game && game.admin.userId === userId && <GameControls game={game} />}
    </div>
  );
};

export default Game;
