import React, {
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
