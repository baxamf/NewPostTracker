import { Button, Grid, TextField } from "@mui/material";

function ActionInputPanel() {
  return (
    <Grid>
      <TextField variant="outlined" label="TTN" />
      <Button size="large" variant="contained">
        Get Status TTN
      </Button>
    </Grid>
  );
}

export default ActionInputPanel;
