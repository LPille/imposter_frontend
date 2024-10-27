import { useQueryClient } from "@tanstack/react-query";
import { Room } from "../types/Game";
import { useSocket } from "../contexts/SocketContext";

export const useRoom = () => {
  const queryClient = useQueryClient();
  const { emit, on, off } = useSocket();

  const createRoom = (roomId: string, userId: string) => {
    console.log("useRoom Create room", roomId);
    emit("CREATE_ROOM", { roomId, userId });
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
  };

  const joinRoom = (roomId: string, userId: string) => {
    emit("JOIN_ROOM", { roomId, userId });
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
  };

  on("ROOM_UPDATED", (room: Room) => {
    console.log("------- -------- Check 2 Room updated!", room.roomId);
    // queryClient.setQueryData(["room", room.roomId], room);
  });

  on("GAME_STARTED", (room: Room) => {
    console.log("Game started!", room);
  });

  return { createRoom, joinRoom };
};
