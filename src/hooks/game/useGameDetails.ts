import { useQuery } from "@tanstack/react-query";
import { Game } from "../../types/Game";
import axios from "axios";
import { API_URL } from "../../features";

const fetchGameDetails = async (gameId: string): Promise<Game> => {
  const { data } = await axios.get<Game>(`${API_URL}/games/${gameId}`);
  return data;
};

export const useGameDetail = (gameId: string) => {
  const { data: game } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchGameDetails(gameId!),
    enabled: !!gameId,
  });

  return { game };
};
