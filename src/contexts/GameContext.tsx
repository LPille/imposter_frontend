// src/context/GameContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  connectSocket,
  disconnectSocket,
  emitEvent,
  onEvent,
  offEvent,
} from "../services/socketService";
import { Socket } from "socket.io-client";

interface Player {
  name: string;
  isImposter?: boolean;
}

interface GameContextTypes {
  players: Player[];
  roomCode: string;
  isInLobby: boolean;
  playerName: string;
  isAdmin: boolean;
  setPlayerName: (name: string) => void;
  setRoomCode: (code: string) => void;
  setIsInLobby: (inLobby: boolean) => void;
  createRoom: () => void;
  joinRoom: (code: string) => void;
  startGame: () => void;
  nextRound: () => void;
  stopGame: () => void;
  logout: () => void;
}

interface GameContextProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameContextTypes>({} as GameContextTypes);

const GameContextProvider = ({ children }: GameContextProviderProps) => {
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

  /*   useEffect(() => {
    const newSocket = connectSocket();
    setSocket(newSocket);

    onEvent("PLAYER_LIST", (playerList: Player[]) => {
      setPlayers(playerList);
    });

    return () => {
      offEvent("PLAYER_LIST");
      disconnectSocket();
    };
  }, []);
 */
  const createRoom = () => {
    if (socket) {
      emitEvent("CREATE_ROOM");
      onEvent("ROOM_CREATED", (code: string) => {
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
      emitEvent("JOIN_ROOM", code);
      onEvent("ROOM_JOINED", (success: boolean) => {
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
      emitEvent("START_GAME", roomCode);
    }
  };

  const nextRound = () => {
    if (socket && isAdmin) {
      emitEvent("NEXT_ROUND", roomCode);
    }
  };

  const stopGame = () => {
    if (socket && isAdmin) {
      emitEvent("STOP_GAME", roomCode);
    }
  };

  const logout = () => {
    localStorage.removeItem("playerName");
    localStorage.removeItem("roomCode");
    setPlayerName("");
    setRoomCode("");
    setIsInLobby(false);
  };

  const context = {
    players,
    roomCode,
    isInLobby,
    playerName,
    setPlayerName,
    setRoomCode,
    setIsInLobby,
    isAdmin,
    createRoom,
    joinRoom,
    startGame,
    nextRound,
    stopGame,
    logout,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };

/* import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client"; // Assuming you're using socket.io
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "./socket";

// Define types for user, imposter, and the context value
export interface User {
  id: string;
  name: string;
}

export interface GameContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  imposter: User | null;
  setImposter: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin: (name: string) => void;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  gameIsRunning: boolean;
  setGameIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartGame: () => void;
  handleNextRound: () => void;
  handleLogOut: () => void;
  handleStopGame: () => void;
  socket: Socket;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [imposter, setImposter] = useState<User | null>(null);
  const [gameIsRunning, setGameIsRunning] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const socket = useContext(SocketContext);

  const handleLoginAccepted = useCallback((user: User) => {
    console.log("Login Request Accepted", user);
    setUser(user);
    setLoggedIn(true);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userId", user.id);
  }, []);

  const handleGameStart = useCallback((currentWord: string, imposter: User) => {
    console.log("Set Game Settings");
    setGameIsRunning(true);
    setCurrentWord(currentWord);
    setImposter(imposter);
  }, []);

  const handleGameStopped = useCallback(() => {
    console.log("Game stopped");
    setGameIsRunning(false);
  }, []);

  const handleLogin = useCallback(
    (name: string) => {
      console.log("Send Login Request for ", name);
      const id = uuidv4();
      socket.emit("SEND_LOGIN_REQUEST", { name, id });
    },
    [socket]
  );

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");

    socket.on("UPDATE_USERS", (users: User[]) => {
      console.log("UPDATE_USERS", users);
      setUsers(users);
    });

    socket.on("LOGIN_REQUEST_ACCEPTED", handleLoginAccepted);

    socket.on("GAME_STOPPED", handleGameStopped);

    socket.on(
      "GAME_INFO",
      ({ currentWord, imposter }: { currentWord: string; imposter: User }) => {
        console.log("Game Info", currentWord, imposter);
        setCurrentWord(currentWord);
        setImposter(imposter);
        setGameIsRunning(true);
      }
    );

    socket.on("START_GAME", handleGameStart);
    socket.on("STOP_GAME", handleGameStopped);

    return () => {
      socket.off("LOGIN_REQUEST_ACCEPTED", handleLoginAccepted);
      socket.off("UPDATE_USERS");
    };
  }, [socket, handleLoginAccepted, handleGameStart, handleGameStopped]);

  const handleStartGame = () => {
    console.log("Start game");
    socket.emit("START_GAME");
  };

  const handleNextRound = () => {
    console.log("Next Round");
    socket.emit("NEXT_ROUND");
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    socket.emit("LOGOUT");
  };

  const handleStopGame = () => {
    socket.emit("STOP_GAME");
  };

  const value: GameContextType = {
    user,
    setUser,
    users,
    setUsers,
    socket,
    currentWord,
    setCurrentWord,
    imposter,
    setImposter,
    handleLogin,
    loggedIn,
    setLoggedIn,
    gameIsRunning,
    setGameIsRunning,
    handleStartGame,
    handleNextRound,
    handleLogOut,
    handleStopGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
 */
