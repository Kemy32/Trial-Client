import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.role);

  const shouldRenderSidebar =
    isAuthenticated && (role === "admin" || role === "user");

  return (
    <div className="min-h-screen bg-light-coffee pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {shouldRenderSidebar && <SideNavbar />}

        <main className="flex-1 w-full min-w-0">
          {/* Outlet renders the specific child route component (e.g., UserProfile, Bookings List) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
