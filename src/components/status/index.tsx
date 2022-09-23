import { Card, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectPackage } from "../../features/packageSlice";

function Status() {
  const packageData = useAppSelector(selectPackage);
  return (
    <>
      {packageData.Status && (
        <Card variant="outlined" className="grid-container">
          <Typography variant="h6">{packageData.Status}</Typography>
          <Grid container display="grid" alignItems="baseline">
            <Typography variant="h6">Відправлено: </Typography>
            <Typography variant="subtitle2">
              {packageData.CitySender}
            </Typography>
            <Typography variant="body1">
              {packageData.WarehouseSender}
            </Typography>
          </Grid>
          <Grid container display="grid" alignItems="baseline">
            <Typography variant="h6">Отримано: </Typography>
            <Typography variant="subtitle2">
              {packageData.CityRecipient}
            </Typography>
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
