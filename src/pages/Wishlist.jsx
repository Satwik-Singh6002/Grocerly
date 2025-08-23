import React from "react";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-3 rounded-lg shadow">
              <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
