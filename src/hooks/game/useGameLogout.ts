import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { userIdAtom } from "../../atoms/userAtom";
import { gameIdAtom, setGameIdAtom } from "../../atoms/gameAtom";

export const useGameLogout = () => {
  const [currentGameId] = useAtom(gameIdAtom);
  const [_, setGameId] = useAtom(setGameIdAtom);

  const [userId] = useAtom(userIdAtom);
  const { emit } = useSocket();

  const queryClient = useQueryClient();

  const logoutGame = () => {
    if (currentGameId) {
      setGameId(null);
      emit("LOGOUT_GAME", { gameId: currentGameId, userId });
      queryClient.invalidateQueries({ queryKey: ["game", currentGameId] });
    }
  };

  return logoutGame;
};
