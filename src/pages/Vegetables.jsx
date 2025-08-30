import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Vegetables = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [animatingProduct, setAnimatingProduct] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const products = useMemo(
    () => [
      {
        id: 'veg-01', name: "Fresh Tomatoes", price: 40, originalPrice: 50, rating: 4.5, reviews: 620,
        imageUrl: "https://m.media-amazon.com/images/I/61ZJhcdG7LL._UF894,1000_QL80_.jpg", category: "Daily Staples", organic: true, discount: 20,
        tags: ["Salad", "Curry"], description: "Juicy, red tomatoes, perfect for salads, sauces, and curries. (1kg)", stock: 30
      },
      {
        id: 'veg-02', name: "Potatoes", price: 30, originalPrice: 35, rating: 4.4, reviews: 540,
        imageUrl: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/e21d501a-0f8d-4c14-ac17-376707961c02.jpg", category: "Daily Staples", organic: false, discount: 14,
        tags: ["Versatile", "Staple"], description: "Fresh, farm-sourced potatoes, ideal for a variety of dishes. (1kg)", stock: 50
      },
      {
        id: 'veg-03', name: "Onions", price: 32, originalPrice: 38, rating: 4.2, reviews: 480,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/10000148_34-fresho-onion.jpg", category: "Daily Staples", organic: false, discount: 16,
        tags: ["Essential", "Cooking Base"], description: "Crisp and pungent onions, a must-have for every Indian kitchen. (1kg)", stock: 45
      },
      {
        id: 'veg-04', name: "Cauliflower", price: 45, originalPrice: 55, rating: 4.6, reviews: 325,
        imageUrl: "https://www.jiomart.com/images/product/original/590000619/cauliflower-1-pc-...jpg", category: "Cruciferous", organic: true, discount: 18,
        tags: ["Fresh", "Seasonal"], description: "A fresh, whole cauliflower, great for roasting or making gobi masala. (1 pc)", stock: 20
      },
      {
        id: 'veg-05', name: "Cabbage", price: 30, originalPrice: 35, rating: 4.1, reviews: 270,
        imageUrl: "https://m.media-amazon.com/images/I/51vl9RzME3L._UF1000,1000_QL80_.jpg", category: "Cruciferous", organic: false, discount: 14,
        tags: ["Budget Pick", "Healthy"], description: "A crisp head of cabbage, perfect for coleslaw or sabzi. (1 pc)", stock: 25
      },
      {
        id: 'veg-06', name: "Carrots", price: 35, originalPrice: 42, rating: 4.7, reviews: 410,
        imageUrl: "https://cdn.shopaccino.com/rootz/products/carrots-1894040663788240_m.jpg?v=569", category: "Root Vegetables", organic: true, discount: 16,
        tags: ["Sweet", "Vitamin A"], description: "Sweet and crunchy carrots, excellent for salads, juices, and desserts. (500g)", stock: 0
      },
      {
        id: 'veg-07', name: "Green Beans", price: 40, originalPrice: 48, rating: 4.5, reviews: 200,
        imageUrl: "https://www.jiomart.com/images/product/original/590003549/french-beans-500-g.jpg", category: "Beans", organic: false, discount: 17,
        tags: ["Seasonal", "Fresh"], description: "Tender and crisp green beans, a great addition to any meal. (500g)", stock: 15
      },
      {
        id: 'veg-08', name: "Spinach Bunch", price: 25, originalPrice: 30, rating: 4.3, reviews: 350,
        imageUrl: "https://media.istockphoto.com/id/1006196472/photo/bunch-of-spinach-leaves.jpg", category: "Leafy Greens", organic: true, discount: 17,
        tags: ["Iron-Rich", "Healthy"], description: "A fresh bunch of spinach, packed with nutrients and flavor.", stock: 30
      },
      {
        id: 'veg-09', name: "Brinjal (Baingan)", price: 38, originalPrice: 45, rating: 4.4, reviews: 300,
        imageUrl: "https://www.jiomart.com/images/product/original/590003544/brinjal-black-big-500-g.jpg", category: "Daily Staples", organic: false, discount: 16,
        tags: ["Curry", "Roast"], description: "Large, glossy brinjals, perfect for bharta or sambar. (500g)", stock: 18
      },
      {
        id: 'veg-10', name: "Lady Finger (Okra)", price: 28, originalPrice: 35, rating: 4.5, reviews: 230,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/9/347028792/EQ/UG/LU/181390180/fresh-lady-finger.jpg", category: "Beans", organic: false, discount: 20,
        tags: ["Green Veggie", "Fry"], description: "Tender lady fingers, ideal for making crispy bhindi fry. (500g)", stock: 22
      },
      {
        id: 'veg-11', name: "Bottle Gourd (Lauki)", price: 35, originalPrice: 42, rating: 4.2, reviews: 150,
        imageUrl: "https://m.media-amazon.com/images/I/61vEbqIwwxL.jpg", category: "Gourds", organic: false, discount: 17,
        tags: ["Healthy", "Hydrating"], description: "A fresh bottle gourd, known for its health benefits and mild taste. (1 pc)", stock: 8
      },
      {
        id: 'veg-12', name: "Methi Leaves (Fenugreek)", price: 20, originalPrice: 25, rating: 4.4, reviews: 90,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000126_27-fresho-methi-leaves.jpg", category: "Leafy Greens", organic: true, discount: 20,
        tags: ["Aromatic", "Bitter"], description: "A fresh bunch of methi leaves, adding a distinct flavor to dishes.", stock: 28
      },
      {
        id: 'veg-13', name: "Coriander Bunch", price: 15, originalPrice: 20, rating: 4.6, reviews: 220,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000168_15-fresho-coriander.jpg", category: "Herbs", organic: true, discount: 25,
        tags: ["Garnish", "Fresh"], description: "Aromatic coriander to garnish your favorite dishes.", stock: 40
      },
      {
        id: 'veg-14', name: "Capsicum (Shimla Mirch)", price: 45, originalPrice: 55, rating: 4.5, reviews: 300,
        imageUrl: "https://5.imimg.com/data5/ECOM/Default/2023/10/353706719/YE/VT/DC/199273948/fresh-green-capsicum.jpg", category: "Peppers", organic: false, discount: 18,
        tags: ["Stir-fry", "Colorful"], description: "Crisp green capsicum, perfect for stir-fries, pizzas, and salads. (500g)", stock: 25
      },
      {
        id: 'veg-15', name: "Broccoli", price: 60, originalPrice: 75, rating: 4.8, reviews: 180,
        imageUrl: "https://m.media-amazon.com/images/I/71KrN6XOl8L.jpg", category: "Cruciferous", organic: true, discount: 20,
        tags: ["Superfood", "Healthy"], description: "A nutritious head of broccoli, rich in vitamins and minerals. (1 pc)", stock: 12
      },
      {
        id: 'veg-16', name: "Sweet Corn", price: 35, originalPrice: 45, rating: 4.6, reviews: 260,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000336_13-fresho-sweet-corn.jpg", category: "Daily Staples", organic: false, discount: 22,
        tags: ["Sweet", "Snack"], description: "Two pieces of sweet corn on the cob, perfect for boiling or roasting.", stock: 35
      },
      {
        id: 'veg-17', name: "Cucumber", price: 25, originalPrice: 30, rating: 4.5, reviews: 400,
        imageUrl: "https://images.zopnow.com/images/products/320/zopnow_cucumber-500-g.jpg", category: "Daily Staples", organic: true, discount: 17,
        tags: ["Hydrating", "Salad"], description: "Cool and crisp cucumbers, a refreshing addition to any salad or drink. (500g)", stock: 30
      },
      {
        id: 'veg-18', name: "Ginger (Adrak)", price: 50, originalPrice: 60, rating: 4.7, reviews: 380,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2021/1/DU/FV/QY/3918025/fresh-ginger.jpg", category: "Herbs", organic: false, discount: 17,
        tags: ["Aromatic", "Spice"], description: "Fragrant and spicy ginger, essential for teas and curries. (250g)", stock: 40
      },
      {
        id: 'veg-19', name: "Garlic (Lehsun)", price: 70, originalPrice: 85, rating: 4.6, reviews: 350,
        imageUrl: "https://www.jiomart.com/images/product/original/590000093/garlic-250-g-product-images-o590000093-p590000093-0-202203150222.jpg", category: "Herbs", organic: false, discount: 18,
        tags: ["Flavorful", "Spice"], description: "Potent and flavorful garlic bulbs to enhance your cooking. (250g)", stock: 35
      },
      {
        id: 'veg-20', name: "Lemon", price: 20, originalPrice: 25, rating: 4.5, reviews: 320,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000335_14-fresho-lemon.jpg", category: "Daily Staples", organic: false, discount: 20,
        tags: ["Citrus", "Vitamin C"], description: "A pack of juicy lemons, perfect for drinks, dressings, and seasoning. (4 pcs)", stock: 50
      },
      {
        id: 'veg-21', name: "Red Bell Pepper", price: 65, originalPrice: 80, rating: 4.7, reviews: 210,
        imageUrl: "https://cdn.shopify.com/s/files/1/0274/3481/articles/LYOFOOD-freeze-dried-vegetables-red-bell-pepper-organic_2048x.jpg?v=1576757138", category: "Peppers", organic: true, discount: 19,
        tags: ["Sweet", "Colorful"], description: "Sweet and vibrant red bell pepper, great for grilling and salads. (1 pc)", stock: 15
      },
      {
        id: 'veg-22', name: "Button Mushrooms", price: 55, originalPrice: 65, rating: 4.4, reviews: 190,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000282_13-fresho-mushroom-button.jpg", category: "Exotics", organic: false, discount: 15,
        tags: ["Umami", "Versatile"], description: "Fresh button mushrooms, perfect for soups, stir-fries, and pasta. (200g pack)", stock: 9
      },
      {
        id: 'veg-23', name: "Green Peas", price: 40, originalPrice: 50, rating: 4.3, reviews: 250,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40023481_2-fresho-green-peas.jpg", category: "Beans", organic: false, discount: 20,
        tags: ["Sweet", "Fresh"], description: "Sweet and tender green peas, a delicious addition to various dishes. (500g)", stock: 20
      },
      {
        id: 'veg-24', name: "Beetroot", price: 30, originalPrice: 38, rating: 4.6, reviews: 280,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000045_19-fresho-beetroot.jpg", category: "Root Vegetables", organic: true, discount: 21,
        tags: ["Earthy", "Healthy"], description: "Earthy and nutritious beetroots, great for salads, juices, and curries. (500g)", stock: 22
      },
      {
        id: 'veg-25', name: "Bitter Gourd (Karela)", price: 35, originalPrice: 45, rating: 4.2, reviews: 150,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000046_18-fresho-bitter-gourd.jpg", category: "Gourds", organic: true, discount: 22,
        tags: ["Healthy", "Bitter"], description: "Fresh bitter gourd, known for its numerous health benefits. (500g)", stock: 18
      },
      {
        id: 'veg-26', name: "Pumpkin (Kaddu)", price: 40, originalPrice: 50, rating: 4.5, reviews: 210,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000159_19-fresho-pumpkin-green.jpg", category: "Gourds", organic: false, discount: 20,
        tags: ["Sweet", "Versatile"], description: "A small green pumpkin, perfect for sweet and savory dishes. (Approx 1kg)", stock: 10
      },
      {
        id: 'veg-27', name: "Radish (Mooli)", price: 25, originalPrice: 30, rating: 4.3, reviews: 180,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000165_18-fresho-radish.jpg", category: "Root Vegetables", organic: false, discount: 17,
        tags: ["Pungent", "Salad"], description: "Crisp and pungent white radish, great for salads and parathas. (500g)", stock: 25
      },
      {
        id: 'veg-28', name: "Mint Leaves (Pudina)", price: 15, originalPrice: 20, rating: 4.6, reviews: 290,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000132_16-fresho-mint-leaves.jpg", category: "Herbs", organic: true, discount: 25,
        tags: ["Aromatic", "Cooling"], description: "A fresh bunch of mint leaves, perfect for chutneys and beverages.", stock: 35
      },
      {
        id: 'veg-29', name: "Green Chilli", price: 18, originalPrice: 22, rating: 4.4, reviews: 310,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000333_16-fresho-chilli-green.jpg", category: "Peppers", organic: false, discount: 18,
        tags: ["Spicy", "Hot"], description: "A pack of hot green chillies to add spice to your meals. (100g)", stock: 40
      },
      {
        id: 'veg-30', name: "Sweet Potato", price: 45, originalPrice: 55, rating: 4.7, reviews: 240,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000204_18-fresho-sweet-potato.jpg", category: "Root Vegetables", organic: true, discount: 18,
        tags: ["Sweet", "Healthy"], description: "Nutritious and sweet potatoes, perfect for roasting and fasting. (500g)", stock: 15
      },
      {
        id: 'veg-31', name: "Zucchini - Green", price: 50, originalPrice: 60, rating: 4.5, reviews: 160,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000210_18-fresho-zucchini-green.jpg", category: "Exotics", organic: true, discount: 17,
        tags: ["Exotic", "Grill"], description: "Fresh green zucchini, a versatile vegetable for grilling and salads. (500g)", stock: 12
      },
      {
        id: 'veg-32', name: "Ridge Gourd (Turai)", price: 38, originalPrice: 48, rating: 4.3, reviews: 170,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/10000172_18-fresho-ridge-gourd.jpg", category: "Gourds", organic: false, discount: 21,
        tags: ["Healthy", "Curry"], description: "Tender ridge gourd, a popular vegetable in Indian cuisine. (500g)", stock: 20
      }
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    let updated = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (categoryFilter !== "All") {
      updated = updated.filter((p) => p.category === categoryFilter);
    }

    updated = updated.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

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

  const handleAddToCart = useCallback((item) => {
    if (item.stock <= 0) {
      showToast(`${item.name} is out of stock!`, "error");
      return;
    }
    const inCart = cartItems.find((c) => c.id === item.id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (inCart) {
      if (inCart.quantity >= item.stock) {
        showToast(`Only ${item.stock} items available in stock!`, "error");
        return;
      }
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Added another • ${item.name} (x${nextQty})`, "success");
    } else {
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }

    setAnimatingProduct(item.id);
    timeoutRef.current = setTimeout(() => setAnimatingProduct(null), 500);
  }, [addToCart, updateQuantity, showToast, cartItems]);

  const handleIncrement = useCallback((item) => {
    const inCart = cartItems.find((c) => c.id === item.id);
    if (inCart) {
      if (inCart.quantity >= item.stock) {
        showToast(`Only ${item.stock} items available!`, "error");
        return;
      }
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Increased • ${item.name} (x${nextQty})`, "info");
    }
  }, [cartItems, updateQuantity, showToast]);

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

  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);

  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} size={14} className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
    ));
  }, []);

  const resetFilters = () => {
    setCategoryFilter("All");
    setPriceRange([0, 150]);
    setSearchTerm("");
  };
  
  const debouncedSearch = useRef(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (debouncedSearch.current) clearTimeout(debouncedSearch.current);
    debouncedSearch.current = setTimeout(() => setSearchTerm(value), 300);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-green-50 to-emerald-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Farm-Fresh Vegetables</h1>
        <p className="text-green-600">Handpicked daily to bring health and flavor to your table.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Truck className="mx-auto text-green-600 mb-2" size={24} /><p className="text-sm font-semibold">Fast Delivery</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Shield className="mx-auto text-green-600 mb-2" size={24} /><p className="text-sm font-semibold">Quality Assured</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Star className="mx-auto text-green-600 mb-2" size={24} /><p className="text-sm font-semibold">Top Rated</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Filter className="mx-auto text-green-600 mb-2" size={24} /><p className="text-sm font-semibold">Organic Options</p></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-green-600" size={20} />
          <input type="text" placeholder="Search for vegetables..."
            className="w-full border border-green-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryFilter === category ? "bg-green-500 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"}`}
              onClick={() => setCategoryFilter(category)} >
              {category}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="md:hidden flex items-center gap-1 px-3 py-2 bg-green-100 text-green-800 rounded-full" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />{showFilters ? <X size={16} /> : "Filters"}
          </button>
          <select className={`border border-green-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 bg-white ${showFilters ? "flex" : "hidden md:flex"}`}
            value={sortOption} onChange={(e) => setSortOption(e.target.value)} >
            <option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Top Rated</option><option>Most Popular</option>
          </select>
        </div>
      </div>

      <div className={`bg-white p-4 rounded-2xl shadow-md mb-8 ${showFilters ? "block" : "hidden md:block"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-green-900">Advanced Filters</h3>
          <button className="text-green-600 text-sm flex items-center" onClick={() => setShowMoreFilters(!showMoreFilters)}>
            {showMoreFilters ? "Show Less" : "More Filters"}{showMoreFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showMoreFilters ? "block" : "hidden md:grid"}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">0</span>
              <input type="range" min="0" max="150" step="5" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <input type="range" min="0" max="150" step="5" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <span className="text-xs text-gray-500">150</span>
            </div>
          </div>
          <div className="flex items-end"><button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200" onClick={resetFilters}>Reset Filters</button></div>
        </div>
      </div>

      <div className="mb-6"><p className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          const inCart = cartItems.find((c) => c.id === item.id);
          const currentQuantity = inCart ? inCart.quantity : 0;
          const isInWishlist = wishlist.find((w) => w.id === item.id);
          const isOutOfStock = item.stock <= 0;

          return (
            <div key={item.id} className={`bg-white rounded-2xl shadow-md hover:shadow-lg p-5 relative transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${isOutOfStock ? 'opacity-70' : ''}`}>
              {item.discount > 0 && <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">SAVE {item.discount}%</div>}
              {item.organic && <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold z-10">🌱 ORGANIC</div>}
              {isOutOfStock && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm font-bold z-20">OUT OF STOCK</div>}

              <button className="absolute top-4 right-4 z-10" onClick={() => !isOutOfStock && handleWishlistToggle(item)} disabled={isOutOfStock}>
                <Heart className={isInWishlist ? "fill-red-500 text-red-500" : isOutOfStock ? "text-gray-300 cursor-not-allowed" : "text-gray-300 hover:text-red-500"} size={24} />
              </button>

              <div className="h-48 flex items-center justify-center mb-4"><img src={item.imageUrl} alt={item.name} className="max-h-44 mx-auto object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" /></div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 overflow-hidden">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2 h-10">{item.description}</p>
              <div className="flex items-center mb-2">{renderStars(item.rating)}<span className="text-sm text-gray-500 ml-1">({item.reviews.toLocaleString()})</span></div>
              <div className="mb-4">
                <span className="text-xl font-bold text-green-700">₹{item.price.toLocaleString()}</span>
                {item.originalPrice && <span className="text-sm line-through text-gray-400 ml-2">₹{item.originalPrice.toLocaleString()}</span>}
              </div>

              {!isOutOfStock && item.stock < 10 && <div className="mb-2 text-xs text-red-600">Only {item.stock} left in stock!</div>}
              <div className="flex flex-wrap gap-1 mb-3">{item.tags.map(tag => <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{tag}</span>)}</div>

              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-green-300 rounded-full overflow-hidden bg-green-50">
                    <button onClick={() => !isOutOfStock && handleDecrement(item)} className="p-2 text-green-700 hover:bg-green-200" disabled={isOutOfStock}>
                      {currentQuantity === 1 ? <Trash2 size={14} /> : <Minus size={16} />}
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-800 min-w-[2rem] text-center">{currentQuantity}</span>
                    <button onClick={() => !isOutOfStock && handleIncrement(item)} className="p-2 text-green-700 hover:bg-green-200" disabled={isOutOfStock || currentQuantity >= item.stock}>
                      <Plus size={16} />
                    </button>
                  </div>
                ) : <div className="w-10"></div>}
                <button onClick={() => !isOutOfStock && handleAddToCart(item)} disabled={isOutOfStock}
                  className={`relative flex items-center justify-center rounded-full p-3 shadow-md transition-all duration-300 transform ${currentQuantity > 0 ? "bg-green-700 text-white hover:bg-green-800" : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"} ${animatingProduct === item.id ? 'animate-bounce' : ''} disabled:bg-gray-400 disabled:cursor-not-allowed`} >
                  <ShoppingCart size={18} />
                  {currentQuantity > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{currentQuantity}</span>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No vegetables found. Try adjusting your filters.</p>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={resetFilters}>Reset All Filters</button>
        </div>
      )}
    </div>
  );
};

export default Vegetables;