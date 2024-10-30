import { useEffect } from "react";
import styles from "./lobby.module.scss";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../hooks/user/useUser";

import { useAtom } from "jotai";
import { userIdAtom } from "../../atoms/userAtom";
import { useGameDetail } from "../../hooks/game/useGameDetails";
import { AdminGameList } from "../../components/admin/AdminGameList/AdminGameList";
import { AdminUserList } from "../../components/admin/AdminUserList/AdminUserList";
import { GameDetails } from "../../components/lobby/GameDetails/GameDetails";
import { CreateGame } from "../../components/lobby/CreateGame/CreateGame";
import { gameIdAtom } from "../../atoms/gameAtom";
import { GameControls } from "../../components/GameControls/GameControls";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

const Lobby = () => {
  const { data: user, isLoading } = useUserDetails();
  const [userId] = useAtom(userIdAtom);
  const adminMode = false;

  const [currentGameId] = useAtom(gameIdAtom);

  const { game } = useGameDetail(currentGameId ?? "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h1>Welcome, {user && user.name}</h1>
      </div>

      <DropdownMenu />

      {adminMode && (
        <div className={styles.adminInfoContainer}>
          <AdminUserList />
          <AdminGameList />
        </div>
      )}

      {currentGameId ? <GameDetails /> : <CreateGame />}

      {game && game.admin.userId === userId && <GameControls game={game} />}
    </div>
  );
};

export default Lobby;
