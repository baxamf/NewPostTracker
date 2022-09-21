import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Button size="large" onClick={() => navigate("/")}>
        home
      </Button>
      <Button size="large" onClick={() => navigate("offices")}>
        offices
      </Button>
    </Grid>
  );
}

export default Navigation;
