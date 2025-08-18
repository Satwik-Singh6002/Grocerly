import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill all the details");
      return;
    }

    // Save order details in localStorage or context (optional)
    const orderDetails = {
      customer: formData,
      items: cartItems,
      total: getTotalPrice(),
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    clearCart();
    navigate("/order-success"); // ✅ redirect to OrderSuccess page
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>

      {/* Cart Summary */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
          </>
        )}
      </div>

      {/* Checkout Form */}
      <form
        onSubmit={handlePlaceOrder}
        className="bg-white shadow-md rounded-lg p-4"
      >
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        />
        <textarea
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        />

        <label className="block mb-2 font-semibold">Payment Method</label>
        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="UPI">UPI</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
