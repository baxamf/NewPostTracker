import { Grid, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Grid container component="nav" gap="2rem" justifyContent="center">
      <Button
        variant={pathname === "/" ? "outlined" : "text"}
        size="large"
        onClick={() => navigate("/")}
      >
        Відстежити заказ
      </Button>
      <Button
        variant={pathname === "/offices" ? "outlined" : "text"}
        size="large"
        onClick={() => navigate("offices")}
      >
        Адреси
      </Button>
    </Grid>
  );
}

export default Navigation;
