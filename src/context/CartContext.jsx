// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Wrap all cart operations in useCallback to prevent unnecessary re-renders
  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        showToast(`${product.name} quantity increased`, "success");
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
        showToast(`${product.name} added to cart`, "success");
      }
      
      return newItems;
    });
  }, [showToast]);

  const removeFromCart = useCallback((id, productName) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    showToast(`${productName || "Item"} removed from cart`, "info");
  }, [showToast]);

  const increaseQuantity = useCallback((id, productName) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    showToast(`${productName || "Item"} quantity increased`, "success");
  }, [showToast]);

  const decreaseQuantity = useCallback((id, productName) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
    showToast(`${productName || "Item"} quantity decreased`, "info");
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast("Cart cleared", "info");
  }, [showToast]);

  // ✅ Calculate cart total and count
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};