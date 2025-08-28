// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

// Toast component with improved UI and animations
const Toast = ({ toast, removeToast, pauseTimeout, resumeTimeout }) => {
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => removeToast(toast.id), 300);
  }, [removeToast, toast.id]);

  const handleMouseEnter = () => {
    pauseTimeout(toast.id);
    if (progressRef.current) {
      progressRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    resumeTimeout(toast.id, handleClose);
    if (progressRef.current) {
      progressRef.current.style.animationPlayState = 'running';
    }
  };

  // Auto-dismiss after duration
  React.useEffect(() => {
    timerRef.current = setTimeout(handleClose, toast.duration);
    return () => clearTimeout(timerRef.current);
  }, [handleClose, toast.duration]);

  const getToastIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const toastStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    warning: 'bg-yellow-500 border-yellow-600',
    info: 'bg-blue-500 border-blue-600',
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`transform transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-start p-4 rounded-lg shadow-lg border-l-4 min-w-[300px] max-w-md text-white ${toastStyles[toast.type]}`}>
        <div className="flex-shrink-0 mr-3">
          {getToastIcon()}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{toast.message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 text-white hover:text-white/80 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div 
        ref={progressRef}
        className={`h-1 mt-1 bg-white/30 rounded-full origin-left ${toast.duration ? 'animate-progress' : ''}`}
        style={{ animationDuration: `${toast.duration}ms` }}
      />
    </div>
  );
};

export const ToastProvider = ({ children, position = 'top-right' }) => {
  const [toasts, setToasts] = useState([]);
  const timeouts = useRef(new Map());

  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default: // top-right
        return 'top-4 right-4';
    }
  };

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    // Announce to screen readers
    if (typeof window !== 'undefined' && window.document) {
      const ariaLive = document.getElementById('toast-aria-live');
      if (ariaLive) {
        ariaLive.textContent = message;
      }
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    // Clear timeout if exists
    if (timeouts.current.has(id)) {
      clearTimeout(timeouts.current.get(id));
      timeouts.current.delete(id);
    }
  }, []);

  const pauseTimeout = useCallback((id) => {
    if (timeouts.current.has(id)) {
      clearTimeout(timeouts.current.get(id));
      timeouts.current.delete(id);
    }
  }, []);

  const resumeTimeout = useCallback((id, callback) => {
    const toast = toasts.find(t => t.id === id);
    if (toast && toast.duration) {
      const timeoutId = setTimeout(callback, toast.duration);
      timeouts.current.set(id, timeoutId);
    }
  }, [toasts]);

  const value = {
    showToast,
    removeToast,
    pauseTimeout,
    resumeTimeout
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* ARIA live region for screen readers */}
      <div
        id="toast-aria-live"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
      
      {/* Toast container */}
      <div className={`fixed z-50 flex flex-col gap-3 ${getPositionClass()}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            removeToast={removeToast}
            pauseTimeout={pauseTimeout}
            resumeTimeout={resumeTimeout}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};