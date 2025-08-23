import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const Vegetables = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // ✅ Extended product list
  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes (1kg)",
      price: 40,
      originalPrice: 50,
      image: "https://m.media-amazon.com/images/I/61ZJhcdG7LL._UF894,1000_QL80_.jpg",
      label: "Daily Use",
      rating: 4.5,
      reviews: 620,
      category: "Staples",
      discount: 20,
    },
    {
      id: 2,
      name: "Potatoes (1kg)",
      price: 30,
      originalPrice: 35,
      image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/e21d501a-0f8d-4c14-ac17-376707961c02.jpg",
      label: "Staple",
      rating: 4.4,
      reviews: 540,
      category: "Staples",
      discount: 14,
    },
    {
      id: 3,
      name: "Onions (1kg)",
      price: 32,
      originalPrice: 38,
      image: "https://www.bbassets.com/media/uploads/p/l/10000148_34-fresho-onion.jpg",
      label: "Essential",
      rating: 4.2,
      reviews: 480,
      category: "Staples",
      discount: 16,
    },
    {
      id: 4,
      name: "Cauliflower (1pc)",
      price: 45,
      originalPrice: 55,
      image: "https://www.jiomart.com/images/product/original/590000619/cauliflower-1-pc-...jpg",
      label: "Fresh Stock",
      rating: 4.6,
      reviews: 325,
      category: "Seasonal",
      discount: 18,
    },
    {
      id: 5,
      name: "Cabbage (1pc)",
      price: 30,
      originalPrice: 35,
      image: "https://m.media-amazon.com/images/I/51vl9RzME3L._UF1000,1000_QL80_.jpg",
      label: "Budget Pick",
      rating: 4.1,
      reviews: 270,
      category: "Seasonal",
      discount: 14,
    },
    {
      id: 6,
      name: "Carrots (500g)",
      price: 35,
      originalPrice: 42,
      image: "https://cdn.shopaccino.com/rootz/products/carrots-1894040663788240_m.jpg?v=569",
      label: "Winter Veggie",
      rating: 4.7,
      reviews: 410,
      category: "Seasonal",
      discount: 16,
    },
    {
      id: 7,
      name: "Green Beans (500g)",
      price: 40,
      originalPrice: 48,
      image: "https://www.jiomart.com/images/product/original/590003549/french-beans-500-g.jpg",
      label: "Seasonal",
      rating: 4.5,
      reviews: 200,
      category: "Seasonal",
      discount: 17,
    },
    {
      id: 8,
      name: "Spinach Bunch",
      price: 25,
      originalPrice: 30,
      image: "https://media.istockphoto.com/id/1006196472/photo/bunch-of-spinach-leaves.jpg",
      label: "Leafy Green",
      rating: 4.3,
      reviews: 350,
      category: "Leafy Veggies",
      discount: 17,
    },
    {
      id: 9,
      name: "Brinjal (500g)",
      price: 38,
      originalPrice: 45,
      image: "https://www.jiomart.com/images/product/original/590003544/brinjal-black-big-500-g.jpg",
      label: "Tasty Pick",
      rating: 4.4,
      reviews: 300,
      category: "Seasonal",
      discount: 16,
    },
    {
      id: 10,
      name: "Lady Finger / Okra (500g)",
      price: 28,
      originalPrice: 35,
      image: "https://5.imimg.com/data5/SELLER/Default/2023/9/347028792/EQ/UG/LU/181390180/fresh-lady-finger.jpg",
      label: "Green Veggie",
      rating: 4.5,
      reviews: 230,
      category: "Seasonal",
      discount: 20,
    },
    {
      id: 11,
      name: "Bottle Gourd (1pc)",
      price: 35,
      originalPrice: 42,
      image: "https://m.media-amazon.com/images/I/61vEbqIwwxL.jpg",
      label: "Budget Pick",
      rating: 4.2,
      reviews: 150,
      category: "Gourd Family",
      discount: 17,
    },
    {
      id: 12,
      name: "Methi Leaves (Bunch)",
      price: 20,
      originalPrice: 25,
      image: "https://www.bigbasket.com/media/uploads/p/l/10000126_27-fresho-methi-leaves.jpg",
      label: "Leafy Green",
      rating: 4.4,
      reviews: 90,
      category: "Leafy Veggies",
      discount: 20,
    },
    {
      id: 13,
      name: "Coriander (Bunch)",
      price: 15,
      originalPrice: 20,
      image: "https://www.bigbasket.com/media/uploads/p/l/10000168_15-fresho-coriander.jpg",
      label: "Herbal",
      rating: 4.6,
      reviews: 220,
      category: "Leafy Veggies",
      discount: 25,
    },
    {
      id: 14,
      name: "Capsicum (500g)",
      price: 45,
      originalPrice: 55,
      image: "https://5.imimg.com/data5/ECOM/Default/2023/10/353706719/YE/VT/DC/199273948/fresh-green-capsicum.jpg",
      label: "Tasty Pick",
      rating: 4.5,
      reviews: 300,
      category: "Seasonal",
      discount: 18,
    },
    {
      id: 15,
      name: "Broccoli (1pc)",
      price: 60,
      originalPrice: 75,
      image: "https://m.media-amazon.com/images/I/71KrN6XOl8L.jpg",
      label: "Superfood",
      rating: 4.8,
      reviews: 180,
      category: "Leafy Veggies",
      discount: 20,
    },
    {
    id: 16,
    name: "Sweet Corn (2pc)",
    price: 35,
    originalPrice: 45,
    image: "https://www.bigbasket.com/media/uploads/p/l/10000336_13-fresho-sweet-corn.jpg",
    label: "Seasonal",
    rating: 4.6,
    reviews: 260,
    category: "Seasonal",
    discount: 22,
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
          className={i < Math.floor(rating) ? "text-green-400 fill-current" : "text-gray-400"}
        />
      ))}
      <span className="text-sm text-gray-300 ml-1">({rating.toFixed(1)})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Fresh Vegetables
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Handpicked vegetables sourced daily from farms to keep your kitchen fresh and healthy.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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
            </select>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Truck className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Farm Fresh</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Quality Assured</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Top Rated Veggies</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-green-600 mb-2" size={24} />
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
                {/* Img */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Label Badge */}
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.label}
                    </span>
                  </div>

                  {/* Wishlist Btn */}
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
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-14">{item.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={item.rating} />
                    <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-700">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Cart Btn */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
            <p className="text-gray-500 text-lg">No vegetables found. Try a different search.</p>
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

export default Vegetables;
