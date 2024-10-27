import styles from "./roomDetails.module.scss";
import { Player, Room } from "../../types/Game";
import Button from "@mui/joy/Button";
import { useRoomDetail } from "../../hooks/room/useRoomDetails";
import { useEffect } from "react";

type RoomDetailsProps = {
  currentRoomId: string | null;
};

export const RoomDetails = ({ currentRoomId }: RoomDetailsProps) => {
  const { room, refetch } = useRoomDetail(currentRoomId ?? "");

  const handleStartGame = (room: Room) => {
    console.log("Lobby startGame", room);
  };

  useEffect(() => {
    console.log("Room Details:::  ", room);
  }, [room]);

  return (
    <>
      {room && (
        <div className={styles.roomDetails}>
          <h2>Room ID: {room.roomId}</h2>
          <h3>Players:</h3>
          <ul>
            {room.players &&
              room.players.map((player: Player) => (
                <li key={player.userId}>
                  {player.name} {player.isImposter ? "(Imposter)" : ""}
                </li>
              ))}
          </ul>
          {room.gameRunning ? (
            <p>Game is in progress...</p>
          ) : (
            <Button
              variant="solid"
              color="success"
              onClick={() => handleStartGame(room)}
            >
              Start Game
            </Button>
          )}
        </div>
      )}
    </>
  );
};
