import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems = [], clearCart } = useCart() || {};
  const navigate = useNavigate();

  // Price calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const couponDiscount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + gst + sgst - couponDiscount;

  // Billing form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      ...formData,
      cartItems,
      total,
      orderDate: new Date().toISOString(),
      orderId: "ORD" + Math.floor(Math.random() * 1000000), // unique order id
    };

    // Save order
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Clear cart
    clearCart();

    toast.success("Order placed successfully!");

    // Navigate to OrderSuccess page
    navigate("/order-success");
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-5 border-b pb-3">
              🛒 Order Summary
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                Your cart is empty.
              </p>
            ) : (
              <ul className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Price breakdown */}
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (9%):</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (9%):</span>
                <span>₹{sgst.toFixed(2)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Coupon Discount:</span>
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-green-700">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-5 border-b pb-3">
              📦 Billing & Shipping
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <textarea
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />

              <div>
                <label className="block mb-2 font-medium">Payment Method</label>
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
              >
                ✅ Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
