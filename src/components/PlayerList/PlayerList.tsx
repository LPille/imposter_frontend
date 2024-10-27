import styles from "./playerList.module.scss";
import { User } from "../../types/User";
import { useDeleteUser, useUserList } from "../../hooks/useUser";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import { useState } from "react";
import cx from "classnames";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const PlayerList = () => {
  const { data: userList } = useUserList();
  const { mutate: deleteUser } = useDeleteUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteUser = (user: User) => {
    deleteUser(user.userId);
  };

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className={styles.userListContainer}>
        <div
          className={cx(styles.userListInner, isOpen && styles.open)}
          onClick={toggleList}
        >
          <div className={styles.userListHeader}>
            <h2>Users</h2>
            <KeyboardArrowDownIcon
              className={cx(styles.arrowIcon, isOpen && styles.open)}
            />
          </div>
          <ul
            className={cx(styles.userList, isOpen ? styles.show : styles.hide)}
            onClick={(e) => e.stopPropagation()}
          >
            {userList?.map((user: User) => (
              <li key={user.userId} className={styles.userItem}>
                <span className={styles.userName}>{user.name}</span>
                <IconButton
                  className={styles.btnDelete}
                  onClick={() => handleDeleteUser(user)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
