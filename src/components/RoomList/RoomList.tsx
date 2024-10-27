import { useState } from "react";
import styles from "./roomList.module.scss";
import { Room } from "../../types/Game";
import { useRoomList } from "../../hooks/room/useRoomList";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import cx from "classnames";
export const RoomList = () => {
  const { data: roomList } = useRoomList();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteRoom = (room: Room) => {
    console.log("RoomList deleteRoom", room);
  };

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {roomList && (
        <div className={styles.roomListContainer}>
          <div
            className={cx(styles.roomListInner, isOpen && styles.open)}
            onClick={toggleList}
          >
            <div className={styles.roomListHeader}>
              <h2>Rooms</h2>
              <KeyboardArrowDownIcon
                className={cx(styles.arrowIcon, isOpen && styles.open)}
              />
            </div>

            <ul
              className={cx(
                styles.roomList,
                isOpen ? styles.show : styles.hide
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {roomList?.map((room: Room) => (
                <li key={room.roomId} className={styles.roomItem}>
                  <span className={styles.userName}>{room.roomId}</span>
                  <IconButton
                    className={styles.btnDelete}
                    onClick={() => handleDeleteRoom(room)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
