import { Button, Grid, TextField } from "@mui/material";
import { useGetStatusMutation } from "../../features/newPostApi";

function ActionInputPanel() {
  const [getStatus, { data }] = useGetStatusMutation();
  console.log(data);

  return (
    <Grid>
      <TextField variant="outlined" label="TTN" />
      <Button
        size="large"
        variant="contained"
        onClick={() => getStatus("59000509805747")}
      >
        Get Status TTN
      </Button>
    </Grid>
  );
}

export default ActionInputPanel;
