import React from "react";
import CartItem from "../components/Cart/CartItem";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty!");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart
      </h1>

      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                onDelete={() => removeFromCart(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
              />
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total: ₹{total.toFixed(2)}
            </h2>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
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
