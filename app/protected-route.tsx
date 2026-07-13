import { Navigate, Outlet } from "react-router";
import { selectIsAuthenticated } from "./modules/auth/store/selectors";
import { useAppSelector } from "./store/hooks";

export default function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
