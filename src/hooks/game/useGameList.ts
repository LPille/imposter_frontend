import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GAME_URL = "http://localhost:3001/api/games";

const fetchGameList = async () => {
  const { data } = await axios.get(`${GAME_URL}`);
  return data;
};

export const useGameList = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const data = fetchGameList();
      return data;
    },
  });
};
