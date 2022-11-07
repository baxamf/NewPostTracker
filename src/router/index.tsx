import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Offices from "../pages/Offices";

function NewPostTrackerRouter() {
  const user = useAppSelector(selectUser);

  const PrivateRoute = (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="offices" element={<Offices />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<App />} />
    </Routes>
  );

  const PublicRoute = (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );

  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="offices" element={<Offices />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<App />} />
      </Routes> */}
      {user ? PrivateRoute : PublicRoute}
    </BrowserRouter>
  );
}

export default NewPostTrackerRouter;
