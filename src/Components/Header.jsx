import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Store, UserCircle } from "lucide-react";
import AuthDropdown from "./AuthDropdown";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-3 gap-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Store size={26} className="text-green-600" />
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">
            KiranaStore
          </h1>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full sm:max-w-md border rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-green-400"
        >
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="ml-2 w-full outline-none text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Auth + Cart */}
        <div className="flex justify-center sm:justify-end items-center space-x-4 sm:space-x-6 text-sm">
          {/* Profile / Auth */}
          <div className="hover:text-green-600 transition">
            <AuthDropdown icon={<UserCircle size={24} />} />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center hover:text-green-600 transition"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
