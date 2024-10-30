import { useQueryClient } from "@tanstack/react-query";
import { Game } from "../../types/Game";
import { useSocket } from "../../contexts/SocketContext";
import { useAtom } from "jotai";
import { currentGameIdAtom } from "../../atoms/gameAtom";
import { userIdAtom } from "../../atoms/userAtom";

export const useGame = () => {
  const queryClient = useQueryClient();
  const { emit, on, off } = useSocket();
  const [userId] = useAtom(userIdAtom);

  const [_, setCurrentgameId] = useAtom(currentGameIdAtom);

  const createGame = (gameId: string) => {
    emit("CREATE_GAME", { gameId: gameId, userId });
  };

  const joinGame = (gameId: string) => {
    emit("JOIN_GAME", { gameId, userId });
  };

  const startGame = (gameId: string) => {
    emit("START_GAME", { gameId });
  };

  const nextRound = (gameId: string) => {
    emit("NEXT_ROUND", { gameId });
  };

  const stopGame = (gameId: string) => {
    emit("STOP_GAME", { gameId });
  };

  on("GAME_CREATED", (game: Game) => {
    setCurrentgameId(game.gameId);
    queryClient.invalidateQueries({ queryKey: ["games"] });
    queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
  });

  on("GAME_JOINED", (game: Game) => {
    setCurrentgameId(game.gameId);
    queryClient.invalidateQueries({ queryKey: ["games"] });
    queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
  });

  on("GAME_STARTED", (game: Game) => {
    // Send everyone to the game page

    console.log("ONEVENT Game started!", game);
  });

  return { createGame, joinGame, startGame, nextRound, stopGame };
};
