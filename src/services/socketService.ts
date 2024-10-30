import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../features";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error: ", error);
    });

    socket.on("reconnect_failed", () => {
      console.error("Reconnection failed");
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
