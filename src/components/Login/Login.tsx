import React, { useState, FormEvent, useContext } from "react";
import styles from "./login.module.scss";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [inputCode, setInputCode] = useState("");

  const { playerName, setPlayerName, createRoom, joinRoom } =
    useContext(GameContext);

  const navigate = useNavigate();

  const handleCreateRoom = () => {
    createRoom();
    navigate("/lobby");
  };

  const handleJoinRoom = () => {
    joinRoom(inputCode);
    navigate("/lobby");
  };

  const submitName = (e: FormEvent<HTMLFormElement>) => {
    setPlayerName(username);
    e.preventDefault();
  };

  /*   const handleClickLogin = (e: FormEvent<HTMLFormElement>) => {
    //handleLogin(username);
    e.preventDefault();
  }; */

  return (
    <div className={styles.section}>
      {!playerName ? (
        <div className={styles.nameContainer}>
          <h1>Login</h1>

          <form onSubmit={submitName}>
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
                  Weiter
                </Button>
              }
            />
          </form>
        </div>
      ) : (
        <div className={styles.roomContainer}>
          <h2>Hello {playerName}</h2>
          <div className={styles.actions}>
            <div className={styles.createRoomButton}>
              <Button
                color="warning"
                size="lg"
                variant="soft"
                onClick={handleCreateRoom}
              >
                Create Room
              </Button>
            </div>
            <h2>or</h2>
            <Input
              color="warning"
              sx={{ "--Input-decoratorChildHeight": "45px" }}
              placeholder="Room Code"
              size="lg"
              variant="soft"
              onChange={(e) => setInputCode(e.target.value)}
              value={inputCode}
              endDecorator={
                <Button
                  variant="solid"
                  color="warning"
                  onClick={handleJoinRoom}
                  sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  Join Room
                </Button>
              }
            />{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
