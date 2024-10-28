import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { userIdAtom } from "../../atoms/userAtom";
import { currentRoomIdAtom } from "../../atoms/roomAtom";
import { useEffect } from "react";

export const useRoomDelete = () => {
  const [currentRoomId, setCurrentRoomId] = useAtom(currentRoomIdAtom);
  const { emit, on, off } = useSocket();

  const queryClient = useQueryClient();

  const deleteRoom = (roomId: string) => {
    emit("DELETE_ROOM", { roomId });
  };

  useEffect(() => {
    const handleRoomDeleted = (roomId: string) => {
      console.log("Room Delete Success ", roomId);
      //queryClient.setQueryData(["room", room.roomId], room);
      /*       if (roomId === currentRoomId) {
        console.log("SET TO NULL");
        setCurrentRoomId(null);
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
        queryClient.invalidateQueries({ queryKey: ["room", currentRoomId] });
      }
      queryClient.invalidateQueries({ queryKey: ["rooms"] }); */
    };

    on("ROOM_DELETED", handleRoomDeleted);

    return () => {
      off("ROOM_DELETED");
    };
  }, [currentRoomId, on, off, queryClient, setCurrentRoomId]);

  return deleteRoom;
};
