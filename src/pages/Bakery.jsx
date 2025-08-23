import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Star, Heart, Shield, Truck, Leaf } from "lucide-react";

const Bakery = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [organicFilter, setOrganicFilter] = useState(false);

  const bakeryProducts = [
    {
      id: "bak-01",
      name: "Brown Bread",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=500&q=60",
      price: 40,
      originalPrice: 45,
      label: "Freshly Baked",
      rating: 4.2,
      reviews: 124,
      category: "Bread",
      organic: true,
      discount: 11,
    },
    {
      id: "bak-02",
      name: "Butter Croissant",
      image: "https://images.unsplash.com/photo-1555507036-ab794f24d8c7?auto=format&fit=crop&w=500&q=60",
      price: 60,
      originalPrice: 65,
      label: "Flaky & Buttery",
      rating: 4.7,
      reviews: 89,
      category: "Pastry",
      organic: false,
      discount: 8,
    },
    {
      id: "bak-03",
      name: "Chocolate Cake Slice",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=60",
      price: 120,
      originalPrice: 140,
      label: "Rich & Moist",
      rating: 4.8,
      reviews: 203,
      category: "Cake",
      organic: false,
      discount: 14,
    },
    // ... other products unchanged
  ];

  const categories = useMemo(
    () => ["All", ...new Set(bakeryProducts.map((item) => item.category))],
    [bakeryProducts]
  );

  const filteredProducts = useMemo(() => {
    let filtered = bakeryProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || item.category === selectedCategory) &&
        (!organicFilter || item.organic)
    );

    switch (sortBy) {
      case "priceLow":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "priceHigh":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "discount":
        return [...filtered].sort((a, b) => b.discount - a.discount);
      default:
        return filtered;
    }
  }, [bakeryProducts, searchTerm, selectedCategory, sortBy, organicFilter]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    showToast(`${item.name} added to cart!`, "success", `add-to-cart-${item.id}`);
  };

  const toggleWishlist = (item) => {
    const isInWishlist = wishlist.find((w) => w.id === item.id);
    if (isInWishlist) {
      removeFromWishlist(item.id);
      showToast(`${item.name} removed from wishlist.`, "info", `remove-wishlist-${item.id}`);
    } else {
      addToWishlist(item);
      showToast(`${item.name} added to wishlist!`, "info", `add-wishlist-${item.id}`);
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}
        />
      ))}
      <span className="text-sm text-gray-400 ml-1">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
          Fresh Bakery
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Enjoy our freshly baked breads, pastries, and sweet treats made with love.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bakery items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500"
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Best Discount</option>
            </select>
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={organicFilter}
                onChange={(e) => setOrganicFilter(e.target.checked)}
                className="text-green-600 focus:ring-green-500 rounded"
              />
              <span className="text-gray-700">Organic Only</span>
            </label>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Truck className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Free Delivery</p>
            <p className="text-xs text-gray-500 mt-1">On orders above ₹499</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Quality Guarantee</p>
            <p className="text-xs text-gray-500 mt-1">Freshly baked daily</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">4.8/5 Rating</p>
            <p className="text-xs text-gray-500 mt-1">From 5k+ reviews</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Leaf className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Organic Options</p>
            <p className="text-xs text-gray-500 mt-1">Certified ingredients</p>
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            const isInWishlist = wishlist.find((w) => w.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.label}
                    </span>
                    {item.organic && (
                      <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full font-semibold block">
                        🌱 Organic
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                  >
                    <Heart
                      size={18}
                      className={isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}
                    />
                  </button>
                  {item.discount && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-14">{item.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={item.rating} />
                    <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bakery items found. Try a different search.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Bakery;
