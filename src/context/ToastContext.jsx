// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    
    // Prevent duplicate toasts with the same message within 500ms
    setToasts((prev) => {
      const now = Date.now();
      const recentDuplicate = prev.find(
        toast => toast.message === message && (now - toast.id) < 500
      );
      
      if (recentDuplicate) {
        return prev; // Don't add duplicate
      }
      
      return [...prev, { id, message, type }];
    });

    // Auto remove after 2s (reduced from 3s)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toast type styling with Tailwind
  const getToastStyles = (type) => {
    const baseStyles = "text-white px-4 py-3 rounded-lg shadow-lg max-w-xs transition-all duration-300 transform";
    
    switch (type) {
      case "success":
        return `${baseStyles} bg-green-600`;
      case "error":
        return `${baseStyles} bg-red-600`;
      case "warning":
        return `${baseStyles} bg-yellow-600`;
      case "info":
      default:
        return `${baseStyles} bg-blue-600`;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* ✅ Toast UI Renderer with Tailwind animations */}
      <div 
        className="fixed top-4 right-4 space-y-3 z-50"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getToastStyles(toast.type)} animate-slide-in-right`}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-white hover:text-gray-200 focus:outline-none text-lg font-bold transition-colors duration-200"
                aria-label="Close toast"
              >
                ×
              </button>
            </div>
            
            {/* Progress bar for visual countdown */}
            <div className="w-full bg-white bg-opacity-30 h-1 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-white h-1 rounded-full animate-toast-progress"
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ✅ Safe custom hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};