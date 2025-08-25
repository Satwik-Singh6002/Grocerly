// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { showToast } = useToast();

  // To avoid duplicate toasts
  const toastIdsRef = useRef(new Map());

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cleanup toast IDs when unmounting
  useEffect(() => {
    return () => toastIdsRef.current.clear();
  }, []);

  // ✅ Add to Cart (with deduplicated toast)
  const addToCart = useCallback(
    (product, showNotification = true) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        let updatedItems;

        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;
          updatedItems = prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );

          if (showNotification) {
            const toastId = `cart-increase-${product.id}-${newQuantity}`;
            if (!toastIdsRef.current.has(toastId)) {
              showToast(
                `${product.name} quantity increased to ${newQuantity}`,
                "success",
                toastId
              );
              toastIdsRef.current.set(toastId, Date.now());
              setTimeout(() => {
                toastIdsRef.current.delete(toastId);
              }, 1000);
            }
          }
        } else {
          updatedItems = [...prevItems, { ...product, quantity: 1 }];

          if (showNotification) {
            const toastId = `cart-add-${product.id}-1`;
            if (!toastIdsRef.current.has(toastId)) {
              showToast(`${product.name} added to cart`, "success", toastId);
              toastIdsRef.current.set(toastId, Date.now());
              setTimeout(() => {
                toastIdsRef.current.delete(toastId);
              }, 1000);
            }
          }
        }

        return updatedItems;
      });
    },
    [showToast]
  );

  // ✅ Remove item
  const removeFromCart = useCallback(
    (id, productName, showNotification = true) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      if (showNotification) {
        const toastId = `cart-remove-${id}`;
        if (!toastIdsRef.current.has(toastId)) {
          showToast(`${productName || "Item"} removed from cart`, "info", toastId);
          toastIdsRef.current.set(toastId, Date.now());
          setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
        }
      }
    },
    [showToast]
  );

  // ✅ Increase quantity
  const increaseQuantity = useCallback(
    (id, productName, showNotification = true) => {
      setCartItems((prevItems) => {
        const updated = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        if (showNotification) {
          const item = updated.find((i) => i.id === id);
          const toastId = `cart-increase-${id}-${item.quantity}`;
          if (!toastIdsRef.current.has(toastId)) {
            showToast(
              `${productName || "Item"} quantity increased to ${item.quantity}`,
              "success",
              toastId
            );
            toastIdsRef.current.set(toastId, Date.now());
            setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
          }
        }

        return updated;
      });
    },
    [showToast]
  );

  // ✅ Decrease quantity
  const decreaseQuantity = useCallback(
    (id, productName, showNotification = true) => {
      setCartItems((prevItems) => {
        const updated = prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);

        if (showNotification) {
          const item = updated.find((i) => i.id === id);
          if (item) {
            const toastId = `cart-decrease-${id}-${item.quantity}`;
            if (!toastIdsRef.current.has(toastId)) {
              showToast(
                `${productName || "Item"} quantity decreased to ${item.quantity}`,
                "info",
                toastId
              );
              toastIdsRef.current.set(toastId, Date.now());
              setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
            }
          }
        }

        return updated;
      });
    },
    [showToast]
  );

  // ✅ Clear cart
  const clearCart = useCallback(
    (showNotification = true) => {
      setCartItems([]);
      if (showNotification) {
        const toastId = `cart-clear`;
        if (!toastIdsRef.current.has(toastId)) {
          showToast("Cart cleared", "info", toastId);
          toastIdsRef.current.set(toastId, Date.now());
          setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
        }
      }
    },
    [showToast]
  );

  // ✅ Cart totals
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};