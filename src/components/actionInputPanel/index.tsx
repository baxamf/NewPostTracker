import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTthValue, setTthValue } from "../../features/tthValueSlice";
import useError from "../../hooks/useError";
type InputEvent = React.ChangeEvent<HTMLInputElement>;

function ActionInputPanel() {
  const dispatch = useAppDispatch();
  const { error, setError, ErrorWindow } = useError();
  const [errMessage, setErrMessage] = useState("");
  const tthValue = useAppSelector(selectTthValue);
  const [tth, setTth] = useState("");

  useEffect(() => {
    setTth(tthValue);
  }, [tthValue]);

  useEffect(
    () => () => {
      dispatch(setTthValue(""));
    },
    []
  );

  const setInputTtn = (e: InputEvent) => setTth(e.target.value);

  const getStatusHandler = () => {
    if (!/^[0-9]{14}$/gm.test(tth)) {
      setErrMessage("ТТН має складатися з 14 цифр без пробілів");
      return setError(true);
    }
    dispatch(setTthValue(tth));
  };

  return (
    <Grid container gap="1rem">
      {error && ErrorWindow(errMessage)}
      <TextField
        variant="outlined"
        label="TTH"
        value={tth}
        onChange={setInputTtn}
      />
      <Button size="large" variant="contained" onClick={getStatusHandler}>
        Відстежити
      </Button>
    </Grid>
  );
}

export default ActionInputPanel;
