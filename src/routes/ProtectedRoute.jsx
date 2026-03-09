import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ allowedRoles }) {
  const { isAuthenticated, isInitialized, user } = useSelector(
    (state) => state.auth,
  );

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-light-coffee">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Outlet component renders child routes
  return <Outlet />;
}
