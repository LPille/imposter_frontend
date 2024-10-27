import React, { useContext, useEffect, useState } from "react";
import styles from "./lobby.module.scss";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import {
  useUserDetails,
  useLogoutUser,
  useDeleteUser,
} from "../../hooks/useUser";

import { useAtom } from "jotai";
import { userIdAtom, setUserIdAtom } from "../../atoms/userAtom";
import { Input } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";
import { useRoomDetail } from "../../hooks/room/useRoomDetails";
import { Player, Room } from "../../types/Game";
import { RoomList } from "../RoomList/RoomList";
import { PlayerList } from "../PlayerList/PlayerList";
import { RoomDetails } from "../RoomDetails/RoomDetails";
import { CreateRoom } from "../CreateRoom/CreateRoom";

const Lobby = () => {
  const { data: user, isLoading } = useUserDetails();
  const [_, setUserId] = useAtom(setUserIdAtom);

  const { mutate: logoutUser } = useLogoutUser();
  const { mutate: deleteUser } = useDeleteUser();

  const [roomCode, setRoomCode] = useState("");
  const { createRoom, joinRoom } = useRoom();
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const { room, refetch } = useRoomDetail(currentRoomId ?? "");

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

  if (!room && currentRoomId) return <div>Loading...</div>;
  console.log("==== currentRoomId ", room);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h1>Welcome, {user && user.name}</h1>
      </div>

      <div className={styles.adminInfoContainer}>
        <PlayerList />
        <RoomList />
      </div>

      <CreateRoom />
      <div className={styles.gameInfos}></div>
      <RoomDetails currentRoomId={currentRoomId} />

      <div className={styles.logoutContainer}>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Lobby;
