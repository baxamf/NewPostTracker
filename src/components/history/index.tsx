import { Button, Card, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useDelTtnMutation, useGetTtnQuery } from "../../features/dbApi";
import { useGetStatusMutation } from "../../features/newPostApi";
import { setPackage } from "../../features/packageSlice";
import { setTthValue } from "../../features/tthValueSlice";

function History() {
  const dispatch = useAppDispatch();
  const [getStatus, { data, isSuccess }] = useGetStatusMutation();
  const [delTtn] = useDelTtnMutation();
  const { data: ttnData, isSuccess: ttnSuccess } = useGetTtnQuery("");

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

  const historyGetStatus = (tth: string) => {
    getStatus(tth);
    dispatch(setTthValue(tth));
  };

  const clearHistoryStorage = () => {
    delTtn("");
  };

  return (
    <Grid component="aside" minWidth="250px">
      {ttnSuccess && ttnData.length ? (
        <Card variant="outlined" className="grid-container">
          <Typography variant="h6">Історія запитів</Typography>
          <Grid container display="grid" gap="1rem">
            {ttnData.map((el: { id: number; value: string }) => (
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
