import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield, Leaf } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Beverages = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
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
      name: 'Coca-Cola Soft Drink 2L', 
      price: 99, 
      originalPrice: 120,
      imageUrl: 'https://m.media-amazon.com/images/I/61K5e7wvMbL._SX522_.jpg', 
      tags: ['Bestseller'],
      rating: 4.5,
      reviews: 1245,
      category: "Soft Drinks",
      description: "Refreshing carbonated soft drink",
      stock: 20
    },
    {
      id: 2, 
      name: 'Pepsi Zero Sugar 2L', 
      price: 95, 
      originalPrice: 110,
      imageUrl: 'https://m.media-amazon.com/images/I/61-7hVWvXtL.jpg', 
      tags: ['Sugar Free'],
      rating: 4.3,
      reviews: 876,
      category: "Soft Drinks",
      description: "Zero sugar carbonated drink",
      stock: 15
    },
    {
      id: 3, 
      name: 'Red Bull Energy Drink 250ml', 
      price: 115, 
      originalPrice: 130,
      imageUrl: 'https://m.media-amazon.com/images/I/61Y2tMh-1+L._SX522_.jpg', 
      tags: ['Energy Boost'],
      rating: 4.6,
      reviews: 943,
      category: "Energy Drinks",
      description: "Energy drink for mental and physical stimulation",
      stock: 12
    },
    {
      id: 4, 
      name: 'Tropicana Orange Juice 1L', 
      price: 180, 
      originalPrice: 200,
      imageUrl: 'https://m.media-amazon.com/images/I/71C+7gSq5jL._SX522_.jpg', 
      tags: ['100% Juice'],
      rating: 4.7,
      reviews: 567,
      category: "Juices",
      description: "Pure orange juice with no added sugar",
      stock: 8
    },
    {
      id: 5, 
      name: 'Starbucks Cold Coffee 250ml', 
      price: 150, 
      originalPrice: 175,
      imageUrl: 'https://m.media-amazon.com/images/I/71Mhqo2vS5L._SX522_.jpg', 
      tags: ['Iced Coffee'],
      rating: 4.2,
      reviews: 432,
      category: "Coffee",
      description: "Ready-to-drink cold coffee beverage",
      stock: 10
    },
    {
      id: 6, 
      name: 'Lipton Green Tea 25 Bags', 
      price: 120, 
      originalPrice: 140,
      imageUrl: 'https://m.media-amazon.com/images/I/81+0UjFg5+L._SX522_.jpg', 
      tags: ['Antioxidants'],
      rating: 4.4,
      reviews: 689,
      category: "Tea",
      description: "Green tea bags with antioxidants",
      stock: 25
    },
    {
      id: 7, 
      name: 'B Natural Apple Juice 1L', 
      price: 135, 
      originalPrice: 155,
      imageUrl: 'https://m.media-amazon.com/images/I/71B1nWZ3Q+L._SX522_.jpg', 
      tags: ['No Added Sugar'],
      rating: 4.8,
      reviews: 321,
      category: "Juices",
      description: "Pure apple juice with no added preservatives",
      stock: 7
    },
    {
      id: 8, 
      name: 'Monster Energy Drink 500ml', 
      price: 160, 
      originalPrice: 185,
      imageUrl: 'https://m.media-amazon.com/images/I/61XwZ7CWPAL._SX522_.jpg', 
      tags: ['Extra Strength'],
      rating: 4.1,
      reviews: 234,
      category: "Energy Drinks",
      description: "High-caffeine energy drink",
      stock: 14
    },
    {
      id: 9, 
      name: 'Bru Instant Coffee 100g', 
      price: 230, 
      originalPrice: 250,
      imageUrl: 'https://m.media-amazon.com/images/I/61sG9t+8V+L._SX522_.jpg', 
      tags: ['Aromatic'],
      rating: 4.0,
      reviews: 456,
      category: "Coffee",
      description: "Instant coffee powder",
      stock: 18
    },
    {
      id: 10, 
      name: 'Organic India Tulsi Tea 25 Bags', 
      price: 110, 
      originalPrice: 130,
      imageUrl: 'https://m.media-amazon.com/images/I/81vK1W0XJYL._SX522_.jpg', 
      tags: ['Organic'],
      rating: 4.6,
      reviews: 278,
      category: "Tea",
      description: "Organic tulsi tea bags",
      stock: 6
    },
    {
      id: 11, 
      name: 'Sprite Lemon Lime 2L', 
      price: 90, 
      originalPrice: 105,
      imageUrl: 'https://m.media-amazon.com/images/I/61QZcjU+3DL._SX522_.jpg', 
      tags: ['Lemon Fresh'],
      rating: 4.5,
      reviews: 765,
      category: "Soft Drinks",
      description: "Lemon-lime flavored soft drink",
      stock: 22
    },
    {
      id: 12, 
      name: 'Real Fruit Power Juice 1L', 
      price: 180, 
      originalPrice: 210,
      imageUrl: 'https://m.media-amazon.com/images/I/71wXK4W3z+L._SX522_.jpg', 
      tags: ['Mixed Fruit'],
      rating: 4.7,
      reviews: 432,
      category: "Juices",
      description: "Mixed fruit juice blend",
      stock: 9
    },
    // New products start here
    {
      id: 13, 
      name: 'Mountain Dew Citrus Soda 2L', 
      price: 85, 
      originalPrice: 100,
      imageUrl: 'https://m.media-amazon.com/images/I/61v7d8Q2HWL._SX522_.jpg', 
      tags: ['Citrus Blast'],
      rating: 4.3,
      reviews: 654,
      category: "Soft Drinks",
      description: "Citrus-flavored carbonated soft drink",
      stock: 18
    },
    {
      id: 14, 
      name: 'Gatorade Sports Drink 1L', 
      price: 125, 
      originalPrice: 145,
      imageUrl: 'https://m.media-amazon.com/images/I/61+2D3uF3HL._SX522_.jpg', 
      tags: ['Electrolytes'],
      rating: 4.4,
      reviews: 789,
      category: "Energy Drinks",
      description: "Sports drink with electrolytes",
      stock: 11
    },
    {
      id: 15, 
      name: 'Minute Maid Pulpy Orange 1L', 
      price: 140, 
      originalPrice: 160,
      imageUrl: 'https://m.media-amazon.com/images/I/71y1J+UzZ8L._SX522_.jpg', 
      tags: ['With Pulp'],
      rating: 4.6,
      reviews: 543,
      category: "Juices",
      description: "Orange juice with real pulp",
      stock: 13
    },
    {
      id: 16, 
      name: 'Nescafé Classic Coffee 200g', 
      price: 280, 
      originalPrice: 320,
      imageUrl: 'https://m.media-amazon.com/images/I/71I7e2g2TxL._SX522_.jpg', 
      tags: ['Rich Blend'],
      rating: 4.2,
      reviews: 876,
      category: "Coffee",
      description: "Classic instant coffee",
      stock: 16
    },
    {
      id: 17, 
      name: 'Tetley Green Tea 50 Bags', 
      price: 150, 
      originalPrice: 180,
      imageUrl: 'https://m.media-amazon.com/images/I/81z12NQqM9L._SX522_.jpg', 
      tags: ['Antioxidants'],
      rating: 4.5,
      reviews: 432,
      category: "Tea",
      description: "Premium green tea bags",
      stock: 20
    },
    {
      id: 18, 
      name: 'Fanta Orange 2L', 
      price: 95, 
      originalPrice: 110,
      imageUrl: 'https://m.media-amazon.com/images/I/61nG9F+kmTL._SX522_.jpg', 
      tags: ['Orange'],
      rating: 4.4,
      reviews: 567,
      category: "Soft Drinks",
      description: "Sparkling orange flavored drink",
      stock: 17
    },
    {
      id: 19, 
      name: '5-Hour Energy Berry 60ml', 
      price: 200, 
      originalPrice: 230,
      imageUrl: 'https://m.media-amazon.com/images/I/61R8W3E3JGL._SX522_.jpg', 
      tags: ['Quick Energy'],
      rating: 3.9,
      reviews: 321,
      category: "Energy Drinks",
      description: "Berry flavored energy shot",
      stock: 8
    },
    {
      id: 20, 
      name: 'Real Cranberry Juice 1L', 
      price: 220, 
      originalPrice: 250,
      imageUrl: 'https://m.media-amazon.com/images/I/71Qx5xVvHkL._SX522_.jpg', 
      tags: ['Tart'],
      rating: 4.3,
      reviews: 234,
      category: "Juices",
      description: "100% pure cranberry juice",
      stock: 6
    },
    {
      id: 21, 
      name: 'Blue Tokai Coffee Beans 250g', 
      price: 450, 
      originalPrice: 500,
      imageUrl: 'https://m.media-amazon.com/images/I/71q3O5P3N6L._SX522_.jpg', 
      tags: ['Premium'],
      rating: 4.8,
      reviews: 189,
      category: "Coffee",
      description: "Artisanal coffee beans",
      stock: 9
    },
    {
      id: 22, 
      name: 'Twinings English Breakfast Tea 25 Bags', 
      price: 180, 
      originalPrice: 210,
      imageUrl: 'https://m.media-amazon.com/images/I/81kG+0UY3kL._SX522_.jpg', 
      tags: ['Classic'],
      rating: 4.7,
      reviews: 456,
      category: "Tea",
      description: "Traditional English breakfast tea",
      stock: 14
    },
    {
      id: 23, 
      name: '7UP Lemon Lime 2L', 
      price: 90, 
      originalPrice: 105,
      imageUrl: 'https://m.media-amazon.com/images/I/61tWXw9l5HL._SX522_.jpg', 
      tags: ['Clear'],
      rating: 4.2,
      reviews: 345,
      category: "Soft Drinks",
      description: "Clear lemon-lime carbonated drink",
      stock: 19
    },
    {
      id: 24, 
      name: 'Rockstar Energy Drink 473ml', 
      price: 140, 
      originalPrice: 165,
      imageUrl: 'https://m.media-amazon.com/images/I/61r0fO4LJ+L._SX522_.jpg', 
      tags: ['Extra Large'],
      rating: 4.0,
      reviews: 278,
      category: "Energy Drinks",
      description: "Large size energy drink",
      stock: 10
    },
    {
      id: 25, 
      name: 'Dabur Real Mixed Fruit Juice 1L', 
      price: 160, 
      originalPrice: 185,
      imageUrl: 'https://m.media-amazon.com/images/I/71Yp8J8Uy3L._SX522_.jpg', 
      tags: ['Mixed Fruit'],
      rating: 4.5,
      reviews: 432,
      category: "Juices",
      description: "Blend of multiple fruit juices",
      stock: 11
    },
    {
      id: 26, 
      name: 'Sleepy Owl Cold Brew Pack', 
      price: 320, 
      originalPrice: 370,
      imageUrl: 'https://m.media-amazon.com/images/I/71hZ2F1Hr+L._SX522_.jpg', 
      tags: ['Cold Brew'],
      rating: 4.6,
      reviews: 156,
      category: "Coffee",
      description: "Ready-to-drink cold brew coffee",
      stock: 7
    },
    {
      id: 27, 
      name: 'Teavana Peach Tranquility Tea 15 Bags', 
      price: 250, 
      originalPrice: 290,
      imageUrl: 'https://m.media-amazon.com/images/I/81O8N+4GZJL._SX522_.jpg', 
      tags: ['Peach'],
      rating: 4.7,
      reviews: 198,
      category: "Tea",
      description: "Peach flavored herbal tea",
      stock: 5
    },
    {
      id: 28, 
      name: 'Thums Up Strong Cola 750ml', 
      price: 60, 
      originalPrice: 75,
      imageUrl: 'https://m.media-amazon.com/images/I/61f9KXQ2Y6L._SX522_.jpg', 
      tags: ['Strong'],
      rating: 4.4,
      reviews: 876,
      category: "Soft Drinks",
      description: "Strong cola with intense flavor",
      stock: 24
    },
    {
      id: 29, 
      name: 'Guayaki Yerba Mate 450ml', 
      price: 180, 
      originalPrice: 210,
      imageUrl: 'https://m.media-amazon.com/images/I/61W8V6Kv3lL._SX522_.jpg', 
      tags: ['Natural'],
      rating: 4.3,
      reviews: 143,
      category: "Energy Drinks",
      description: "Natural energy drink with yerba mate",
      stock: 8
    },
    {
      id: 30, 
      name: 'Innocent Smoothie 350ml', 
      price: 200, 
      originalPrice: 230,
      imageUrl: 'https://m.media-amazon.com/images/I/71+1YqXhDaL._SX522_.jpg', 
      tags: ['Smoothie'],
      rating: 4.8,
      reviews: 267,
      category: "Juices",
      description: "Fruit smoothie with no added sugar",
      stock: 9
    },
    {
      id: 31, 
      name: 'Davidoff Rich Aroma Coffee 200g', 
      price: 550, 
      originalPrice: 650,
      imageUrl: 'https://m.media-amazon.com/images/I/71S3g-5Lh3L._SX522_.jpg', 
      tags: ['Luxury'],
      rating: 4.9,
      reviews: 89,
      category: "Coffee",
      description: "Premium rich aroma coffee",
      stock: 4
    },
    {
      id: 32, 
      name: 'Harney & Sons Chamomile Tea 20 Bags', 
      price: 320, 
      originalPrice: 380,
      imageUrl: 'https://m.media-amazon.com/images/I/81YrRfRz0xL._SX522_.jpg', 
      tags: ['Herbal'],
      rating: 4.7,
      reviews: 134,
      category: "Tea",
      description: "Soothing chamomile herbal tea",
      stock: 6
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

  const categories = ["All", "Soft Drinks", "Energy Drinks", "Juices", "Coffee", "Tea"];

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
    setPriceRange([0, 500]);
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
    <div className="p-4 md:p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Refreshing Beverages</h1>
        <p className="text-blue-600">Quench your thirst with our premium selection of beverages</p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
    <Truck className="text-blue-600 mb-2" size={24} />
    <h3 className="font-medium text-blue-900 text-sm">Free Delivery</h3>
  </div>
  <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
    <Shield className="text-blue-600 mb-2" size={24} />
    <h3 className="font-medium text-blue-900 text-sm">Quality Guarantee</h3>
  </div>
  <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
    <Star className="text-blue-600 mb-2" size={24} />
    <h3 className="font-medium text-blue-900 text-sm">4.8/5 Rating</h3>
  </div>
  <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
    <Leaf className="text-blue-600 mb-2" size={24} />
    <h3 className="font-medium text-blue-900 text-sm">Organic Options</h3>
  </div>
</div>


      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-blue-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search beverages..."
            className="w-full border border-blue-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
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
            className="md:hidden flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filters-section"
          >
            <Filter size={16} aria-hidden="true" />
            {showFilters ? <X size={16} aria-hidden="true" /> : "Filters"}
          </button>

          <select
            className={`border border-blue-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white ${showFilters ? "flex" : "hidden md:flex"
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
          <h3 className="font-semibold text-blue-900">Advanced Filters</h3>
          <button
            className="text-blue-600 text-sm flex items-center"
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
              <span className="text-xs text-gray-600">0</span>
              <input
                type="range"
                min="0"
                max="600"
                step="25"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={600}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="600"
                step="25"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={600}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-600">600</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <div className="flex space-x-2">
              {[0, 2, 3, 4].map(rating => (
                <button
                  key={rating}
                  className={`px-3 py-1 rounded-full text-sm ${minRating === rating
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
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
        <div className="text-sm text-blue-600">
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
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/ADD8E6/000000?text=Beverage+Image";
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
                <span className="text-xl font-bold text-blue-700">
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
                <div className="mb-2 text-xs text-blue-600">
                  Only {item.stock} left in stock!
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cart buttons */}
              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-blue-300 rounded-full overflow-hidden bg-blue-50">
                    <button
                      onClick={() => !isOutOfStock && handleDecrement(item)}
                      className="p-2 text-blue-700 hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="p-2 text-blue-700 hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      ? "bg-blue-700 text-white hover:bg-blue-800 hover:shadow-lg"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105"
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Beverages;