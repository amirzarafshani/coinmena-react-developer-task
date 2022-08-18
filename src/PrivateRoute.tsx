import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PrivateRouteProps } from './interfaces'

export default function PrivateRoute({ isLoggedIn }: PrivateRouteProps) {
  const location = useLocation();

  return isLoggedIn ?
    <Outlet /> :
    <Navigate to="/login" state={{ from: location }} />
};
