import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
//const SOCKET_URL = "http://localhost:3001";
const SOCKET_URL = "http://192.168.2.63:3001";

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
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

export const emitEvent = (event: string, data?: any) => {
  if (!socket) return;
  socket.emit(event, data);
};

export const onEvent = (event: string, callback: (data: any) => void) => {
  if (!socket) return;
  socket.on(event, callback);
};

export const offEvent = (event: string) => {
  if (!socket) return;
  socket.off(event);
};
