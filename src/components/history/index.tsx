import { Button, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearHistory,
  selectHistory,
  setHistory,
} from "../../features/historySlice";
import { useGetStatusMutation } from "../../features/newPostApi";
import { setPackage } from "../../features/packageSlice";
import { setTthValue } from "../../features/tthValueSlice";

function History() {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const [getStatus, { data, isSuccess }] = useGetStatusMutation();

  useEffect(() => {
    const storage = localStorage.getItem("history");
    if (storage) {
      dispatch(setHistory(JSON.parse(storage)));
    }
  }, []);

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
    localStorage.removeItem("history");
    dispatch(clearHistory());
  };

  return (
    <>
      {history.length ? (
        <Card variant="outlined" className="grid-container">
          <Typography variant="h6">Історія запитів</Typography>
          {history.map((el) => (
            <Button
              variant="outlined"
              onClick={() => historyGetStatus(el)}
              key={el}
            >
              {el}
            </Button>
          ))}
          <Button size="large" color="error" onClick={clearHistoryStorage}>
            Видалити історію запитів
          </Button>
        </Card>
      ) : null}
    </>
  );
}

export default History;
