import { Grid } from "@mui/material";
import ActionInputPanel from "../components/actionInputPanel";
import History from "../components/history";
import Status from "../components/status";

function Home() {
  return (
    <>
      <Grid component="main" className="grid-container">
        <ActionInputPanel />
        <Grid container gap="2rem" alignItems="flex-start">
          <Status />
          <History />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
