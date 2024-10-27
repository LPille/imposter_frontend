import { useEffect } from "react";
import webSocketService from "../services/websocketService";

export const useSocket = () => {
  useEffect(() => {
    webSocketService.connect();
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return {
    socket: webSocketService.socket,
    createRoom: webSocketService.createRoom,
    joinRoom: webSocketService.joinRoom,
  };
};
