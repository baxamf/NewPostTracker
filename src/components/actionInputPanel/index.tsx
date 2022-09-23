import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pushTth, selectHistory } from "../../features/historySlice";
import { useGetStatusMutation } from "../../features/newPostApi";
import { setPackage } from "../../features/packageSlice";
import { selectTthValue, setTthValue } from "../../features/tthValueSlice";
import useError from "../../hooks/useError";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

function ActionInputPanel() {
  const [getStatus, { data, isLoading, isError, isSuccess }] =
    useGetStatusMutation();
  const dispatch = useAppDispatch();
  const { error, setError, ErrorWindow } = useError();
  const tthValue = useAppSelector(selectTthValue);
  const history = useAppSelector(selectHistory);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setPackage({
          Status: data.data[0].Status,
          CitySender: data.data[0].CitySender,
          WarehouseSender: data.data[0].WarehouseSender,
          CityRecipient: data.data[0].CityRecipient,
          WarehouseRecipient: data.data[0].WarehouseRecipient,
        })
      );
    }
  }, [data]);

  const setInputTtn = (e: InputEvent) => dispatch(setTthValue(e.target.value));
  const getStatusHandler = () => {
    if (!/^[0-9]{14}$/gm.test(tthValue)) {
      return setError(true);
    }
    getStatus(tthValue);
    if (!history.some((historyTth) => historyTth === tthValue)) {
      const updateStorage = [...history, tthValue];
      localStorage.setItem("history", JSON.stringify(updateStorage));
      dispatch(pushTth(tthValue));
    }
  };

  return (
    <Grid container gap="1rem" justifyContent="center">
      {isError && ErrorWindow("Лайно з підключенням, спробуйте ще раз")}
      {error && ErrorWindow("ТТН має складатися з 14 цифр без пробілів")}
      <TextField
        variant="outlined"
        label="TTH"
        value={tthValue}
        onChange={setInputTtn}
      />
      <Button size="large" variant="contained" onClick={getStatusHandler}>
        Відстежити
      </Button>
      {isLoading && <CircularProgress />}
    </Grid>
  );
}

export default ActionInputPanel;
