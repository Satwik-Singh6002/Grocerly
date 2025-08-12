import React, { useState, useEffect, useRef } from "react";
import { User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const AuthDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative auth-dropdown flex items-center gap-4"
    >
      {/* Shop Icon */}
      <Link
        to="/shop-by-category"
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
        title="Shop by Category"
      >
        <ShoppingBag className="text-gray-700" size={24} />
      </Link>

      {/* Profile Icon */}
      <button
        aria-label="User Menu"
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <User className="text-gray-700" size={24} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn"
        >
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;
