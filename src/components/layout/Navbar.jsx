import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  User,
  UserPlus,
  ShieldUser,
  Newspaper,
  UsersRound,
  IdCard,
  Mail,
  BookText,
  LogIn,
  LogOut,
  Bell,
  BellRing,
  ChevronUp,
  ChevronDown,
  Utensils,
  Menu,
  X,
} from "lucide-react";
import BistroBlissLogo from "../../assets/images/bistro-bliss-logo.png";
import { LinkBtn } from "../ui/Buttons";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifcationsRinging, setIsNotifcationsRinging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.role);

  const pagesLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Blogs", path: "/blogs-articles" },
    { name: "Contact", path: "/contact" },
  ];

  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location]);

  // Guest Navbar: Pages Links. Login & Register icons
  // User Navbar: Pages Links. User(Profile & my bookings) , Notifications & Logout icons
  // Admin Navbar: Pages Links. Admin(Profile, Users, Bookings, menu ,blog & articles, contact), Notifications & Logout icons

  const GuestNavbar = () => (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="flex items-center gap-2 px-1.5 py-1.5 bg-mid-gray text-white rounded-full  hover:bg-crimson hover:shadow-md transition-colors "
      >
        <LogIn size={20} />
      </Link>
      <Link
        to="/register"
        className="flex items-center gap-2 px-1.5 py-1.5 bg-mid-gray text-white rounded-full hover:bg-crimson hover:shadow-md transition-colors"
      >
        <UserPlus size={20} />
      </Link>
    </div>
  );

  const UserNavbar = () => (
    <div className="flex items-center gap-4 relative">
      <button
        className={`${isNotifcationsRinging
          ? "bg-crimson shadow-md"
          : "bg-mid-gray hover:shadow-md"
          } relative px-1.5 py-1.5  text-white rounded-full  hover:bg-crimson  transition-colors`}
        onClick={() => setIsNotifcationsRinging(!isNotifcationsRinging)}
      >
        {isNotifcationsRinging ? (
          <>
            <BellRing className="" size={20} />
          </>
        ) : (
          <Bell size={20} />
        )}
      </button>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${isDropdownOpen ? "bg-crimson" : "bg-mid-gray"
            } flex items-center gap-2 px-1.5 py-1.5  text-white rounded-full  hover:bg-crimson hover:shadow-md transition-colors focus:outline-none`}
        >
          <User size={20} />
          {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg p-1 text-sm z-50">
              <Link
                to="/user/my-profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-dark-gray hover:text-crimson hover:bg-gray-100  transition-colors"
              >
                <IdCard size={18} />
                <span>My Profile</span>
              </Link>

              <Link
                to="/user/my-bookings"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-dark-gray hover:text-crimson hover:bg-gray-100  transition-colors"
              >
                <BookText size={18} />
                <span>My Bookings</span>
              </Link>

              <div className="my-1 h-px bg-gray-200" />

              <Link
                to="/logout"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-crimson hover:bg-light-crimson transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const AdminNavbar = () => (
    <div className="flex items-center gap-4 relative">
      <button
        className={`${isNotifcationsRinging
          ? "bg-crimson shadow-md"
          : "bg-mid-gray hover:shadow-md"
          } relative px-1.5 py-1.5  text-white rounded-full  hover:bg-crimson  transition-colors`}
        onClick={() => setIsNotifcationsRinging(!isNotifcationsRinging)}
      >
        {isNotifcationsRinging ? (
          <>
            <BellRing className="" size={20} />
          </>
        ) : (
          <Bell size={20} />
        )}
      </button>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${isDropdownOpen ? "bg-crimson" : "bg-mid-gray"
            } flex items-center gap-2 px-1.5 py-1.5  text-white rounded-full  hover:bg-crimson hover:shadow-md transition-colors focus:outline-none`}
        >
          <ShieldUser size={20} />
          {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg p-1 text-sm z-50">
              <Link
                to="/admin/my-profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-crimson transition-colors"
              >
                <IdCard size={18} />
                <span>My Profile</span>
              </Link>

              <div className="my-1 h-px bg-gray-200" />

              <Link
                to="/admin/users"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-crimson transition-colors"
              >
                <UsersRound size={18} />
                <span>Manage Users</span>
              </Link>

              <Link
                to="/admin/bookings"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-crimson transition-colors"
              >
                <BookText size={18} />
                <span>Manage Bookings</span>
              </Link>

              <Link
                to="/admin/menu"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-crimson transition-colors"
              >
                <Utensils size={18} />
                <span>Manage Menu</span>
              </Link>

              <Link
                to="/admin/blogs"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-crimson transition-colors"
              >
                <Newspaper size={18} />
                <span>Manage Blogs</span>
              </Link>

              <Link
                to="/admin/contacts"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-crimson transition-colors"
              >
                <Mail size={18} />
                <span>Contact Messages</span>
              </Link>

              <div className="my-1 h-px bg-gray-200" />

              <Link
                to="/logout"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-crimson hover:bg-light-crimson  transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderPagesLinks = () => {
    return (
      <>
        {pagesLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full  transition-colors 
              ${isActive
                ? "text-white bg-crimson shadow-md"
                : "text-dark-gray hover:bg-coffee hover:text-crimson"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </>
    );
  };

  const renderNavbar = () => {
    if (isAuthenticated) {
      if (role === "user") {
        return UserNavbar();
      } else if (role === "admin") {
        return AdminNavbar();
      }
    } else {
      return GuestNavbar();
    }
  };

  return (
    <>
      <nav className="w-full bg-light-coffee border-b border-light-coffee sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              key={"homeKey"}
              to={"/"}
              className="flex items-center space-x-2 shrink-0"
            >
              <div className="w-auto h-auto rounded-full flex items-center justify-center">
                <img
                  src={BistroBlissLogo}
                  className="h-8 md:h-10 w-auto"
                  alt="bistro bliss logo"
                />
              </div>
              <span className="text-2xl md:text-4xl font-heading font-bold italic text-dark-gray  xs:block">
                Bistro Bliss
              </span>
            </Link>

            {/* Desktop Center Links */}
            <div className="hidden lg:flex items-center space-x-2">
              {renderPagesLinks()}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop Booking Btn */}
              <div className="hidden sm:block">
                <LinkBtn
                  btnKey={"booking"}
                  to={"/booking"}
                  text={"Book A Table"}
                  style={"secondaryBtn"}
                />
              </div>

              {/* User/Admin Actions */}
              <div className="flex items-center gap-3">{renderNavbar()}</div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-dark-gray hover:text-crimson transition-all"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-light-coffee shadow-xl animate-slide-in-down z-40 overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
              {pagesLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-4 rounded-2xl text-lg font-bold transition-all ${isActive
                      ? "bg-crimson text-white shadow-lg"
                      : "bg-light-coffee text-dark-gray hover:bg-coffee hover:text-crimson"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="sm:hidden mt-4 pt-4 border-t border-light-coffee">
                <Link
                  to="/booking"
                  className="block w-full text-center py-4 bg-crimson text-white rounded-2xl font-bold text-lg shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book A Table
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
