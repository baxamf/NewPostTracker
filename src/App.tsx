import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeUI from "./components/common/ThemeUI";
import Navigation from "./components/navigation";
import { useLazyCheckAuthQuery } from "./features/authApi";
import { selectUser, setCredentials } from "./features/userSlice";
import Login from "./pages/Login";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [checkAuth] = useLazyCheckAuthQuery();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth("")
        .unwrap()
        .then((res) => res && dispatch(setCredentials(res)));
    }
  }, []);

  return (
    <ThemeUI>
      <Grid bgcolor="background.default" className="App">
        {user?.username ? (
          <>
            <Navigation />
            <Outlet />
          </>
        ) : (
          <Login />
        )}
      </Grid>
    </ThemeUI>
  );
}

export default App;
