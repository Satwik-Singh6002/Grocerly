import React, { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const AuthDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 👤 User Icon */}
      <User className="cursor-pointer text-gray-700" size={22} />

      {/* 🔽 Dropdown on hover */}
      {isHovered && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;
