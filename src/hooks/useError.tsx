import { Button, Dialog, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function useError() {
  const [error, setError] = useState(false);

  const onClose = () => {
    setError(false);
  };

  const ErrorWindow = (errorMessage: string) => (
    <Dialog open={error}>
      <Grid className="grid-container">
        <Typography color="error" variant="h6" textAlign="center">
          Якась зрада трапилась
        </Typography>
        <Typography>{errorMessage}</Typography>
        <Button variant="text" onClick={onClose}>
          OK
        </Button>
      </Grid>
    </Dialog>
  );
  return { error, setError, ErrorWindow };
}
