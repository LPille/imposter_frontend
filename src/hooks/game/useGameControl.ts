import { useQueryClient } from "@tanstack/react-query";
import { Game } from "../../types/Game";
import { useSocket } from "../../contexts/SocketContext";
import { useAtom } from "jotai";
import { setGameIdAtom } from "../../atoms/gameAtom";
import { userIdAtom } from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useGameControl = () => {
  const queryClient = useQueryClient();
  const { emit, on, off } = useSocket();
  const [userId] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const [_, setGameId] = useAtom(setGameIdAtom);

  const createGame = (gameId: string) => {
    setGameId(gameId);
    emit("CREATE_GAME", { gameId: gameId, userId });
  };

  const joinGame = (gameId: string) => {
    setGameId(gameId);
    emit("JOIN_GAME", { gameId, userId });
  };

  const deleteGame = (gameId: string) => {
    emit("DELETE_GAME", { gameId });
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

  useEffect(() => {
    on("GAME_CREATED", (game: Game) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
    });

    on("GAME_JOINED", (game: Game) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", game.gameId] });
    });

    on("GAME_STARTED", (game: Game) => {
      navigate("/game");
    });

    on("GAME_STOPPED", (game: Game) => {
      navigate("/lobby");
    });

    return () => {
      off("GAME_STARTED");
      off("GAME_STOPPED");
      off("GAME_CREATED");
      off("GAME_JOINED");
    };
  }, [on, off, queryClient, navigate]);

  return { createGame, joinGame, deleteGame, startGame, nextRound, stopGame };
};
