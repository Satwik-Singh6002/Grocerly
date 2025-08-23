import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const Spices = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // ✅ 15 spices
  const spices = [
    {
      id: 1,
      name: "Everest Red Chilli Powder 200g",
      price: 65,
      originalPrice: 80,
      label: "Bestseller",
      rating: 4.7,
      reviews: 1240,
      category: "Powders",
      discount: 18,
      image: "https://www.jiomart.com/images/product/original/490000128/everest-tikhalal-chilli-powder-200-g-product-images-o490000128-p490000128.jpg",
    },
    {
      id: 2,
      name: "Catch Turmeric Powder 100g",
      price: 30,
      originalPrice: 35,
      label: "Popular",
      rating: 4.5,
      reviews: 890,
      category: "Powders",
      discount: 14,
      image: "https://m.media-amazon.com/images/I/71AK6ErhjhL.jpg",
    },
    {
      id: 3,
      name: "MDH Garam Masala 100g",
      price: 50,
      originalPrice: 60,
      label: "Top Rated",
      rating: 4.8,
      reviews: 1520,
      category: "Masala Mix",
      discount: 17,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4iJplCfsEQSqVQnkMmAXR3TB1-BNkKVaVg&s",
    },
    {
      id: 4,
      name: "Everest Cumin Powder 100g",
      price: 55,
      originalPrice: 65,
      label: "New Arrival",
      rating: 4.6,
      reviews: 930,
      category: "Powders",
      discount: 15,
      image: "https://m.media-amazon.com/images/I/81Y4dOt-V1L.jpg",
    },
    {
      id: 5,
      name: "Catch Coriander Powder 100g",
      price: 40,
      originalPrice: 48,
      label: "Value Pack",
      rating: 4.4,
      reviews: 750,
      category: "Powders",
      discount: 16,
      image: "https://m.media-amazon.com/images/I/71Xj03FrWFL.jpg",
    },
    {
      id: 6,
      name: "MDH Kitchen King Masala 100g",
      price: 60,
      originalPrice: 72,
      label: "Chef's Choice",
      rating: 4.7,
      reviews: 1320,
      category: "Masala Mix",
      discount: 17,
      image: "https://m.media-amazon.com/images/I/61sl3bcYjOL.jpg",
    },
    {
      id: 7,
      name: "Badshah Chole Masala 100g",
      price: 45,
      originalPrice: 52,
      label: "Zesty",
      rating: 4.5,
      reviews: 620,
      category: "Masala Mix",
      discount: 13,
      image: "https://m.media-amazon.com/images/I/718RQRdCmiL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 8,
      name: "Everest Pav Bhaji Masala 100g",
      price: 52,
      originalPrice: 62,
      label: "Hot Pick",
      rating: 4.6,
      reviews: 1010,
      category: "Masala Mix",
      discount: 16,
      image: "https://m.media-amazon.com/images/I/716k7raMD2L._UF1000,1000_QL80_.jpg",
    },
    {
      id: 9,
      name: "MDH Rajmah Masala 100g",
      price: 47,
      originalPrice: 56,
      label: "Rich Flavor",
      rating: 4.5,
      reviews: 860,
      category: "Masala Mix",
      discount: 16,
      image: "https://m.media-amazon.com/images/I/61sUPHRHVxL._UF894,1000_QL80_.jpg",
    },
    {
      id: 10,
      name: "Everest Black Pepper Powder 100g",
      price: 90,
      originalPrice: 110,
      label: "Premium",
      rating: 4.8,
      reviews: 770,
      category: "Powders",
      discount: 18,
      image: "https://www.jiomart.com/images/product/original/491265885/everest-black-pepper-powder-100-g-product-images-o491265885-p491265885.jpg",
    },
    {
      id: 11,
      name: "Catch Hing (Asafoetida) 50g",
      price: 75,
      originalPrice: 90,
      label: "Specialty",
      rating: 4.7,
      reviews: 500,
      category: "Specialty",
      discount: 17,
      image: "https://m.media-amazon.com/images/I/61Quq1Bu0NL.jpg",
    },
    {
      id: 12,
      name: "Everest Shahi Paneer Masala 100g",
      price: 62,
      originalPrice: 74,
      label: "Royal",
      rating: 4.7,
      reviews: 680,
      category: "Masala Mix",
      discount: 16,
      image: "https://m.media-amazon.com/images/I/71IL5X2tqXL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 13,
      name: "MDH Sabzi Masala 100g",
      price: 48,
      originalPrice: 58,
      label: "Everyday Use",
      rating: 4.5,
      reviews: 890,
      category: "Masala Mix",
      discount: 17,
      image: "https://m.media-amazon.com/images/I/71rBq7j-vLL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 14,
      name: "Catch Black Salt 100g",
      price: 25,
      originalPrice: 32,
      label: "Essential",
      rating: 4.4,
      reviews: 510,
      category: "Specialty",
      discount: 22,
      image: "https://m.media-amazon.com/images/I/71JNa-ub8JL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 15,
      name: "Everest Kasuri Methi 100g",
      price: 85,
      originalPrice: 100,
      label: "Aromatic",
      rating: 4.6,
      reviews: 440,
      category: "Herbs",
      discount: 15,
      image: "https://m.media-amazon.com/images/I/713Edmxsl1L._UF1000,1000_QL80_.jpg",
    },
    {
      id: 16,
      name: "Everest White Pepper Powder 100g",
      price: 95,
      originalPrice: 115,
      label: "Exotic",
      rating: 4.7,
      reviews: 310,
      category: "Powders",
      discount: 17,
      image: "https://m.media-amazon.com/images/I/71EaUpnuBHL.jpg",
    },
  ];

  const categories = useMemo(
    () => ["All", ...new Set(spices.map((item) => item.category))],
    [spices]
  );

  const filteredProducts = useMemo(() => {
    let filtered = spices.filter(
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
  }, [spices, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    showToast(`${item.name} added to cart!`, "success");
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Premium Spices Collection
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Flavorful & authentic spices handpicked for your kitchen.
        </p>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search spices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500"
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
            <Truck className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Fast Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Authentic Quality</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-sm font-semibold">4.7/5 Rated</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Variety of Masalas</p>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            const isInWishlist = wishlist.find((w) => w.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* LABEL */}
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.label}
                    </span>
                  </div>
                  {/* WISHLIST */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                  >
                    <Heart
                      size={18}
                      className={isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}
                    />
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
                    <span className="text-2xl font-bold text-yellow-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-700 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
            <p className="text-gray-500 text-lg">No spices found. Try a different search.</p>
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

export default Spices;
