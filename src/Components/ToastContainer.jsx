import React from "react";
import { useToast } from "../context/ToastContext";

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out"
        >
          {toast.message}
        </div>
      ))}

      {/* ✅ Animation styles */}
      <style>
        {`
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(20px); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 2s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ToastContainer;
