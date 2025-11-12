import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  UserPlus,
  ShieldUser,
  IdCard,
  BookUser,
  LogIn,
  LogOut,
  Bell,
  BellRing,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.role);

  const GuestIcons = [
    { label: "login", icon: LogIn, path: "/login" },
    { label: "register", icon: UserPlus, path: "/register" },
  ];

  const UserIcons = [
    { label: "user", icon: User },
    { label: "profile", icon: IdCard, path: "/profile" },
    { label: "my bookings", icon: BookUser, path: "/my-bookings" },
    { label: "notification", icon: Bell },
    { label: "notification-alert", icon: BellRing },
    { label: "logout", icon: LogOut, path: "/logout" },
  ];

  const AdminIcons = [
    { label: "user", icon: User, path: "/profile" },
    { label: "bookings", icon: BookUser, path: "/" },
    { label: "notification", icon: Bell },
    { label: "notification-alert", icon: BellRing },
    { label: "logout", icon: LogOut, path: "/logout" },
  ];

  const pagesLinks = [
    { name: "Home", path: "/" },
    { name: "Booking", path: "/booking" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Blogs", path: "/blog-article" },
    { name: "Contact", path: "/contact" },
  ];

  // Guest Navbar: Pages Links. Login & Register icons
  // User Navbar: Pages Links. User(Profile & my bookings) , Notifications & Logout icons
  // Admin Navbar: Pages Links. Admin(Profile, Users, Bookings, menu ,blog & articles, contact), Notifications & Logout icons

  const renderIcons = (icons) => {
    return icons.map((icon) => {
      return (
        <Link key={icon.label} to={icon.path}>
          <icon.icon />
        </Link>
      );
    });
  };

  const renderNavbar = () => {
    if (isAuthenticated) {
      if (role === "user") {
        return renderIcons(UserIcons);
      } else if (role === "admin") {
        return renderIcons(AdminIcons);
      }
    } else {
      return renderIcons(GuestIcons);
    }
  };

  return (
    <>
      <nav>
        <div>
          <div className="bistro-bliss-heading-container">
            <img src="" alt="" />
            <h1 className="bistro-bliss-heading">Bistro Bliss</h1>
          </div>
          <div className="pages-link">
            {pagesLinks.map((link) => {
              return (
                <Link key={link.name} to={link.path}>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {renderNavbar()}
        </div>
      </nav>
    </>
  );
}
