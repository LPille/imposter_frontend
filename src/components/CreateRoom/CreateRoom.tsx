import { useState } from "react";
import styles from "./createRoom.module.scss";
import Button from "@mui/joy/Button";
import {} from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { useUserDetails } from "../../hooks/useUser";

import { Input } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";
import { useRoomDetail } from "../../hooks/room/useRoomDetails";
import { AdminRoomList } from "../admin/AdminRoomList/AdminRoomList";

export const CreateRoom = () => {
  const { data: user } = useUserDetails();

  const [roomCode, setRoomCode] = useState("");
  const { createRoom, joinRoom } = useRoom();

  const handleJoinRoom = () => {
    console.log("Lobby joinRoom", user);
    if (user) {
      joinRoom(roomCode, user.userId);
    }
  };

  const handleCreateRoom = () => {
    const roomId = uuidv4().slice(0, 4);
    console.log("Lobby createRoom", roomId);
    if (user) {
      createRoom(roomId, user.userId);
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
        <div className={styles.joinRoomButton}>
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

      <AdminRoomList />
    </div>
  );
};
