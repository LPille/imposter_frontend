import { useEffect } from "react";
import styles from "./lobby.module.scss";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { useUserDetails, useLogoutUser } from "../../hooks/user/useUser";

import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/joy/IconButton";

import { useAtom } from "jotai";
import { setUserIdAtom } from "../../atoms/userAtom";
import { useGameDetail } from "../../hooks/game/useGameDetails";
import { AdminGameList } from "../admin/AdminGameList/AdminGameList";
import { AdminUserList } from "../admin/AdminUserList/AdminUserList";
import { GameDetails } from "../GameDetails/GameDetails";
import { CreateGame } from "../CreateGame/CreateGame";
import { currentGameIdAtom } from "../../atoms/gameAtom";
import { useGameUpdates } from "../../hooks/game/useGameUpdates";

const Lobby = () => {
  const { data: user, isLoading } = useUserDetails();
  const [_, setUserId] = useAtom(setUserIdAtom);

  const { mutate: logoutUser } = useLogoutUser();

  const [currentGameId] = useAtom(currentGameIdAtom);

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
        {/*         <div className={styles.logoutContainer}>
          <Button onClick={handleLogout}>Logout</Button>
        </div> */}

        <IconButton className={styles.btnLogout} onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
        </IconButton>
        <h1>Welcome, {user && user.name}</h1>
      </div>

      <div className={styles.adminInfoContainer}>
        <AdminUserList />
        <AdminGameList />
      </div>

      {currentGameId ? <GameDetails /> : <CreateGame />}
      <div className={styles.gameInfos}></div>
    </div>
  );
};

export default Lobby;
