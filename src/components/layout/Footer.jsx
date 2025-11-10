import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

import BistroBlissLogo from "../../assets/images/bistro-bliss-white-logo.png";
import RecipeOne from "../../assets/images/recipe-1.png";
import RecipeTwo from "../../assets/images/recipe-2.png";
import RecipeThree from "../../assets/images/recipe-3.png";
import RecipeFour from "../../assets/images/recipe-4.png";

export default function Footer() {
  const SocialIcons = [
    {
      icon: Twitter,
      href: "#",
    },
    {
      icon: Facebook,
      href: "#",
    },
    {
      icon: Instagram,
      href: "#",
    },
    {
      icon: Github,
      href: "#",
    },
  ];

  const PageLinks = [
    { name: "Home", path: "/" },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Menu",
      path: "/menu",
    },
    {
      name: "Blogs-Articles",
      path: "/blogs-articles",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];
  const UtilityLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "FAQs", path: "#" },
    { name: "Help Center", path: "#" },
    { name: "Privacy & Policy", path: "#" },
    { name: "Terms & Conditions", path: "#" },
  ];

  return (
    <>
      <footer className="w-full bg-dark-gray text-white font-sans">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-b-grayish">
          {/* First column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={BistroBlissLogo} className="h-10 w-auto" alt="" />
              <span className="text-3xl font-heading font-bold">
                Bistro Bliss
              </span>
            </div>
            <p className="text-sm text-grayish mb-6">
              In the new era of technology we look a in the future with
              certainty and pride to for our company and.
            </p>
            <div className="flex space-x-3">
              {SocialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="p-2 rounded-full bg-crimson hover:bg-mid-gray transition-colors"
                >
                  <item.icon></item.icon>
                </a>
              ))}
            </div>
          </div>
          {/* Second column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Pages</h4>
            <ul className="space-y-3 text-sm">
              {PageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-grayish hover:text-crimson transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Third column */}
          <div>
            <h4 className="text-lg font-semibold mb-4"> Utility Pages</h4>
            <ul className="space-y-3 text-sm">
              {UtilityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-grayish hover:text-crimson transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Fourth column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Taste Our Latest Recipes
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {/* Placeholder Image Grid (Replace with actual image components/sources) */}
              <div className=" bg-grayish rounded-lg overflow-hidden">
                <img
                  src={RecipeOne}
                  alt="Food 1"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className=" bg-grayish rounded-lg overflow-hidden">
                <img
                  src={RecipeTwo}
                  alt="Food 2"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className=" bg-grayish rounded-lg overflow-hidden">
                <img
                  src={RecipeThree}
                  alt="Food 3"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className=" bg-grayish rounded-lg overflow-hidden">
                <img
                  src={RecipeFour}
                  alt="Food 4"
                  className="w-full h-full object-fill"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section */}
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-grayish">
          <p>copyright @ 2025 AMIT. All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
