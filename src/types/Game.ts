import { User } from "./User";

export interface Game {
  gameId: string;
  admin: Player;
  players: Player[];
  gameRunning: boolean;
  word: string;
  imposter: string[];
}

export interface Player extends User {
  isImposter: boolean;
  isInGame: boolean;
}
