// src/services/socketService.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3001");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendMessage = (event: string, data?: any) => {
  if (socket) {
    socket.emit(event, data);
  }
};

export const receiveMessage = (
  event: string,
  callback: (data: any) => void
) => {
  if (socket) {
    socket.on(event, callback);
  }
};
