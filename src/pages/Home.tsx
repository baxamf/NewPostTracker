import { Grid } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import ActionInputPanel from "../components/actionInputPanel";
import History from "../components/history";
import Status from "../components/status";
import { selectUser } from "../features/userSlice";

function Home() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Grid component="main" className="grid-container">
        {user && <ActionInputPanel />}
        <Grid container gap="2rem" alignItems="flex-start">
          <Status />
          {user && <History user={user} />}
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
