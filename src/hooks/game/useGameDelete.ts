import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../../contexts/SocketContext";
import { userIdAtom } from "../../atoms/userAtom";
import { currentGameIdAtom } from "../../atoms/gameAtom";
import { useEffect } from "react";

export const useGameDelete = () => {
  const [currentGameId, setCurrentGameId] = useAtom(currentGameIdAtom);
  const { emit, on, off } = useSocket();

  const queryClient = useQueryClient();

  const deleteGame = (gameId: string) => {
    emit("DELETE_GAME", { gameId });
  };

  useEffect(() => {
    const handleGameDeleted = (gameId: string) => {
      console.log("Game Delete Success ", gameId);
      //queryClient.setQueryData(["room", room.roomId], room);
      /*       if (roomId === currentRoomId) {
        console.log("SET TO NULL");
        setCurrentRoomId(null);
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
        queryClient.invalidateQueries({ queryKey: ["room", currentRoomId] });
      }
      queryClient.invalidateQueries({ queryKey: ["rooms"] }); */
    };

    on("GAME_DELETED", handleGameDeleted);

    return () => {
      off("GAME_DELETED");
    };
  }, [currentGameId, on, off, queryClient, setCurrentGameId]);

  return deleteGame;
};
