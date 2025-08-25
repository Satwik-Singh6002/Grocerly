// src/pages/AttaAndFlour.jsx
import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const AttaAndFlour = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      id: 1, 
      name: 'Aashirvaad Whole Wheat Atta 5kg', 
      price: 250, 
      originalPrice: 280,
      image: 'https://www.bbassets.com/media/uploads/p/xl/126903_12-aashirvaad-atta-whole-wheat.jpg', 
      label: 'Bestseller',
      rating: 4.5,
      reviews: 1245,
      category: "Wheat Flour",
      organic: false,
      discount: 11
    },
    {
      id: 2, 
      name: 'Fortune Chakki Fresh Atta 5kg', 
      price: 245, 
      originalPrice: 270,
      image: 'https://m.media-amazon.com/images/I/71EcRUbX-BL._UF894,1000_QL80_.jpg', 
      label: 'Popular',
      rating: 4.3,
      reviews: 876,
      category: "Wheat Flour",
      organic: false,
      discount: 9
    },
    {
      id: 3, 
      name: 'Pillsbury Chakki Fresh Atta 5kg', 
      price: 260, 
      originalPrice: 290,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIF0kvi4i0LrMLuseYmxUJdr2pmgOaKs1X6A&s', 
      label: 'Top Rated',
      rating: 4.6,
      reviews: 943,
      category: "Wheat Flour",
      organic: false,
      discount: 10
    },
    {
      id: 4, 
      name: '24 Mantra Organic Wheat Flour 1kg', 
      price: 120, 
      originalPrice: 140,
      image: 'https://www.bbassets.com/media/uploads/p/l/279853_8-24-mantra-organic-atta-whole-wheat.jpg', 
      label: 'Organic',
      rating: 4.7,
      reviews: 567,
      category: "Organic Flour",
      organic: true,
      discount: 14
    },
    {
      id: 5, 
      name: 'Nature Fresh Sampoorna Atta 5kg', 
      price: 240, 
      originalPrice: 265,
      image: 'https://m.media-amazon.com/images/I/71x6KxIFMfL._UF894,1000_QL80_.jpg', 
      label: 'Fresh Stock',
      rating: 4.2,
      reviews: 432,
      category: "Wheat Flour",
      organic: false,
      discount: 9
    },
    {
      id: 6, 
      name: 'Annapurna Whole Wheat Atta 5kg', 
      price: 235, 
      originalPrice: 255,
      image: 'https://m.media-amazon.com/images/I/81byI4o3N-L._UF894,1000_QL80_.jpg', 
      label: 'Budget Pick',
      rating: 4.4,
      reviews: 689,
      category: "Wheat Flour",
      organic: false,
      discount: 8
    },
    {
      id: 7, 
      name: 'Organic India Wheat Flour 1kg', 
      price: 135, 
      originalPrice: 155,
      image: 'https://5.imimg.com/data5/ECOM/Default/2023/9/348807512/AG/DB/RQ/199273948/organicwholewheatflour1-500x500.jpg', 
      label: 'Gluten Free',
      rating: 4.8,
      reviews: 321,
      category: "Organic Flour",
      organic: true,
      discount: 13
    },
    {
      id: 8, 
      name: 'Golden Harvest Atta 10kg', 
      price: 450, 
      originalPrice: 520,
      image: 'https://m.media-amazon.com/images/I/819uPN8XmdL._UF1000,1000_QL80_.jpg', 
      label: 'Bulk Saver',
      rating: 4.1,
      reviews: 234,
      category: "Wheat Flour",
      organic: false,
      discount: 13
    },
    {
      id: 9, 
      name: 'Shakti Bhog Whole Wheat Atta 5kg', 
      price: 230, 
      originalPrice: 250,
      image: 'https://m.media-amazon.com/images/I/71z5wUZipwL._UF1000,1000_QL80_.jpg', 
      label: 'Family Choice',
      rating: 4.0,
      reviews: 456,
      category: "Wheat Flour",
      organic: false,
      discount: 8
    },
    {
      id: 10, 
      name: 'Organic Besan (Gram Flour) 1kg', 
      price: 110, 
      originalPrice: 130,
      image: 'https://www.bigbasket.com/media/uploads/p/l/10000349_17-organic-tattva-organic-besan-gram-flour.jpg', 
      label: 'Organic',
      rating: 4.6,
      reviews: 278,
      category: "Specialty Flour",
      organic: true,
      discount: 15
    },
    {
      id: 11, 
      name: 'Rajdhani Chakki Atta 5kg', 
      price: 255, 
      originalPrice: 285,
      image: 'https://www.bigbasket.com/media/uploads/p/l/40000299_12-rajdhani-chakki-atta-whole-wheat.jpg', 
      label: 'Premium',
      rating: 4.5,
      reviews: 765,
      category: "Wheat Flour",
      organic: false,
      discount: 11
    },
    {
      id: 12, 
      name: 'Multigrain Atta 2kg', 
      price: 180, 
      originalPrice: 210,
      image: 'https://www.bigbasket.com/media/uploads/p/l/10000350_18-organic-tattva-organic-multigrain-atta.jpg', 
      label: 'Healthy',
      rating: 4.7,
      reviews: 432,
      category: "Specialty Flour",
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
    // REMOVED the duplicate showToast call here
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
          className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}
        />
      ))}
      <span className="text-sm text-gray-300 ml-1">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Premium Atta & Flour
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover our handpicked selection of nutrient-rich flours and atta, 
          carefully sourced for quality and freshness.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search atta, flour..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500"
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
            <Truck className="mx-auto text-amber-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Free Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-amber-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Quality Guarantee</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-amber-600 mb-2" size={24} />
            <p className="text-sm font-semibold">4.7/5 Rating</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-amber-600 mb-2" size={24} />
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
            const isInWishlist = wishlist.find((w) => w.id === item.id);
            
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
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.label}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={18}
                      className={isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}
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
                    <span className="text-2xl font-bold text-amber-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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

export default AttaAndFlour;