import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.role);

  const shouldRenderSidebar =
    isAuthenticated && (role === "admin" || role === "user");

  return (
    <div className="flex min-h-screen bg-light-coffee">
      {shouldRenderSidebar && <SideNavbar />}

      <main className="mt-10">
        {/* Outlet renders the specific child route component (e.g., UserProfile, Bookings List) */}
        <Outlet />
      </main>
    </div>
  );
}
