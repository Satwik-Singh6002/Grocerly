import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

// Optional fallback if image is missing (won’t be used with local imports)
const defaultImage = "https://via.placeholder.com/64";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    addToCart,
    decreaseQuantity,
  } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border p-4 rounded bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={item.image || defaultImage}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded border"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Total: ₹{getTotalPrice().toFixed(2)}
            </h3>

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
              title="Clear Cart"
            >
              <Trash2 size={24} />
              Clear Cart
            </button>
          </div>

          {/* Checkout CTA */}
          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-medium transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
