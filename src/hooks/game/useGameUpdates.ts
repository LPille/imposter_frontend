import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useSocket } from "../../contexts/SocketContext";
import { currentGameIdAtom } from "../../atoms/gameAtom";
import { Game } from "../../types/Game";

export const useGameUpdates = () => {
  const queryClient = useQueryClient();
  const { on, off } = useSocket();
  const [currentGameId, setCurrentGameId] = useAtom(currentGameIdAtom);

  useEffect(() => {
    const handleGameUpdate = (game: Game) => {
      //queryClient.setQueryData(["room", room.gameId], room);
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
    };

    on("GAME_UPDATE", handleGameUpdate);

    return () => {
      off("GAME_UPDATE");
    };
  }, [currentGameId, on, off, queryClient, setCurrentGameId]);
};
