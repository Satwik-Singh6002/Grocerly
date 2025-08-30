import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield, Snowflake } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const FrozenFoods = () => {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
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
        id: 'ff-01', name: "McCain French Fries", price: 120, originalPrice: 140, rating: 4.6, reviews: 820,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZRz4Z9CFPX3oynhkK0Cx-cCg38mJXYOlIA&s", category: "Snacks", isVeg: true,
        tags: ["Classic", "Party"], description: "Classic, crispy golden French fries, ready to fry and enjoy. (750g)", stock: 25
      },
      {
        id: 'ff-02', name: "Sumeru Green Peas", price: 85, originalPrice: 95, rating: 4.5, reviews: 640,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGHanaxYx74IS-IMLbrHWE1MuCxVgSBq-tLA&s", category: "Vegetables", isVeg: true,
        tags: ["Fresh Frozen", "Essential"], description: "Tender and sweet green peas, frozen to lock in freshness. (500g)", stock: 30
      },
      {
        id: 'ff-03', name: "Godrej Yummiez Chicken Nuggets", price: 180, originalPrice: 200, rating: 4.7, reviews: 940,
        imageUrl: "https://m.media-amazon.com/images/I/61p3fjlJl0L.jpg", category: "Meat & Poultry", isVeg: false,
        tags: ["Best Seller", "Ready to Cook"], description: "Juicy chicken nuggets with a crispy coating, a favorite for all ages. (400g)", stock: 15
      },
      {
        id: 'ff-04', name: "ITC Master Chef Veg Patty", price: 110, originalPrice: 125, rating: 4.5, reviews: 580,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6eRXNEzTP_Z1uiZGKRmQlQqg2iBViXZreKQ&s", category: "Snacks", isVeg: true,
        tags: ["Burger Patty", "Snack Time"], description: "Flavorful vegetable patties, perfect for making burgers or as a side snack. (500g)", stock: 18
      },
      {
        id: 'ff-05', name: "Mother Dairy Vanilla Ice Cream", price: 160, originalPrice: 180, rating: 4.6, reviews: 830,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFpMvvJGBq7hbByeFAIWB5uVM74dh58fRhA&s", category: "Desserts", isVeg: true,
        tags: ["Classic", "Family Pack"], description: "Creamy and rich vanilla ice cream, a timeless dessert for everyone. (1L Tub)", stock: 20
      },
      {
        id: 'ff-06', name: "McCain Aloo Tikki", price: 105, originalPrice: 120, rating: 4.4, reviews: 770,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHx-fDfksaR18P1cDY73TAHvT_aTmJATD_TQ&s", category: "Snacks", isVeg: true,
        tags: ["Popular", "Indian Snack"], description: "Authentic aloo tikki with a blend of Indian spices, crispy on the outside. (420g)", stock: 0
      },
      {
        id: 'ff-07', name: "Safal Mixed Vegetables", price: 70, originalPrice: 80, rating: 4.3, reviews: 410,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6mugqQd6fNj2sIdBhHhTlSwLnzzVjaDC_Q&s", category: "Vegetables", isVeg: true,
        tags: ["Healthy Mix", "Convenient"], description: "A convenient mix of carrots, beans, peas, and cauliflower for quick meals. (500g)", stock: 22
      },
      {
        id: 'ff-08', name: "Amul Frozen Paneer", price: 90, originalPrice: 105, rating: 4.5, reviews: 680,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHgn-wVz0T5IOg-dklTTuAtDFF4bBAKGEHQ&s", category: "Dairy", isVeg: true,
        tags: ["Protein Rich", "Staple"], description: "Soft and fresh paneer cubes, frozen for longer shelf life. (200g)", stock: 12
      },
      {
        id: 'ff-09', name: "Vadilal Ice Cream Choco Bar", price: 25, originalPrice: 30, rating: 4.6, reviews: 520,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_CfVs11yqZY-HnXNGr_2ONIg-WIXVaxvOJw&s", category: "Desserts", isVeg: true,
        tags: ["Kids Favorite", "Chocolate"], description: "Classic vanilla ice cream bar coated in a thick layer of rich chocolate.", stock: 40
      },
      {
        id: 'ff-10', name: "Godrej Yummiez Chicken Sausages", price: 210, originalPrice: 240, rating: 4.7, reviews: 400,
        imageUrl: "https://m.media-amazon.com/images/I/61mqGowt0wL.jpg", category: "Meat & Poultry", isVeg: false,
        tags: ["Breakfast", "Sausages"], description: "Juicy and flavorful chicken sausages, perfect for breakfast or snacks. (500g)", stock: 10
      },
      {
        id: 'ff-11', name: "McCain Cheese Shots", price: 150, originalPrice: 170, rating: 4.6, reviews: 530,
        imageUrl: "https://m.media-amazon.com/images/I/711FyPiomeL.jpg", category: "Snacks", isVeg: true,
        tags: ["Cheesy", "Party Snack"], description: "Bite-sized potato shots filled with a core of gooey, melted cheese. (400g)", stock: 14
      },
      {
        id: 'ff-12', name: "Kwality Walls Cornetto", price: 50, originalPrice: 60, rating: 4.7, reviews: 870,
        imageUrl: "https://m.media-amazon.com/images/I/71GM9wSHL3L.jpg", category: "Desserts", isVeg: true,
        tags: ["Cone", "Chocolate Tip"], description: "The classic Cornetto cone with a creamy core and a crunchy chocolate tip.", stock: 35
      },
      {
        id: 'ff-13', name: "Sumeru Sweet Corn", price: 95, originalPrice: 110, rating: 4.5, reviews: 390,
        imageUrl: "https://m.media-amazon.com/images/I/71jBWwXoHNL.jpg", category: "Vegetables", isVeg: true,
        tags: ["Sweet", "Versatile"], description: "Sweet and juicy corn kernels, frozen for convenience. (500g)", stock: 28
      },
      {
        id: 'ff-14', name: "ITC Master Chef Crispy Fish Fillets", price: 230, originalPrice: 260, rating: 4.6, reviews: 360,
        imageUrl: "https://m.media-amazon.com/images/I/81dQk+ddHzL.jpg", category: "Seafood", isVeg: false,
        tags: ["Seafood", "Crispy"], description: "Tender fish fillets in a crispy, golden batter. Ready to fry. (300g)", stock: 8
      },
      {
        id: 'ff-15', name: "McCain Smiles", price: 130, originalPrice: 150, rating: 4.8, reviews: 690,
        imageUrl: "https://m.media-amazon.com/images/I/81kTi7DRmdL.jpg", category: "Snacks", isVeg: true,
        tags: ["Kids Favorite", "Fun Shape"], description: "Fun, smiley-shaped mashed potato snacks that are fluffy inside and crispy outside. (450g)", stock: 20
      },
      {
        id: 'ff-16', name: "Kwality Walls Magnum Almond", price: 95, originalPrice: 110, rating: 4.9, reviews: 420,
        imageUrl: "https://m.media-amazon.com/images/I/81wDa3IRmgL.jpg", category: "Desserts", isVeg: true,
        tags: ["Premium", "Indulgent"], description: "Velvety vanilla ice cream covered in a thick layer of Belgian chocolate and crunchy almonds.", stock: 15
      },
      {
        id: 'ff-17', name: "ID Fresho Malabar Parota", price: 90, originalPrice: 100, rating: 4.6, reviews: 750,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40003525_3-id-fresho-food-malabar-parota.jpg", category: "Breads & Dough", isVeg: true,
        tags: ["Paratha", "Ready to Cook"], description: "Flaky and layered Malabar parotas, ready to heat and serve. (5 pcs)", stock: 25
      },
      {
        id: 'ff-18', name: "Prasuma Veg Momos", price: 160, originalPrice: 180, rating: 4.5, reviews: 680,
        imageUrl: "https://prasuma.com/cdn/shop/files/Artboard1-2_5_2e591461-12ef-4595-b51f-d31ac9c48873_1200x.jpg?v=1708343166", category: "Snacks", isVeg: true,
        tags: ["Momos", "Steamed"], description: "Delicious vegetable-filled momos with a thin wrapper, ready to steam or pan-fry. (24 pcs)", stock: 12
      },
      {
        id: 'ff-19', name: "Gits Frozen Samosas", price: 115, originalPrice: 130, rating: 4.4, reviews: 550,
        imageUrl: "https://gitsfood.com/cdn/shop/products/punjabi-samosa-2.jpg?v=1646720516", category: "Snacks", isVeg: true,
        tags: ["Samosa", "Indian Snack"], description: "Crispy, triangular pastries filled with a savory spiced potato and pea mixture. (400g)", stock: 18
      },
      {
        id: 'ff-20', name: "Amul Kulfi", price: 40, originalPrice: 45, rating: 4.7, reviews: 890,
        imageUrl: "https://www.jiomart.com/images/product/original/490192534/amul-kesar-kulfi-60-ml-product-images-o490192534-p490192534-0-202305261353.jpg", category: "Desserts", isVeg: true,
        tags: ["Kulfi", "Indian Dessert"], description: "Traditional Indian ice cream with a rich, dense, and creamy texture.", stock: 30
      },
      {
        id: 'ff-21', name: "Gadré Crab Sticks", price: 250, originalPrice: 280, rating: 4.6, reviews: 310,
        imageUrl: "https://www.gadreco.com/cdn/shop/products/crab-sticks_1.jpg?v=1641881763", category: "Seafood", isVeg: false,
        tags: ["Seafood", "Ready to Eat"], description: "Tender and flavorful crab-flavored surimi sticks, perfect for salads and appetizers. (250g)", stock: 7
      },
      {
        id: 'ff-22', name: "Goeld Vegetable Spring Rolls", price: 140, originalPrice: 160, rating: 4.3, reviews: 450,
        imageUrl: "https://goeld.com/wp-content/uploads/2021/04/Veg-Spring-Roll.jpg", category: "Snacks", isVeg: true,
        tags: ["Spring Roll", "Party Snack"], description: "Crispy spring rolls filled with a delicious mix of stir-fried vegetables. (240g)", stock: 16
      },
      {
        id: 'ff-23', name: "Baskin Robbins Choco Fudge Tub", price: 350, originalPrice: 380, rating: 4.8, reviews: 950,
        imageUrl: "https://m.media-amazon.com/images/I/71oJ3D05RTL.jpg", category: "Desserts", isVeg: true,
        tags: ["Ice Cream", "Indulgent"], description: "Rich chocolate ice cream with a thick fudge ribbon swirled through. (700ml Tub)", stock: 10
      },
      {
        id: 'ff-24', name: "Buffet Chicken Seekh Kebab", price: 220, originalPrice: 250, rating: 4.5, reviews: 480,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40203362_2-buffet-chicken-seekh-kebab.jpg", category: "Meat & Poultry", isVeg: false,
        tags: ["Kebab", "Ready to Cook"], description: "Spicy and succulent chicken seekh kebabs, marinated in traditional spices. (250g)", stock: 0
      },
      {
        id: 'ff-25', name: "Amul Cheese Slices", price: 135, originalPrice: 145, rating: 4.7, reviews: 1200,
        imageUrl: "https://www.amul.com/files/products/cheese-slices-100g-new.png", category: "Dairy", isVeg: true,
        tags: ["Cheese", "Sandwich"], description: "Individually wrapped creamy cheese slices, perfect for sandwiches and burgers. (200g)", stock: 30
      },
      {
        id: 'ff-26', name: "Prasuma Chicken Momos", price: 180, originalPrice: 200, rating: 4.6, reviews: 720,
        imageUrl: "https://prasuma.com/cdn/shop/files/Artboard1_2_1200x.jpg?v=1708343152", category: "Meat & Poultry", isVeg: false,
        tags: ["Momos", "Non-Veg"], description: "Authentic Himalayan-style chicken momos, juicy and full of flavor. (24 pcs)", stock: 14
      },
      {
        id: 'ff-27', name: "Kawan Flaky Paratha", price: 110, originalPrice: 125, rating: 4.5, reviews: 610,
        imageUrl: "https://cdn.shopify.com/s/files/1/0550/9300/4252/products/40003541_5-kawan-paratha-flaky.jpg?v=1647417534", category: "Breads & Dough", isVeg: true,
        tags: ["Paratha", "Breakfast"], description: "Multi-layered flaky parathas that turn golden brown when cooked. (400g)", stock: 20
      },
      {
        id: 'ff-28', name: "Amul Malai Paneer Cubes", price: 95, originalPrice: 110, rating: 4.6, reviews: 850,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/11/361093121/SA/SV/DA/11145025/amul-malai-paneer-200g-pouch-500x500.jpg", category: "Dairy", isVeg: true,
        tags: ["Paneer", "Fresh"], description: "Soft and creamy malai paneer cubes, perfect for all your paneer dishes. (200g)", stock: 9
      },
      {
        id: 'ff-29', name: "Gadre Premium Surimi Prawns", price: 280, originalPrice: 310, rating: 4.4, reviews: 290,
        imageUrl: "https://www.gadreco.com/cdn/shop/products/prawns_1.jpg?v=1641882046", category: "Seafood", isVeg: false,
        tags: ["Prawns", "Surimi"], description: "Ready-to-cook surimi prawns that have the texture and taste of real prawns. (250g)", stock: 6
      },
      {
        id: 'ff-30', name: "Vadilal Cassata Ice Cream Slice", price: 60, originalPrice: 70, rating: 4.5, reviews: 500,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/265005_3-vadilal-cassata-ice-cream.jpg", category: "Desserts", isVeg: true,
        tags: ["Cassata", "Multi-layer"], description: "A classic slice of cassata ice cream with layers of cake, nuts, and tutti-frutti. (1 pc)", stock: 25
      },
      {
        id: 'ff-31', name: "Aashirvaad Whole Wheat Naan", price: 100, originalPrice: 115, rating: 4.3, reviews: 450,
        imageUrl: "https://www.aashirvaad.com/img/naan/frozen-naan-pack.png", category: "Breads & Dough", isVeg: true,
        tags: ["Naan", "Indian Bread"], description: "Soft and fluffy whole wheat naans, ready to heat and pair with your favorite curry. (4 pcs)", stock: 17
      },
      {
        id: 'ff-32', name: "McCain Super Wedges", price: 125, originalPrice: 145, rating: 4.6, reviews: 580,
        imageUrl: "https://m.media-amazon.com/images/I/815l2uVOaNL.jpg", category: "Snacks", isVeg: true,
        tags: ["Potato Wedges", "Seasoned"], description: "Thick-cut potato wedges with a savory seasoning, crispy and delicious. (750g)", stock: 19
      },
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
        showToast(`Only ${item.stock} items available!`, "error");
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
    setPriceRange([0, 500]);
    setSearchTerm("");
  };
  
  const debouncedSearch = useRef(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (debouncedSearch.current) clearTimeout(debouncedSearch.current);
    debouncedSearch.current = setTimeout(() => setSearchTerm(value), 300);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-blue-50 to-cyan-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Cool & Convenient Frozen Foods</h1>
        <p className="text-blue-600">Quick meals, tasty snacks, and delicious desserts, ready in minutes.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Truck className="mx-auto text-blue-600 mb-2" size={24} /><p className="text-sm font-semibold">Quick Delivery</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Shield className="mx-auto text-blue-600 mb-2" size={24} /><p className="text-sm font-semibold">Trusted Brands</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Star className="mx-auto text-blue-600 mb-2" size={24} /><p className="text-sm font-semibold">Top Rated</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Snowflake className="mx-auto text-blue-600 mb-2" size={24} /><p className="text-sm font-semibold">Always Frozen</p></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-blue-600" size={20} />
          <input type="text" placeholder="Search for frozen foods..."
            className="w-full border border-blue-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryFilter === category ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
              onClick={() => setCategoryFilter(category)} >
              {category}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="md:hidden flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-full" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />{showFilters ? <X size={16} /> : "Filters"}
          </button>
          <select className={`border border-blue-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white ${showFilters ? "flex" : "hidden md:flex"}`}
            value={sortOption} onChange={(e) => setSortOption(e.target.value)} >
            <option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Top Rated</option><option>Most Popular</option>
          </select>
        </div>
      </div>

      <div className={`bg-white p-4 rounded-2xl shadow-md mb-8 ${showFilters ? "block" : "hidden md:block"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-blue-900">Advanced Filters</h3>
          <button className="text-blue-600 text-sm flex items-center" onClick={() => setShowMoreFilters(!showMoreFilters)}>
            {showMoreFilters ? "Show Less" : "More Filters"}{showMoreFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showMoreFilters ? "block" : "hidden md:grid"}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">0</span>
              <input type="range" min="0" max="500" step="10" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
              <input type="range" min="0" max="500" step="10" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
              <span className="text-xs text-gray-500">500</span>
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
              {!item.isVeg && <div className="absolute top-4 left-4 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold z-10">NON-VEG</div>}
              {item.isVeg && <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold z-10">VEG</div>}
              {isOutOfStock && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm font-bold z-20">OUT OF STOCK</div>}

              <button className="absolute top-4 right-4 z-10" onClick={() => !isOutOfStock && handleWishlistToggle(item)} disabled={isOutOfStock}>
                <Heart className={isInWishlist ? "fill-red-500 text-red-500" : isOutOfStock ? "text-gray-300 cursor-not-allowed" : "text-gray-300 hover:text-red-500"} size={24} />
              </button>

              <div className="h-48 flex items-center justify-center mb-4"><img src={item.imageUrl} alt={item.name} className="max-h-44 mx-auto object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" /></div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 overflow-hidden">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2 h-10">{item.description}</p>
              <div className="flex items-center mb-2">{renderStars(item.rating)}<span className="text-sm text-gray-500 ml-1">({item.reviews.toLocaleString()})</span></div>
              <div className="mb-4">
                <span className="text-xl font-bold text-blue-700">₹{item.price.toLocaleString()}</span>
                {item.originalPrice && <span className="text-sm line-through text-gray-400 ml-2">₹{item.originalPrice.toLocaleString()}</span>}
              </div>

              {!isOutOfStock && item.stock < 10 && <div className="mb-2 text-xs text-red-600">Only {item.stock} left in stock!</div>}
              <div className="flex flex-wrap gap-1 mb-3 h-6 overflow-hidden">{item.tags.map(tag => <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{tag}</span>)}</div>

              <div className="flex items-center justify-between mt-2">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-blue-300 rounded-full overflow-hidden bg-blue-50">
                    <button onClick={() => !isOutOfStock && handleDecrement(item)} className="p-2 text-blue-700 hover:bg-blue-200" disabled={isOutOfStock}>
                      {currentQuantity === 1 ? <Trash2 size={14} /> : <Minus size={16} />}
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-800 min-w-[2rem] text-center">{currentQuantity}</span>
                    <button onClick={() => !isOutOfStock && handleIncrement(item)} className="p-2 text-blue-700 hover:bg-blue-200" disabled={isOutOfStock || currentQuantity >= item.stock}>
                      <Plus size={16} />
                    </button>
                  </div>
                ) : <div className="w-10"></div>}
                <button onClick={() => !isOutOfStock && handleAddToCart(item)} disabled={isOutOfStock}
                  className={`relative flex items-center justify-center rounded-full p-3 shadow-md transition-all duration-300 transform ${currentQuantity > 0 ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"} ${animatingProduct === item.id ? 'animate-bounce' : ''} disabled:bg-gray-400 disabled:cursor-not-allowed`} >
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
          <p className="text-gray-500 text-lg mb-4">No products found. Try adjusting your filters.</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={resetFilters}>Reset All Filters</button>
        </div>
      )}
    </div>
  );
};

export default FrozenFoods;