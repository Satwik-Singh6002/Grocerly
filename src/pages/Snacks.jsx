import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const Snacks = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const snacks = [
    {
      id: "snack-01",
      name: "Kurkure Masala Munch 100g",
      image: "https://tiimg.tistatic.com/fp/1/007/694/100-vegetarian-fantastic-crunch-spicy-combo-kurkure-masala-munch-089.jpg",
      price: 20,
      originalPrice: 25,
      label: "Best Seller",
      rating: 4.4,
      reviews: 320,
      category: "Chips & Namkeen",
      discount: 20
    },
    {
      id: "snack-02",
      name: "Lays Classic Salted 52g",
      image: "https://m.media-amazon.com/images/I/61e+UwnsWwL.jpg",
      price: 20,
      originalPrice: 25,
      label: "Popular",
      rating: 4.3,
      reviews: 450,
      category: "Chips & Namkeen",
      discount: 15
    },
    {
      id: "snack-03",
      name: "Bingo! Mad Angles Achaari Masti 80g",
      image: "https://www.jiomart.com/images/product/original/491551829/bingo-achaari-masti-mad-angles-130-g-product-images-o491551829-p491551829-0-202409301839.jpg",
      price: 25,
      originalPrice: 30,
      label: "Tasty Pick",
      rating: 4.5,
      reviews: 280,
      category: "Chips & Namkeen",
      discount: 17
    },
    {
      id: "snack-04",
      name: "Haldiram's Aloo Bhujia 200g",
      image: "https://m.media-amazon.com/images/I/71xG-BZxeCL._UF894,1000_QL80_.jpg",
      price: 35,
      originalPrice: 40,
      label: "Crunchy",
      rating: 4.6,
      reviews: 650,
      category: "Namkeen",
      discount: 12
    },
    {
      id: "snack-05",
      name: "Parle Monaco Classic 75g",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFZLSfkMx3uk9JRpXU0bjsnHKOFVuzDooVw&s",
      price: 10,
      originalPrice: 12,
      label: "Light Snack",
      rating: 4.2,
      reviews: 150,
      category: "Biscuits",
      discount: 17
    },
    {
      id: "snack-06",
      name: "Peri Peri Nachos 100g",
      image: "https://m.media-amazon.com/images/I/71mAtXA3NHL._UF1000,1000_QL80_.jpg",
      price: 40,
      originalPrice: 50,
      label: "Spicy",
      rating: 4.5,
      reviews: 290,
      category: "Nachos",
      discount: 20
    },
    {
      id: "snack-07",
      name: "Unibic Choco Chip Cookies 75g",
      image: "https://www.bbassets.com/media/uploads/p/l/40016293_2-unibic-cookies-chocolate-chip.jpg",
      price: 25,
      originalPrice: 30,
      label: "Sweet Treat",
      rating: 4.7,
      reviews: 520,
      category: "Biscuits",
      discount: 17
    },
    {
      id: "snack-08",
      name: "Britannia Good Day Cashew 60g",
      image: "https://www.bbassets.com/media/uploads/p/xl/270729_21-britannia-good-day-cashew-cookies.jpg",
      price: 15,
      originalPrice: 18,
      label: "Classic",
      rating: 4.3,
      reviews: 390,
      category: "Biscuits",
      discount: 16
    },
    {
      id: "snack-09",
      name: "Pringles Original 107g",
      image: "https://www.bbassets.com/media/uploads/p/l/100550_16-pringles-original.jpg",
      price: 99,
      originalPrice: 120,
      label: "Premium",
      rating: 4.8,
      reviews: 720,
      category: "Chips & Namkeen",
      discount: 18
    },
    {
      id: "snack-10",
      name: "Bingo Tedhe Medhe Masala Tadka 90g",
      image: "https://www.bigbasket.com/media/uploads/p/l/40188895_11-bingo-tedhe-medhe-masala-tadka.jpg",
      price: 22,
      originalPrice: 28,
      label: "Fun Snack",
      rating: 4.4,
      reviews: 210,
      category: "Chips & Namkeen",
      discount: 21
    },
    {
      id: "snack-11",
      name: "Too Yumm Multigrain Chips 80g",
      image: "https://m.media-amazon.com/images/I/81XG4eZP+7L.jpg",
      price: 35,
      originalPrice: 45,
      label: "Healthy Choice",
      rating: 4.3,
      reviews: 270,
      category: "Chips & Namkeen",
      discount: 22
    },
    {
      id: "snack-12",
      name: "Oreo Original Biscuits 120g",
      image: "https://m.media-amazon.com/images/I/71Z9gIgOtDL._SL1500_.jpg",
      price: 30,
      originalPrice: 35,
      label: "Sweet Bite",
      rating: 4.6,
      reviews: 780,
      category: "Biscuits",
      discount: 14
    },
    {
      id: "snack-13",
      name: "Parle Hide & Seek Fab Chocolate 112g",
      image: "https://m.media-amazon.com/images/I/71YG2ai-wiL.jpg",
      price: 35,
      originalPrice: 42,
      label: "Chocolatey",
      rating: 4.7,
      reviews: 520,
      category: "Biscuits",
      discount: 16
    },
    {
      id: "snack-14",
      name: "Britannia Marie Gold 250g",
      image: "https://m.media-amazon.com/images/I/71EiPYp6YzL.jpg",
      price: 45,
      originalPrice: 55,
      label: "Tea Time",
      rating: 4.5,
      reviews: 640,
      category: "Biscuits",
      discount: 18
    },
    {
      id: "snack-15",
      name: "Haldiram Moong Dal 200g",
      image: "https://m.media-amazon.com/images/I/71M5HvKZ5aL.jpg",
      price: 55,
      originalPrice: 65,
      label: "Classic Namkeen",
      rating: 4.6,
      reviews: 420,
      category: "Namkeen",
      discount: 15
    },
    {
      id: "snack-16",
      name: "Little Debbie Swiss Roll Pack 240g",
      image: "https://m.media-amazon.com/images/I/81rxuD2b3pL.jpg",
      price: 85,
      originalPrice: 99,
      label: "Imported",
      rating: 4.8,
      reviews: 310,
      category: "Cakes",
      discount: 14
    }
  ];

  const categories = useMemo(
    () => ["All", ...new Set(snacks.map((item) => item.category))],
    [snacks]
  );

  const filteredProducts = useMemo(() => {
    let filtered = snacks.filter(
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
  }, [snacks, searchTerm, selectedCategory, sortBy]);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Delicious Snacks
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Crispy, crunchy, and tasty snacks for every mood and moment!
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search snacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500"
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
            <Truck className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Fast Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Trusted Brands</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Top Rated Snacks</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Variety of Choices</p>
          </div>
        </div>
      </div>

      {/* Snacks Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            const isInWishlist = wishlist.find((w) => w.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Tag / Label */}
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.label}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                  >
                    <Heart
                      size={18}
                      className={isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}
                    />
                  </button>

                  {/* Discount */}
                  {item.discount && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Info */}
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
                    <span className="text-2xl font-bold text-orange-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
            <p className="text-gray-500 text-lg">No snacks found. Try a different search.</p>
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

export default Snacks;
