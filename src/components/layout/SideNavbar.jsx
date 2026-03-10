import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Newspaper,
  User,
  ShieldUser,
  UsersRound,
  IdCard,
  Mail,
  BookText,
  Utensils,
} from "lucide-react";

export default function SideNavbar() {
  const adminLinks = [
    { name: "My Profile", path: "/admin/my-profile", icon: IdCard },
    { name: "Users", path: "/admin/users", icon: UsersRound },
    { name: "Bookings", path: "/admin/bookings", icon: BookText },
    { name: "Menu Items", path: "/admin/menu", icon: Utensils },
    { name: "Blogs and Articles", path: "/admin/blogs", icon: Newspaper },
    { name: "Contact Messages", path: "/admin/contacts", icon: Mail },
  ];

  const userLinks = [
    { name: "My Profile", path: "/user/my-profile", icon: IdCard },
    { name: "My Bookings", path: "/user/my-bookings", icon: BookText },
  ];

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.role);

  const renderNavbar = () => {
    if (isAuthenticated) {
      if (role === "user") {
        return (
          <>
            <div className="flex justify-center w-full px-7 py-2 mb-2 bg-white rounded-lg">
              <h1 className="font-bold">User Dashboard</h1>
            </div>
            <div className="flex flex-col w-full space-y-1">
              {userLinks.map((link, index) => (
                <NavLink
                  className="flex items-center gap-2 group text-md font-semibold rounded-xl text-dark-gray hover:text-crimson  transition-colors"
                  key={link.name + index}
                  to={link.path}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`rounded-full p-2 transition-colors 
              ${isActive
                            ? "bg-crimson text-white"
                            : "bg-light-coffee text-dark-gray group-hover:bg-coffee group-hover:text-crimson"
                          }`}
                      >
                        <link.icon size={20} />
                      </span>

                      <span
                        className={`w-full rounded-xl p-2 transition-colors 
              ${isActive
                            ? "bg-crimson text-white"
                            : "bg-light-coffee text-dark-gray group-hover:bg-coffee group-hover:text-crimson"
                          }`}
                      >
                        {link.name}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </>
        );
      } else if (role === "admin") {
        return (
          <>
            <div className="flex justify-center w-full px-7 py-2 mb-2 bg-white rounded-lg">
              <h1 className="font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex flex-col w-full space-y-1">
              {adminLinks.map((link, index) => (
                <NavLink
                  className="flex items-center gap-2 group text-md font-semibold rounded-xl text-dark-gray hover:text-crimson  transition-colors"
                  key={link.name + index}
                  to={link.path}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`rounded-full p-2 transition-colors 
              ${isActive
                            ? "bg-crimson text-white"
                            : "bg-light-coffee text-dark-gray group-hover:bg-coffee group-hover:text-crimson"
                          }`}
                      >
                        <link.icon size={20} />
                      </span>

                      <span
                        className={`w-full rounded-xl p-2 transition-colors 
              ${isActive
                            ? "bg-crimson text-white"
                            : "bg-light-coffee text-dark-gray group-hover:bg-coffee group-hover:text-crimson"
                          }`}
                      >
                        {link.name}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="hidden lg:block w-64 h-fit bg-white text-crimson p-4 rounded-xl shadow-md sticky top-24">
      <nav className="flex flex-col items-center">{renderNavbar()}</nav>
    </div>
  );
}
