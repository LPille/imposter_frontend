import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { Game } from "../../types/Game";
import axios from "axios";

//const GAME_URL = "http://localhost:3001/api/games";
const GAME_URL = "http://192.168.2.63:3001/api/games";

const fetchGameDetails = async (gameId: string): Promise<Game> => {
  const { data } = await axios.get<Game>(`${GAME_URL}/${gameId}`);
  return data;
};

export const useGameDetail = (gameId: string) => {
  const queryClient = useQueryClient();
  const { on, off } = useSocket();

  const { data: game } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchGameDetails(gameId!),
    enabled: !!gameId,
  });

  /*   useEffect(() => {
    if (!gameId) return;
    const handleGameUpdate = (game: Game) => {
      queryClient.setQueryData(["game", game.gameId], game);
    };

    on("GAME_UPDATED", handleGameUpdate);
    return () => {
      off("GAME_UPDATED");
    };
  }, [gameId, queryClient, on, off]); */

  return { game };
};
