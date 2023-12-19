import Signup from "../pages/Signup";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token") || null;
  if (token) {
    return children;
  } else {
    return <Signup />;
  }
}
