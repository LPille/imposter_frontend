import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../features";

const fetchGameList = async () => {
  const { data } = await axios.get(`${API_URL}/games`);
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
