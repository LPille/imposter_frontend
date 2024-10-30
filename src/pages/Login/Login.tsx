import { useState, useEffect } from "react";
import styles from "./login.module.scss";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { User } from "../../types/User";
import { useCreateUser, useUserDetails } from "../../hooks/user/useUser";

const Login = () => {
  const [name, setName] = useState("");

  const { mutate: createUser } = useCreateUser();
  const { data: user } = useUserDetails();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/lobby");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    const newUser: User = { name, userId: uuidv4() };
    createUser(newUser);
  };

  return (
    <div className={styles.section}>
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
