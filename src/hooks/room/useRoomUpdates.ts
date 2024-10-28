import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useSocket } from "../../contexts/SocketContext";
import { currentRoomIdAtom } from "../../atoms/roomAtom";
import { Room } from "../../types/Game";

export const useRoomUpdates = () => {
  const queryClient = useQueryClient();
  const { on, off } = useSocket();
  const [currentRoomId, setCurrentRoomId] = useAtom(currentRoomIdAtom);

  useEffect(() => {
    const handleRoomUpdate = (room: Room) => {
      console.log("ROOM_UPDATE ", room.roomId);
      //queryClient.setQueryData(["room", room.roomId], room);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["room", room.roomId] });
    };

    on("ROOM_UPDATE", handleRoomUpdate);

    return () => {
      off("ROOM_UPDATE");
    };
  }, [currentRoomId, on, off, queryClient, setCurrentRoomId]);
};
