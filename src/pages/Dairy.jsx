import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Search, Filter, Star, Heart, Shield, Truck } from "lucide-react";

const products = [
  { id: 1, name: "Amul Gold Milk 1L", price: 64, tag: "Full Cream", image: "https://www.jiomart.com/images/product/original/590002686/amul-gold-full-cream-milk-1-l-pouch-product-images-o590002686-p590049228-0-202409131647.jpg" },
  { id: 2, name: "Mother Dairy Curd 400g", price: 35, tag: "Fresh", image: "https://wholesalemeans.com/image/cache/catalog/product/Grocery/Mother%20Dairy%20Classic%20Dahi%20(Curd)%20400%20G%20Front%20Pic-700x800.png" },
  { id: 3, name: "Amul Paneer 200g", price: 85, tag: "Soft & Fresh", image: "https://m.media-amazon.com/images/I/81hD14MN91L.jpg" },
  { id: 4, name: "Amul Butter 500g", price: 255, tag: "Classic", image: "https://www.jiomart.com/images/product/original/490001392/amul-butter-500-g-carton-product-images-o490001392-p490001392-3-202203152128.jpg?im=Resize=(420,420)" },
  { id: 5, name: "Nestlé Milkmaid 400g", price: 135, tag: "Dessert Essential", image: "https://m.media-amazon.com/images/I/71CE0VUaGmL._UF1000,1000_QL80_.jpg" },
  { id: 6, name: "Amul Cheese Cubes 200g", price: 125, tag: "Snack Friendly", image: "https://m.media-amazon.com/images/I/71JIA49IdYL._UF1000,1000_QL80_.jpg" },
  { id: 7, name: "Gowardhan Ghee 1L", price: 535, tag: "Pure Desi Ghee", image: "https://www.jiomart.com/images/product/original/490010244/gowardhan-pure-cow-ghee-1-l-pouch-product-images-o490010244-p490010244-0-202203150918.jpg" },
  { id: 8, name: "Amul Masti Buttermilk 500ml", price: 22, tag: "Cooling Drink", image: "https://5.imimg.com/data5/CR/UN/BP/SELLER-40904399/500-ml-amul-buttermilk-500x500.jpg" },
  { id: 9, name: "Epigamia Greek Yogurt 90g", price: 50, tag: "Protein Rich", image: "https://m.media-amazon.com/images/I/61N9nePDbZL._UF1000,1000_QL80_.jpg" },
  { id: 10, name: "Amul Fresh Cream 200g", price: 110, tag: "Rich & Thick", image: "https://m.media-amazon.com/images/I/61wa2oKzLTL._SL1000_.jpg" },
  { id: 11, name: "Britannia Cheese Slices 200g", price: 190, tag: "Slice Cheese", image: "https://www.britannia.co.in/storage/app/uploads/public/613/2fe/6dd/6132fe6ddda2a040896145.jpg" },
  { id: 12, name: "Nestlé Everyday Dairy Whitener 1kg", price: 250, tag: "Milk Powder", image: "https://www.nestle.in/sites/default/files/2020-11/nestle_everyday_dairy_whitener_1kg_pack.jpg" },
  { id: 13, name: "Amul Shrikhand Elaichi 500g", price: 150, tag: "Sweetened Yogurt", image: "https://m.media-amazon.com/images/I/718w1v4O+VL._SL1500_.jpg" },
  { id: 14, name: "Gowardhan Dahi 500g", price: 45, tag: "Curd", image: "https://www.jiomart.com/images/product/500x500/490009077/gowardhan-dahi-500-g-product-images-o490009077-p490009077-0-202110202200.jpg" },
  { id: 15, name: "Amul Paneer Tikka 250g", price: 95, tag: "Ready to Cook", image: "https://cdn.shopify.com/s/files/1/0347/5327/5500/products/amulpaneertikka_1024x1024.jpg" },
];

const Dairy = () => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.tag))],
    []
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || item.tag === selectedCategory)
    );

    switch (sortBy) {
      case "priceLow":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "priceHigh":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return filtered;
      default:
        return filtered;
    }
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (item) => {
    // If your CartContext supports (product, showNotification), pass false:
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      },
      
    );
  };

  const toggleWishlist = (item) => {
    const isInWishlist = wishlist.find((w) => w.id === item.id);
    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const StarRating = () => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-current" />
      ))}
      <span className="text-sm text-gray-300 ml-1">(4.5)</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Dairy Products
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Fresh milk, curd, paneer, butter, cheese, ghee and more from trusted dairy brands.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search dairy products..."
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
                <option key={cat} value={cat}>
                  {cat}
                </option>
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
            <p className="text-sm font-semibold">Top Rated Dairy</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Filter className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-sm font-semibold">Variety of Choices</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((item) => {
            const isInWishlist = wishlist.find((w) => w.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={18}
                      className={isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-14">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-orange-700">₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 rounded-xl font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
            <p className="text-gray-500 text-lg">No dairy products found.</p>
          </div>
        )}
      </div>

      {/* If you're not using styled-jsx, prefer plain <style> */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Dairy;
