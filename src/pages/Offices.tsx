import {
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLazyCheckDbCityQuery } from "../features/dbApi";
import { selectOffices, setCityValue } from "../features/officesSlice";
import useError from "../hooks/useError";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

function Offices() {
  const navigate = useNavigate();
  const [checkDbCity, { isLoading }] = useLazyCheckDbCityQuery();
  const [warhouses, setWarhouses] = useState([]);
  const cityName = useAppSelector(selectOffices);
  const dispatch = useAppDispatch();
  const { error, setError, ErrorWindow } = useError();
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (cityName) {
      showOffices();
    }
    return () => {
      dispatch(setCityValue(""));
    };
  }, []);

  const setCity = (e: InputEvent) => {
    dispatch(setCityValue(e.target.value));
  };

  function showOffices() {
    checkDbCity(cityName)
      .unwrap()
      .then((res) => setWarhouses(res))
      .catch((e) => {
        if (e.status === 401) {
          return navigate("/login");
        }
        setErrMessage(e.data.message);
        setError(true);
      });
  }

  return (
    <Grid className="grid-container">
      <Grid container gap="1rem">
        <TextField label="Місто" value={cityName} onChange={setCity} />
        <Button size="large" variant="contained" onClick={showOffices}>
          Показати відділення
        </Button>
      </Grid>
      {error && ErrorWindow(errMessage)}
      {isLoading && <CircularProgress />}
      {warhouses.map((office: { description: string; id: number }) => (
        <Card key={office.id} variant="outlined" className="grid-container">
          <Typography variant="body1">{office.description}</Typography>
        </Card>
      ))}
    </Grid>
  );
}

export default Offices;
