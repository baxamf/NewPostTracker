import { Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAddress } from "../../features/officesSlice";
import { selectPackage } from "../../features/packageSlice";

function Status() {
  const packageData = useAppSelector(selectPackage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cityAddresses = (city: string) => {
    dispatch(setAddress(city));
    navigate("/offices");
  };
  return (
    <>
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
