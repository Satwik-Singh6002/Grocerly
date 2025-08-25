import React, { useState } from "react";
import CartItem from "../components/Cart/CartItem";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast"; // ✅ switched to react-hot-toast

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    } else {
      toast.error("Your cart is empty!"); // ✅ unified notification
    }
  };

  // ✅ ensure price is number (handles ₹ or string)
  const total = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    clearCart(true);
    toast.success("Cart cleared successfully!"); // ✅ unified notification
    setConfirmClear(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>

          {/* Total and Clear Cart */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total: ₹{total.toFixed(2)}
            </h2>

            <div className="relative">
              <button
                onClick={() => setConfirmClear(true)}
                className="text-red-500 hover:text-red-600 flex items-center gap-1"
              >
                <Trash2 size={18} />
                Clear Cart
              </button>

              {confirmClear && (
                <div className="absolute right-0 mt-2 bg-white border p-4 rounded-xl shadow-lg w-64 animate-fadeIn z-30">
                  <p className="text-sm font-medium">
                    Are you sure you want to clear the entire cart?
                  </p>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
