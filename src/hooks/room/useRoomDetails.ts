// hooks/useRoomDetail.ts
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { Room } from "../../types/Game";
import axios from "axios";

const ROOM_URL = "http://localhost:3001/api/rooms";

const fetchRoomDetails = async (roomId: string): Promise<Room> => {
  const { data } = await axios.get<Room>(`${ROOM_URL}/${roomId}`);
  console.log("UHHHHHHHHH ", data);
  return data;
};

export const useRoomDetail = (roomId: string) => {
  const queryClient = useQueryClient();
  const { on, off } = useSocket();

  const { data: room, refetch } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => fetchRoomDetails(roomId!),
    enabled: Boolean(roomId),
  });

  useEffect(() => {
    if (!roomId) return;

    const handleRoomUpdate = (room: Room) => {
      queryClient.setQueryData(["room", room.roomId], room);
    };

    on("ROOM_UPDATED", handleRoomUpdate);
    return () => {
      off("ROOM_UPDATED");
    };
  }, [roomId, queryClient, on, off]);

  return { room, refetch };
};
