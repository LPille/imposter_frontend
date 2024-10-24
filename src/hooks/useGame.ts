/* import { useState, useEffect } from "react";
import { useSocket } from "../services/socketService";

interface Player {
  name: string;
  isImposter?: boolean;
}

export const useGame = () => {
  const { socket } = useSocket();
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
    if (!socket) return;

    socket.on("PLAYER_LIST", (playerList: Player[]) => {
      setPlayers(playerList);
    });

    return () => {
      socket.off("PLAYER_LIST");
    };
  }, [socket]);

  const createRoom = () => {
    if (socket) {
      socket.emit("CREATE_ROOM");
   
      socket.on("ROOM_CREATED", (code: string) => {
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
      socket.emit("JOIN_ROOM", code);
      socket.on("ROOM_JOINED", (success: boolean) => {
        if (success) {
          setRoomCode(code);
          setIsInLobby(true);
          localStorage.setItem("roomCode", code);
          localStorage.setItem("playerName", playerName);
        }
      });
    }
  };

  const nextRound = () => {
    if (socket && isAdmin) {
      socket.emit("NEXT_ROUND", roomCode);
    }
  };

  const startGame = () => {
    if (socket && isAdmin) {
      socket.emit("START_GAME", roomCode);
    }
  };

  const stopGame = () => {
    if (socket && isAdmin) {
      socket.emit("STOP_GAME", roomCode);
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
    setRoomCode,
    setIsInLobby,
    nextRound,
    stopGame,
    isAdmin,
    createRoom,
    joinRoom,
    startGame,
    logout,
  };
};
 */
