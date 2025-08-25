import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const Fruit = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      id: 1,
      name: "Fresh Apples (1kg)",
      price: 180,
      originalPrice: 200,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuNjANsr--1acwUzfK8cT2DFXibiktnzlyw&s",
      label: "Bestseller",
      rating: 4.7,
      reviews: 1240,
      category: "Staple Fruits",
      discount: 10,
    },
    {
      id: 2,
      name: "Bananas (Dozen)",
      price: 60,
      originalPrice: 70,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ZmGkn6WbrNqrTGlyK0zv0F2p4c6R6_-Icg&s",
      label: "Daily Use",
      rating: 4.5,
      reviews: 1120,
      category: "Staple Fruits",
      discount: 14,
    },
    {
      id: 3,
      name: "Seedless Grapes (500g)",
      price: 90,
      originalPrice: 105,
      image: "https://m.media-amazon.com/images/I/71xGBrNnv2L.jpg",
      label: "Sweet Pick",
      rating: 4.6,
      reviews: 800,
      category: "Seasonal",
      discount: 14,
    },
    {
      id: 4,
      name: "Kiwis Imported (3 pcs)",
      price: 120,
      originalPrice: 140,
      image: "https://www.jiomart.com/images/product/original/590009674/kiwi-imported-3-pcs-pack.jpg",
      label: "Exotic",
      rating: 4.7,
      reviews: 620,
      category: "Exotic",
      discount: 14,
    },
    {
      id: 5,
      name: "Fresh Papaya (Medium)",
      price: 75,
      originalPrice: 90,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTda2i4bz29qWYeRC6pBCi5xDz3EcHtsVR3LA&s",
      label: "Immunity Boost",
      rating: 4.4,
      reviews: 440,
      category: "Staple Fruits",
      discount: 17,
    },
    {
      id: 6,
      name: "Fresh Mangoes (1kg)",
      price: 140,
      originalPrice: 160,
      image: "https://m.media-amazon.com/images/I/31cXlUcvRVL._UF894,1000_QL80_.jpg",
      label: "Seasonal",
      rating: 4.8,
      reviews: 980,
      category: "Seasonal",
      discount: 12,
    },
    {
      id: 7,
      name: "Oranges Imported (1kg)",
      price: 110,
      originalPrice: 125,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAV8YmdiUIR1WMsH9GSK5QE_ZRXC55NG6ifQ&s",
      label: "Vitamin C",
      rating: 4.6,
      reviews: 720,
      category: "Staple Fruits",
      discount: 12,
    },
    {
      id: 8,
      name: "Pomegranate (500g)",
      price: 95,
      originalPrice: 110,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8E59K88g7bJk3jNIIbdnNWOLihPjARBH9OA&s",
      label: "Rich in Iron",
      rating: 4.7,
      reviews: 540,
      category: "Staple Fruits",
      discount: 14,
    },
    {
      id: 9,
      name: "Strawberries (200g)",
      price: 85,
      originalPrice: 99,
      image: "https://www.bbassets.com/media/uploads/p/l/10000263_15-fresho-strawberry.jpg",
      label: "Fresh Pick",
      rating: 4.6,
      reviews: 660,
      category: "Exotic",
      discount: 14,
    },
    {
      id: 10,
      name: "Dragon Fruit (1pc)",
      price: 95,
      originalPrice: 110,
      image: "https://m.media-amazon.com/images/I/61cMwkhtWeL.jpg",
      label: "Exotic",
      rating: 4.7,
      reviews: 410,
      category: "Exotic",
      discount: 14,
    },
    {
      id: 11,
      name: "Guava (500g)",
      price: 70,
      originalPrice: 80,
      image: "https://m.media-amazon.com/images/I/51fw9sIfbXL.jpg",
      label: "Healthy",
      rating: 4.5,
      reviews: 390,
      category: "Staple Fruits",
      discount: 12,
    },
    {
      id: 12,
      name: "Pineapple (1pc)",
      price: 95,
      originalPrice: 110,
      image: "https://m.media-amazon.com/images/I/41VnVNoLg6L.jpg",
      label: "Tropical",
      rating: 4.6,
      reviews: 500,
      category: "Tropical",
      discount: 14,
    },
    {
      id: 13,
      name: "Cherries (200g)",
      price: 150,
      originalPrice: 175,
      image: "https://m.media-amazon.com/images/I/71gzPzE1NfL.jpg",
      label: "Premium",
      rating: 4.8,
      reviews: 430,
      category: "Exotic",
      discount: 14,
    },
    {
      id: 14,
      name: "Watermelon (1pc)",
      price: 80,
      originalPrice: 95,
      image: "https://m.media-amazon.com/images/I/617ZrQKxY3L.jpg",
      label: "Hydrating",
      rating: 4.4,
      reviews: 300,
      category: "Seasonal",
      discount: 16,
    },
    {
      id: 15,
      name: "Blackberries (200g)",
      price: 160,
      originalPrice: 185,
      image: "https://m.media-amazon.com/images/I/61WBr4Y8TAL.jpg",
      label: "Exotic",
      rating: 4.7,
      reviews: 220,
      category: "Exotic",
      discount: 13,
    },
    {
      id: 16,
      name: "Muskmelon (1pc)",
      price: 85,
      originalPrice: 100,
      image: "https://m.media-amazon.com/images/I/51HkWDcd88L.jpg",
      label: "Seasonal",
      rating: 4.5,
      reviews: 370,
      category: "Seasonal",
      discount: 15,
    },
  ];

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    [products]
  );

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
          className={i < Math.floor(rating) ? "text-pink-400 fill-current" : "text-gray-400"}
        />
      ))}
      <span className="text-sm text-gray-300 ml-1">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
          Fresh Fruits
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Enjoy our handpicked range of fresh, organic, and seasonal fruits delivered to your doorstep.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search fruits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500"
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
            <Truck className="mx-auto text-pink-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Fast Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-pink-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Quality Assured</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-pink-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Top Rated</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-pink-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Seasonal Choices</p>
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
                    <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full font-semibold">
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
                    <span className="text-2xl font-bold text-pink-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-pink-600 to-red-700 hover:from-red-700 hover:to-pink-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No fruits found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* CSS */}
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

export default Fruit;
