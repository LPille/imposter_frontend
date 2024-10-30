import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useSocket } from "../../contexts/SocketContext";
import { gameIdAtom } from "../../atoms/gameAtom";
import { Game } from "../../types/Game";

export const useGameUpdates = () => {
  const queryClient = useQueryClient();
  const { on, off } = useSocket();
  const [currentGameId, setCurrentGameId] = useAtom(gameIdAtom);

  useEffect(() => {
    const handleGameUpdate = (game: Game) => {
      queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
      queryClient.invalidateQueries({ queryKey: ["games"] });
    };

    const handleNextRound = (game: Game) => {
      queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
    };

    on("GAME_UPDATE", handleGameUpdate);
    on("ON_NEXT_ROUND", handleNextRound);

    return () => {
      off("GAME_UPDATE");
      off("ON_NEXT_ROUND");
    };
  }, [currentGameId, on, off, queryClient, setCurrentGameId]);
};
