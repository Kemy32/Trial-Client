import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User, UserPlus, ShieldUser, LogOut, Bell } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const GuestIcons = [{ icon: UserPlus }];
  const UserIcons = [{ icon: User }, { icon: Bell }, { icon: LogOut }];
  const AdminIcons = [{ icon: ShieldUser }, { icon: Bell }, { icon: LogOut }];

  const PageLinks = [
    { name: "Home", path: "/" },
    { name: "Booking", path: "/booking" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Blog-Article", path: "/blog-article" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav></nav>
    </>
  );
}
