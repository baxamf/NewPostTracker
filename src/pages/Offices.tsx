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
import {
  useAddDbCityMutation,
  useAddDbWarhousesMutation,
  useLazyCheckDbCityQuery,
} from "../features/dbApi";
import { useGetAdressesMutation } from "../features/newPostApi";
import { selectOffices, setCityValue } from "../features/officesSlice";
import useError from "../hooks/useError";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

function Offices() {
  const navigate = useNavigate();
  const [getAddresList, { isLoading, isError }] = useGetAdressesMutation();
  const [checkDbCity] = useLazyCheckDbCityQuery();
  const [addDbCity] = useAddDbCityMutation();
  const [addDbWarhouses] = useAddDbWarhousesMutation();
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
      .then((res) => (res ? setWarhouses(res) : getNewWarhouses()))
      .catch((e) => {
        if (e.status === 401) {
          return navigate("/login");
        }
        setErrMessage(e.data.message);
        setError(true);
      });
  }

  function getNewWarhouses() {
    getAddresList(cityName)
      .unwrap()
      .then((res) => {
        if (res.data && res.data.length) {
          saveNewDataToDb(res.data);
        } else {
          setErrMessage("Немає адрес за цим запросом");
          setError(true);
        }
      });
  }

  function saveNewDataToDb(newData: any[]) {
    addDbCity(cityName)
      .unwrap()
      .then((res) => res && saveNewWarhousesToDb(res.id, newData));
  }

  function saveNewWarhousesToDb(cityId: number, warhouses: any[]) {
    addDbWarhouses({ cityId, warhouses })
      .unwrap()
      .then((res) => {
        res && setWarhouses(res);
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
      {isError && ErrorWindow("Лайно з підключенням, спробуйте ще раз")}
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
