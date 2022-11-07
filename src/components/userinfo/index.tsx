import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutMutation } from "../../features/authApi";
import { resetPackage } from "../../features/packageSlice";
import { setTthValue } from "../../features/tthValueSlice";
import { resetUser } from "../../features/userSlice";

export default function UserInfo(props: { username: string }) {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(resetPackage());
    dispatch(setTthValue(""));
  };
  return (
    <>
      <Typography fontWeight="bold">{props.username}</Typography>
      <Button size="large" color="error" onClick={onLogout}>
        Вийти
      </Button>
    </>
  );
}
