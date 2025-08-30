import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Fruit = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
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

  // Products data - 32 fruit products
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Fresh Apples (1kg)",
        price: 180,
        originalPrice: 200,
        rating: 4.7,
        reviews: 1240,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuNjANsr--1acwUzfK8cT2DFXibiktnzlyw&s",
        category: "Staple Fruits",
        organic: true,
        discount: 10,
        tags: ["Bestseller", "Organic"],
        description: "Crispy and sweet fresh apples, perfect for snacking",
        stock: 25
      },
      {
        id: 2,
        name: "Bananas (Dozen)",
        price: 60,
        originalPrice: 70,
        rating: 4.5,
        reviews: 1120,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ZmGkn6WbrNqrTGlyK0zv0F2p4c6R6_-Icg&s",
        category: "Staple Fruits",
        organic: false,
        discount: 14,
        tags: ["Daily Use", "Energy Boost"],
        description: "Fresh and nutritious bananas, great for breakfast",
        stock: 30
      },
      {
        id: 3,
        name: "Seedless Grapes (500g)",
        price: 90,
        originalPrice: 105,
        rating: 4.6,
        reviews: 800,
        imageUrl: "https://m.media-amazon.com/images/I/71xGBrNnv2L.jpg",
        category: "Seasonal",
        organic: false,
        discount: 14,
        tags: ["Sweet Pick", "Juicy"],
        description: "Sweet and juicy seedless grapes, perfect for snacking",
        stock: 15
      },
      {
        id: 4,
        name: "Kiwis Imported (3 pcs)",
        price: 120,
        originalPrice: 140,
        rating: 4.7,
        reviews: 620,
        imageUrl: "https://www.jiomart.com/images/product/original/590009674/kiwi-imported-3-pcs-pack.jpg",
        category: "Exotic",
        organic: true,
        discount: 14,
        tags: ["Exotic", "Vitamin C"],
        description: "Tangy and sweet imported kiwis, rich in vitamin C",
        stock: 12
      },
      {
        id: 5,
        name: "Fresh Papaya (Medium)",
        price: 75,
        originalPrice: 90,
        rating: 4.4,
        reviews: 440,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTda2i4bz29qWYeRC6pBCi5xDz3EcHtsVR3LA&s",
        category: "Tropical",
        organic: false,
        discount: 17,
        tags: ["Immunity Boost", "Digestive Health"],
        description: "Ripe and sweet papaya, great for digestion",
        stock: 18
      },
      {
        id: 6,
        name: "Fresh Mangoes (1kg)",
        price: 140,
        originalPrice: 160,
        rating: 4.8,
        reviews: 980,
        imageUrl: "https://m.media-amazon.com/images/I/31cXlUcvRVL._UF894,1000_QL80_.jpg",
        category: "Seasonal",
        organic: false,
        discount: 12,
        tags: ["Seasonal", "King of Fruits"],
        description: "Sweet and juicy mangoes, the king of fruits",
        stock: 22
      },
      {
        id: 7,
        name: "Oranges Imported (1kg)",
        price: 110,
        originalPrice: 125,
        rating: 4.6,
        reviews: 720,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAV8YmdiUIR1WMsH9GSK5QE_ZRXC55NG6ifQ&s",
        category: "Citrus",
        organic: true,
        discount: 12,
        tags: ["Vitamin C", "Immune Boost"],
        description: "Juicy imported oranges, packed with vitamin C",
        stock: 20
      },
      {
        id: 8,
        name: "Pomegranate (500g)",
        price: 95,
        originalPrice: 110,
        rating: 4.7,
        reviews: 540,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8E59K88g7bJk3jNIIbdnNWOLihPjARBH9OA&s",
        category: "Staple Fruits",
        organic: false,
        discount: 14,
        tags: ["Rich in Iron", "Antioxidants"],
        description: "Ruby red pomegranates, rich in antioxidants",
        stock: 16
      },
      {
        id: 9,
        name: "Strawberries (200g)",
        price: 85,
        originalPrice: 99,
        rating: 4.6,
        reviews: 660,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/10000263_15-fresho-strawberry.jpg",
        category: "Berries",
        organic: true,
        discount: 14,
        tags: ["Fresh Pick", "Antioxidants"],
        description: "Sweet and juicy strawberries, perfect for desserts",
        stock: 14
      },
      {
        id: 10,
        name: "Dragon Fruit (1pc)",
        price: 95,
        originalPrice: 110,
        rating: 4.7,
        reviews: 410,
        imageUrl: "https://m.media-amazon.com/images/I/61cMwkhtWeL.jpg",
        category: "Exotic",
        organic: false,
        discount: 14,
        tags: ["Exotic", "Low Calorie"],
        description: "Unique dragon fruit with mild sweet flavor",
        stock: 10
      },
      {
        id: 11,
        name: "Guava (500g)",
        price: 70,
        originalPrice: 80,
        rating: 4.5,
        reviews: 390,
        imageUrl: "https://m.media-amazon.com/images/I/51fw9sIfbXL.jpg",
        category: "Tropical",
        organic: false,
        discount: 12,
        tags: ["Healthy", "Vitamin C"],
        description: "Fresh guavas with sweet and tangy flavor",
        stock: 17
      },
      {
        id: 12,
        name: "Pineapple (1pc)",
        price: 95,
        originalPrice: 110,
        rating: 4.6,
        reviews: 500,
        imageUrl: "https://m.media-amazon.com/images/I/41VnVNoLg6L.jpg",
        category: "Tropical",
        organic: false,
        discount: 14,
        tags: ["Tropical", "Digestive Enzyme"],
        description: "Sweet and tangy pineapple, great for juices",
        stock: 13
      },
      {
        id: 13,
        name: "Cherries (200g)",
        price: 150,
        originalPrice: 175,
        rating: 4.8,
        reviews: 430,
        imageUrl: "https://m.media-amazon.com/images/I/71gzPzE1NfL.jpg",
        category: "Berries",
        organic: true,
        discount: 14,
        tags: ["Premium", "Antioxidants"],
        description: "Sweet and tart cherries, perfect for desserts",
        stock: 8
      },
      {
        id: 14,
        name: "Watermelon (1pc)",
        price: 80,
        originalPrice: 95,
        rating: 4.4,
        reviews: 300,
        imageUrl: "https://m.media-amazon.com/images/I/617ZrQKxY3L.jpg",
        category: "Seasonal",
        organic: false,
        discount: 16,
        tags: ["Hydrating", "Summer Favorite"],
        description: "Refreshing watermelon, perfect for hot days",
        stock: 12
      },
      {
        id: 15,
        name: "Blackberries (200g)",
        price: 160,
        originalPrice: 185,
        rating: 4.7,
        reviews: 220,
        imageUrl: "https://m.media-amazon.com/images/I/61WBr4Y8TAL.jpg",
        category: "Berries",
        organic: true,
        discount: 13,
        tags: ["Exotic", "Antioxidants"],
        description: "Tart and juicy blackberries, great for smoothies",
        stock: 9
      },
      {
        id: 16,
        name: "Muskmelon (1pc)",
        price: 85,
        originalPrice: 100,
        rating: 4.5,
        reviews: 370,
        imageUrl: "https://m.media-amazon.com/images/I/51HkWDcd88L.jpg",
        category: "Seasonal",
        organic: false,
        discount: 15,
        tags: ["Seasonal", "Hydrating"],
        description: "Sweet and fragrant muskmelon, refreshing taste",
        stock: 15
      },
      {
        id: 17,
        name: "Blueberries (150g)",
        price: 175,
        originalPrice: 200,
        rating: 4.8,
        reviews: 520,
        imageUrl: "https://m.media-amazon.com/images/I/71W2c-1X2+L.jpg",
        category: "Berries",
        organic: true,
        discount: 13,
        tags: ["Superfood", "Antioxidants"],
        description: "Nutrient-packed blueberries, perfect for breakfast",
        stock: 11
      },
      {
        id: 18,
        name: "Avocado (2 pcs)",
        price: 120,
        originalPrice: 140,
        rating: 4.6,
        reviews: 380,
        imageUrl: "https://m.media-amazon.com/images/I/61wNlkNlE+L.jpg",
        category: "Exotic",
        organic: true,
        discount: 14,
        tags: ["Healthy Fats", "Keto Friendly"],
        description: "Creamy avocados, perfect for salads and toast",
        stock: 14
      },
      {
        id: 19,
        name: "Peaches (500g)",
        price: 130,
        originalPrice: 150,
        rating: 4.5,
        reviews: 290,
        imageUrl: "https://m.media-amazon.com/images/I/61Vb+g1T2+L.jpg",
        category: "Stone Fruits",
        organic: false,
        discount: 13,
        tags: ["Juicy", "Summer Fruit"],
        description: "Sweet and juicy peaches with fuzzy skin",
        stock: 16
      },
      {
        id: 20,
        name: "Plums (500g)",
        price: 110,
        originalPrice: 125,
        rating: 4.4,
        reviews: 240,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Stone Fruits",
        organic: false,
        discount: 12,
        tags: ["Tangy", "Digestive Health"],
        description: "Sweet and tangy plums, great for snacking",
        stock: 18
      },
      {
        id: 21,
        name: "Lychee (500g)",
        price: 140,
        originalPrice: 160,
        rating: 4.7,
        reviews: 320,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Exotic",
        organic: false,
        discount: 13,
        tags: ["Exotic", "Summer Special"],
        description: "Sweet and fragrant lychees with white flesh",
        stock: 12
      },
      {
        id: 22,
        name: "Custard Apple (500g)",
        price: 120,
        originalPrice: 140,
        rating: 4.5,
        reviews: 210,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Tropical",
        organic: false,
        discount: 14,
        tags: ["Tropical", "Sweet"],
        description: "Creamy and sweet custard apple, unique flavor",
        stock: 10
      },
      {
        id: 23,
        name: "Figs (250g)",
        price: 150,
        originalPrice: 175,
        rating: 4.6,
        reviews: 180,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Exotic",
        organic: true,
        discount: 14,
        tags: ["Nutritious", "Fiber Rich"],
        description: "Sweet and nutritious figs, great for health",
        stock: 8
      },
      {
        id: 24,
        name: "Apricots (500g)",
        price: 130,
        originalPrice: 150,
        rating: 4.4,
        reviews: 190,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Stone Fruits",
        organic: false,
        discount: 13,
        tags: ["Vitamin A", "Antioxidants"],
        description: "Sweet and tangy apricots with velvety skin",
        stock: 14
      },
      {
        id: 25,
        name: "Raspberries (150g)",
        price: 160,
        originalPrice: 185,
        rating: 4.7,
        reviews: 260,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Berries",
        organic: true,
        discount: 14,
        tags: ["Antioxidants", "Delicate"],
        description: "Fragile and tart raspberries, perfect for desserts",
        stock: 7
      },
      {
        id: 26,
        name: "Gooseberries (250g)",
        price: 90,
        originalPrice: 110,
        rating: 4.3,
        reviews: 170,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Seasonal",
        organic: false,
        discount: 18,
        tags: ["Tangy", "Vitamin C"],
        description: "Tangy gooseberries, great for pickles and juices",
        stock: 20
      },
      {
        id: 27,
        name: "Passion Fruit (5 pcs)",
        price: 110,
        originalPrice: 130,
        rating: 4.6,
        reviews: 150,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Exotic",
        organic: true,
        discount: 15,
        tags: ["Exotic", "Tropical"],
        description: "Tangy passion fruit with aromatic pulp",
        stock: 11
      },
      {
        id: 28,
        name: "Cranberries (200g)",
        price: 140,
        originalPrice: 165,
        rating: 4.4,
        reviews: 130,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Berries",
        organic: false,
        discount: 15,
        tags: ["Tart", "UTI Health"],
        description: "Tart cranberries, often used in sauces and juices",
        stock: 13
      },
      {
        id: 29,
        name: "Jackfruit (500g)",
        price: 100,
        originalPrice: 120,
        rating: 4.5,
        reviews: 230,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Tropical",
        organic: false,
        discount: 17,
        tags: ["Tropical", "Versatile"],
        description: "Sweet jackfruit with unique flavor and texture",
        stock: 9
      },
      {
        id: 30,
        name: "Pear (500g)",
        price: 110,
        originalPrice: 130,
        rating: 4.4,
        reviews: 280,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Staple Fruits",
        organic: true,
        discount: 15,
        tags: ["Juicy", "Fiber Rich"],
        description: "Sweet and juicy pears with soft texture",
        stock: 16
      },
      {
        id: 31,
        name: "Lemon (6 pcs)",
        price: 50,
        originalPrice: 60,
        rating: 4.3,
        reviews: 420,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Citrus",
        organic: false,
        discount: 17,
        tags: ["Vitamin C", "Culinary Use"],
        description: "Tangy lemons, perfect for drinks and cooking",
        stock: 25
      },
      {
        id: 32,
        name: "Coconut (2 pcs)",
        price: 70,
        originalPrice: 85,
        rating: 4.5,
        reviews: 310,
        imageUrl: "https://m.media-amazon.com/images/I/61V9Y9Y9Z+L.jpg",
        category: "Tropical",
        organic: true,
        discount: 18,
        tags: ["Hydrating", "Versatile"],
        description: "Fresh coconuts with sweet water and tender flesh",
        stock: 14
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
  }, [products, searchTerm, categoryFilter, sortOption, priceRange]);

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

  const categories = ["All", "Staple Fruits", "Seasonal", "Exotic", "Berries", "Tropical", "Citrus", "Stone Fruits"];

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
    <div className="p-4 md:p-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-900 mb-2">Fresh Fruits</h1>
        <p className="text-pink-600">Handpicked selection of fresh and organic fruits</p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Truck className="mx-auto text-pink-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Fresh Delivery</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Shield className="mx-auto text-pink-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Quality Guarantee</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Star className="mx-auto text-pink-600 mb-2" size={24} />
          <p className="text-sm font-semibold">4.7/5 Rating</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Filter className="mx-auto text-pink-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Organic Options</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-pink-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search fruits..."
            className="w-full border border-pink-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-pink-800 hover:bg-pink-200"
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
            className="md:hidden flex items-center gap-1 px-3 py-2 bg-pink-100 text-pink-800 rounded-full text-sm hover:bg-pink-200"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filters-section"
          >
            <Filter size={16} aria-hidden="true" />
            {showFilters ? <X size={16} aria-hidden="true" /> : "Filters"}
          </button>

          <select
            className={`border border-pink-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-pink-400 bg-white ${showFilters ? "flex" : "hidden md:flex"
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
          <h3 className="font-semibold text-pink-900">Advanced Filters</h3>
          <button
            className="text-pink-600 text-sm flex items-center"
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
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showMoreFilters ? "block" : "hidden md:grid"}`}
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
                className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
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
                className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={1000}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">1000</span>
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
        <div className="text-sm text-pink-600">
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
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                  SAVE {discount}%
                </div>
              )}

              {item.organic && (
                <div className="absolute top-4 left-14 bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-bold z-10">
                  🌱 ORGANIC
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFB6C1/000000?text=Fruit+Image";
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
                <span className="text-xl font-bold text-pink-700">
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
                <div className="mb-2 text-xs text-pink-600">
                  Only {item.stock} left in stock!
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cart buttons */}
              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-pink-300 rounded-full overflow-hidden bg-pink-50">
                    <button
                      onClick={() => !isOutOfStock && handleDecrement(item)}
                      className="p-2 text-pink-700 hover:bg-pink-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="p-2 text-pink-700 hover:bg-pink-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      ? "bg-pink-700 text-white hover:bg-pink-800 hover:shadow-lg"
                      : "bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg hover:scale-105"
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
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Fruit;