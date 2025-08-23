import React, { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext"; // ✅ use your own toast

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { showToast } = useToast(); // ✅ unify notifications

  const addToWishlist = (item) => {
    const alreadyInWishlist = wishlist.find((w) => w.id === item.id);
    if (alreadyInWishlist) {
      showToast(`${item.name} is already in your wishlist!`, "info");
    } else {
      setWishlist([...wishlist, item]);
      showToast(`${item.name} added to wishlist ❤️`, "success");
    }
  };

  const removeFromWishlist = (id) => {
    const removedItem = wishlist.find((item) => item.id === id);
    setWishlist(wishlist.filter((item) => item.id !== id));
    if (removedItem) {
      showToast(`${removedItem.name} removed from wishlist ❌`, "error");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
