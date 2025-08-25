import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const Beverages = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);

  const products = [
        {
      id: 1, 
      name: 'Coca-Cola Soft Drink 2L', 
      price: 99, 
      originalPrice: 120,
      image: 'https://m.media-amazon.com/images/I/61K5e7wvMbL._SX522_.jpg', 
      label: 'Bestseller',
      rating: 4.5,
      reviews: 1245,
      category: "Soft Drinks",
      organic: false,
      discount: 18
    },
    {
      id: 2, 
      name: 'Pepsi Zero Sugar 2L', 
      price: 95, 
      originalPrice: 110,
      image: 'https://m.media-amazon.com/images/I/61-7hVWvXtL.jpg', 
      label: 'Sugar Free',
      rating: 4.3,
      reviews: 876,
      category: "Soft Drinks",
      organic: false,
      discount: 14
    },
    {
      id: 3, 
      name: 'Red Bull Energy Drink 250ml', 
      price: 115, 
      originalPrice: 130,
      image: 'https://m.media-amazon.com/images/I/61Y2tMh-1+L._SX522_.jpg', 
      label: 'Energy Boost',
      rating: 4.6,
      reviews: 943,
      category: "Energy Drinks",
      organic: false,
      discount: 12
    },
    {
      id: 4, 
      name: 'Tropicana Orange Juice 1L', 
      price: 180, 
      originalPrice: 200,
      image: 'https://m.media-amazon.com/images/I/71C+7gSq5jL._SX522_.jpg', 
      label: '100% Juice',
      rating: 4.7,
      reviews: 567,
      category: "Juices",
      organic: false,
      discount: 10
    },
    {
      id: 5, 
      name: 'Starbucks Cold Coffee 250ml', 
      price: 150, 
      originalPrice: 175,
      image: 'https://m.media-amazon.com/images/I/71Mhqo2vS5L._SX522_.jpg', 
      label: 'Iced Coffee',
      rating: 4.2,
      reviews: 432,
      category: "Coffee",
      organic: false,
      discount: 14
    },
    {
      id: 6, 
      name: 'Lipton Green Tea 25 Bags', 
      price: 120, 
      originalPrice: 140,
      image: 'https://m.media-amazon.com/images/I/81+0UjFg5+L._SX522_.jpg', 
      label: 'Antioxidants',
      rating: 4.4,
      reviews: 689,
      category: "Tea",
      organic: false,
      discount: 14
    },
    {
      id: 7, 
      name: 'B Natural Apple Juice 1L', 
      price: 135, 
      originalPrice: 155,
      image: 'https://m.media-amazon.com/images/I/71B1nWZ3Q+L._SX522_.jpg', 
      label: 'No Added Sugar',
      rating: 4.8,
      reviews: 321,
      category: "Juices",
      organic: false,
      discount: 13
    },
    {
      id: 8, 
      name: 'Monster Energy Drink 500ml', 
      price: 160, 
      originalPrice: 185,
      image: 'https://m.media-amazon.com/images/I/61XwZ7CWPAL._SX522_.jpg', 
      label: 'Extra Strength',
      rating: 4.1,
      reviews: 234,
      category: "Energy Drinks",
      organic: false,
      discount: 14
    },
    {
      id: 9, 
      name: 'Bru Instant Coffee 100g', 
      price: 230, 
      originalPrice: 250,
      image: 'https://m.media-amazon.com/images/I/61sG9t+8V+L._SX522_.jpg', 
      label: 'Aromatic',
      rating: 4.0,
      reviews: 456,
      category: "Coffee",
      organic: false,
      discount: 8
    },
    {
      id: 10, 
      name: 'Organic India Tulsi Tea 25 Bags', 
      price: 110, 
      originalPrice: 130,
      image: 'https://m.media-amazon.com/images/I/81vK1W0XJYL._SX522_.jpg', 
      label: 'Organic',
      rating: 4.6,
      reviews: 278,
      category: "Tea",
      organic: true,
      discount: 15
    },
    {
      id: 11, 
      name: 'Sprite Lemon Lime 2L', 
      price: 90, 
      originalPrice: 105,
      image: 'https://m.media-amazon.com/images/I/61QZcjU+3DL._SX522_.jpg', 
      label: 'Lemon Fresh',
      rating: 4.5,
      reviews: 765,
      category: "Soft Drinks",
      organic: false,
      discount: 14
    },
    {
      id: 12, 
      name: 'Real Fruit Power Juice 1L', 
      price: 180, 
      originalPrice: 210,
      image: 'https://m.media-amazon.com/images/I/71wXK4W3z+L._SX522_.jpg', 
      label: 'Mixed Fruit',
      rating: 4.7,
      reviews: 432,
      category: "Juices",
      organic: false,
      discount: 14
    }
  ];

  const categories = useMemo(() => 
    ["All", ...new Set(products.map(item => item.category))], 
    [products]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    );
    
    // Apply sorting
    switch (sortBy) {
      case "priceLow":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "priceHigh":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
   };

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    
    const product = products.find(p => p.id === id);
    if (product) {
      const message = wishlist.includes(id) 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist!`;
      showToast(message, wishlist.includes(id) ? "info" : "success", `wishlist-${id}`);
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
      <span className="text-sm text-gray-300 ml-1">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Refreshing Beverages
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Quench your thirst with our premium selection of beverages, from energizing drinks to refreshing juices.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search beverages, juices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Truck className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Free Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Quality Guarantee</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">4.7/5 Rating</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Organic Options</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            const hasOrganicInName = item.name.toLowerCase().includes('organic') || 
                                    item.name.toLowerCase().includes('organi') ||
                                    item.label.toLowerCase().includes('organic');
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-2">
                    {item.organic && !hasOrganicInName && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        🌱 Organic
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.label}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    aria-label={wishlist.includes(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={18}
                      className={wishlist.includes(item.id) ? "text-red-500 fill-current" : "text-gray-400"}
                    />
                  </button>

                  {/* Discount Badge */}
                  {item.discount && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={item.rating} />
                    <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
            <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* CSS for line clamp */}
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

export default Beverages;