import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

import BistroBlissLogo from "../../assets/images/bistro-bliss-white-logo.png";
import RecipeOne from "../../assets/images/recipe-1.png";
import RecipeTwo from "../../assets/images/recipe-2.png";
import RecipeThree from "../../assets/images/recipe-3.png";
import RecipeFour from "../../assets/images/recipe-4.png";

export default function Footer() {
  const SocialIcons = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Github, href: "#" },
  ];
  const PageLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Blogs-Articles", path: "/blogs-articles" },
    { name: "Contact", path: "/contact" },
  ];
  const UtilityLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "Logout", path: "/logout" },
    { name: "Booking", path: "/booking" },
    { name: "FAQs", path: "#" },
    { name: "Privacy & Policy", path: "#" },
    { name: "Terms & Conditions", path: "#" },
  ];

  return (
    <>
      <footer className="w-full bg-dark-gray text-white font-sans">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row md:justify-between gap-8 border-b border-b-grayish">
          {/* First column (Brand/Social) */}
          <div className="md:w-1/5 w-full">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={BistroBlissLogo}
                className="h-10 w-auto"
                alt="Bistro Bliss Logo"
              />
              <span className="text-3xl font-heading font-bold">
                Bistro Bliss
              </span>
            </div>
            <p className="text-sm text-coffee mb-6">
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
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Second column (Pages) */}
          <div className="md:w-auto w-1/2">
            <h4 className="text-lg font-semibold mb-5">Pages</h4>
            <ul className="space-y-2 text-sm">
              {PageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-coffee hover:text-crimson transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Third column (Utility Pages) */}
          <div className="md:w-auto w-1/2">
            <h4 className="text-lg font-semibold mb-5"> Utility Pages</h4>
            <ul className="space-y-2 text-sm">
              {UtilityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-coffee hover:text-crimson transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fourth column (Recipes)*/}
          <div className="md:w-1/4 w-full">
            <h4 className="text-lg font-semibold mb-5">
              Taste Our Latest Recipes
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <RecipeImage src={RecipeOne} alt="Food 1" />
              <RecipeImage src={RecipeTwo} alt="Food 2" />
              <RecipeImage src={RecipeThree} alt="Food 3" />
              <RecipeImage src={RecipeFour} alt="Food 4" />
            </div>
          </div>
        </div>

        {/* Bottom section (Copyright) */}
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-coffee border-t border-t-coffee">
          <p>copyright @ 2025 Bistro Bliss. All rights reserved</p>
        </div>
      </footer>
    </>
  );
}

const RecipeImage = ({ src, alt }) => (
  <div className="w-full pt-[100%] relative rounded-lg overflow-hidden shadow-md">
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);
