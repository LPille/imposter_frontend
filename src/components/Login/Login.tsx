import React, { useState, useContext, FormEvent } from "react";
import { GameContext, GameContextType } from "../../contexts/GameContext";
import styles from "./login.module.scss";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const Login: React.FC = () => {
  const { loggedIn, handleLogin } = useContext(GameContext) as GameContextType;
  const [username, setUsername] = useState<string>("");

  const handleClickLogin = (e: FormEvent<HTMLFormElement>) => {
    handleLogin(username);
    e.preventDefault();
  };

  return (
    <div className={styles.section}>
      <h1>Login</h1>
      <form onSubmit={handleClickLogin}>
        <Input
          color="warning"
          sx={{ "--Input-decoratorChildHeight": "45px" }}
          placeholder="Name"
          size="lg"
          variant="soft"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          endDecorator={
            <Button
              variant="solid"
              color="warning"
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Login
            </Button>
          }
        />
      </form>
    </div>
  );
};

export default Login;
