import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "context/UserContext";

export const ProtectedRoute = ({ redirectPath = "/auth/login", children }) => {
  const location = useLocation();
  const {isLoggedIn} = useUser();

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return children ? children : <Outlet />;

};
