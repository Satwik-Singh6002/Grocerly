import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import AuthDropdown from "./AuthDropdown";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useCart();

  // ✅ Total quantity across all cart items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-green-600">KiranaStore</h1>

        <div className="flex items-center w-full max-w-md border rounded px-3 py-1 mx-6">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="ml-2 w-full outline-none"
          />
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <AuthDropdown />

          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart size={20} />
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
