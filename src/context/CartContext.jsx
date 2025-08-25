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

// Helper: always return numeric price
const normalizePrice = (price) =>
  parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { showToast } = useToast();
  const toastIdsRef = useRef(new Map());

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cleanup toast IDs when unmounting
  useEffect(() => {
    return () => toastIdsRef.current.clear();
  }, []);

  // ✅ Add to Cart
  const addToCart = useCallback(
    (product, quantity = 1, showNotification = true) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        let updatedItems;

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          updatedItems = prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else {
          updatedItems = [
            ...prevItems,
            {
              ...product,
              price: normalizePrice(product.price),
              quantity,
            },
          ];
        }

        if (showNotification) {
          const toastId = `cart-add-${product.id}-${quantity}`;
          if (!toastIdsRef.current.has(toastId)) {
            showToast(
              `${quantity} ${product.name} added to cart`,
              "success",
              toastId
            );
            toastIdsRef.current.set(toastId, Date.now());
            setTimeout(() => {
              toastIdsRef.current.delete(toastId);
            }, 1000);
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
      setCartItems((prev) => {
        const itemToRemove = prev.find((item) => item.id === id);
        const updatedItems = prev.filter((item) => item.id !== id);

        if (showNotification && itemToRemove) {
          const toastId = `cart-remove-${id}`;
          if (!toastIdsRef.current.has(toastId)) {
            showToast(
              `${productName || itemToRemove.name} removed from cart`,
              "info",
              toastId
            );
            toastIdsRef.current.set(toastId, Date.now());
            setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
          }
        }

        return updatedItems;
      });
    },
    [showToast]
  );

  // ✅ FIXED: Increase quantity (only for existing items)
  const increaseQuantity = useCallback(
    (id, productName, showNotification = true) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === id);
        
        // If item doesn't exist, don't add it - just return current cart
        if (!existingItem) {
          if (showNotification) {
            const toastId = `cart-not-found-${id}`;
            if (!toastIdsRef.current.has(toastId)) {
              showToast(
                `Item not found in cart`,
                "error",
                toastId
              );
              toastIdsRef.current.set(toastId, Date.now());
              setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
            }
          }
          return prevItems;
        }

        // If item exists, increase its quantity
        const updatedItems = prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        if (showNotification) {
          const item = updatedItems.find((i) => i.id === id);
          if (item) {
            const toastId = `cart-increase-${id}-${item.quantity}`;
            if (!toastIdsRef.current.has(toastId)) {
              showToast(
                `${productName || item.name} quantity increased to ${item.quantity}`,
                "success",
                toastId
              );
              toastIdsRef.current.set(toastId, Date.now());
              setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
            }
          }
        }

        return updatedItems;
      });
    },
    [showToast]
  );

  // ✅ Decrease quantity (safe toast check)
  const decreaseQuantity = useCallback(
    (id, productName, showNotification = true) => {
      setCartItems((prevItems) => {
        const itemToUpdate = prevItems.find((item) => item.id === id);
        if (!itemToUpdate) return prevItems;

        let updatedItems;

        if (itemToUpdate.quantity > 1) {
          updatedItems = prevItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          if (showNotification) {
            const item = updatedItems.find((i) => i.id === id);
            if (item) {
              const toastId = `cart-decrease-${id}-${item.quantity}`;
              if (!toastIdsRef.current.has(toastId)) {
                showToast(
                  `${productName || item.name} quantity decreased to ${item.quantity}`,
                  "info",
                  toastId
                );
                toastIdsRef.current.set(toastId, Date.now());
                setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
              }
            }
          }
        } else {
          // Remove item if quantity becomes 0
          updatedItems = prevItems.filter((item) => item.id !== id);

          if (showNotification) {
            const toastId = `cart-remove-${id}`;
            if (!toastIdsRef.current.has(toastId)) {
              showToast(
                `${productName || "Item"} removed from cart`,
                "info",
                toastId
              );
              toastIdsRef.current.set(toastId, Date.now());
              setTimeout(() => toastIdsRef.current.delete(toastId), 1000);
            }
          }
        }

        return updatedItems;
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

  // ✅ Cart totals (always use normalized price)
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + normalizePrice(item.price) * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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