import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  LoginRequest,
  useLoginMutation,
  useRegistrationMutation,
} from "../features/authApi";
import { setCredentials } from "../features/userSlice";
import useError from "../hooks/useError";
import validateForm from "../service/validate";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [registration] = useRegistrationMutation();
  const [formState, setFormState] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const { error, setError, ErrorWindow } = useError();
  const [errMessage, setErrMessage] = useState<string>("");

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const queryLogReg = async (query: string) => {
    const validate = validateForm(formState);
    if (validate.validateError) {
      setError(true);
      setErrMessage(validate.errMessage);
      return;
    }
    try {
      const user =
        query === "login"
          ? await login(formState).unwrap()
          : await registration(formState).unwrap();
      localStorage.setItem("token", user.accessToken);
      dispatch(setCredentials(user));
      navigate("/");
    } catch (e: any) {
      setError(true);
      setErrMessage(e.data.message);
    }
  };

  const onLoginSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    queryLogReg("login");
  };

  const onRegistration = async () => {
    queryLogReg("registration");
  };

  return (
    <Grid component="form" className="grid-container" onSubmit={onLoginSubmit}>
      {error && ErrorWindow(errMessage)}
      <TextField
        variant="outlined"
        name="username"
        label="Ім'я"
        type="text"
        onChange={handleChange}
        required
      />
      <TextField
        variant="outlined"
        name="password"
        label="Пароль"
        type="password"
        onChange={handleChange}
        required
      />
      <Button size="large" variant="contained" type="submit">
        Логін
      </Button>
      <Button size="large" variant="outlined" onClick={onRegistration}>
        Регістрація
      </Button>
    </Grid>
  );
}
