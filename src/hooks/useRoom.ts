import { useQueryClient } from "@tanstack/react-query";
import { Room } from "../types/Game";
import { useSocket } from "../contexts/SocketContext";
import { useAtom } from "jotai";
import { currentRoomIdAtom } from "../atoms/roomAtom";

export const useRoom = () => {
  const queryClient = useQueryClient();
  const { emit, on, off } = useSocket();
  const [currentRoomId, setCurrentRoomId] = useAtom(currentRoomIdAtom);

  const createRoom = (roomId: string, userId: string) => {
    emit("CREATE_ROOM", { roomId, userId });
  };

  const joinRoom = (roomId: string, userId: string) => {
    emit("JOIN_ROOM", { roomId, userId });
  };

  on("ROOM_CREATED", (room: Room) => {
    setCurrentRoomId(room.roomId);
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
    queryClient.invalidateQueries({ queryKey: ["room", room.roomId] });
  });

  on("ROOM_JOINED", (room: Room) => {
    setCurrentRoomId(room.roomId);
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
    queryClient.invalidateQueries({ queryKey: ["room", room.roomId] });
  });

  on("GAME_STARTED", (room: Room) => {
    console.log("ONEVENT Game started!", room);
  });

  return { createRoom, joinRoom };
};
