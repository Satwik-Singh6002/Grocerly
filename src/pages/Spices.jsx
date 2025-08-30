import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Shield, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Spices = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 150]);
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

  // Products data with spices
  const products = useMemo(
    () => [
       {
        id: 1,
        name: "Everest Red Chilli Powder 200g",
        price: 65,
        originalPrice: 80,
        rating: 4.7,
        reviews: 1240,
        category: "Powders",
        tags: ["Bestseller"],
        description: "Premium quality red chilli powder for spicy dishes",
        stock: 15,
        imageUrl: "https://www.jiomart.com/images/product/original/490000128/everest-tikhalal-chilli-powder-200-g-product-images-o490000128-p490000128.jpg"
      },
      {
        id: 2,
        name: "Catch Turmeric Powder 100g",
        price: 30,
        originalPrice: 35,
        rating: 4.5,
        reviews: 890,
        category: "Powders",
        tags: ["Popular"],
        description: "Pure turmeric powder for cooking and health benefits",
        stock: 8,
        imageUrl: "https://m.media-amazon.com/images/I/71AK6ErhjhL.jpg"
      },
      {
        id: 3,
        name: "MDH Garam Masala 100g",
        price: 50,
        originalPrice: 60,
        rating: 4.8,
        reviews: 1520,
        category: "Masala Mix",
        tags: ["Top Rated"],
        description: "Authentic garam masala blend for Indian cuisine",
        stock: 12,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4iJplCfsEQSqVQnkMmAXR3TB1-BNkKVaVg&s"
      },
      {
        id: 4,
        name: "Everest Cumin Powder 100g",
        price: 55,
        originalPrice: 65,
        rating: 4.6,
        reviews: 930,
        category: "Powders",
        tags: ["New Arrival"],
        description: "Aromatic cumin powder for flavoring dishes",
        stock: 5,
        imageUrl: "https://m.media-amazon.com/images/I/81Y4dOt-V1L.jpg"
      },
      {
        id: 5,
        name: "Catch Coriander Powder 100g",
        price: 40,
        originalPrice: 48,
        rating: 4.4,
        reviews: 750,
        category: "Powders",
        tags: ["Value Pack"],
        description: "Fresh coriander powder for curries and marinades",
        stock: 10,
        imageUrl: "https://m.media-amazon.com/images/I/71Xj03FrWFL.jpg"
      },
      {
        id: 6,
        name: "MDH Kitchen King Masala 100g",
        price: 60,
        originalPrice: 72,
        rating: 4.7,
        reviews: 1320,
        category: "Masala Mix",
        tags: ["Chef's Choice"],
        description: "Special blend for enhancing flavor in vegetable dishes",
        stock: 20,
        imageUrl: "https://m.media-amazon.com/images/I/61sl3bcYjOL.jpg"
      },
      {
        id: 7,
        name: "Badshah Chole Masala 100g",
        price: 45,
        originalPrice: 52,
        rating: 4.5,
        reviews: 620,
        category: "Masala Mix",
        tags: ["Zesty"],
        description: "Perfect spice mix for chickpea curry",
        stock: 6,
        imageUrl: "https://m.media-amazon.com/images/I/718RQRdCmiL._UF1000,1000_QL80_.jpg"
      },
      {
        id: 8,
        name: "Everest Pav Bhaji Masala 100g",
        price: 52,
        originalPrice: 62,
        rating: 4.6,
        reviews: 1010,
        category: "Masala Mix",
        tags: ["Hot Pick"],
        description: "Special masala for making delicious pav bhaji",
        stock: 7,
        imageUrl: "https://m.media-amazon.com/images/I/716k7raMD2L._UF1000,1000_QL80_.jpg"
      },
      {
        id: 9,
        name: "MDH Rajmah Masala 100g",
        price: 47,
        originalPrice: 56,
        rating: 4.5,
        reviews: 860,
        category: "Masala Mix",
        tags: ["Rich Flavor"],
        description: "Perfect blend for kidney bean curry",
        stock: 9,
        imageUrl: "https://m.media-amazon.com/images/I/61sUPHRHVxL._UF894,1000_QL80_.jpg"
      },
      {
        id: 10,
        name: "Everest Black Pepper Powder 100g",
        price: 90,
        originalPrice: 110,
        rating: 4.8,
        reviews: 770,
        category: "Powders",
        tags: ["Premium"],
        description: "Freshly ground black pepper for enhanced flavor",
        stock: 11,
        imageUrl: "https://www.jiomart.com/images/product/original/491265885/everest-black-pepper-powder-100-g-product-images-o491265885-p491265885.jpg"
      },
      {
        id: 11,
        name: "Catch Hing (Asafoetida) 50g",
        price: 75,
        originalPrice: 90,
        rating: 4.7,
        reviews: 500,
        category: "Specialty",
        tags: ["Specialty"],
        description: "Pure asafoetida for tempering and digestion",
        stock: 4,
        imageUrl: "https://m.media-amazon.com/images/I/61Quq1Bu0NL.jpg"
      },
      {
        id: 12,
        name: "Everest Shahi Paneer Masala 100g",
        price: 62,
        originalPrice: 74,
        rating: 4.7,
        reviews: 680,
        category: "Masala Mix",
        tags: ["Royal"],
        description: "Rich blend for creamy paneer dishes",
        stock: 18,
        imageUrl: "https://m.media-amazon.com/images/I/71IL5X2tqXL._UF1000,1000_QL80_.jpg"
      },
      {
        id: 13,
        name: "MDH Sabzi Masala 100g",
        price: 48,
        originalPrice: 58,
        rating: 4.5,
        reviews: 890,
        category: "Masala Mix",
        tags: ["Everyday Use"],
        description: "All-purpose masala for vegetable dishes",
        stock: 25,
        imageUrl: "https://m.media-amazon.com/images/I/71rBq7j-vLL._UF1000,1000_QL80_.jpg"
      },
      {
        id: 14,
        name: "Catch Black Salt 100g",
        price: 25,
        originalPrice: 32,
        rating: 4.4,
        reviews: 510,
        category: "Specialty",
        tags: ["Essential"],
        description: "Kala namak for chaats and digestive benefits",
        stock: 3,
        imageUrl: "https://m.media-amazon.com/images/I/71JNa-ub8JL._UF1000,1000_QL80_.jpg"
      },
      {
        id: 15,
        name: "Everest Kasuri Methi 100g",
        price: 85,
        originalPrice: 100,
        rating: 4.6,
        reviews: 440,
        category: "Herbs",
        tags: ["Aromatic"],
        description: "Dried fenugreek leaves for flavoring dishes",
        stock: 14,
        imageUrl: "https://m.media-amazon.com/images/I/713Edmxsl1L._UF1000,1000_QL80_.jpg"
      },
      
      // New products (17 items)
      {
        id: 16,
        name: "Tata Sampann Chana Masala 100g",
        price: 58,
        originalPrice: 68,
        rating: 4.6,
        reviews: 720,
        category: "Masala Mix",
        tags: ["Organic"],
        description: "Organic chana masala mix for authentic flavor",
        stock: 12,
        imageUrl: "https://m.media-amazon.com/images/I/71U9xY1V3HL._SL1500_.jpg"
      },
      {
        id: 17,
        name: "Eastern Chicken Masala 100g",
        price: 65,
        originalPrice: 75,
        rating: 4.5,
        reviews: 610,
        category: "Masala Mix",
        tags: ["Non-Veg"],
        description: "Special blend for chicken dishes",
        stock: 8,
        imageUrl: "https://m.media-amazon.com/images/I/71v3W9qQnGL._SL1500_.jpg"
      },
      {
        id: 18,
        name: "Organic Tattva Cinnamon Sticks 50g",
        price: 95,
        originalPrice: 110,
        rating: 4.7,
        reviews: 430,
        category: "Whole Spices",
        tags: ["Organic", "Premium"],
        description: "Pure organic cinnamon sticks for authentic flavor",
        stock: 7,
        imageUrl: "https://m.media-amazon.com/images/I/71Wx3q6G3jL._SL1500_.jpg"
      },
      {
        id: 19,
        name: "Everest Biryani Masala 100g",
        price: 70,
        originalPrice: 85,
        rating: 4.8,
        reviews: 920,
        category: "Masala Mix",
        tags: ["Festive"],
        description: "Special blend for aromatic biryani preparation",
        stock: 10,
        imageUrl: "https://m.media-amazon.com/images/I/71tW3pU3mPL._SL1500_.jpg"
      },
      {
        id: 20,
        name: "Catch Fennel Seeds 100g",
        price: 45,
        originalPrice: 55,
        rating: 4.4,
        reviews: 380,
        category: "Whole Spices",
        tags: ["Digestive"],
        description: "Fennel seeds for cooking and digestive benefits",
        stock: 15,
        imageUrl: "https://m.media-amazon.com/images/I/71pM6-2S0LL._SL1500_.jpg"
      },
      {
        id: 21,
        name: "MDH Amchur Powder 100g",
        price: 50,
        originalPrice: 60,
        rating: 4.5,
        reviews: 520,
        category: "Powders",
        tags: ["Tangy"],
        description: "Dried mango powder for tangy flavor in dishes",
        stock: 9,
        imageUrl: "https://m.media-amazon.com/images/I/71Q0RlUj0CL._SL1500_.jpg"
      },
      {
        id: 22,
        name: "Badshah Meat Masala 100g",
        price: 68,
        originalPrice: 80,
        rating: 4.6,
        reviews: 670,
        category: "Masala Mix",
        tags: ["Non-Veg"],
        description: "Special blend for meat dishes",
        stock: 11,
        imageUrl: "https://m.media-amazon.com/images/I/71Qv2J1UaLL._SL1500_.jpg"
      },
      {
        id: 23,
        name: "Everest Sambhar Masala 100g",
        price: 55,
        originalPrice: 65,
        rating: 4.5,
        reviews: 780,
        category: "Masala Mix",
        tags: ["South Indian"],
        description: "Authentic sambhar masala for South Indian dishes",
        stock: 13,
        imageUrl: "https://m.media-amazon.com/images/I/71pNQx0kHAL._SL1500_.jpg"
      },
      {
        id: 24,
        name: "Catch Mustard Seeds 100g",
        price: 35,
        originalPrice: 42,
        rating: 4.3,
        reviews: 290,
        category: "Whole Spices",
        tags: ["Tempering"],
        description: "Mustard seeds for tempering and pickling",
        stock: 20,
        imageUrl: "https://m.media-amazon.com/images/I/71Fv5t7ZJXL._SL1500_.jpg"
      },
      {
        id: 25,
        name: "MDH Deggi Mirch 100g",
        price: 60,
        originalPrice: 70,
        rating: 4.6,
        reviews: 540,
        category: "Powders",
        tags: ["Mild Spice"],
        description: "Kashmiri red chilli powder for color and mild heat",
        stock: 8,
        imageUrl: "https://m.media-amazon.com/images/I/71uU2Gf7D0L._SL1500_.jpg"
      },
      {
        id: 26,
        name: "Organic Tattva Cardamom Green 50g",
        price: 120,
        originalPrice: 140,
        rating: 4.8,
        reviews: 390,
        category: "Whole Spices",
        tags: ["Organic", "Premium"],
        description: "Premium organic green cardamom for aromatic dishes",
        stock: 6,
        imageUrl: "https://m.media-amazon.com/images/I/71Q6N7wJ3vL._SL1500_.jpg"
      },
      {
        id: 27,
        name: "Everest Fish Curry Masala 100g",
        price: 62,
        originalPrice: 75,
        rating: 4.5,
        reviews: 460,
        category: "Masala Mix",
        tags: ["Non-Veg", "Coastal"],
        description: "Special blend for fish curries",
        stock: 7,
        imageUrl: "https://m.media-amazon.com/images/I/71Yw4RlO5vL._SL1500_.jpg"
      },
      {
        id: 28,
        name: "Catch Dry Ginger Powder 100g",
        price: 55,
        originalPrice: 65,
        rating: 4.4,
        reviews: 320,
        category: "Powders",
        tags: ["Ayurvedic"],
        description: "Dry ginger powder for cooking and health benefits",
        stock: 10,
        imageUrl: "https://m.media-amazon.com/images/I/71D8Hn4qZaL._SL1500_.jpg"
      },
      {
        id: 29,
        name: "MDH Chaat Masala 100g",
        price: 48,
        originalPrice: 58,
        rating: 4.7,
        reviews: 890,
        category: "Masala Mix",
        tags: ["Street Food"],
        description: "Tangy masala for chaats and snacks",
        stock: 16,
        imageUrl: "https://m.media-amazon.com/images/I/71pZ9J6tWXL._SL1500_.jpg"
      },
      {
        id: 30,
        name: "Organic Tattva Cloves 50g",
        price: 85,
        originalPrice: 100,
        rating: 4.6,
        reviews: 280,
        category: "Whole Spices",
        tags: ["Organic", "Aromatic"],
        description: "Organic cloves for flavor and aroma",
        stock: 9,
        imageUrl: "https://m.media-amazon.com/images/I/71j7D2Tb2LL._SL1500_.jpg"
      },
      {
        id: 31,
        name: "Everest Pizza Pasta Masala 100g",
        price: 72,
        originalPrice: 85,
        rating: 4.4,
        reviews: 510,
        category: "Masala Mix",
        tags: ["Italian"],
        description: "Special blend for pizza and pasta dishes",
        stock: 14,
        imageUrl: "https://m.media-amazon.com/images/I/71hZvzZ0HLL._SL1500_.jpg"
      },
      {
        id: 32,
        name: "Catch Bay Leaves 20g",
        price: 25,
        originalPrice: 30,
        rating: 4.3,
        reviews: 190,
        category: "Herbs",
        tags: ["Aromatic"],
        description: "Fragrant bay leaves for biryani and curries",
        stock: 22,
        imageUrl: "https://m.media-amazon.com/images/I/71jQJ0YQZoL._SL1500_.jpg"
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

  const categories = ["All", "Powders", "Masala Mix", "Specialty", "Herbs"];

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
    setPriceRange([0, 150]);
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
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Premium Spices Collection</h1>
        <p className="text-amber-600">Flavorful & authentic spices handpicked for your kitchen</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Truck className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Fast Delivery</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Shield className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Authentic Quality</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Star className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">4.7/5 Rated</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Filter className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Variety of Masalas</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-amber-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search spices..."
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
                max="150"
                step="10"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={150}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="150"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={150}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">150</span>
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFE4C4/000000?text=Spice+Image";
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

export default Spices;