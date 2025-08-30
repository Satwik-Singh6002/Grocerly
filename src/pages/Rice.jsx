import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield, Leaf } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Rice = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2500]);
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

  // Products data
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "India Gate Basmati Rice 1kg",
        price: 125,
        originalPrice: 140,
        rating: 4.6,
        reviews: 1240,
        imageUrl: "https://m.media-amazon.com/images/I/81mHz4XKK0L.jpg",
        category: "Basmati",
        tags: ["Basmati"],
        description: "Premium long grain basmati rice with exquisite aroma",
        stock: 15
      },
      {
        id: 2,
        name: "Daawat Rozana Super 5kg",
        price: 420,
        originalPrice: 460,
        rating: 4.5,
        reviews: 980,
        category: "Everyday Rice",
        tags: ["Long Grain"],
        description: "Perfect for daily meals with good nutritional value",
        stock: 8
      },
      {
        id: 3,
        name: "Fortune Everyday Biryani Rice 1kg",
        price: 99,
        originalPrice: 115,
        rating: 4.4,
        reviews: 760,
        category: "Biryani",
        tags: ["Biryani"],
        description: "Specially selected grains for perfect biryani preparation",
        stock: 12
      },
      {
        id: 4,
        name: "Kohinoor Basmati Rice 1kg",
        price: 135,
        originalPrice: 150,
        rating: 4.7,
        reviews: 860,
        category: "Basmati",
        tags: ["Fragrant"],
        description: "Aromatic basmati rice with long grains and rich flavor",
        stock: 5
      },
      {
        id: 5,
        name: "Lal Qilla Traditional Basmati Rice 1kg",
        price: 145,
        originalPrice: 160,
        rating: 4.8,
        reviews: 1050,
        category: "Basmati",
        tags: ["Premium"],
        description: "Traditional basmati rice with authentic taste and aroma",
        stock: 10
      },
      {
        id: 6,
        name: "Aeroplane Jeerakasala Rice 1kg",
        price: 160,
        originalPrice: 180,
        rating: 4.6,
        reviews: 690,
        category: "Regional Rice",
        tags: ["South Indian"],
        description: "Authentic Jeerakasala rice from Kerala for traditional dishes",
        stock: 20
      },
      {
        id: 7,
        name: "Golden Harvest Everyday Rice 5kg",
        price: 315,
        originalPrice: 340,
        rating: 4.3,
        reviews: 510,
        category: "Everyday Rice",
        tags: ["Budget"],
        description: "Economical rice option for daily consumption",
        stock: 6
      },
      {
        id: 8,
        name: "Organic Tattva Brown Rice 1kg",
        price: 110,
        originalPrice: 125,
        rating: 4.5,
        reviews: 450,
        category: "Organic Rice",
        tags: ["Healthy"],
        description: "Organic brown rice with high nutritional value",
        stock: 7
      },
      {
        id: 9,
        name: "Tilda Basmati Rice 1kg",
        price: 220,
        originalPrice: 240,
        rating: 4.8,
        reviews: 1340,
        category: "Basmati",
        tags: ["Export Quality"],
        description: "World-renowned basmati rice with exceptional quality",
        stock: 9
      },
      {
        id: 10,
        name: "Daawat Brown Basmati Rice 1kg",
        price: 130,
        originalPrice: 145,
        rating: 4.6,
        reviews: 540,
        category: "Organic Rice",
        tags: ["Whole Grain"],
        description: "Healthy brown basmati rice with nutty flavor",
        stock: 11
      },
      {
        id: 11,
        name: "India Gate Feast Rozzana 5kg",
        price: 370,
        originalPrice: 410,
        rating: 4.5,
        reviews: 920,
        category: "Everyday Rice",
        tags: ["Value Pack"],
        description: "Value pack of everyday rice for families",
        stock: 4
      },
      {
        id: 12,
        name: "Double Diamond HMT Kolam Rice 10kg",
        price: 550,
        originalPrice: 600,
        rating: 4.3,
        reviews: 620,
        category: "Everyday Rice",
        tags: ["Bulk Buy"],
        description: "Economical bulk purchase option for large families",
        stock: 18
      },
      {
        id: 13,
        name: "Mysore Mallige Sona Masoori Rice 5kg",
        price: 280,
        originalPrice: 310,
        rating: 4.6,
        reviews: 700,
        category: "Regional Rice",
        tags: ["South Special"],
        description: "Popular Sona Masoori rice from South India",
        stock: 25
      },
      {
        id: 14,
        name: "Daawat Devaaya Basmati 5kg",
        price: 480,
        originalPrice: 530,
        rating: 4.7,
        reviews: 870,
        category: "Basmati",
        tags: ["Fragrant"],
        description: "Premium basmati rice with divine aroma and taste",
        stock: 3
      },
      {
        id: 15,
        name: "Organic India Red Rice 1kg",
        price: 140,
        originalPrice: 160,
        rating: 4.5,
        reviews: 430,
        category: "Organic Rice",
        tags: ["Organic"],
        description: "Nutritious organic red rice with earthy flavor",
        stock: 14
      },
      {
        id: 16,
        name: "Organic Ponni Raw Rice 5kg",
        price: 360,
        originalPrice: 399,
        rating: 4.6,
        reviews: 510,
        category: "Organic Rice",
        tags: ["Organic"],
        description: "Organic Ponni rice popular in South Indian cuisine",
        stock: 8
      },
      // New products added below
      {
        id: 17,
        name: "Royal Basmati Rice 5kg",
        price: 650,
        originalPrice: 720,
        rating: 4.7,
        reviews: 890,
        category: "Basmati",
        tags: ["Premium"],
        description: "Royal quality basmati rice with extra long grains",
        stock: 6
      },
      {
        id: 18,
        name: "Sona Masoori Rice 10kg",
        price: 580,
        originalPrice: 640,
        rating: 4.4,
        reviews: 670,
        category: "Everyday Rice",
        tags: ["South Indian"],
        description: "Popular everyday rice from South India",
        stock: 12
      },
      {
        id: 19,
        name: "Brown Rice Organic 2kg",
        price: 220,
        originalPrice: 250,
        rating: 4.5,
        reviews: 340,
        category: "Organic Rice",
        tags: ["Healthy"],
        description: "Nutritious organic brown rice",
        stock: 9
      },
      {
        id: 20,
        name: "Jeera Rice Premium 1kg",
        price: 180,
        originalPrice: 200,
        rating: 4.3,
        reviews: 210,
        category: "Regional Rice",
        tags: ["Fragrant"],
        description: "Aromatic jeera rice with cumin flavor",
        stock: 15
      },
      {
        id: 21,
        name: "Golden Sella Basmati Rice 5kg",
        price: 750,
        originalPrice: 850,
        rating: 4.8,
        reviews: 950,
        category: "Basmati",
        tags: ["Premium"],
        description: "Golden sella basmati rice with rich flavor",
        stock: 7
      },
      {
        id: 22,
        name: "Red Rice Kerala Special 2kg",
        price: 190,
        originalPrice: 220,
        rating: 4.4,
        reviews: 380,
        category: "Regional Rice",
        tags: ["Healthy"],
        description: "Traditional Kerala red rice with high nutrition",
        stock: 10
      },
      {
        id: 23,
        name: "Jasmine Rice Fragrant 1kg",
        price: 150,
        originalPrice: 170,
        rating: 4.2,
        reviews: 290,
        category: "Regional Rice",
        tags: ["Fragrant"],
        description: "Aromatic jasmine rice from Thailand",
        stock: 8
      },
      {
        id: 24,
        name: "Black Rice Organic 1kg",
        price: 320,
        originalPrice: 350,
        rating: 4.6,
        reviews: 420,
        category: "Organic Rice",
        tags: ["Exotic"],
        description: "Nutrient-rich black rice with antioxidants",
        stock: 5
      },
      {
        id: 25,
        name: "Basmati Rice Family Pack 10kg",
        price: 1200,
        originalPrice: 1350,
        rating: 4.7,
        reviews: 1100,
        category: "Basmati",
        tags: ["Bulk Buy"],
        description: "Economical family pack of premium basmati rice",
        stock: 4
      },
      {
        id: 26,
        name: "Steam Rice Parboiled 5kg",
        price: 280,
        originalPrice: 310,
        rating: 4.3,
        reviews: 530,
        category: "Everyday Rice",
        tags: ["Healthy"],
        description: "Parboiled steam rice with extra nutrients",
        stock: 14
      },
      {
        id: 27,
        name: "Arborio Rice Italian 1kg",
        price: 450,
        originalPrice: 500,
        rating: 4.5,
        reviews: 270,
        category: "Regional Rice",
        tags: ["Exotic"],
        description: "Italian arborio rice for creamy risotto",
        stock: 6
      },
      {
        id: 28,
        name: "Wild Rice Blend 500g",
        price: 380,
        originalPrice: 420,
        rating: 4.6,
        reviews: 190,
        category: "Organic Rice",
        tags: ["Exotic"],
        description: "Premium wild rice blend with nuts and grains",
        stock: 3
      },
      {
        id: 29,
        name: "Brown Basmati Rice 2kg",
        price: 260,
        originalPrice: 290,
        rating: 4.4,
        reviews: 310,
        category: "Organic Rice",
        tags: ["Healthy"],
        description: "Healthy brown basmati rice with fiber",
        stock: 11
      },
      {
        id: 30,
        name: "Rosematta Rice Kerala 2kg",
        price: 170,
        originalPrice: 190,
        rating: 4.3,
        reviews: 240,
        category: "Regional Rice",
        tags: ["Traditional"],
        description: "Traditional Kerala rosematta rice with red bran",
        stock: 9
      },
      {
        id: 31,
        name: "Basmati Rice Gold 5kg",
        price: 850,
        originalPrice: 950,
        rating: 4.9,
        reviews: 1250,
        category: "Basmati",
        tags: ["Premium"],
        description: "Gold quality basmati rice with longest grains",
        stock: 2
      },
      {
        id: 32,
        name: "Sushi Rice Japanese 2kg",
        price: 420,
        originalPrice: 470,
        rating: 4.5,
        reviews: 330,
        category: "Regional Rice",
        tags: ["Exotic"],
        description: "Authentic Japanese sushi rice with sticky texture",
        stock: 7
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
      showToast(`${item.name} removed from wishlist`, "info");
    } else {
      addToWishlist(item);
      showToast(`${item.name} added to wishlist!`, "success");
    }
  }, [wishlist, addToWishlist, removeFromWishlist, showToast]);

  const categories = ["All", "Basmati", "Everyday Rice", "Biryani", "Regional Rice", "Organic Rice"];

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
    setPriceRange([0, 2500]);
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
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Premium Rice Collection</h1>
        <p className="text-amber-600">Finest quality rice for your kitchen</p>
      </div>
      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
          <Truck className="text-amber-600 mb-2" size={24} />
          <h3 className="font-medium text-amber-900 text-sm">Free Delivery</h3>
        </div>
        <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
          <Shield className="text-amber-600 mb-2" size={24} />
          <h3 className="font-medium text-amber-900 text-sm">Quality Guarantee</h3>
        </div>
        <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
          <Star className="text-amber-600 mb-2" size={24} />
          <h3 className="font-medium text-amber-900 text-sm">4.8/5 Rating</h3>
        </div>
        <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
          <Leaf className="text-amber-600 mb-2" size={24} />
          <h3 className="font-medium text-amber-900 text-sm">Organic Options</h3>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-amber-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search rice..."
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
                max="2500"
                step="100"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={2500}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="2500"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={2500}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">2500</span>
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFE4C4/000000?text=Rice+Image";
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

export default Rice;