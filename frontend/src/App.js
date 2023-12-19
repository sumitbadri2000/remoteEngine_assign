import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

import PrivateRoute from "./routes/privateRoute";
import Onboarding from "./pages/Onboarding";
import AddFrom from "./pages/AddForm";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/onboarding" element={<Onboarding />}></Route>
      <Route path="/addForm" element={<AddFrom />}></Route>
    </Routes>
  );
}
