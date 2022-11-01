import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import ThemeUI from "./components/common/ThemeUI";
import Navigation from "./components/navigation";
import { useLazyCheckAuthQuery } from "./features/authApi";
import { setCredentials } from "./features/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const [checkAuth] = useLazyCheckAuthQuery();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth("")
        .unwrap()
        .then((res) => res && dispatch(setCredentials(res)))
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <ThemeUI>
      <Grid bgcolor="background.default" className="App">
        <Navigation />
        <Outlet />
      </Grid>
    </ThemeUI>
  );
}

export default App;
