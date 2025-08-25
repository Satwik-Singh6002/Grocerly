// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  // Measure header height on mount and when toasts change
  useEffect(() => {
    const updateHeaderHeight = () => {
      // Try to find the header element by common class names or IDs
      const headerSelectors = [
        'header', 
        '.header', 
        '#header', 
        '[class*="header"]',
        '[class*="Header"]',
        'nav',
        '.nav',
        '#nav',
        '[class*="navigation"]'
      ];
      
      let headerElement = null;
      
      for (const selector of headerSelectors) {
        try {
          const element = document.querySelector(selector);
          if (element && element.offsetHeight > 0) {
            headerElement = element;
            break;
          }
        } catch (e) {
          // Skip invalid selectors
        }
      }
      
      // If we found a header, use its height plus some padding
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight + 16);
      } else {
        // Fallback: use a reasonable default height (e.g., 64px) plus padding
        setHeaderHeight(80);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Set up a mutation observer to detect changes in the header
    const observer = new MutationObserver(updateHeaderHeight);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'] 
    });

    // Also update on window resize
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  const showToast = useCallback((message, type = "info", toastId) => {
    const id = toastId || Date.now();
    
    setToasts((prev) => {
      // Prevent duplicate toasts by toastId
      if (toastId && prev.some(toast => toast.id === toastId)) {
        return prev;
      }
      
      // Prevent duplicate toasts by message within 500ms
      const now = Date.now();
      const recentDuplicate = prev.find(
        (toast) => toast.message === message && now - toast.id < 500
      );
      
      if (recentDuplicate) return prev;
      
      return [...prev, { id, message, type }];
    });

    // Auto remove toast after 2 seconds
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

      {/* ✅ Toast UI Renderer with dynamic positioning based on header height */}
      <div 
        className="fixed right-4 space-y-3 z-50"
        style={{ top: `${headerHeight}px` }}
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