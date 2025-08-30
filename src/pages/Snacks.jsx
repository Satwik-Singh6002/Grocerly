import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Shield, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Snacks = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 250]); // Increased max price to 250
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
  const snacks = useMemo(
    () => [
      {
        id: "snack-01",
        name: "Kurkure Masala Munch 100g",
        image: "https://tiimg.tistatic.com/fp/1/007/694/100-vegetarian-fantastic-crunch-spicy-combo-kurkure-masala-munch-089.jpg",
        price: 20,
        originalPrice: 25,
        rating: 4.4,
        reviews: 320,
        category: "Chips & Namkeen",
        tags: ["Best Seller"],
        description: "Spicy and crunchy snack with masala flavor",
        stock: 15
      },
      {
        id: "snack-02",
        name: "Lays Classic Salted 52g",
        image: "https://m.media-amazon.com/images/I/61e+UwnsWwL.jpg",
        price: 20,
        originalPrice: 25,
        rating: 4.3,
        reviews: 450,
        category: "Chips & Namkeen",
        tags: ["Popular"],
        description: "Classic salted potato chips",
        stock: 8
      },
      {
        id: "snack-03",
        name: "Bingo! Mad Angles Achaari Masti 80g",
        image: "https://www.jiomart.com/images/product/original/491551829/bingo-achaari-masti-mad-angles-130-g-product-images-o491551829-p491551829-0-202409301839.jpg",
        price: 25,
        originalPrice: 30,
        rating: 4.5,
        reviews: 280,
        category: "Chips & Namkeen",
        tags: ["Tasty Pick"],
        description: "Tangy and spicy triangular snacks",
        stock: 12
      },
      {
        id: "snack-04",
        name: "Haldiram's Aloo Bhujia 200g",
        image: "https://m.media-amazon.com/images/I/71xG-BZxeCL._UF894,1000_QL80_.jpg",
        price: 35,
        originalPrice: 40,
        rating: 4.6,
        reviews: 650,
        category: "Namkeen",
        tags: ["Crunchy"],
        description: "Traditional spicy potato snack",
        stock: 5
      },
      {
        id: "snack-05",
        name: "Parle Monaco Classic 75g",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFZLSfkMx3uk9JRpXU0bjsnHKOFVuzDooVw&s",
        price: 10,
        originalPrice: 12,
        rating: 4.2,
        reviews: 150,
        category: "Biscuits",
        tags: ["Light Snack"],
        description: "Salty biscuits perfect for snacking",
        stock: 10
      },
      {
        id: "snack-06",
        name: "Peri Peri Nachos 100g",
        image: "https://m.media-amazon.com/images/I/71mAtXA3NHL._UF1000,1000_QL80_.jpg",
        price: 40,
        originalPrice: 50,
        rating: 4.5,
        reviews: 290,
        category: "Nachos",
        tags: ["Spicy"],
        description: "Spicy peri peri flavored nachos",
        stock: 20
      },
      {
        id: "snack-07",
        name: "Unibic Choco Chip Cookies 75g",
        image: "https://www.bbassets.com/media/uploads/p/l/40016293_2-unibic-cookies-chocolate-chip.jpg",
        price: 25,
        originalPrice: 30,
        rating: 4.7,
        reviews: 520,
        category: "Biscuits",
        tags: ["Sweet Treat"],
        description: "Chocolate chip cookies with rich flavor",
        stock: 6
      },
      {
        id: "snack-08",
        name: "Britannia Good Day Cashew 60g",
        image: "https://www.bbassets.com/media/uploads/p/xl/270729_21-britannia-good-day-cashew-cookies.jpg",
        price: 15,
        originalPrice: 18,
        rating: 4.3,
        reviews: 390,
        category: "Biscuits",
        tags: ["Classic"],
        description: "Buttery cookies with cashew bits",
        stock: 7
      },
      {
        id: "snack-09",
        name: "Pringles Original 107g",
        image: "https://www.bbassets.com/media/uploads/p/l/100550_16-pringles-original.jpg",
        price: 99,
        originalPrice: 120,
        rating: 4.8,
        reviews: 720,
        category: "Chips & Namkeen",
        tags: ["Premium"],
        description: "Stackable potato crisps with original flavor",
        stock: 9
      },
      {
        id: "snack-10",
        name: "Bingo Tedhe Medhe Masala Tadka 90g",
        image: "https://www.bigbasket.com/media/uploads/p/l/40188895_11-bingo-tedhe-medhe-masala-tadka.jpg",
        price: 22,
        originalPrice: 28,
        rating: 4.4,
        reviews: 210,
        category: "Chips & Namkeen",
        tags: ["Fun Snack"],
        description: "Curved snacks with masala tadka flavor",
        stock: 11
      },
      {
        id: "snack-11",
        name: "Too Yumm Multigrain Chips 80g",
        image: "https://m.media-amazon.com/images/I/81XG4eZP+7L.jpg",
        price: 35,
        originalPrice: 45,
        rating: 4.3,
        reviews: 270,
        category: "Chips & Namkeen",
        tags: ["Healthy Choice"],
        description: "Baked multigrain chips with less oil",
        stock: 4
      },
      {
        id: "snack-12",
        name: "Oreo Original Biscuits 120g",
        image: "https://m.media-amazon.com/images/I/71Z9gIgOtDL._SL1500_.jpg",
        price: 30,
        originalPrice: 35,
        rating: 4.6,
        reviews: 780,
        category: "Biscuits",
        tags: ["Sweet Bite"],
        description: "Chocolate sandwich cookies with cream filling",
        stock: 18
      },
      {
        id: "snack-13",
        name: "Parle Hide & Seek Fab Chocolate 112g",
        image: "https://m.media-amazon.com/images/I/71YG2ai-wiL.jpg",
        price: 35,
        originalPrice: 42,
        rating: 4.7,
        reviews: 520,
        category: "Biscuits",
        tags: ["Chocolatey"],
        description: "Chocolate-filled biscuits for indulgence",
        stock: 25
      },
      {
        id: "snack-14",
        name: "Britannia Marie Gold 250g",
        image: "https://m.media-amazon.com/images/I/71EiPYp6YzL.jpg",
        price: 45,
        originalPrice: 55,
        rating: 4.5,
        reviews: 640,
        category: "Biscuits",
        tags: ["Tea Time"],
        description: "Light tea biscuits perfect with beverages",
        stock: 3
      },
      {
        id: "snack-15",
        name: "Haldiram Moong Dal 200g",
        image: "https://m.media-amazon.com/images/I/71M5HvKZ5aL.jpg",
        price: 55,
        originalPrice: 65,
        rating: 4.6,
        reviews: 420,
        category: "Namkeen",
        tags: ["Classic Namkeen"],
        description: "Crispy moong dal snack with traditional spices",
        stock: 14
      },
      {
        id: "snack-16",
        name: "Little Debbie Swiss Roll Pack 240g",
        image: "https://m.media-amazon.com/images/I/81rxuD2b3pL.jpg",
        price: 85,
        originalPrice: 99,
        rating: 4.8,
        reviews: 310,
        category: "Cakes",
        tags: ["Imported"],
        description: "Soft sponge cake with cream filling",
        stock: 6
      },
     {
      id: "snack-17",
      name: "Munch Chocolate 22g",
      image: "https://m.media-amazon.com/images/I/61q1q3QJQ+L.jpg",
      price: 10,
      originalPrice: 12,
      rating: 4.3,
      reviews: 210,
      category: "Chocolates",
      tags: ["Chocolate"],
      description: "Crispy wafer with chocolate coating",
      stock: 18
    },
    {
      id: "snack-18",
      name: "Dairy Milk Silk 60g",
      image: "https://m.media-amazon.com/images/I/71hxN2dG8JL._SL1500_.jpg",
      price: 70,
      originalPrice: 85,
      rating: 4.9,
      reviews: 950,
      category: "Chocolates",
      tags: ["Premium"],
      description: "Smooth and creamy chocolate bar",
      stock: 10
    },
    {
      id: "snack-19",
      name: "Cheetos Crunchy 60g",
      image: "https://m.media-amazon.com/images/I/71U3T0bC6tL.jpg",
      price: 25,
      originalPrice: 30,
      rating: 4.4,
      reviews: 320,
      category: "Chips & Namkeen",
      tags: ["Cheesy"],
      description: "Cheesy crunchy snacks",
      stock: 15
    },
    {
      id: "snack-20",
      name: "KitKat 4 Finger 41.5g",
      image: "https://m.media-amazon.com/images/I/71xMKLN5j+L._SL1500_.jpg",
      price: 35,
      originalPrice: 40,
      rating: 4.7,
      reviews: 680,
      category: "Chocolates",
      tags: ["Crispy"],
      description: "Crispy wafer fingers covered in chocolate",
      stock: 12
    },
    {
      id: "snack-21",
      name: "Bourbon Chocolate Cream 150g",
      image: "https://m.media-amazon.com/images/I/71LZQn7N3PL._SL1500_.jpg",
      price: 40,
      originalPrice: 50,
      rating: 4.6,
      reviews: 450,
      category: "Biscuits",
      tags: ["Chocolatey"],
      description: "Chocolate cream filled biscuits",
      stock: 8
    },
    {
      id: "snack-22",
      name: "Haldiram's Kaju Katli 200g",
      image: "https://m.media-amazon.com/images/I/71z3RrR2nIL._SL1500_.jpg",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 520,
      category: "Sweets",
      tags: ["Premium"],
      description: "Traditional Indian cashew sweet",
      stock: 6
    },
    {
      id: "snack-23",
      name: "Pringles Sour Cream & Onion 107g",
      image: "https://m.media-amazon.com/images/I/81-8+9R4Y4L._SL1500_.jpg",
      price: 99,
      originalPrice: 120,
      rating: 4.7,
      reviews: 610,
      category: "Chips & Namkeen",
      tags: ["Tangy"],
      description: "Stackable crisps with sour cream flavor",
      stock: 11
    },
    {
      id: "snack-24",
      name: "Amul Dark Chocolate 60g",
      image: "https://m.media-amazon.com/images/I/71Q0N0K5JQL._SL1500_.jpg",
      price: 65,
      originalPrice: 75,
      rating: 4.5,
      reviews: 380,
      category: "Chocolates",
      tags: ["Dark Chocolate"],
      description: "Rich dark chocolate with intense flavor",
      stock: 9
    },
    {
      id: "snack-25",
      name: "Lotte Choco Pie 6 Pieces",
      image: "https://m.media-amazon.com/images/I/71z9i9K3TPL._SL1500_.jpg",
      price: 89,
      originalPrice: 99,
      rating: 4.6,
      reviews: 420,
      category: "Cakes",
      tags: ["Imported"],
      description: "Chocolate covered marshmallow cakes",
      stock: 7
    },
    {
      id: "snack-26",
      name: "Bikanerview Bhujia 400g",
      image: "https://m.media-amazon.com/images/I/71w6J4L3l+L._SL1500_.jpg",
      price: 85,
      originalPrice: 95,
      rating: 4.4,
      reviews: 350,
      category: "Namkeen",
      tags: ["Traditional"],
      description: "Classic spicy snack from Bikaner",
      stock: 14
    },
    {
      id: "snack-27",
      name: "Cornitos Nacho Crisps 75g",
      image: "https://m.media-amazon.com/images/I/61dPlVr0YCL._SL1000_.jpg",
      price: 55,
      originalPrice: 65,
      rating: 4.5,
      reviews: 290,
      category: "Nachos",
      tags: ["Cheesy"],
      description: "Baked nacho crisps with cheese seasoning",
      stock: 13
    },
    {
      id: "snack-28",
      name: "Ferrero Rocher 3 Pieces",
      image: "https://m.media-amazon.com/images/I/71pZQrH-MIL._SL1500_.jpg",
      price: 99,
      originalPrice: 120,
      rating: 4.9,
      reviews: 890,
      category: "Chocolates",
      tags: ["Premium"],
      description: "Hazelnut chocolates in gold wrapper",
      stock: 5
    },
    {
      id: "snack-29",
      name: "McVitie's Digestive 250g",
      image: "https://m.media-amazon.com/images/I/81L9Fh6X4RL._SL1500_.jpg",
      price: 75,
      originalPrice: 85,
      rating: 4.6,
      reviews: 510,
      category: "Biscuits",
      tags: ["Whole Wheat"],
      description: "Whole wheat digestive biscuits",
      stock: 10
    },
    {
      id: "snack-30",
      name: "Yippee Noodle Magic Masala 70g",
      image: "https://m.media-amazon.com/images/I/71UySH5U2tL._SL1500_.jpg",
      price: 15,
      originalPrice: 18,
      rating: 4.3,
      reviews: 230,
      category: "Instant Noodles",
      tags: ["Spicy"],
      description: "Instant noodles with magic masala taste",
      stock: 20
    },
    {
      id: "snack-31",
      name: "Toblerone Milk Chocolate 100g",
      image: "https://m.media-amazon.com/images/I/71Mhlti+6+L._SL1500_.jpg",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 670,
      category: "Chocolates",
      tags: ["Swiss"],
      description: "Swiss milk chocolate with honey and almond",
      stock: 8
    },
    {
      id: "snack-32",
      name: "Kellogg's Chocos 150g",
      image: "https://m.media-amazon.com/images/I/61j8lW8vN2L._SL1000_.jpg",
      price: 85,
      originalPrice: 99,
      rating: 4.4,
      reviews: 380,
      category: "Cereals",
      tags: ["Chocolate"],
      description: "Chocolate flavored cereal rings",
      stock: 12
    }
    ],
    []
  );

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let updated = snacks.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
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
  }, [snacks, searchTerm, categoryFilter, sortOption, priceRange, minRating]);

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

  const categories = ["All", ...new Set(snacks.map(item => item.category))];

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
    setPriceRange([0, 250]); // Reset to new max price
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
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Delicious Snacks</h1>
        <p className="text-amber-600">Crispy, crunchy, and tasty snacks for every mood and moment!</p>
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
          <p className="text-sm font-semibold">Top Rated Snacks</p>
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
            placeholder="Search snacks..."
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
                max="250" // Increased max to 250
                step="5"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={250}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="250" // Increased max to 250
                step="5"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={250}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">250</span> {/* Updated to 250 */}
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
          Showing {filteredProducts.length} of {snacks.length} products
        </p>
        <div className="text-sm text-amber-600">
          {filteredProducts.length === snacks.length ? (
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
                  src={item.image}
                  alt={item.name}
                  className="max-h-44 mx-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFE4C4/000000?text=Snack+Image";
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

export default Snacks;