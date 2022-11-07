import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAddTtnMutation } from "../../features/dbApi";
import { setCityValue } from "../../features/officesSlice";
import {
  resetPackage,
  selectPackage,
  setPackage,
} from "../../features/packageSlice";
import { selectTthValue } from "../../features/tthValueSlice";
import { selectUser } from "../../features/userSlice";
import useError from "../../hooks/useError";

function Status() {
  const user = useAppSelector(selectUser);
  const tthValue = useAppSelector(selectTthValue);
  const packageData = useAppSelector(selectPackage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addTtn, { isLoading }] = useAddTtnMutation();
  const { error, setError, ErrorWindow } = useError();
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (user && tthValue) {
      addTtn({ value: tthValue, userId: user.id })
        .unwrap()
        .then((res) => dispatch(setPackage(res)))
        .catch((e) => {
          setErrMessage(e.data.message);
          setError(true);
        });
    }
    return () => {
      dispatch(resetPackage());
    };
  }, [tthValue]);

  const cityAddresses = (city: string) => {
    dispatch(setCityValue(city));
    navigate("/offices");
  };
  return (
    <>
      {isLoading && <CircularProgress />}
      {error && ErrorWindow(errMessage)}
      {packageData.Status && (
        <Card variant="outlined" className="grid-container" component="section">
          <Typography variant="h6">{packageData.Status}</Typography>
          <Grid container display="grid" alignItems="baseline">
            <Typography variant="h6">Відправлено: </Typography>
            <Button
              onClick={() => cityAddresses(packageData.CitySender)}
              variant="outlined"
            >
              {packageData.CitySender}
            </Button>
            <Typography variant="body1">
              {packageData.WarehouseSender}
            </Typography>
          </Grid>
          <Grid container display="grid" alignItems="baseline">
            <Typography variant="h6">Отримано: </Typography>
            <Button
              onClick={() => cityAddresses(packageData.CityRecipient)}
              variant="outlined"
            >
              {packageData.CityRecipient}
            </Button>
            <Typography variant="body1">
              {packageData.WarehouseRecipient}
            </Typography>
          </Grid>
        </Card>
      )}
    </>
  );
}

export default Status;
