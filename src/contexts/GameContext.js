import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { SocketContext } from "./socket";
import { v4 as uuidv4 } from "uuid";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [imposter, setImposter] = useState({});
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const socket = useContext(SocketContext);

  const handleLoginAccepted = useCallback((user) => {
    console.log("Login Request Accepted", user);
    setUser(user);
    setLoggedIn(true);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userId", user.id);
  }, []);

  const handleGameStart = useCallback((currentWord, imposter) => {
    console.log("Set Game Settings");
    setGameIsRunning(true);
    setCurrentWord(currentWord);
    setImposter(imposter);
  }, []);

  const handleGameStopped = useCallback(() => {
    console.log("Game stopped");
    setGameIsRunning(false);
  });

  const handleLogin = useCallback((name) => {
    console.log("Send Login Request for ", name);
    const id = uuidv4();
    socket.emit("SEND_LOGIN_REQUEST", { name, id });
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");
    /*    if (name && id) {
      setUser({ name, id, socketId });
      setLoggedIn(true);
    } else {
      console.log("No user in local storage");
    } */

    socket.on("UPDATE_USERS", (users) => {
      console.log("UPDATE_USERS", users);
      setUsers(users);
    });

    socket.on("LOGIN_REQUEST_ACCEPTED", handleLoginAccepted);

    socket.on("GAME_STOPPED", () => {
      console.log("Game stopped");
      setGameIsRunning(false);
    });

    socket.on("GAME_INFO", ({ currentWord, imposter }) => {
      console.log("Game Info", currentWord, imposter);
      setCurrentWord(currentWord);
      setImposter(imposter);
      setGameIsRunning(true);
    });

    socket.on("START_GAME", handleGameStart);

    socket.on("STOP_GAME", handleGameStopped);

    socket.on("GET_CURRENT_WORD", (word) => {
      setCurrentWord(word);
    });

    socket.on("GET_IMPOSTER", (imposterId) => {
      setImposter(imposterId);
    });

    return () => {
      socket.off("LOGIN_REQUEST_ACCEPTED", handleLoginAccepted);
      socket.off("UPDATE_USERS");
    };
  }, [socket, handleLoginAccepted, handleGameStart]);

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

  const value = {
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
