import React, { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

// Robust price parsing utility function
const parsePrice = (price) => {
  // Handle null or undefined immediately
  if (price == null) {
    return 0;
  }

  // If it's already a valid number, return it
  if (typeof price === 'number' && !isNaN(price)) {
    return price;
  }

  // If it's a string, try to extract the numeric value
  if (typeof price === 'string') {
    // Remove any currency symbols, commas, or non-numeric characters except decimal point
    const numericString = price.replace(/[^\d.]/g, '');
    
    // Handle cases where the string might be empty after cleaning
    if (numericString === '' || numericString === '.') {
      return 0;
    }

    const parsed = parseFloat(numericString);
    // Return the parsed number if valid, otherwise 0
    return !isNaN(parsed) ? parsed : 0;
  }

  // For any other data type, return 0 as fallback
  return 0;
};

const CartItem = ({ product }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Safely parse the price using our utility function
  const price = parsePrice(product.price);
  const itemTotal = price * product.quantity;

  const handleIncrease = () => {
    increaseQuantity(product.id, product.name);
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      decreaseQuantity(product.id, product.name);
    } else {
      setShowConfirm(true); // confirm removal when quantity = 1
    }
  };

  const handleDelete = () => {
    removeFromCart(product.id, product.name);
    setShowConfirm(false);
  };

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
      {/* Product Image */}
      <img
        src={product.imageUrl || product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded mx-auto sm:mx-0 border"
      />

      {/* Product Details */}
      <div className="flex-1 mt-3 sm:mt-0 sm:mx-4 text-center sm:text-left">
        <h2 className="text-lg font-semibold break-words">{product.name}</h2>
        <p className="text-sm text-gray-500">
          ₹{price.toFixed(2)} x {product.quantity}
        </p>
        <p className="text-md font-medium mt-1 text-green-600">
          Total: ₹{itemTotal.toFixed(2)}
        </p>
      </div>

      {/* Quantity + Delete controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-3 sm:mt-0">
        {/* Quantity Controls */}
        <div className="flex items-center justify-center space-x-2 bg-gray-100 px-2 py-1 rounded-lg">
          <button
            onClick={handleDecrease}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-medium">{product.quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Delete Icon */}
        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-500 hover:text-red-600 mt-2 sm:mt-0 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="absolute top-full right-2 sm:left-1/2 sm:-translate-x-1/2 bg-white border p-4 rounded-xl shadow-lg mt-2 z-20 w-60 animate-fadeIn">
          <p className="text-sm font-medium">
            Remove <span className="font-semibold">{product.name}</span> from cart?
          </p>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;