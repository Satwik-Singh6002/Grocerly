import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const Rice = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      id: 1,
      name: "India Gate Basmati Rice 1kg",
      price: 125,
      originalPrice: 140,
      label: "Basmati",
      rating: 4.6,
      reviews: 1240,
      category: "Basmati",
      discount: 11,
      image: "https://m.media-amazon.com/images/I/81mHz4XKK0L.jpg",
    },
    {
      id: 2,
      name: "Daawat Rozana Super 5kg",
      price: 420,
      originalPrice: 460,
      label: "Long Grain",
      rating: 4.5,
      reviews: 980,
      category: "Everyday Rice",
      discount: 9,
      image: "https://m.media-amazon.com/images/I/71xqTSRdbML._UF894,1000_QL80_.jpg",
    },
    {
      id: 3,
      name: "Fortune Everyday Biryani Rice 1kg",
      price: 99,
      originalPrice: 115,
      label: "Biryani",
      rating: 4.4,
      reviews: 760,
      category: "Biryani",
      discount: 14,
      image: "https://www.jiomart.com/images/product/original/491215473/fortune-everyday-full-grain-basmati-rice.jpg",
    },
    {
      id: 4,
      name: "Kohinoor Basmati Rice 1kg",
      price: 135,
      originalPrice: 150,
      label: "Fragrant",
      rating: 4.7,
      reviews: 860,
      category: "Basmati",
      discount: 10,
      image: "https://m.media-amazon.com/images/I/71xIb0tGQNL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 5,
      name: "Lal Qilla Traditional Basmati Rice 1kg",
      price: 145,
      originalPrice: 160,
      label: "Premium",
      rating: 4.8,
      reviews: 1050,
      category: "Basmati",
      discount: 9,
      image: "https://m.media-amazon.com/images/I/51HoaLo97FS._AC_.jpg",
    },
    {
      id: 6,
      name: "Aeroplane Jeerakasala Rice 1kg",
      price: 160,
      originalPrice: 180,
      label: "South Indian",
      rating: 4.6,
      reviews: 690,
      category: "Regional Rice",
      discount: 11,
      image: "https://www.jiomart.com/images/product/original/491297292/aeroplane-1121-extra-long-grain-basmati-rice.jpg",
    },
    {
      id: 7,
      name: "Golden Harvest Everyday Rice 5kg",
      price: 315,
      originalPrice: 340,
      label: "Budget",
      rating: 4.3,
      reviews: 510,
      category: "Everyday Rice",
      discount: 7,
      image: "https://www.jiomart.com/images/product/original/491971770/golden-harvest-pulao-basmati-rice.jpg",
    },
    {
      id: 8,
      name: "Organic Tattva Brown Rice 1kg",
      price: 110,
      originalPrice: 125,
      label: "Healthy",
      rating: 4.5,
      reviews: 450,
      category: "Organic Rice",
      discount: 12,
      image: "https://m.media-amazon.com/images/I/61v88n1C0BL.jpg",
    },
    {
      id: 9,
      name: "Tilda Basmati Rice 1kg",
      price: 220,
      originalPrice: 240,
      label: "Export Quality",
      rating: 4.8,
      reviews: 1340,
      category: "Basmati",
      discount: 8,
      image: "https://m.media-amazon.com/images/I/71SRL6dUx0L._UF1000,1000_QL80_.jpg",
    },
    {
      id: 10,
      name: "Daawat Brown Basmati Rice 1kg",
      price: 130,
      originalPrice: 145,
      label: "Whole Grain",
      rating: 4.6,
      reviews: 540,
      category: "Organic Rice",
      discount: 10,
      image: "https://m.media-amazon.com/images/I/71NfmuL7lmL.jpg",
    },
    {
      id: 11,
      name: "India Gate Feast Rozzana 5kg",
      price: 370,
      originalPrice: 410,
      label: "Value Pack",
      rating: 4.5,
      reviews: 920,
      category: "Everyday Rice",
      discount: 10,
      image: "https://m.media-amazon.com/images/I/71kT6jjXN1L.jpg",
    },
    {
      id: 12,
      name: "Double Diamond HMT Kolam Rice 10kg",
      price: 550,
      originalPrice: 600,
      label: "Bulk Buy",
      rating: 4.3,
      reviews: 620,
      category: "Everyday Rice",
      discount: 8,
      image: "https://5.imimg.com/data5/SELLER/Default/2021/1/DT/MI/MI/74093701/hmt-kolam-rice.jpg",
    },
    {
      id: 13,
      name: "Mysore Mallige Sona Masoori Rice 5kg",
      price: 280,
      originalPrice: 310,
      label: "South Special",
      rating: 4.6,
      reviews: 700,
      category: "Regional Rice",
      discount: 10,
      image: "https://www.bigbasket.com/media/uploads/p/l/10000411_19-mysore-mallige-mysore-mallige-sona-masoori-rice.jpg",
    },
    {
      id: 14,
      name: "Daawat Devaaya Basmati 5kg",
      price: 480,
      originalPrice: 530,
      label: "Fragrant",
      rating: 4.7,
      reviews: 870,
      category: "Basmati",
      discount: 9,
      image: "https://m.media-amazon.com/images/I/61uuMfl+fUL.jpg",
    },
    {
      id: 15,
      name: "Organic India Red Rice 1kg",
      price: 140,
      originalPrice: 160,
      label: "Organic",
      rating: 4.5,
      reviews: 430,
      category: "Organic Rice",
      discount: 12,
      image: "https://m.media-amazon.com/images/I/81wlZ+bFZyL.jpg",
    },
    {
    id: 16,
    name: "Organic Ponni Raw Rice 5kg",
    price: 360,
    originalPrice: 399,
    label: "Organic",
    rating: 4.6,
    reviews: 510,
    category: "Organic Rice",
    discount: 10,
    image: "https://www.bigbasket.com/media/uploads/p/l/10000434_19-ponni-raw-rice.jpg",
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
          Premium Rice Collection
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Find premium Basmati, biryani, and everyday rice at great prices.
        </p>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search rice..."
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
              {categories.map(cat => (
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
            <p className="text-sm font-semibold">Trusted Brands</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Star className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Top Rated Rice</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Variety of Options</p>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(item => {
            const isInWishlist = wishlist.find(w => w.id === item.id);
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
            )
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rice found. Try a different search.</p>
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

export default Rice;
