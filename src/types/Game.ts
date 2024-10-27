import { User } from "./User";

export interface Room {
  roomId: string;
  admin: Player;
  players: Player[];
  gameRunning: boolean;
}

export interface Player extends User {
  isImposter: boolean;
  isInGame: boolean;
}
