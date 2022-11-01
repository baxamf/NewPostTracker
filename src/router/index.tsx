import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Offices from "../pages/Offices";

function NewPostTrackerRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="offices" element={<Offices />} />
          <Route path="login" element={<Login/>}/>
        </Route>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NewPostTrackerRouter;
