import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const OilAndGhee = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
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

  // Products data with 15 items
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Fortune Sunflower Oil 1L",
        price: 130,
        originalPrice: 150,
        rating: 4.6,
        reviews: 980,
        imageUrl: "https://m.media-amazon.com/images/I/41wYtZkL69L._UF1000,1000_QL80_.jpg",
        category: "Edible Oils",
        tags: ["Best Seller"],
        description: "Refined sunflower oil for everyday cooking",
        stock: 15
      },
      {
        id: 2,
        name: "Patanjali Cow Ghee 1L",
        price: 530,
        originalPrice: 580,
        rating: 4.7,
        reviews: 1200,
        imageUrl: "https://m.media-amazon.com/images/I/61Q+N9jRcZL._UF894,1000_QL80_.jpg",
        category: "Ghee",
        tags: ["Pure"],
        description: "Pure desi cow ghee for traditional cooking",
        stock: 8
      },
      {
        id: 3,
        name: "Saffola Gold Oil 1L",
        price: 150,
        originalPrice: 165,
        rating: 4.8,
        reviews: 1100,
        imageUrl: "https://m.media-amazon.com/images/I/61ZSTmboXVL.jpg",
        category: "Edible Oils",
        tags: ["Heart Healthy"],
        description: "Blended oil for heart health",
        stock: 12
      },
      {
        id: 4,
        name: "Dhara Refined Oil 1L",
        price: 125,
        originalPrice: 140,
        rating: 4.4,
        reviews: 720,
        imageUrl: "https://m.media-amazon.com/images/I/41T1xhPt-8L._AC_.jpg",
        category: "Edible Oils",
        tags: ["Affordable"],
        description: "Refined oil for daily use",
        stock: 5
      },
      {
        id: 5,
        name: "Anik Ghee 500ml",
        price: 260,
        originalPrice: 280,
        rating: 4.6,
        reviews: 860,
        imageUrl: "https://www.jiomart.com/images/product/original/490012756/anik-ghee-500-ml-tin.jpg",
        category: "Ghee",
        tags: ["Rich Aroma"],
        description: "Premium quality ghee with rich aroma",
        stock: 10
      },
      {
        id: 6,
        name: "Fortune Kachi Ghani Mustard Oil 1L",
        price: 145,
        originalPrice: 165,
        rating: 4.7,
        reviews: 920,
        imageUrl: "https://assets.hyperpure.com/data/images/products/f6640b251a41ea1253570dba280e0516.jpg",
        category: "Edible Oils",
        tags: ["Cold Pressed"],
        description: "Cold pressed mustard oil for authentic flavor",
        stock: 20
      },
      {
        id: 7,
        name: "Amul Pure Ghee 1L",
        price: 540,
        originalPrice: 590,
        rating: 4.8,
        reviews: 1350,
        imageUrl: "https://m.media-amazon.com/images/I/81iwctfHH9L.jpg",
        category: "Ghee",
        tags: ["Premium"],
        description: "Pure cow ghee from Amul",
        stock: 6
      },
      {
        id: 8,
        name: "Gemini Refined Soybean Oil 1L",
        price: 120,
        originalPrice: 135,
        rating: 4.5,
        reviews: 760,
        imageUrl: "https://www.jiomart.com/images/product/original/490012718/gemini-refined-soyabean-oil.jpg",
        category: "Edible Oils",
        tags: ["Everyday Use"],
        description: "Refined soybean oil for all cooking needs",
        stock: 7
      },
      {
        id: 9,
        name: "Nature Fresh ActiLite Oil 1L",
        price: 135,
        originalPrice: 150,
        rating: 4.4,
        reviews: 640,
        imageUrl: "https://m.media-amazon.com/images/I/81QrG08A71L._UF1000,1000_QL80_.jpg",
        category: "Edible Oils",
        tags: ["Low Absorption"],
        description: "Low absorption oil for healthier cooking",
        stock: 9
      },
      {
        id: 10,
        name: "Govardhan Pure Cow Ghee 1L",
        price: 550,
        originalPrice: 610,
        rating: 4.6,
        reviews: 710,
        imageUrl: "https://m.media-amazon.com/images/I/71AnYu1z-XL._SX679_.jpg",
        category: "Ghee",
        tags: ["Rich Taste"],
        description: "Premium cow ghee with rich taste",
        stock: 11
      },
      {
        id: 11,
        name: "Sundrop Heart Oil 1L",
        price: 140,
        originalPrice: 160,
        rating: 4.5,
        reviews: 600,
        imageUrl: "https://m.media-amazon.com/images/I/71Tqaw7PrbL.jpg",
        category: "Edible Oils",
        tags: ["Healthy Choice"],
        description: "Heart-healthy oil blend",
        stock: 4
      },
      {
        id: 12,
        name: "Dalda Vanaspati 1L",
        price: 120,
        originalPrice: 130,
        rating: 4.2,
        reviews: 500,
        imageUrl: "https://m.media-amazon.com/images/I/61r4eN1xP2L.jpg",
        category: "Vanaspati",
        tags: ["Cooking Essential"],
        description: "Vanaspati for traditional cooking",
        stock: 18
      },
      {
        id: 13,
        name: "GRB Ghee 1L",
        price: 545,
        originalPrice: 600,
        rating: 4.8,
        reviews: 890,
        imageUrl: "https://m.media-amazon.com/images/I/71FAmDZvZzL.jpg",
        category: "Ghee",
        tags: ["South Special"],
        description: "Popular South Indian ghee brand",
        stock: 25
      },
      {
        id: 14,
        name: "Sundrop Lite Oil 1L",
        price: 125,
        originalPrice: 140,
        rating: 4.3,
        reviews: 480,
        imageUrl: "https://m.media-amazon.com/images/I/81wTaYVxpDL.jpg",
        category: "Edible Oils",
        tags: ["Light"],
        description: "Light oil for everyday cooking",
        stock: 3
      },
      {
        id: 15,
        name: "Nestle Everyday Ghee 1L",
        price: 560,
        originalPrice: 620,
        rating: 4.7,
        reviews: 780,
        imageUrl: "https://m.media-amazon.com/images/I/71xGxZoLZHL.jpg",
        category: "Ghee",
        tags: ["Everyday Choice"],
        description: "Everyday use ghee from Nestle",
        stock: 14
      },
      // Additional products to reach 32 items
      {
        id: 16,
        name: "Figaro Olive Oil 1L",
        price: 450,
        originalPrice: 500,
        rating: 4.5,
        reviews: 620,
        imageUrl: "https://m.media-amazon.com/images/I/61p8wY5v3GL.jpg",
        category: "Edible Oils",
        tags: ["Imported"],
        description: "Extra virgin olive oil for healthy cooking",
        stock: 8
      },
      {
        id: 17,
        name: "Coconut Tree Virgin Coconut Oil 500ml",
        price: 280,
        originalPrice: 320,
        rating: 4.7,
        reviews: 890,
        imageUrl: "https://m.media-amazon.com/images/I/71p3p2v4bFL.jpg",
        category: "Edible Oils",
        tags: ["Cold Pressed"],
        description: "Cold pressed virgin coconut oil",
        stock: 12
      },
      {
        id: 18,
        name: "Prestige Cow Ghee 1L",
        price: 520,
        originalPrice: 570,
        rating: 4.4,
        reviews: 540,
        imageUrl: "https://m.media-amazon.com/images/I/71iQd1W5xmL.jpg",
        category: "Ghee",
        tags: ["Pure"],
        description: "Pure cow ghee for traditional recipes",
        stock: 7
      },
      {
        id: 19,
        name: "Liberty Refined Oil 1L",
        price: 115,
        originalPrice: 130,
        rating: 4.3,
        reviews: 430,
        imageUrl: "https://m.media-amazon.com/images/I/61V0S8Qz1+L.jpg",
        category: "Edible Oils",
        tags: ["Budget"],
        description: "Affordable refined oil for daily cooking",
        stock: 9
      },
      {
        id: 20,
        name: "Cococare Coconut Oil 1L",
        price: 310,
        originalPrice: 350,
        rating: 4.6,
        reviews: 720,
        imageUrl: "https://m.media-amazon.com/images/I/71zHk3NpVvL.jpg",
        category: "Edible Oils",
        tags: ["Organic"],
        description: "Organic coconut oil for cooking and hair care",
        stock: 15
      },
      {
        id: 21,
        name: "Aashirvaad Select Groundnut Oil 1L",
        price: 210,
        originalPrice: 240,
        rating: 4.5,
        reviews: 580,
        imageUrl: "https://m.media-amazon.com/images/I/61i1s0t3N5L.jpg",
        category: "Edible Oils",
        tags: ["Premium"],
        description: "Premium groundnut oil for authentic taste",
        stock: 10
      },
      {
        id: 22,
        name: "Gowardhan Ghee 500ml",
        price: 285,
        originalPrice: 320,
        rating: 4.7,
        reviews: 950,
        imageUrl: "https://m.media-amazon.com/images/I/71pN4vM2JzL.jpg",
        category: "Ghee",
        tags: ["Pure Desi"],
        description: "Pure desi ghee for traditional cooking",
        stock: 6
      },
      {
        id: 23,
        name: "Emami Healthy & Tasty Rice Bran Oil 1L",
        price: 170,
        originalPrice: 190,
        rating: 4.4,
        reviews: 480,
        imageUrl: "https://m.media-amazon.com/images/I/61b4wU9n7PL.jpg",
        category: "Edible Oils",
        tags: ["Heart Healthy"],
        description: "Rice bran oil for healthy cooking",
        stock: 11
      },
      {
        id: 24,
        name: "Patanjali Mustard Oil 1L",
        price: 140,
        originalPrice: 160,
        rating: 4.3,
        reviews: 670,
        imageUrl: "https://m.media-amazon.com/images/I/61c1RlLvO8L.jpg",
        category: "Edible Oils",
        tags: ["Kachi Ghani"],
        description: "Cold pressed mustard oil with authentic flavor",
        stock: 13
      },
      {
        id: 25,
        name: "Tirupati Vanaspati 1kg",
        price: 110,
        originalPrice: 125,
        rating: 4.1,
        reviews: 380,
        imageUrl: "https://m.media-amazon.com/images/I/61MZQxKjU-L.jpg",
        category: "Vanaspati",
        tags: ["Economical"],
        description: "Economical vanaspati for commercial use",
        stock: 20
      },
      {
        id: 26,
        name: "Rajdhani Cow Ghee 1L",
        price: 535,
        originalPrice: 590,
        rating: 4.5,
        reviews: 610,
        imageUrl: "https://m.media-amazon.com/images/I/71q5V5KQcDL.jpg",
        category: "Ghee",
        tags: ["Pure"],
        description: "Pure cow ghee with authentic taste",
        stock: 8
      },
      {
        id: 27,
        name: "Gold Winner Sunflower Oil 1L",
        price: 135,
        originalPrice: 150,
        rating: 4.4,
        reviews: 520,
        imageUrl: "https://m.media-amazon.com/images/I/61lw2BQqY1L.jpg",
        category: "Edible Oils",
        tags: ["Light"],
        description: "Light sunflower oil for everyday cooking",
        stock: 14
      },
      {
        id: 28,
        name: "P Mark Vanaspati 1kg",
        price: 115,
        originalPrice: 130,
        rating: 4.0,
        reviews: 320,
        imageUrl: "https://m.media-amazon.com/images/I/61C0R9H0TWL.jpg",
        category: "Vanaspati",
        tags: ["Popular"],
        description: "Popular vanaspati brand for baking and frying",
        stock: 16
      },
      {
        id: 29,
        name: "Postman Groundnut Oil 1L",
        price: 220,
        originalPrice: 250,
        rating: 4.6,
        reviews: 690,
        imageUrl: "https://m.media-amazon.com/images/I/61S0J+Z0F3L.jpg",
        category: "Edible Oils",
        tags: ["Cold Pressed"],
        description: "Cold pressed groundnut oil for authentic taste",
        stock: 9
      },
      {
        id: 30,
        name: "Double Horse Coconut Oil 1L",
        price: 290,
        originalPrice: 330,
        rating: 4.5,
        reviews: 570,
        imageUrl: "https://m.media-amazon.com/images/I/71Bz1wVv2jL.jpg",
        category: "Edible Oils",
        tags: ["Virgin"],
        description: "Virgin coconut oil for cooking and wellness",
        stock: 12
      },
      {
        id: 31,
        name: "Anand Milk Ghee 1L",
        price: 525,
        originalPrice: 580,
        rating: 4.4,
        reviews: 490,
        imageUrl: "https://m.media-amazon.com/images/I/71W6f3t6tSL.jpg",
        category: "Ghee",
        tags: ["Pure"],
        description: "Pure milk ghee for traditional recipes",
        stock: 7
      },
      {
        id: 32,
        name: "Idhayam Gingelly Oil 1L",
        price: 280,
        originalPrice: 320,
        rating: 4.7,
        reviews: 830,
        imageUrl: "https://m.media-amazon.com/images/I/71Q3B7F2j8L.jpg",
        category: "Edible Oils",
        tags: ["Sesame"],
        description: "Pure gingelly oil for South Indian cooking",
        stock: 11
      }
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
    } else {
      addToWishlist(item);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const categories = ["All", "Edible Oils", "Ghee", "Vanaspati"];

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
    setPriceRange([0, 1000]);
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
    <div className="p-4 md:p-8 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Premium Oils & Ghee</h1>
        <p className="text-amber-600">Finest quality oils and ghee for your kitchen</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Truck className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Fast Delivery</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Shield className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Trusted Brands</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Star className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Top Rated</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Filter className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Variety of Choices</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-amber-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search oils and ghee..."
            className="w-full border border-amber-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                  ? "bg-amber-500 text-white"
                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
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
            className="md:hidden flex items-center gap-1 px-3 py-2 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filters-section"
          >
            <Filter size={16} aria-hidden="true" />
            {showFilters ? <X size={16} aria-hidden="true" /> : "Filters"}
          </button>

          <select
            className={`border border-amber-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-amber-400 bg-white ${showFilters ? "flex" : "hidden md:flex"
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
          <h3 className="font-semibold text-amber-900">Advanced Filters</h3>
          <button
            className="text-amber-600 text-sm flex items-center"
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
                max="1000"
                step="50"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={1000}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={1000}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">1000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <div className="flex space-x-2">
              {[0, 2, 3, 4].map(rating => (
                <button
                  key={rating}
                  className={`px-3 py-1 rounded-full text-sm ${minRating === rating
                      ? "bg-amber-500 text-white"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
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
        <div className="text-sm text-amber-600">
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
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFE4C4/000000?text=Oil+Image";
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
                <span className="text-xl font-bold text-amber-700">
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
                <div className="mb-2 text-xs text-amber-600">
                  Only {item.stock} left in stock!
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cart buttons */}
              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-amber-300 rounded-full overflow-hidden bg-amber-50">
                    <button
                      onClick={() => !isOutOfStock && handleDecrement(item)}
                      className="p-2 text-amber-700 hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="p-2 text-amber-700 hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      ? "bg-amber-700 text-white hover:bg-amber-800 hover:shadow-lg"
                      : "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg hover:scale-105"
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
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default OilAndGhee;