import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useDelTtnMutation, useGetTtnQuery } from "../../features/dbApi";
import { setTthValue } from "../../features/tthValueSlice";
import { User } from "../../features/authApi";

function History(prop: { user: User }) {
  const dispatch = useAppDispatch();
  const [delTtn] = useDelTtnMutation();
  const { data, isSuccess, isLoading } = useGetTtnQuery(prop.user.id);

  const historyGetStatus = (tth: string) => {
    dispatch(setTthValue(tth));
  };

  const clearHistoryStorage = () => {
    delTtn(prop.user.id);
  };

  return (
    <Grid component="aside" minWidth="250px">
      {isLoading && <CircularProgress />}
      {isSuccess && data.length ? (
        <Card variant="outlined" className="grid-container">
          <Typography variant="h6">Історія запитів</Typography>
          <Grid container display="grid" gap="1rem">
            {data.map((el) => (
              <Button
                variant="outlined"
                onClick={() => historyGetStatus(el.value)}
                key={el.id}
              >
                {el.value}
              </Button>
            ))}
          </Grid>

          <Button size="large" color="error" onClick={clearHistoryStorage}>
            Видалити історію запитів
          </Button>
        </Card>
      ) : null}
    </Grid>
  );
}

export default History;
