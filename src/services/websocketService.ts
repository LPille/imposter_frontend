import { io, Socket } from "socket.io-client";

class WebSocketService {
  socket: Socket | null = null;

  connect() {
    this.socket = io("http://localhost:3001");
  }

  createRoom(name: string) {
    this.socket?.emit("CREATE_ROOM", name, (data: any) => {
      console.log("Room created", data);
    });
  }

  joinRoom(roomId: string, name: string) {
    this.socket?.emit("JOIN_ROOM", roomId, name, (response: any) => {
      if (response.success) {
        console.log("Joined room", roomId);
      } else {
        console.error(response.message);
      }
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
