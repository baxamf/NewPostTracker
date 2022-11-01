import { Grid, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/userSlice";
import UserInfo from "../userinfo";

function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector(selectUser);

  return (
    <Grid
      container
      component="nav"
      gap="2rem"
      justifyContent="center"
      alignItems="center"
    >
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
      {user ? (
        <UserInfo username={user.username} />
      ) : (
        <Button
          size="large"
          variant={pathname === "/login" ? "outlined" : "text"}
          onClick={() => navigate("login")}
        >
          Логін/Регістрація
        </Button>
      )}
    </Grid>
  );
}

export default Navigation;
