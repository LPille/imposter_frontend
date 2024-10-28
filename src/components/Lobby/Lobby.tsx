import { useEffect } from "react";
import styles from "./lobby.module.scss";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { useUserDetails, useLogoutUser } from "../../hooks/useUser";

import { useAtom } from "jotai";
import { setUserIdAtom } from "../../atoms/userAtom";
import { useRoomDetail } from "../../hooks/room/useRoomDetails";
import { AdminRoomList } from "../admin/AdminRoomList/AdminRoomList";
import { AdminUserList } from "../admin/AdminUserList/AdminUserList";
import { RoomDetails } from "../RoomDetails/RoomDetails";
import { CreateRoom } from "../CreateRoom/CreateRoom";
import { currentRoomIdAtom } from "../../atoms/roomAtom";
import { useRoomUpdates } from "../../hooks/room/useRoomUpdates";

const Lobby = () => {
  const { data: user, isLoading } = useUserDetails();
  const [_, setUserId] = useAtom(setUserIdAtom);

  const { mutate: logoutUser } = useLogoutUser();

  const [currentRoomId] = useAtom(currentRoomIdAtom);

  const { room } = useRoomDetail(currentRoomId ?? "");

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

      <div className={styles.adminInfoContainer}>
        <AdminUserList />
        <AdminRoomList />
      </div>

      {currentRoomId ? <RoomDetails /> : <CreateRoom />}
      <div className={styles.gameInfos}></div>

      <div className={styles.logoutContainer}>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Lobby;
