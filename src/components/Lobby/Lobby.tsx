import { useEffect } from "react";
import styles from "./lobby.module.scss";
import { useNavigate } from "react-router-dom";
import { useUserDetails, useLogoutUser } from "../../hooks/user/useUser";

import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/joy/IconButton";

import { useAtom } from "jotai";
import { setUserIdAtom, userIdAtom } from "../../atoms/userAtom";
import { useGameDetail } from "../../hooks/game/useGameDetails";
import { AdminGameList } from "../admin/AdminGameList/AdminGameList";
import { AdminUserList } from "../admin/AdminUserList/AdminUserList";
import { GameDetails } from "../GameDetails/GameDetails";
import { CreateGame } from "../CreateGame/CreateGame";
import { gameIdAtom } from "../../atoms/gameAtom";
import { GameControls } from "../GameControls/GameControls";
import MenuIcon from "@mui/icons-material/Menu";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const Lobby = () => {
  const { data: user, isLoading } = useUserDetails();
  const [_, setUserId] = useAtom(setUserIdAtom);
  const [userId] = useAtom(userIdAtom);
  const adminMode = false;
  const { mutate: logoutUser } = useLogoutUser();

  const [currentGameId] = useAtom(gameIdAtom);

  const { game } = useGameDetail(currentGameId ?? "");

  const navigate = useNavigate();

  // Navigate to login if no user is found
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const handleLogout = () => {
    if (user) {
      logoutUser(user.userId);
      setUserId(null);
      navigate("/login");
    }
  };

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
