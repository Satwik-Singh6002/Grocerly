import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const FrozenFoods = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      id: 1,
      name: "McCain French Fries (750g)",
      price: 120,
      originalPrice: 140,
      label: "Crispy",
      rating: 4.6,
      reviews: 820,
      category: "Snacks",
      discount: 14,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZRz4Z9CFPX3oynhkK0Cx-cCg38mJXYOlIA&s",
    },
    {
      id: 2,
      name: "Sumeru Green Peas (500g)",
      price: 85,
      originalPrice: 95,
      label: "Fresh Frozen",
      rating: 4.5,
      reviews: 640,
      category: "Vegetables",
      discount: 11,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGHanaxYx74IS-IMLbrHWE1MuCxVgSBq-tLA&s",
    },
    {
      id: 3,
      name: "Godrej Yummiez Chicken Nuggets (400g)",
      price: 180,
      originalPrice: 200,
      label: "Best Seller",
      rating: 4.7,
      reviews: 940,
      category: "Meat",
      discount: 10,
      image: "https://m.media-amazon.com/images/I/61p3fjlJl0L.jpg",
    },
    {
      id: 4,
      name: "ITC Master Chef Veg Patty (500g)",
      price: 110,
      originalPrice: 125,
      label: "Snack Time",
      rating: 4.5,
      reviews: 580,
      category: "Snacks",
      discount: 12,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6eRXNEzTP_Z1uiZGKRmQlQqg2iBViXZreKQ&s",
    },
    {
      id: 5,
      name: "Mother Dairy Vanilla Ice Cream (1L)",
      price: 160,
      originalPrice: 180,
      label: "Dessert",
      rating: 4.6,
      reviews: 830,
      category: "Desserts",
      discount: 11,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFpMvvJGBq7hbByeFAIWB5uVM74dh58fRhA&s",
    },
    {
      id: 6,
      name: "McCain Aloo Tikki (420g)",
      price: 105,
      originalPrice: 120,
      label: "Popular",
      rating: 4.4,
      reviews: 770,
      category: "Snacks",
      discount: 12,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHx-fDfksaR18P1cDY73TAHvT_aTmJATD_TQ&s",
    },
    {
      id: 7,
      name: "Safal Mixed Veg (500g)",
      price: 70,
      originalPrice: 80,
      label: "Healthy Mix",
      rating: 4.3,
      reviews: 410,
      category: "Vegetables",
      discount: 13,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6mugqQd6fNj2sIdBhHhTlSwLnzzVjaDC_Q&s",
    },
    {
      id: 8,
      name: "Amul Frozen Paneer (200g)",
      price: 90,
      originalPrice: 105,
      label: "Protein Rich",
      rating: 4.5,
      reviews: 680,
      category: "Paneer",
      discount: 14,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHgn-wVz0T5IOg-dklTTuAtDFF4bBAKGEHQ&s",
    },
    {
      id: 9,
      name: "Vadilal Ice Cream Choco Bar (70ml)",
      price: 25,
      originalPrice: 30,
      label: "Kids Favorite",
      rating: 4.6,
      reviews: 520,
      category: "Desserts",
      discount: 17,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_CfVs11yqZY-HnXNGr_2ONIg-WIXVaxvOJw&s",
    },
    {
      id: 10,
      name: "Godrej Yummiez Chicken Sausages (500g)",
      price: 210,
      originalPrice: 240,
      label: "Protein",
      rating: 4.7,
      reviews: 400,
      category: "Meat",
      discount: 13,
      image: "https://m.media-amazon.com/images/I/61mqGowt0wL.jpg",
    },
    {
      id: 11,
      name: "McCain Cheese Shots (400g)",
      price: 150,
      originalPrice: 170,
      label: "Cheesy",
      rating: 4.6,
      reviews: 530,
      category: "Snacks",
      discount: 12,
      image: "https://m.media-amazon.com/images/I/711FyPiomeL.jpg",
    },
    {
      id: 12,
      name: "Kwality Walls Cornetto Ice Cream",
      price: 50,
      originalPrice: 60,
      label: "Dessert",
      rating: 4.7,
      reviews: 870,
      category: "Desserts",
      discount: 17,
      image: "https://m.media-amazon.com/images/I/71GM9wSHL3L.jpg",
    },
    {
      id: 13,
      name: "Sumeru Sweet Corn (500g)",
      price: 95,
      originalPrice: 110,
      label: "Frozen Veg",
      rating: 4.5,
      reviews: 390,
      category: "Vegetables",
      discount: 14,
      image: "https://m.media-amazon.com/images/I/71jBWwXoHNL.jpg",
    },
    {
      id: 14,
      name: "ITC Master Chef Crispy Fish Fillets (300g)",
      price: 230,
      originalPrice: 260,
      label: "Seafood",
      rating: 4.6,
      reviews: 360,
      category: "Meat",
      discount: 12,
      image: "https://m.media-amazon.com/images/I/81dQk+ddHzL.jpg",
    },
    {
      id: 15,
      name: "McCain Smiles (450g)",
      price: 130,
      originalPrice: 150,
      label: "Kids Favorite",
      rating: 4.8,
      reviews: 690,
      category: "Snacks",
      discount: 13,
      image: "https://m.media-amazon.com/images/I/81kTi7DRmdL.jpg",
    },
    {
      id: 16,
      name: "Kwality Walls Magnum Almond",
      price: 95,
      originalPrice: 110,
      label: "Premium",
      rating: 4.9,
      reviews: 420,
      category: "Desserts",
      discount: 14,
      image: "https://m.media-amazon.com/images/I/81wDa3IRmgL.jpg",
    },
  ];

  const categories = useMemo(() => ["All", ...new Set(products.map(item => item.category))], [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || item.category === selectedCategory)
    );

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

  const toggleWishlist = (item) => {
    const isInWishlist = wishlist.find((w) => w.id === item.id);
    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.floor(rating) ? "text-blue-400 fill-current" : "text-gray-400"}
        />
      ))}
      <span className="text-sm text-gray-300 ml-1">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Frozen Foods
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Quick-fix meals, frozen snacks, peas, and desserts ready in minutes.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search frozen foods..."
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

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Truck className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Fast Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Trusted Brands</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Top Rated Frozen</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Wide Variety</p>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(item => {
            const isInWishlist = wishlist.find(w => w.id === item.id);
            return (
              <div key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300" />
                  {/* LABEL */}
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">{item.label}</span>
                  </div>
                  {/* WISHLIST */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                    <Heart size={18} className={isInWishlist ? "text-red-500 fill-current" : "text-gray-400"} />
                  </button>
                  {/* DISCOUNT */}
                  {item.discount && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
                {/* INFO */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-14">{item.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={item.rating} />
                    <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-cyan-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No frozen foods found. Try a different search.</p>
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

export default FrozenFoods;
