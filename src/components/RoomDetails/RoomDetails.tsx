import styles from "./roomDetails.module.scss";
import { Player, Room } from "../../types/Game";
import Button from "@mui/joy/Button";
import { useRoomDetail } from "../../hooks/room/useRoomDetails";
import { useAtom } from "jotai";
import { currentRoomIdAtom } from "../../atoms/roomAtom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import { User } from "../../types/User";
import { useLogoutUserFromRoom } from "../../hooks/useUser";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRoomLogout } from "../../hooks/room/useRoomLogout";

export const RoomDetails = () => {
  const [currentRoomId] = useAtom(currentRoomIdAtom);

  const { room } = useRoomDetail(currentRoomId ?? "");
  const { mutate: logoutUserFromRoom } = useLogoutUserFromRoom();
  const logoutRoom = useRoomLogout();

  const handleStartGame = (room: Room) => {
    console.log("Lobby startGame", room);
  };

  const handleLogoutUserFromRoom = (user: User) => {
    logoutUserFromRoom(user.userId);
  };

  const handleLeaveRoom = () => {
    logoutRoom();
  };

  return (
    <div className={styles.roomContainer}>
      {room && currentRoomId && (
        <div className={styles.roomDetails}>
          <div className={styles.roomInfos}>
            <h2>Room {room.roomId}</h2>

            <IconButton
              className={styles.btnLogout}
              onClick={() => handleLeaveRoom()}
            >
              Leave
              <LogoutIcon fontSize="small" />
            </IconButton>
          </div>

          <div className={styles.playerDetails}>
            <h3>{room.players.length} Players</h3>
            <ul className={styles.playerList}>
              {room.players &&
                room.players.map((player: Player) => (
                  <li key={player.userId} className={styles.playerItem}>
                    <span className={styles.playerName}>{player.name}</span>
                    <IconButton
                      className={styles.btnDelete}
                      onClick={() => handleLogoutUserFromRoom(player)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
            </ul>
          </div>

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
    </div>
  );
};
