import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

// ----------------- Products Data -----------------
const dalProducts = [
    {
    id: 1,
    name: "Tata Sampann Toor Dal 1kg",
    price: 130,
    originalPrice: 150,
    label: "Bestseller",
    rating: 4.5,
    reviews: 234,
    image:
      "https://www.bbassets.com/media/uploads/p/xl/40000291_14-tata-sampann-unpolished-toor-dalarhar-dal.jpg",
    category: "Toor Dal",
    organic: false,
    discount: 13,
  },
  {
    id: 2,
    name: "24 Mantra Organic Moong Dal 1kg",
    price: 145,
    originalPrice: 165,
    label: "Organic",
    rating: 4.7,
    reviews: 189,
    image:
      "https://www.bbassets.com/media/uploads/p/xl/20001056_8-24-mantra-organic-yellow-moong-dal.jpg",
    category: "Moong Dal",
    organic: true,
    discount: 12,
  },
  {
    id: 3,
    name: "Fortune Urad Dal 1kg",
    price: 115,
    originalPrice: 130,
    label: "Popular",
    rating: 4.3,
    reviews: 167,
    image:
      "https://eu.dookan.com/cdn/shop/files/FORTUNEUradgotax500px.png?v=1751293201",
    category: "Urad Dal",
    organic: false,
    discount: 12,
  },
  {
    id: 4,
    name: "Neu Farm Unpolished Toor Dal 1kg",
    price: 120,
    originalPrice: 140,
    label: "Value Pack",
    rating: 4.6,
    reviews: 98,
    image:
      "https://www.jiomart.com/images/product/original/492570976/neu-farm-unpolished-desi-toor-dal-1-kg-product-images-o492570976-p590891743.jpg",
    category: "Toor Dal",
    organic: false,
    discount: 14,
  },
  {
    id: 5,
    name: "Organic Tattva Chana Dal 1kg",
    price: 99,
    originalPrice: 120,
    label: "Top Rated",
    rating: 4.8,
    reviews: 312,
    image:
      "https://www.bbassets.com/media/uploads/p/l/30002299_4-organic-tattva-organic-chana-dal.jpg",
    category: "Chana Dal",
    organic: true,
    discount: 18,
  },
  {
    id: 6,
    name: "Unpolished Desi Masoor Malka Dal 1kg",
    price: 110,
    originalPrice: 125,
    label: "Fresh",
    rating: 4.4,
    reviews: 145,
    image:
      "https://www.bbassets.com/media/uploads/p/l/40293860_2-fortune-masoor-malka-desi-unpolished-sortex-cleaned.jpg",
    category: "Masoor Dal",
    organic: false,
    discount: 12,
  },
  {
    id: 7,
    name: "Organic Rajma Red 1kg",
    price: 135,
    originalPrice: 160,
    label: "Rich Protein",
    rating: 4.2,
    reviews: 87,
    image:
      "https://organictattva.com/cdn/shop/files/8906055440117_01_e0886063-e7a8-46b8-a1eb-d2acab425791.png?v=1716207936",
    category: "Rajma",
    organic: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Tata Moong Dal Yellow Split 1kg",
    price: 112,
    originalPrice: 130,
    label: "Healthy",
    rating: 4.1,
    reviews: 203,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70/da/cms-assets/cms-product/d0799cef-246f-4750-a878-49f893403c2c.png",
    category: "Moong Dal",
    organic: false,
    discount: 14,
  },
  {
    id: 9,
    name: "Natureland Organic Urad Dal Chilka 1kg",
    price: 125,
    originalPrice: 145,
    label: "Certified Organic",
    rating: 4.9,
    reviews: 267,
    image:
      "https://www.jiomart.com/images/product/original/rv3ykksuvl/vgbnp-natural-urad-chilka.jpg",
    category: "Urad Dal",
    organic: true,
    discount: 14,
  },
  {
    id: 10,
    name: "Tata Sampann Masoor Dal 1kg",
    price: 135,
    originalPrice: 155,
    label: "Everyday Use",
    rating: 4.5,
    reviews: 178,
    image: "https://m.media-amazon.com/images/I/71qPWxhLsmL.jpg",
    category: "Masoor Dal",
    organic: false,
    discount: 13,
  },
  {
    id: 11,
    name: "Organic Tattva Urad Whole 1kg",
    price: 150,
    originalPrice: 175,
    label: "Organic",
    rating: 4.7,
    reviews: 210,
    image:
      "https://www.bbassets.com/media/uploads/p/l/40293667_1-organic-tattva-urad-whole.jpg",
    category: "Urad Dal",
    organic: true,
    discount: 14,
  },
  {
    id: 12,
    name: "Fortune Chana Dal 1kg",
    price: 105,
    originalPrice: 120,
    label: "Budget",
    rating: 4.3,
    reviews: 195,
    image: "https://m.media-amazon.com/images/I/71TmmikAeeL.jpg",
    category: "Chana Dal",
    organic: false,
    discount: 13,
  },
  {
    id: 13,
    name: "24 Mantra Organic Rajma Chitra 1kg",
    price: 140,
    originalPrice: 165,
    label: "Organic Special",
    rating: 4.8,
    reviews: 168,
    image:
      "https://www.jiomart.com/images/product/original/491695678/24-mantra-organic-chitra-rajma.jpg",
    category: "Rajma",
    organic: true,
    discount: 15,
  },
  {
    id: 14,
    name: "Organic Tattva Kabuli Chana 1kg",
    price: 120,
    originalPrice: 138,
    label: "Protein Rich",
    rating: 4.5,
    reviews: 210,
    image:
      "https://www.bbassets.com/media/uploads/p/l/40247356_1-organic-tattva-organic-kabuli-chana.jpg",
    category: "Chana Dal",
    organic: true,
    discount: 13,
  },
  {
    id: 15,
    name: "Neu Farm Moong Dal Chilka 1kg",
    price: 118,
    originalPrice: 135,
    label: "Unpolished",
    rating: 4.4,
    reviews: 142,
    image: "https://m.media-amazon.com/images/I/71s7BdCNzNL.jpg",
    category: "Moong Dal",
    organic: false,
    discount: 12,
  },
  {
    id: 16,
    name: "Fortune Toor Dal Premium 1kg",
    price: 138,
    originalPrice: 155,
    label: "Premium",
    rating: 4.6,
    reviews: 320,
    image: "https://m.media-amazon.com/images/I/81HvdWJTUyL.jpg",
    category: "Toor Dal",
    organic: false,
    discount: 11,
  },
];

// ----------------- Component -----------------
const DalAndPulses = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Unique categories
  const categories = useMemo(
    () => ["All", ...new Set(dalProducts.map((item) => item.category))],
    []
  );

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let filtered = dalProducts.filter(
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
  }, [searchTerm, selectedCategory, sortBy]);

   // Add to Cart
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  // Wishlist toggle
  const toggleWishlist = (item) => {
    const isInWishlist = wishlist.find((w) => w.id === item.id);
    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  // Rating stars
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
          Premium Dal & Pulses
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover our handpicked selection of nutrient-rich lentils and pulses,
          carefully sourced for quality and freshness.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search dal, pulses..."
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

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Truck className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Free Delivery</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Shield className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Quality Guarantee</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">4.8/5 Rating</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Organic Options</p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            const isInWishlist = wishlist.some((w) => w.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-2">
                    {item.organic && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        🌱 Organic
                      </span>
                    )}
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-semibold">
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
            <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* line clamp CSS */}
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

export default DalAndPulses;