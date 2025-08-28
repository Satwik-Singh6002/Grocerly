// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

// Helper: robust price normalization with multiple currency formats
const normalizePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price !== 'string') return 0;
  
  // Remove currency symbols, commas, and any non-numeric characters except decimal point
  const numericString = price
    .replace(/[^\d.,]/g, '') // Remove non-digit, non-decimal, non-comma characters
    .replace(/,/g, '') // Remove commas (thousands separators)
    .replace(/^\./, '0.') // Handle cases where decimal point is at the beginning
    
  // Handle European format (comma as decimal separator)
  if (numericString.includes(',') && !numericString.includes('.')) {
    return parseFloat(numericString.replace(',', '.')) || 0;
  }
  
  return parseFloat(numericString) || 0;
};

// Helper: safely access localStorage
const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage access failed:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage access failed:', error);
    }
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = safeLocalStorage.getItem("cartItems");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Failed to parse cart items from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  const { showToast } = useToast();
  const toastIdsRef = useRef(new Set());

  /** Persist cart in localStorage */
  useEffect(() => {
    safeLocalStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /** Generate unique toast ID with product ID and timestamp */
  const generateToastId = (prefix, id, additionalData = '') => {
    return `${prefix}-${id}-${additionalData}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /** Show unique toast and auto-clear after short timeout */
  const showUniqueToast = useCallback((id, message, type = "info") => {
    if (!toastIdsRef.current.has(id)) {
      toastIdsRef.current.add(id);
      showToast(message, type, id);
      setTimeout(() => toastIdsRef.current.delete(id), 1500);
    }
  }, [showToast]);

  /** Add product to cart */
  const addToCart = useCallback((product, quantity = 1, showNotification = true) => {
    if (!product || !product.id) {
      console.error('Invalid product provided to addToCart');
      return;
    }

    if (quantity <= 0) {
      console.error('Quantity must be positive');
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                // Update price if it's different (in case of price changes)
                price: normalizePrice(product.price) !== item.price 
                  ? normalizePrice(product.price) 
                  : item.price
              }
            : item
        );
      } else {
        updatedItems = [
          ...prevItems,
          {
            ...product,
            id: product.id,
            name: product.name || 'Unknown Product',
            price: normalizePrice(product.price),
            quantity,
            // Store original price for reference
            originalPrice: product.originalPrice ? normalizePrice(product.originalPrice) : undefined,
            addedAt: new Date().toISOString(),
          },
        ];
      }

      if (showNotification) {
        const toastId = generateToastId('cart-add', product.id, quantity);
        showUniqueToast(
          toastId,
          `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to cart`,
          "success"
        );
      }

      return updatedItems;
    });
  }, [showUniqueToast]);

  /** Remove product from cart */
  const removeFromCart = useCallback((id, productName, showNotification = true) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find(item => item.id === id);
      if (!itemToRemove) return prev;
      
      const updatedItems = prev.filter((item) => item.id !== id);
      
      if (showNotification) {
        const toastId = generateToastId('cart-remove', id);
        showUniqueToast(
          toastId,
          `${productName || itemToRemove.name} removed from cart`,
          "info"
        );
      }
      
      return updatedItems;
    });
  }, [showUniqueToast]);

  /** Increase quantity */
  const increaseQuantity = useCallback((id, productName, showNotification = true) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (!item) return prevItems;

      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      
      if (showNotification) {
        const updatedItem = updatedItems.find((i) => i.id === id);
        const toastId = generateToastId('cart-increase', id, updatedItem.quantity);
        showUniqueToast(
          toastId,
          `${productName || updatedItem.name} quantity increased to ${updatedItem.quantity}`,
          "success"
        );
      }
      
      return updatedItems;
    });
  }, [showUniqueToast]);

  /** Decrease quantity (or remove if at 1) */
  const decreaseQuantity = useCallback((id, productName, showNotification = true) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (!item) return prevItems;

      if (item.quantity > 1) {
        const updatedItems = prevItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
        
        if (showNotification) {
          const updatedItem = updatedItems.find((i) => i.id === id);
          const toastId = generateToastId('cart-decrease', id, updatedItem.quantity);
          showUniqueToast(
            toastId,
            `${productName || updatedItem.name} quantity decreased to ${updatedItem.quantity}`,
            "info"
          );
        }
        
        return updatedItems;
      } else {
        if (showNotification) {
          const toastId = generateToastId('cart-remove', id);
          showUniqueToast(
            toastId,
            `${productName || item.name} removed from cart`,
            "info"
          );
        }
        return prevItems.filter((i) => i.id !== id);
      }
    });
  }, [showUniqueToast]);

  /** Clear all items from cart */
  const clearCart = useCallback((showNotification = true) => {
    setCartItems([]);
    if (showNotification) {
      const toastId = generateToastId('cart-clear', 'all');
      showUniqueToast(toastId, "Cart cleared", "info");
    }
  }, [showUniqueToast]);

  /** Update quantity directly */
  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, undefined, false);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  /** Check if product is in cart */
  const isInCart = useCallback((id) => {
    return cartItems.some(item => item.id === id);
  }, [cartItems]);

  /** Get quantity of specific product in cart */
  const getQuantity = useCallback((id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  }, [cartItems]);

  // Memoized totals to prevent recalculations
  const cartTotal = useMemo(() => 
    cartItems.reduce(
      (sum, item) => sum + normalizePrice(item.price) * item.quantity,
      0
    ),
    [cartItems]
  );

  const cartCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Calculate total savings from original prices
  const totalSavings = useMemo(() => 
    cartItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + (normalizePrice(item.originalPrice) - normalizePrice(item.price)) * item.quantity;
      }
      return sum;
    }, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    totalSavings,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    updateQuantity,
    isInCart,
    getQuantity,
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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};