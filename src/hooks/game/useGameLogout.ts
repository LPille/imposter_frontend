import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { userIdAtom } from "../../atoms/userAtom";
import { currentGameIdAtom } from "../../atoms/gameAtom";

export const useGameLogout = () => {
  const [currentGameId, setCurrentGameId] = useAtom(currentGameIdAtom);
  const [userId] = useAtom(userIdAtom);
  const { emit } = useSocket();

  const queryClient = useQueryClient();

  const logoutGame = () => {
    if (currentGameId) {
      emit("LOGOUT_GAME", { gameId: currentGameId, userId });
      queryClient.invalidateQueries({ queryKey: ["game", currentGameId] });
      setCurrentGameId(null);
    }
  };

  return logoutGame;
};
