import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";
import ThemeUI from "./components/common/ThemeUI";
import Navigation from "./components/navigation";

function App() {
  return (
    <ThemeUI>
      <Grid className="App">
        <Navigation />
        <Outlet />
      </Grid>
    </ThemeUI>
  );
}

export default App;
