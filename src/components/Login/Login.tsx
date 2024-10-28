import React, { useState, FormEvent, useContext, useEffect } from "react";
import styles from "./login.module.scss";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";
import { userIdAtom, setUserIdAtom } from "../../atoms/userAtom";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../types/User";
import { useCreateUser, useUserDetails } from "../../hooks/useUser";

const Login = () => {
  const [name, setName] = useState("");
  const [_, setUserId] = useAtom(setUserIdAtom);

  const { mutate: createUser } = useCreateUser();
  const { data: user, status, error } = useUserDetails();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/lobby");
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log("error: ", error);
  }, [error]);

  useEffect(() => {
    console.log("status: ", status);
  }, [status]);

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  const handleLogin = () => {
    const newUser: User = { name, userId: uuidv4() };
    setUserId(newUser.userId);
    createUser(newUser);
  };

  return (
    <div className={styles.section}>
      {/*       {!playerName ? (
       */}
      <div className={styles.nameContainer}>
        <h1>Set a name</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Input
            color="warning"
            sx={{ "--Input-decoratorChildHeight": "45px" }}
            placeholder="Name"
            size="lg"
            variant="soft"
            onChange={(e) => setName(e.target.value)}
            value={name}
            endDecorator={
              <Button
                variant="solid"
                color="warning"
                type="submit"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Continue
              </Button>
            }
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
