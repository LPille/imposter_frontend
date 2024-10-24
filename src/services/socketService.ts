import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const SOCKET_URL = "http://localhost:3001";

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

// Optional: You can add more utility functions for specific actions

/* // src/context/SocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children} {/* Render children here */
/*     </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
 */
