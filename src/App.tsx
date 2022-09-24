import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import ThemeUI from "./components/common/ThemeUI";
import Navigation from "./components/navigation";

function App() {
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
