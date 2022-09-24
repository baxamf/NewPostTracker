import {
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useGetAdressesMutation } from "../features/newPostApi";
import { selectOffices, setCityValue } from "../features/officesSlice";
import useError from "../hooks/useError";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

function Offices() {
  const [getAddresList, { data, isLoading, isError, isSuccess }] =
    useGetAdressesMutation();
  const cityName: string = useAppSelector(selectOffices);
  const dispatch = useAppDispatch();
  const { ErrorWindow } = useError();

  useEffect(() => {
    if (cityName) {
      getAddresList(cityName);
    }
  }, []);

  const setCity = (e: InputEvent) => {
    dispatch(setCityValue(e.target.value));
  };

  const showOffices = () => {
    getAddresList(cityName);
  };

  return (
    <Grid className="grid-container">
      <Grid container gap="1rem">
        <TextField label="Місто" value={cityName} onChange={setCity} />
        <Button size="large" variant="contained" onClick={showOffices}>
          Показати відділення
        </Button>
      </Grid>
      {isError && ErrorWindow("Лайно з підключенням, спробуйте ще раз")}
      {isLoading && <CircularProgress />}
      {isSuccess &&
        data.data.map((office: { Description: string; SiteKey: string }) => (
          <Card
            key={office.SiteKey}
            variant="outlined"
            className="grid-container"
          >
            <Typography variant="body1">{office.Description}</Typography>
          </Card>
        ))}
    </Grid>
  );
}

export default Offices;
