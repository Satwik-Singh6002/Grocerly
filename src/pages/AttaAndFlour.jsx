import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Star, Heart, Plus, Minus, Filter, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const AttaAndFlour = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);

  // keep products stable so useMemo deps don't churn
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Aashirvaad Whole Wheat Atta 5kg",
        price: 250,
        originalPrice: 280,
        rating: 4.5,
        reviews: 1245,
        imageUrl:
          "https://m.media-amazon.com/images/I/81TgaPr5puL._AC_UL480_FMwebp_QL65_.jpg",
        category: "Whole Wheat",
      },
      {
        id: 2,
        name: "Fortune Chakki Fresh Atta 5kg",
        price: 245,
        originalPrice: 270,
        rating: 4.3,
        reviews: 876,
        imageUrl:
          "https://m.media-amazon.com/images/I/71tzeZyn6tL._AC_UL480_FMwebp_QL65_.jpg",
        category: "Chakki Fresh",
      },
      {
        id: 3,
        name: "Pillsbury Chakki Fresh Atta 5kg",
        price: 260,
        originalPrice: 290,
        rating: 4.6,
        reviews: 943,
        imageUrl:
          "https://m.media-amazon.com/images/I/71iXNsj3T3L._AC_UL480_FMwebp_QL65_.jpg",
        category: "Chakki Fresh",
      },
      {
        id: 4,
        name: "24 Mantra Organic Wheat Flour 1kg",
        price: 120,
        originalPrice: 140,
        rating: 4.7,
        reviews: 567,
        imageUrl:
          "https://m.media-amazon.com/images/I/71NmV-IY8UL._AC_UL480_FMwebp_QL65_.jpg",
        category: "Organic",
      },
      {
        id: 5,
        name: "Nature Fresh Sampoorna Chakki Atta 5kg",
        price: 230,
        originalPrice: 260,
        rating: 4.2,
        reviews: 654,
        imageUrl:
          "https://m.media-amazon.com/images/I/71Qh8YEyTRL._AC_UL480_FMwebp_QL65_.jpg",
        category: "Chakki Fresh",
      },
      {
        id: 6,
        name: "Golden Harvest Atta 5kg",
        price: 220,
        originalPrice: 250,
        rating: 4.1,
        reviews: 432,
        imageUrl:
          "https://m.media-amazon.com/images/I/71xH2L6QwGL._AC_UL480_FMwebp_QL65_.jpg",
        category: "Whole Wheat",
      },
    ],
    []
  );

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let updated = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (categoryFilter !== "All") {
      updated = updated.filter((p) => p.category === categoryFilter);
    }
    if (sortOption === "Price: Low to High") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Top Rated") {
      updated.sort((a, b) => b.rating - a.rating);
    }
    return updated;
  }, [products, searchTerm, categoryFilter, sortOption]);

  // Add button: always adds (increments if already in cart) + instant toast
  const handleAddToCart = (item) => {
    const inCart = cartItems.find((c) => c.id === item.id);
    if (inCart) {
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Added another • ${item.name} (x${nextQty})`, "success");
      
      // Check if 3 of the same product are added
      if (nextQty === 3) {
        showToast(`3 ${item.name} added to cart! Special offer applied!`, "info");
      }
    } else {
      // ensure we add with a quantity of 1
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }
  };

  // + button: same behavior as Add (instant toast)
  const handleIncrement = (item) => {
    const inCart = cartItems.find((c) => c.id === item.id);
    if (inCart) {
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Increased • ${item.name} (x${nextQty})`, "info");
      
      // Check if 3 of the same product are added
      if (nextQty === 3) {
        showToast(`3 ${item.name} added to cart! Special offer applied!`, "info");
      }
    } else {
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }
  };

  // − button: decrement or remove at 1 (instant toast)
  const handleDecrement = (item) => {
    const inCart = cartItems.find((c) => c.id === item.id);
    if (!inCart) return;

    if (inCart.quantity > 1) {
      const nextQty = inCart.quantity - 1;
      updateQuantity(item.id, nextQty);
      showToast(`Decreased • ${item.name} (x${nextQty})`, "info");
    } else {
      removeFromCart(item.id);
      showToast(`${item.name} removed from cart`, "error");
    }
  };

  const categories = ["All", "Whole Wheat", "Chakki Fresh", "Organic"];

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Premium Atta & Flour</h1>
        <p className="text-amber-600">Finest quality flour for your kitchen</p>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-amber-600" size={20} />
          <input
            type="text"
            placeholder="Search atta and flour..."
            className="w-full border border-amber-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                categoryFilter === category 
                  ? "bg-amber-500 text-white" 
                  : "bg-amber-100 text-amber-800"
              }`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden flex items-center gap-1 px-3 py-2 bg-amber-100 text-amber-800 rounded-full text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            {showFilters ? <X size={16} /> : "Sort"}
          </button>
          
          <select
            className={`border border-amber-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-amber-400 bg-white ${
              showFilters ? "flex" : "hidden md:flex"
            }`}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Featured">Featured</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Top Rated">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          const inCart = cartItems.find((c) => c.id === item.id);
          const quantity = inCart ? inCart.quantity : 0;
          const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-5 relative transition-all duration-300 hover:-translate-y-1"
            >
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  SAVE {discount}%
                </div>
              )}
              
              <button
                className="absolute top-4 right-4 z-10"
                onClick={() => toggleWishlist(item)}
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={
                    wishlist.find((w) => w.id === item.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300"
                  }
                  size={24}
                />
              </button>

              <div className="h-48 flex items-center justify-center mb-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-h-44 mx-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x220?text=No+Image";
                  }}
                />
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 overflow-hidden">
                {item.name}
              </h2>

              <div className="flex items-center mb-2">
                <div className="flex text-amber-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(item.rating) ? "currentColor" : "none"}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {item.rating} ({item.reviews})
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xl font-bold text-amber-700">
                  ₹{item.price}
                </span>
                <span className="text-sm line-through text-gray-400 ml-2">
                  ₹{item.originalPrice}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    className="border border-amber-200 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    onClick={() => handleDecrement(item)}
                    aria-label="Decrease quantity"
                    disabled={quantity === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-medium">{quantity}</span>
                  <button
                    className="border border-amber-200 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    onClick={() => handleIncrement(item)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  className="bg-amber-500 text-white px-4 py-2 rounded-xl hover:bg-amber-600 transition-colors font-medium"
                  onClick={() => handleAddToCart(item)}
                >
                  {quantity > 0 ? "Add More" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default AttaAndFlour;