import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 md:px-8 py-3 bg-white border-b border-gray-300 transition-all duration-300">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-9 invert opacity-80" />
      </Link>
      <UserButton />
    </div>
  );
};

export default Navbar;
