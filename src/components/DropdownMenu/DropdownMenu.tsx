import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { setUserIdAtom } from "../../atoms/userAtom";
import { useUserDetails, useLogoutUser } from "../../hooks/user/useUser";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import styles from "./DropdownMenu.module.scss";

const DropdownMenu = () => {
  const { data: user } = useUserDetails();
  const { mutate: logoutUser } = useLogoutUser();
  const [_, setUserId] = useAtom(setUserIdAtom);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      logoutUser(user.userId);
      setUserId(null);
      navigate("/login");
    }
  };

  return (
    <div className={styles.menuContainer}>
      <IconButton
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem className={styles.menuItem} onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
