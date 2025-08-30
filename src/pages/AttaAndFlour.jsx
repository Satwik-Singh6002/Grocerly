import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const AttaAndFlour = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
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

  // Products data - 32 atta and flour products
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Aashirvaad Whole Wheat Atta 5kg",
        price: 250,
        originalPrice: 280,
        rating: 4.5,
        reviews: 1245,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40101447_2-aashirvaad-whole-wheat-atta.jpg",
        category: "Wheat Flour",
        organic: false,
        discount: 11,
        tags: ["Best Seller", "Premium Quality"],
        description: "100% pure whole wheat atta with multigrains for healthier rotis",
        stock: 15
      },
      {
        id: 2,
        name: "Fortune Chakki Fresh Atta 5kg",
        price: 245,
        originalPrice: 270,
        rating: 4.3,
        reviews: 876,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000259_15-fortune-chakki-fresh-atta.jpg",
        category: "Chakki Atta",
        organic: false,
        discount: 9,
        tags: ["Popular"],
        description: "Stone-ground wheat flour for soft and fluffy chapatis",
        stock: 8
      },
      {
        id: 3,
        name: "Pillsbury Chakki Fresh Atta 5kg",
        price: 260,
        originalPrice: 290,
        rating: 4.6,
        reviews: 943,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000265_12-pillsbury-chakki-fresh-atta.jpg",
        category: "Chakki Atta",
        organic: false,
        discount: 10,
        tags: ["New", "Premium"],
        description: "Finest quality wheat atta with perfect texture for all Indian breads",
        stock: 12
      },
      {
        id: 4,
        name: "24 Mantra Organic Wheat Flour 1kg",
        price: 120,
        originalPrice: 140,
        rating: 4.7,
        reviews: 567,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000271_10-24-mantra-organic-whole-wheat-atta.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 14,
        tags: ["Organic", "Healthy"],
        description: "Certified organic wheat flour free from pesticides and chemicals",
        stock: 5
      },
      {
        id: 5,
        name: "Nature Fresh Sampoorna Chakki Atta 5kg",
        price: 230,
        originalPrice: 260,
        rating: 4.2,
        reviews: 654,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000267_11-nature-fresh-sampoorna-chakki-atta.jpg",
        category: "Chakki Atta",
        organic: false,
        discount: 12,
        tags: ["Fresh"],
        description: "Blend of premium wheat grains for nutritious and tasty rotis",
        stock: 10
      },
      {
        id: 6,
        name: "Golden Harvest Atta 5kg",
        price: 220,
        originalPrice: 250,
        rating: 4.1,
        reviews: 432,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000263_13-golden-harvest-chakki-atta.jpg",
        category: "Wheat Flour",
        organic: false,
        discount: 12,
        tags: ["Economical"],
        description: "High-quality wheat flour at an affordable price",
        stock: 20
      },
      {
        id: 7,
        name: "Sujata Gold Chakki Atta 10kg",
        price: 450,
        originalPrice: 500,
        rating: 4.4,
        reviews: 789,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000261_14-sujata-gold-chakki-atta.jpg",
        category: "Chakki Atta",
        organic: false,
        discount: 10,
        tags: ["Family Pack"],
        description: "Economical family pack for daily consumption",
        stock: 6
      },
      {
        id: 8,
        name: "Organic Tattva Whole Wheat Flour 2kg",
        price: 180,
        originalPrice: 200,
        rating: 4.8,
        reviews: 345,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000269_12-organic-tattva-whole-wheat-atta.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 10,
        tags: ["Organic", "Healthy"],
        description: "Certified organic flour with rich fiber content",
        stock: 7
      },
      {
        id: 9,
        name: "Annapurna Atta 5kg",
        price: 240,
        originalPrice: 270,
        rating: 4.0,
        reviews: 321,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000262_13-annapurna-atta.jpg",
        category: "Wheat Flour",
        organic: false,
        discount: 11,
        tags: ["Premium"],
        description: "Specially selected wheat for perfect golden rotis",
        stock: 9
      },
      {
        id: 10,
        name: "Rajdhani Chakki Atta 5kg",
        price: 270,
        originalPrice: 300,
        rating: 4.6,
        reviews: 567,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000268_11-rajdhani-chakki-atta.jpg",
        category: "Chakki Atta",
        organic: false,
        discount: 10,
        tags: ["Premium", "Best Seller"],
        description: "Premium quality wheat with traditional stone-ground process",
        stock: 11
      },
      {
        id: 11,
        name: "Ashirvad Select Sharbati Atta 5kg",
        price: 320,
        originalPrice: 350,
        rating: 4.9,
        reviews: 876,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40101448_2-aashirvaad-select-sharbati-atta.jpg",
        category: "Premium Flour",
        organic: false,
        discount: 9,
        tags: ["Premium", "Sharbati"],
        description: "Made from premium Sharbati wheat for exceptional taste",
        stock: 4
      },
      {
        id: 12,
        name: "Patanjali Whole Wheat Atta 5kg",
        price: 210,
        originalPrice: 240,
        rating: 4.2,
        reviews: 987,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000264_12-patanjali-whole-wheat-atta.jpg",
        category: "Wheat Flour",
        organic: false,
        discount: 13,
        tags: ["Economical", "Healthy"],
        description: "Pure and nutritious wheat flour for everyday use",
        stock: 18
      },
      {
        id: 13,
        name: "Double Horse Wheat Flour 1kg",
        price: 110,
        originalPrice: 130,
        rating: 4.3,
        reviews: 234,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000270_11-double-horse-wheat-flour.jpg",
        category: "Wheat Flour",
        organic: false,
        discount: 15,
        tags: ["Small Pack"],
        description: "Ideal for small families or occasional use",
        stock: 25
      },
      {
        id: 14,
        name: "Nature's Basket Organic Multigrain Atta 2kg",
        price: 190,
        originalPrice: 220,
        rating: 4.7,
        reviews: 432,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000266_12-natures-basket-organic-multigrain-atta.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 14,
        tags: ["Multigrain", "Healthy"],
        description: "Blend of organic wheat with multiple grains for extra nutrition",
        stock: 3
      },
      {
        id: 15,
        name: "Tata Sampann Whole Wheat Atta 5kg",
        price: 260,
        originalPrice: 290,
        rating: 4.5,
        reviews: 654,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40101449_2-tata-sampann-whole-wheat-atta.jpg",
        category: "Wheat Flour",
        organic: false,
        discount: 10,
        tags: ["Premium", "Quality"],
        description: "Goodness of whole wheat with retained natural nutrients",
        stock: 14
      },
      {
        id: 16,
        name: "Besan (Gram Flour) 1kg",
        price: 90,
        originalPrice: 110,
        rating: 4.4,
        reviews: 345,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000272_10-besan-gram-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 18,
        tags: ["Versatile"],
        description: "Fine gram flour for pakoras, cheela and other dishes",
        stock: 12
      },
      {
        id: 17,
        name: "Organic Ragi Flour 1kg",
        price: 120,
        originalPrice: 140,
        rating: 4.6,
        reviews: 234,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000273_9-organic-ragi-flour.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 14,
        tags: ["Gluten Free", "Healthy"],
        description: "Nutrient-rich ragi flour for healthy rotis and porridge",
        stock: 8
      },
      {
        id: 18,
        name: "Rice Flour 1kg",
        price: 80,
        originalPrice: 95,
        rating: 4.2,
        reviews: 189,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000274_9-rice-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 16,
        tags: ["Gluten Free"],
        description: "Fine rice flour for South Indian dishes and snacks",
        stock: 15
      },
      {
        id: 19,
        name: "Bajra Flour 1kg",
        price: 85,
        originalPrice: 100,
        rating: 4.3,
        reviews: 167,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000275_9-bajra-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 15,
        tags: ["Winter Special"],
        description: "Nutritious bajra flour for winter rotis",
        stock: 10
      },
      {
        id: 20,
        name: "Maida (Refined Flour) 1kg",
        price: 70,
        originalPrice: 85,
        rating: 4.1,
        reviews: 278,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000276_9-maida-refined-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 18,
        tags: ["Baking"],
        description: "Refined flour for baking and making breads",
        stock: 20
      },
      {
        id: 21,
        name: "Jowar Flour 1kg",
        price: 95,
        originalPrice: 110,
        rating: 4.5,
        reviews: 198,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000277_9-jowar-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 14,
        tags: ["Gluten Free"],
        description: "Healthy jowar flour for rotis and bhakris",
        stock: 9
      },
      {
        id: 22,
        name: "Organic Multigrain Atta 5kg",
        price: 300,
        originalPrice: 340,
        rating: 4.7,
        reviews: 321,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000278_8-organic-multigrain-atta.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 12,
        tags: ["Multigrain", "Healthy"],
        description: "Organic blend of multiple grains for nutritious meals",
        stock: 6
      },
      {
        id: 23,
        name: "Corn Flour 500g",
        price: 60,
        originalPrice: 75,
        rating: 4.0,
        reviews: 145,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000279_8-corn-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 20,
        tags: ["Thickening Agent"],
        description: "Versatile corn flour for cooking and baking",
        stock: 18
      },
      {
        id: 24,
        name: "Soya Flour 1kg",
        price: 130,
        originalPrice: 150,
        rating: 4.4,
        reviews: 176,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000280_8-soya-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 13,
        tags: ["Protein Rich"],
        description: "High-protein soya flour for healthy recipes",
        stock: 7
      },
      // Additional 8 products to make it 32
      {
        id: 25,
        name: "Buckwheat Flour 500g",
        price: 140,
        originalPrice: 160,
        rating: 4.6,
        reviews: 89,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000281_8-buckwheat-flour.jpg",
        category: "Specialty Flour",
        organic: true,
        discount: 12,
        tags: ["Gluten Free", "Healthy"],
        description: "Nutrient-dense buckwheat flour for pancakes and baking",
        stock: 5
      },
      {
        id: 26,
        name: "Organic Amaranth Flour 500g",
        price: 150,
        originalPrice: 180,
        rating: 4.7,
        reviews: 67,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000282_7-organic-amaranth-flour.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 17,
        tags: ["Gluten Free", "Superfood"],
        description: "Ancient grain flour packed with protein and nutrients",
        stock: 4
      },
      {
        id: 27,
        name: "Quinoa Flour 500g",
        price: 220,
        originalPrice: 250,
        rating: 4.8,
        reviews: 112,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000283_7-quinoa-flour.jpg",
        category: "Premium Flour",
        organic: true,
        discount: 12,
        tags: ["Protein Rich", "Gluten Free"],
        description: "High-protein quinoa flour for gluten-free baking",
        stock: 6
      },
      {
        id: 28,
        name: "Almond Flour 500g",
        price: 350,
        originalPrice: 400,
        rating: 4.9,
        reviews: 203,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000284_7-almond-flour.jpg",
        category: "Premium Flour",
        organic: false,
        discount: 13,
        tags: ["Keto Friendly", "Low Carb"],
        description: "Finely ground almond flour for keto and low-carb recipes",
        stock: 8
      },
      {
        id: 29,
        name: "Coconut Flour 500g",
        price: 280,
        originalPrice: 320,
        rating: 4.5,
        reviews: 145,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000285_7-coconut-flour.jpg",
        category: "Specialty Flour",
        organic: true,
        discount: 12,
        tags: ["Gluten Free", "High Fiber"],
        description: "Nutritious coconut flour for gluten-free baking",
        stock: 7
      },
      {
        id: 30,
        name: "Organic Chickpea Flour 1kg",
        price: 160,
        originalPrice: 190,
        rating: 4.6,
        reviews: 98,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000286_7-organic-chickpea-flour.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 16,
        tags: ["Protein Rich", "Versatile"],
        description: "Certified organic chickpea flour for healthy cooking",
        stock: 9
      },
      {
        id: 31,
        name: "Millet Mix Flour 1kg",
        price: 180,
        originalPrice: 210,
        rating: 4.4,
        reviews: 124,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000287_7-millet-mix-flour.jpg",
        category: "Specialty Flour",
        organic: false,
        discount: 14,
        tags: ["Multigrain", "Healthy"],
        description: "Blend of various millet flours for nutritious rotis",
        stock: 11
      },
      {
        id: 32,
        name: "Organic Spelt Flour 1kg",
        price: 320,
        originalPrice: 360,
        rating: 4.7,
        reviews: 87,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000288_7-organic-spelt-flour.jpg",
        category: "Organic Flour",
        organic: true,
        discount: 11,
        tags: ["Ancient Grain", "Nutritious"],
        description: "Ancient grain flour with a nutty flavor and high nutrition",
        stock: 5
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

  const categories = ["All", "Wheat Flour", "Chakki Atta", "Organic Flour", "Premium Flour", "Specialty Flour"];

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
    setPriceRange([0, 1500]);
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
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Premium Atta & Flour</h1>
        <p className="text-amber-600">Finest quality flour for your kitchen</p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Truck className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Free Delivery</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Shield className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Quality Guarantee</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Star className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">4.8/5 Rating</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Filter className="mx-auto text-amber-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Organic Options</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-amber-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search atta and flour..."
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
                max="1500"
                step="50"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={1500}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={1500}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">1500</span>
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

              {item.organic && (
                <div className="absolute top-4 left-14 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold z-10">
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/FFE4C4/000000?text=Atta+Image";
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

export default AttaAndFlour;