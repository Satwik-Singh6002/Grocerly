import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Truck, Package } from "lucide-react";

const steps = [
  { id: 1, label: "Order Confirmed", icon: <CheckCircle2 />, status: "completed" },
  { id: 2, label: "Packed", icon: <Package />, status: "completed" },
  { id: 3, label: "Out for Delivery", icon: <Truck />, status: "current" },
  { id: 4, label: "Delivered", icon: <Clock />, status: "pending" },
];

// Example order items (replace with real data from your cart/order context)
const orderItems = [
  {
    id: 1,
    name: "Fortune Basmati Rice",
    price: 450,
    quantity: 2,
    image: "https://5.imimg.com/data5/SELLER/Default/2021/6/IR/KS/VW/47657035/fortune-biryani-special-basmati-rice-1kg-500x500.jpg",
  },
  {
    id: 2,
    name: "Tata Salt",
    price: 28,
    quantity: 1,
    image: "https://www.jiomart.com/images/product/original/491021304/tata-salt-1-kg-product-images-o491021304-p491021304-0-202304281249.jpg",
  },
];

const OrderTracking = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-2">
          <Truck size={28} />
          Delivery Status
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Your order is on the way 🚚
        </p>

        {/* Progress Bar */}
        <div className="mt-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2"></div>
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full 
                  ${
                    step.status === "completed"
                      ? "bg-green-500 text-white"
                      : step.status === "current"
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step.icon}
                </motion.div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    step.status === "completed"
                      ? "text-green-600"
                      : step.status === "current"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Order</h3>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-lg p-3 shadow-sm bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold text-green-600">
                  ₹{item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderTracking;
