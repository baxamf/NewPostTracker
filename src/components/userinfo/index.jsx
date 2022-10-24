import { Button, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutMutation } from "../../features/authApi";
import { resetUser } from "../../features/userSlice";

export default function UserInfo({ username }) {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    dispatch(resetUser());
  };
  return (
    <>
      <Typography fontWeight="bold">{username}</Typography>
      <Button size="large" color="error" onClick={onLogout}>
        Вийти
      </Button>
    </>
  );
}
