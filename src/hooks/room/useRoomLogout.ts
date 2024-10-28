import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { userIdAtom } from "../../atoms/userAtom";
import { currentRoomIdAtom } from "../../atoms/roomAtom";

export const useRoomLogout = () => {
  const [currentRoomId, setCurrentRoomId] = useAtom(currentRoomIdAtom);
  const [userId] = useAtom(userIdAtom);
  const { emit } = useSocket();

  const queryClient = useQueryClient();

  const logoutRoom = () => {
    if (currentRoomId) {
      emit("LOGOUT_ROOM", { roomId: currentRoomId, userId });
      queryClient.invalidateQueries({ queryKey: ["room", currentRoomId] });
      setCurrentRoomId(null);
    }
  };

  return logoutRoom;
};
