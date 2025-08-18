import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Truck } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center transform transition-all hover:scale-[1.02] duration-300">
        {/* 🎉 Success Message */}
        <div className="flex items-center justify-center gap-2 text-green-600">
          <CheckCircle2 size={28} />
          <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
        </div>

        <p className="text-gray-700 mt-3 text-lg">
          Thank you for shopping with us! Your order is on the way 🚚
        </p>

        {/* 🚚 Buttons */}
        <div className="flex flex-col gap-4 mt-6">
          {/* Track Delivery Button */}
          <button
            onClick={() => navigate("/order-tracking")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            <Truck size={20} />
             Delivery Status
          </button>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
