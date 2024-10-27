// Query All Rooms
// get all rooms
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ROOM_URL = "http://localhost:3001/api/rooms";

const fetchRoomList = async () => {
  const { data } = await axios.get(`${ROOM_URL}`);
  return data;
};

export const useRoomList = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const data = fetchRoomList();
      return data;
    },
  });
};
