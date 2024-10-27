import React, { useContext, useEffect, useState } from "react";
import styles from "./createRoom.module.scss";
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

export const CreateRoom = () => {
  const { data: user, isLoading } = useUserDetails();

  const [roomCode, setRoomCode] = useState("");
  const { createRoom, joinRoom } = useRoom();
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const { room, refetch } = useRoomDetail(currentRoomId ?? "");

  const handleJoinRoom = () => {
    console.log("Lobby joinRoom", user);
    if (user) {
      joinRoom(roomCode, user.userId);
      setCurrentRoomId(roomCode);
      refetch();
    }
  };

  const handleCreateRoom = () => {
    const roomId = uuidv4().slice(0, 4);
    console.log("Lobby createRoom", roomId);
    if (user) {
      createRoom(roomId, user.userId);
      setCurrentRoomId(roomId);
      refetch();
    }
  };

  return (
    <div className={styles.roomContainer}>
      <h2>Create or join a Room</h2>
      <div className={styles.actionContainer}>
        <div className={styles.createRoomButton}>
          <Button
            color="warning"
            size="lg"
            variant="soft"
            onClick={handleCreateRoom}
          >
            Create Room
          </Button>
        </div>
        <Input
          color="warning"
          sx={{ "--Input-decoratorChildHeight": "45px" }}
          placeholder="Room Code"
          size="lg"
          variant="soft"
          onChange={(e) => setRoomCode(e.target.value)}
          value={roomCode}
          endDecorator={
            <Button
              variant="solid"
              color="warning"
              onClick={() => handleJoinRoom()}
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Join Room
            </Button>
          }
        />
      </div>
    </div>
  );
};
