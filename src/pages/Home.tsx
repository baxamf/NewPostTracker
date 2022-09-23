import { Grid } from "@mui/material";
import ActionInputPanel from "../components/actionInputPanel";
import History from "../components/history";
import Status from "../components/status";

function Home() {
  return (
    <>
      <Grid component="main" className="grid-container">
        <ActionInputPanel />
        <Status />
      </Grid>
      <Grid component="aside" className="grid-container">
        <History />
      </Grid>
    </>
  );
}

export default Home;
