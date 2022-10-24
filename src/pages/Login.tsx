import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  LoginRequest,
  ServerError,
  useLoginMutation,
  useRegistrationMutation,
} from "../features/authApi";
import { setCredentials } from "../features/userSlice";
import useError from "../hooks/useError";
import validateForm from "../service/validate";

export default function Login() {
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

  const onLoginSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validate = validateForm(formState);
    if (validate.validateError) {
      setError(true);
      setErrMessage(validate.errMessage);
      return;
    }
    try {
      const user = await login(formState).unwrap();
      localStorage.setItem("token", user.accessToken);
      dispatch(setCredentials(user));
    } catch (e: any) {
      setError(true);
      setErrMessage(e.data.message);
    }
  };

  const onRegistration = async () => {
    const validate = validateForm(formState);
    if (validate.validateError) {
      setError(true);
      setErrMessage(validate.errMessage);
      return;
    }
    try {
      const user = await registration(formState).unwrap();
      localStorage.setItem("token", user.accessToken);
      dispatch(setCredentials(user));
    } catch (e: any) {
      setError(true);
      setErrMessage(e.data.message);
    }
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
