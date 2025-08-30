import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Dairy = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [minRating, setMinRating] = useState(0);
  const [animatingProduct, setAnimatingProduct] = useState(null);
  const timeoutRef = useRef(null);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Products data with dairy items
  const products = useMemo(
    () => [{ id: 1, name: "Amul Gold Milk 1L", price: 64, originalPrice: 70, rating: 4.5, reviews: 1245, imageUrl: "https://www.jiomart.com/images/product/original/590002686/amul-gold-full-cream-milk-1-l-pouch-product-images-o590002686-p590049228-0-202409131647.jpg", category: "Milk", tags: ["Full Cream", "Fresh"], description: "Pure full cream milk for daily consumption", stock: 15 },
    { id: 2, name: "Mother Dairy Curd 400g", price: 35, originalPrice: 40, rating: 4.3, reviews: 876, imageUrl: "https://wholesalemeans.com/image/cache/catalog/product/Grocery/Mother%20Dairy%20Classic%20Dahi%20(Curd)%20400%20G%20Front%20Pic-700x800.png", category: "Curd", tags: ["Fresh", "Probiotic"], description: "Fresh and creamy curd for healthy digestion", stock: 8 },
    { id: 3, name: "Amul Paneer 200g", price: 85, originalPrice: 95, rating: 4.6, reviews: 943, imageUrl: "https://m.media-amazon.com/images/I/81hD14MN91L.jpg", category: "Paneer", tags: ["Soft", "Fresh"], description: "Soft and fresh paneer for cooking delicious dishes", stock: 12 },
    { id: 4, name: "Amul Butter 500g", price: 255, originalPrice: 280, rating: 4.7, reviews: 567, imageUrl: "https://www.jiomart.com/images/product/original/490001392/amul-butter-500-g-carton-product-images-o490001392-p490001392-3-202203152128.jpg", category: "Butter", tags: ["Classic", "Creamy"], description: "Rich and creamy butter for cooking and spreading", stock: 5 },
    { id: 5, name: "Nestlé Milkmaid 400g", price: 135, originalPrice: 150, rating: 4.2, reviews: 654, imageUrl: "https://m.media-amazon.com/images/I/71CE0VUaGmL._UF1000,1000_QL80_.jpg", category: "Condensed Milk", tags: ["Dessert Essential", "Sweet"], description: "Sweetened condensed milk for desserts and beverages", stock: 10 },
    { id: 6, name: "Amul Cheese Cubes 200g", price: 125, originalPrice: 140, rating: 4.1, reviews: 432, imageUrl: "https://m.media-amazon.com/images/I/71JIA49IdYL._UF1000,1000_QL80_.jpg", category: "Cheese", tags: ["Snack Friendly", "Cubes"], description: "Cheese cubes perfect for snacking and cooking", stock: 20 },
    { id: 7, name: "Gowardhan Ghee 1L", price: 535, originalPrice: 580, rating: 4.4, reviews: 789, imageUrl: "https://www.jiomart.com/images/product/original/490010244/gowardhan-pure-cow-ghee-1-l-pouch-product-images-o490010244-p490010244-0-202203150918.jpg", category: "Ghee", tags: ["Pure Desi Ghee", "Traditional"], description: "Pure desi ghee for traditional cooking and flavor", stock: 6 },
    { id: 8, name: "Amul Masti Buttermilk 500ml", price: 22, originalPrice: 25, rating: 4.0, reviews: 321, imageUrl: "https://5.imimg.com/data5/CR/UN/BP/SELLER-40904399/500-ml-amul-buttermilk-500x500.jpg", category: "Buttermilk", tags: ["Cooling Drink", "Refreshing"], description: "Refreshing buttermilk for hot summer days", stock: 9 },
    { id: 9, name: "Epigamia Greek Yogurt 90g", price: 50, originalPrice: 55, rating: 4.6, reviews: 567, imageUrl: "https://m.media-amazon.com/images/I/61N9nePDbZL._UF1000,1000_QL80_.jpg", category: "Yogurt", tags: ["Protein Rich", "Healthy"], description: "Protein-rich Greek yogurt for health-conscious consumers", stock: 11 },
    { id: 10, name: "Amul Fresh Cream 200g", price: 110, originalPrice: 120, rating: 4.9, reviews: 876, imageUrl: "https://m.media-amazon.com/images/I/61wa2oKzLTL._SL1000_.jpg", category: "Cream", tags: ["Rich & Thick", "Cooking"], description: "Rich and thick cream for cooking and desserts", stock: 4 },
    { id: 11, name: "Britannia Cheese Slices 200g", price: 190, originalPrice: 210, rating: 4.2, reviews: 987, imageUrl: "https://www.britannia.co.in/storage/app/uploads/public/613/2fe/6dd/6132fe6ddda2a040896145.jpg", category: "Cheese", tags: ["Slice Cheese", "Sandwich"], description: "Cheese slices perfect for sandwiches and burgers", stock: 18 },
    { id: 12, name: "Nestlé Everyday Dairy Whitener 1kg", price: 250, originalPrice: 280, rating: 4.3, reviews: 234, imageUrl: "https://www.nestle.in/sites/default/files/2020-11/nestle_everyday_dairy_whitener_1kg_pack.jpg", category: "Milk Powder", tags: ["Milk Powder", "Long Life"], description: "Dairy whitener for tea, coffee and cooking", stock: 25 },
    { id: 13, name: "Amul Shrikhand Elaichi 500g", price: 150, originalPrice: 170, rating: 4.7, reviews: 432, imageUrl: "https://m.media-amazon.com/images/I/718w1v4O+VL._SL1500_.jpg", category: "Dessert", tags: ["Sweetened Yogurt", "Elaichi"], description: "Sweetened yogurt dessert with cardamom flavor", stock: 3 },
    { id: 14, name: "Gowardhan Dahi 500g", price: 45, originalPrice: 50, rating: 4.5, reviews: 654, imageUrl: "https://www.jiomart.com/images/product/500x500/490009077/gowardhan-dahi-500-g-product-images-o490009077-p490009077-0-202110202200.jpg", category: "Curd", tags: ["Curd", "Fresh"], description: "Fresh and creamy curd from a trusted brand", stock: 14 },
    { id: 15, name: "Amul Paneer Tikka 250g", price: 95, originalPrice: 110, rating: 4.8, reviews: 345, imageUrl: "https://cdn.shopify.com/s/files/1/0347/5327/5500/products/amulpaneertikka_1024x1024.jpg", category: "Paneer", tags: ["Ready to Cook", "Marinated"], description: "Marinated paneer tikka ready for cooking", stock: 7 },
    // New products added below
    { id: 16, name: "Mother Dairy Toned Milk 500ml", price: 32, originalPrice: 35, rating: 4.2, reviews: 876, imageUrl: "https://www.jiomart.com/images/product/original/491366270/mother-dairy-toned-milk-500-ml-pouch-product-images-o491366270-p491366270-0-202203172134.jpg", category: "Milk", tags: ["Toned", "Fresh"], description: "Toned milk with balanced nutrition", stock: 20 },
    { id: 17, name: "Amul Lassi 200ml", price: 25, originalPrice: 28, rating: 4.0, reviews: 432, imageUrl: "https://m.media-amazon.com/images/I/61o5Q4t4nOL._SL1500_.jpg", category: "Buttermilk", tags: ["Sweet", "Refreshing"], description: "Sweet and refreshing lassi drink", stock: 15 },
    { id: 18, name: "Britannia Cream Cheese 200g", price: 175, originalPrice: 195, rating: 4.3, reviews: 289, imageUrl: "https://www.britannia.co.in/storage/app/uploads/public/613/2fe/6dd/6132fe6ddda2a040896145.jpg", category: "Cheese", tags: ["Creamy", "Spreadable"], description: "Creamy cheese perfect for spreads and dips", stock: 8 },
    { id: 19, name: "Nestlé A+ Curd 400g", price: 40, originalPrice: 45, rating: 4.4, reviews: 567, imageUrl: "https://www.nestle.in/sites/default/files/2020-11/nestle_a_plus_curd_400g_pack.jpg", category: "Curd", tags: ["Probiotic", "Fresh"], description: "Probiotic curd for digestive health", stock: 12 },
    { id: 20, name: "Amul Mozzarella Cheese 200g", price: 145, originalPrice: 160, rating: 4.6, reviews: 654, imageUrl: "https://m.media-amazon.com/images/I/71pKd5R7HaL._SL1500_.jpg", category: "Cheese", tags: ["Pizza Cheese", "Melting"], description: "Perfect melting cheese for pizzas and pasta", stock: 10 },
    { id: 21, name: "Go Cheese Spread 200g", price: 95, originalPrice: 110, rating: 4.1, reviews: 198, imageUrl: "https://m.media-amazon.com/images/I/61KZ+Q4JQJL._SL1500_.jpg", category: "Cheese", tags: ["Spread", "Flavored"], description: "Flavored cheese spread for sandwiches", stock: 6 },
    { id: 22, name: "Mother Dairy Mishti Doi 400g", price: 60, originalPrice: 65, rating: 4.7, reviews: 432, imageUrl: "https://www.jiomart.com/images/product/original/491366271/mother-dairy-mishti-doi-400-g-cup-product-images-o491366271-p491366271-0-202203172134.jpg", category: "Dessert", tags: ["Sweet Yogurt", "Bengali"], description: "Traditional Bengali sweet yogurt dessert", stock: 9 },
    { id: 23, name: "Amul Chocolate Milk 200ml", price: 30, originalPrice: 35, rating: 4.5, reviews: 765, imageUrl: "https://m.media-amazon.com/images/I/61VfL-aiToL._SL1500_.jpg", category: "Milk", tags: ["Flavored", "Chocolate"], description: "Chocolate flavored milk drink", stock: 14 },
    { id: 24, name: "Vita Whole Wheat Milk Rusk 300g", price: 85, originalPrice: 95, rating: 4.2, reviews: 321, imageUrl: "https://m.media-amazon.com/images/I/81R8VZ0ZzZL._SL1500_.jpg", category: "Dairy Snack", tags: ["Rusk", "Bakery"], description: "Crispy milk rusks for tea time", stock: 7 },
    { id: 25, name: "Amul Malai Paneer 200g", price: 90, originalPrice: 100, rating: 4.4, reviews: 543, imageUrl: "https://m.media-amazon.com/images/I/71q3J8J8JZL._SL1500_.jpg", category: "Paneer", tags: ["Creamy", "Rich"], description: "Rich and creamy malai paneer for curries", stock: 11 },
    { id: 26, name: "Nestlé Fresh Cream 200ml", price: 105, originalPrice: 115, rating: 4.3, reviews: 234, imageUrl: "https://www.nestle.in/sites/default/files/2020-11/nestle_fresh_cream_200ml_pack.jpg", category: "Cream", tags: ["Cooking", "Whipping"], description: "Versatile cream for cooking and whipping", stock: 5 },
    { id: 27, name: "Mother Dairy Flavored Milk 180ml", price: 25, originalPrice: 28, rating: 4.1, reviews: 187, imageUrl: "https://www.jiomart.com/images/product/original/491366272/mother-dairy-flavored-milk-180-ml-bottle-product-images-o491366272-p491366272-0-202203172134.jpg", category: "Milk", tags: ["Flavored", "Ready-to-drink"], description: "Ready-to-drink flavored milk", stock: 16 },
    { id: 28, name: "Amul Processed Cheese 200g", price: 115, originalPrice: 130, rating: 4.0, reviews: 276, imageUrl: "https://m.media-amazon.com/images/I/71JIA49IdYL._UF1000,1000_QL80_.jpg", category: "Cheese", tags: ["Processed", "Slices"], description: "Processed cheese for sandwiches and burgers", stock: 13 },
    { id: 29, name: "Epigamia Strawberry Yogurt 90g", price: 55, originalPrice: 60, rating: 4.5, reviews: 398, imageUrl: "https://m.media-amazon.com/images/I/61N9nePDbZL._UF1000,1000_QL80_.jpg", category: "Yogurt", tags: ["Flavored", "Fruit"], description: "Strawberry flavored Greek yogurt", stock: 8 },
    { id: 30, name: "Amul Buttermilk Masala 200ml", price: 20, originalPrice: 22, rating: 4.2, reviews: 154, imageUrl: "https://5.imimg.com/data5/CR/UN/BP/SELLER-40904399/500-ml-amul-buttermilk-500x500.jpg", category: "Buttermilk", tags: ["Spiced", "Refreshing"], description: "Spiced buttermilk with traditional flavors", stock: 10 },
    { id: 31, name: "Britannia Yogurt 400g", price: 38, originalPrice: 42, rating: 4.1, reviews: 267, imageUrl: "https://www.britannia.co.in/storage/app/uploads/public/613/2fe/6dd/6132fe6ddda2a040896145.jpg", category: "Curd", tags: ["Plain", "Fresh"], description: "Plain fresh yogurt for daily consumption", stock: 12 },
    { id: 32, name: "Amul Mithai Mate 500g", price: 245, originalPrice: 270, rating: 4.6, reviews: 189, imageUrl: "https://m.media-amazon.com/images/I/71q3J8J8JZL._SL1500_.jpg", category: "Cream", tags: ["Sweet Making", "Rich"], description: "Special cream for making Indian sweets", stock: 4 }
    ],
    []
  );

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let updated = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (categoryFilter !== "All") {
      updated = updated.filter((p) => p.category === categoryFilter);
    }

    // Price range filter
    updated = updated.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (minRating > 0) {
      updated = updated.filter((p) => p.rating >= minRating);
    }

    // Create a copy before sorting to avoid mutating the original array
    const sortedProducts = [...updated];
    
    if (sortOption === "Price: Low to High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Top Rated") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Most Popular") {
      sortedProducts.sort((a, b) => b.reviews - a.reviews);
    }

    return sortedProducts;
  }, [products, searchTerm, categoryFilter, sortOption, priceRange, minRating]);

  // Add to cart with animation
  const handleAddToCart = useCallback((item) => {
    if (item.stock <= 0) {
      showToast(`${item.name} is out of stock!`, "error");
      return;
    }

    const inCart = cartItems.find((c) => c.id === item.id);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (inCart) {
      if (inCart.quantity >= item.stock) {
        showToast(`Only ${item.stock} items available in stock!`, "error");
        return;
      }
      
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Added another • ${item.name} (x${nextQty})`, "success");

      // Check if 3 of the same product are added
      if (nextQty === 3) {
        showToast(`3 ${item.name} added to cart! Special offer applied!`, "info");
      }
    } else {
      // ensure we add with a quantity of 1
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }

    setAnimatingProduct(item.id);
    // Reset animation after 500ms
    timeoutRef.current = setTimeout(() => setAnimatingProduct(null), 500);
  }, [addToCart, updateQuantity, showToast, cartItems]);

  // + button: same behavior as Add (instant toast)
  const handleIncrement = useCallback((item) => {
    if (item.stock <= 0) {
      showToast(`${item.name} is out of stock!`, "error");
      return;
    }

    const inCart = cartItems.find((c) => c.id === item.id);
    if (inCart) {
      if (inCart.quantity >= item.stock) {
        showToast(`Only ${item.stock} items available in stock!`, "error");
        return;
      }
      
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Increased • ${item.name} (x${nextQty})`, "info");

      // Check if 3 of the same product are added
      if (nextQty === 3) {
        showToast(`3 ${item.name} added to cart! Special offer applied!`, "info");
      }
    } else {
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }
  }, [cartItems, updateQuantity, addToCart, showToast]);

  // − button: decrement or remove at 1 (instant toast)
  const handleDecrement = useCallback((item) => {
    const inCart = cartItems.find((c) => c.id === item.id);
    if (!inCart) return;

    if (inCart.quantity > 1) {
      const nextQty = inCart.quantity - 1;
      updateQuantity(item.id, nextQty);
      showToast(`Decreased • ${item.name} (x${nextQty})`, "info");
    } else {
      removeFromCart(item.id);
      showToast(`${item.name} removed from cart`, "error");
    }
  }, [cartItems, updateQuantity, removeFromCart, showToast]);

  // Handle wishlist toggle
  const handleWishlistToggle = useCallback((item) => {
    const isInWishlist = wishlist.find((w) => w.id === item.id);
    
    if (isInWishlist) {
      removeFromWishlist(item.id);
      showToast(`${item.name} removed from wishlist`, "info");
    } else {
      addToWishlist(item);
      showToast(`${item.name} added to wishlist!`, "success");
    }
  }, [wishlist, addToWishlist, removeFromWishlist, showToast]);

  const categories = ["All", "Milk", "Curd", "Paneer", "Butter", "Cheese", "Ghee", "Buttermilk", "Yogurt", "Cream", "Milk Powder", "Dessert"];

  // Render stars for rating
  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={14}
        className={
          index < Math.floor(rating)
            ? "text-amber-500 fill-amber-500"
            : "text-gray-300"
        }
        aria-hidden="true"
      />
    ));
  }, []);

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilter("All");
    setPriceRange([0, 600]);
    setMinRating(0);
    setSearchTerm("");
  };

  // Debounced search to improve performance
  const debouncedSearch = useRef(null);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    
    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }
    
    debouncedSearch.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-orange-50 to-yellow-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-900 mb-2">Fresh Dairy Products</h1>
        <p className="text-orange-600">Fresh milk, curd, paneer, butter, cheese, ghee and more from trusted dairy brands</p>
      </div>

      {/* Features section */}
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

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-orange-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search dairy products..."
            className="w-full border border-orange-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            defaultValue={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Product categories">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryFilter === category
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                }`}
              onClick={() => setCategoryFilter(category)}
              aria-pressed={categoryFilter === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="md:hidden flex items-center gap-1 px-3 py-2 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filters-section"
          >
            <Filter size={16} aria-hidden="true" />
            {showFilters ? <X size={16} aria-hidden="true" /> : "Filters"}
          </button>

          <select
            className={`border border-orange-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-400 bg-white ${showFilters ? "flex" : "hidden md:flex"
              }`}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort products by"
          >
            <option value="Featured">Featured</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Most Popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <div 
        id="filters-section"
        className={`bg-white p-4 rounded-2xl shadow-md mb-8 ${showFilters ? "block" : "hidden md:block"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-orange-900">Advanced Filters</h3>
          <button
            className="text-orange-600 text-sm flex items-center"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            aria-expanded={showMoreFilters}
            aria-controls="more-filters"
          >
            {showMoreFilters ? "Show Less" : "More Filters"}
            {showMoreFilters ? <ChevronUp size={16} className="ml-1" aria-hidden="true" /> : <ChevronDown size={16} className="ml-1" aria-hidden="true" />}
          </button>
        </div>

        <div 
          id="more-filters"
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showMoreFilters ? "block" : "hidden md:grid"}`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">0</span>
              <input
                type="range"
                min="0"
                max="600"
                step="50"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={600}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="600"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={600}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">600</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <div className="flex space-x-2">
              {[0, 2, 3, 4].map(rating => (
                <button
                  key={rating}
                  className={`px-3 py-1 rounded-full text-sm ${minRating === rating
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                    }`}
                  onClick={() => setMinRating(rating)}
                  aria-pressed={minRating === rating}
                >
                  {rating === 0 ? "Any" : `${rating}+ Stars`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <div className="text-sm text-orange-600">
          {filteredProducts.length === products.length ? (
            "All products"
          ) : (
            <button
              className="underline hover:no-underline"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          const inCart = cartItems.find((c) => c.id === item.id);
          const currentQuantity = inCart ? inCart.quantity : 0;
          const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
          const isInWishlist = wishlist.find((w) => w.id === item.id);
          const isOutOfStock = item.stock <= 0;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg p-5 relative transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${isOutOfStock ? 'opacity-70' : ''}`}
            >
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                  SAVE {discount}%
                </div>
              )}

              {isOutOfStock && (
                <div className="absolute top-4 right-4 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                  OUT OF STOCK
                </div>
              )}

              <button
                className="absolute top-4 right-4 z-10"
                onClick={() => !isOutOfStock && handleWishlistToggle(item)}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                disabled={isOutOfStock}
              >
                <Heart
                  className={
                    isInWishlist
                      ? "fill-red-500 text-red-500"
                      : isOutOfStock 
                        ? "text-gray-300 cursor-not-allowed" 
                        : "text-gray-300 hover:text-red-500"
                  }
                  size={24}
                />
              </button>

              <div className="h-48 flex items-center justify-center mb-4 relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-h-44 mx-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFE4C4/000000?text=Dairy+Product";
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 overflow-hidden">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500 mb-2 line-clamp-2 h-10">
                {item.description}
              </p>

              <div className="flex items-center mb-2">
                <div className="flex text-amber-500 mr-2" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                  {renderStars(item.rating)}
                  <span className="sr-only">Rating: {item.rating} out of 5 stars</span>
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  ({item.reviews.toLocaleString()})
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xl font-bold text-orange-700">
                  ₹{item.price.toLocaleString()}
                </span>
                {item.originalPrice && (
                  <span className="text-sm line-through text-gray-400 ml-2">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock indicator */}
              {!isOutOfStock && item.stock < 10 && (
                <div className="mb-2 text-xs text-orange-600">
                  Only {item.stock} left in stock!
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cart buttons */}
              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-orange-300 rounded-full overflow-hidden bg-orange-50">
                    <button
                      onClick={() => !isOutOfStock && handleDecrement(item)}
                      className="p-2 text-orange-700 hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                      disabled={isOutOfStock}
                    >
                      {currentQuantity === 1 ? <Trash2 size={14} /> : <Minus size={16} />}
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-800 min-w-[2rem] text-center">
                      {currentQuantity}
                    </span>
                    <button
                      onClick={() => !isOutOfStock && handleIncrement(item)}
                      className="p-2 text-orange-700 hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                      disabled={isOutOfStock || currentQuantity >= item.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-10"></div> // Spacer to maintain alignment
                )}

                <button
                  onClick={() => !isOutOfStock && handleAddToCart(item)}
                  disabled={isOutOfStock}
                  className={`flex items-center justify-center rounded-full p-3 shadow-md transition-all duration-300 transform ${currentQuantity > 0
                      ? "bg-orange-700 text-white hover:bg-orange-800 hover:shadow-lg"
                      : "bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:scale-105"
                    } ${animatingProduct === item.id ? 'animate-bounce' : ''} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                  aria-label={isOutOfStock ? "Out of stock" : "Add to cart"}
                >
                  <ShoppingCart size={18} />
                  {currentQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {currentQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No products found. Try adjusting your search or filters.</p>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Dairy;