// src/hooks/useGame.ts
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface Player {
  name: string;
  isImposter?: boolean;
}

export const useGame = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [roomCode, setRoomCode] = useState(
    localStorage.getItem("roomCode") || ""
  );
  const [isInLobby, setIsInLobby] = useState(
    !!localStorage.getItem("roomCode")
  );
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("player-list", (playerList: Player[]) => {
      setPlayers(playerList);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const createRoom = () => {
    if (socket) {
      socket.emit("create-room");
      socket.on("room-created", (code: string) => {
        setRoomCode(code);
        setIsInLobby(true);
        setIsAdmin(true);
        localStorage.setItem("roomCode", code);
        localStorage.setItem("playerName", playerName);
      });
    }
  };

  const joinRoom = (code: string) => {
    if (socket) {
      socket.emit("join-room", code);
      socket.on("room-joined", (success: boolean) => {
        if (success) {
          setRoomCode(code);
          setIsInLobby(true);
          localStorage.setItem("roomCode", code);
          localStorage.setItem("playerName", playerName);
        }
      });
    }
  };

  const startGame = () => {
    if (socket && isAdmin) {
      socket.emit("start-game", roomCode);
    }
  };

  const logout = () => {
    localStorage.removeItem("playerName");
    localStorage.removeItem("roomCode");
    setPlayerName("");
    setRoomCode("");
    setIsInLobby(false);
  };

  return {
    players,
    roomCode,
    isInLobby,
    playerName,
    setPlayerName,
    isAdmin,
    createRoom,
    joinRoom,
    startGame,
    logout,
  };
};
