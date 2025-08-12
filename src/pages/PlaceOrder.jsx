import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = totalPrice * 0.09; // 9% GST
  const sgst = totalPrice * 0.09; // 9% SGST
  const discount = totalPrice * 0.05; // 5% discount
  const finalAmount = totalPrice + gst + sgst - discount;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Clear cart and navigate
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-confirmation"); // Redirect to confirmation page
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2 border-b pb-1">
          <span>{item.name} × {item.quantity}</span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>GST (9%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>SGST (9%)</span>
          <span>₹{sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount (5%)</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
          <span>Total</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
