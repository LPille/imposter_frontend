import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  connectSocket,
  disconnectSocket,
  onEvent,
  offEvent,
  emitEvent,
} from "../services/socketService";
import { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string) => void;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketConnection = connectSocket();
    setSocket(socketConnection);

    return () => {
      disconnectSocket();
    };
  }, []);

  const emit = (event: string, data?: any) => {
    emitEvent(event, data);
  };

  const on = (event: string, callback: (data: any) => void) => {
    onEvent(event, callback);
  };

  const off = (event: string) => {
    offEvent(event);
  };

  return (
    <SocketContext.Provider value={{ socket, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
