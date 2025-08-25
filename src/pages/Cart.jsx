import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // ✅ Using only react-hot-toast

const defaultImage = "https://via.placeholder.com/64";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    addToCart,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const discount = subtotal * 0.05;
  const couponDiscount = subtotal > 0 ? 50 : 0; // apply only if cart not empty
  const total = subtotal + gst + sgst - discount - couponDiscount;

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      navigate("/place-order");
    } else {
      toast.error("Your cart is empty!"); // ✅ Uniform toast notification
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!"); // ✅ Only one toast now
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart
        <span className="text-lg text-gray-500 font-medium">
          ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
        </span>
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border p-4 rounded-lg bg-white shadow hover:shadow-md transition"
              >
                <img
                  src={item.image || defaultImage}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded border"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 mb-2"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-lg shadow space-y-3">
            <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>GST (9%):</span> <span>₹{gst.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>SGST (9%):</span> <span>₹{sgst.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-green-600">
              <span>Discount (5%):</span> <span>-₹{discount.toFixed(2)}</span>
            </p>
            {couponDiscount > 0 && (
              <p className="flex justify-between text-green-600">
                <span>Coupon Discount:</span> <span>-₹{couponDiscount.toFixed(2)}</span>
              </p>
            )}
            <hr />
            <h3 className="flex justify-between text-xl font-bold">
              <span>Total:</span> <span>₹{total.toFixed(2)}</span>
            </h3>

            {/* Cart Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
              >
                <Trash2 size={20} />
                Clear Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-lg font-medium transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
