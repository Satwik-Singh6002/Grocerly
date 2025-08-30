import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Bakery = () => {
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

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Products data - 32 bakery products
  const products = useMemo(
    () => [
        {
            id: "bak-01", name: "Artisanal Sourdough Loaf", price: 180, originalPrice: 200, rating: 4.8, reviews: 258,
            imageUrl: "https://images.unsplash.com/photo-1586448900407-7397af48d116?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: true, discount: 10,
            tags: ["Best Seller", "Artisanal"],
            description: "A classic sourdough with a crispy crust and chewy interior, made from organic flour.", stock: 15
        },
        {
            id: "bak-02", name: "Flaky Butter Croissant", price: 90, originalPrice: 100, rating: 4.9, reviews: 432,
            imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f24d8c7?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: false, discount: 10,
            tags: ["Classic", "Breakfast"],
            description: "Light, airy, and buttery layers make this the perfect Parisian breakfast treat.", stock: 25
        },
        {
            id: "bak-03", name: "Decadent Chocolate Truffle Cake (Slice)", price: 250, originalPrice: 280, rating: 4.9, reviews: 512,
            imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=60",
            category: "Cake", organic: false, discount: 11,
            tags: ["Indulgent", "Chocolate"],
            description: "A rich and moist chocolate cake slice with a smooth, velvety truffle frosting.", stock: 10
        },
        {
            id: "bak-04", name: "Organic Blueberry Muffin", price: 110, originalPrice: 125, rating: 4.7, reviews: 310,
            imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=60",
            category: "Muffin", organic: true, discount: 12,
            tags: ["Organic", "Fruity"],
            description: "A soft, fluffy muffin bursting with fresh, organic blueberries and a hint of lemon.", stock: 18
        },
        {
            id: "bak-05", name: "Assorted Cookie Box (6 pcs)", price: 220, originalPrice: 250, rating: 4.6, reviews: 288,
            imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=60",
            category: "Cookies", organic: false, discount: 12,
            tags: ["Variety Pack", "Gift Idea"],
            description: "A delightful mix of chocolate chip, oatmeal raisin, and double chocolate cookies.", stock: 20
        },
        {
            id: "bak-06", name: "Cinnamon Swirl Danish", price: 120, originalPrice: 135, rating: 4.8, reviews: 350,
            imageUrl: "https://images.unsplash.com/photo-1612927601605-ef98b49972d8?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: false, discount: 11,
            tags: ["Sweet", "Iced"],
            description: "A buttery pastry with a sweet cinnamon filling, topped with a delicious cream cheese glaze.", stock: 12
        },
        {
            id: "bak-07", name: "Everything Bagel", price: 70, originalPrice: 80, rating: 4.5, reviews: 190,
            imageUrl: "https://plus.unsplash.com/premium_photo-1669680785610-3843b61a75a7?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: true, discount: 13,
            tags: ["Savory", "Toasted"],
            description: "A chewy, New York-style bagel topped with a savory blend of seeds and spices.", stock: 30
        },
        {
            id: "bak-08", name: "Red Velvet Cupcake", price: 130, originalPrice: 150, rating: 4.7, reviews: 295,
            imageUrl: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=500&q=60",
            category: "Cake", organic: false, discount: 13,
            tags: ["Cream Cheese", "Classic"],
            description: "A moist red velvet cupcake with a tangy, rich cream cheese frosting.", stock: 0
        },
        {
            id: "bak-09", name: "Whole Wheat Sandwich Bread", price: 80, originalPrice: 90, rating: 4.4, reviews: 155,
            imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: true, discount: 11,
            tags: ["Healthy", "Family Size"],
            description: "Soft and wholesome whole wheat bread, perfect for sandwiches and toast.", stock: 22
        },
        {
            id: "bak-10", name: "Glazed Cinnamon Roll", price: 140, originalPrice: 160, rating: 4.9, reviews: 480,
            imageUrl: "https://images.unsplash.com/photo-1590083745206-4405e574c4f4?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: false, discount: 13,
            tags: ["Popular", "Sweet Treat"],
            description: "A giant, gooey cinnamon roll covered in a sweet vanilla glaze. Irresistibly good.", stock: 8
        },
        {
            id: "bak-11", name: "Classic French Baguette", price: 100, originalPrice: 110, rating: 4.6, reviews: 215,
            imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: false, discount: 9,
            tags: ["Crusty", "French"],
            description: "A long, thin loaf of French bread with a crisp crust, perfect for any meal.", stock: 17
        },
        {
            id: "bak-12", name: "Fresh Fruit Tart", price: 280, originalPrice: 320, rating: 4.8, reviews: 330,
            imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: true, discount: 13,
            tags: ["Elegant", "Dessert"],
            description: "A buttery tart shell filled with vanilla pastry cream and topped with fresh seasonal fruits.", stock: 9
        },
        {
            id: "bak-13", name: "Chocolate Chip Muffin", price: 100, originalPrice: 115, rating: 4.6, reviews: 250,
            imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=60",
            category: "Muffin", organic: false, discount: 13,
            tags: ["Chocolate", "Snack"],
            description: "A classic muffin loaded with milk chocolate chips for a sweet bite every time.", stock: 20
        },
        {
            id: "bak-14", name: "New York Cheesecake (Slice)", price: 260, originalPrice: 290, rating: 4.9, reviews: 450,
            imageUrl: "https://images.unsplash.com/photo-1565599244243-be4a148a2722?auto=format&fit=crop&w=500&q=60",
            category: "Cake", organic: false, discount: 10,
            tags: ["Rich", "Creamy"],
            description: "A dense, rich, and creamy New York-style cheesecake with a graham cracker crust.", stock: 11
        },
        {
            id: "bak-15", name: "Almond Croissant", price: 150, originalPrice: 170, rating: 4.8, reviews: 380,
            imageUrl: "https://images.unsplash.com/photo-1588626242490-505c2d3d9655?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: false, discount: 12,
            tags: ["Nutty", "Premium"],
            description: "A delicious croissant filled with almond paste, topped with sliced almonds and powdered sugar.", stock: 14
        },
        {
            id: "bak-16", name: "Oatmeal Raisin Cookies (Pack of 4)", price: 180, originalPrice: 200, rating: 4.5, reviews: 195,
            imageUrl: "https://images.unsplash.com/photo-1590301476994-e8b2b733190e?auto=format&fit=crop&w=500&q=60",
            category: "Cookies", organic: true, discount: 10,
            tags: ["Healthy", "Chewy"],
            description: "Chewy and hearty oatmeal cookies packed with sweet raisins and a hint of cinnamon.", stock: 25
        },
        {
            id: "bak-17", name: "Multigrain Bread Loaf", price: 95, originalPrice: 110, rating: 4.6, reviews: 180,
            imageUrl: "https://images.unsplash.com/photo-1572918193264-45313054a32a?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: true, discount: 14,
            tags: ["Nutritious", "Seeded"],
            description: "A nutrient-rich bread made with a blend of whole grains and seeds for great texture and flavor.", stock: 19
        },
        {
            id: "bak-18", name: "Fudgy Chocolate Brownie", price: 120, originalPrice: 130, rating: 4.7, reviews: 310,
            imageUrl: "https://images.unsplash.com/photo-1590841793188-07e4d048d42d?auto=format&fit=crop&w=500&q=60",
            category: "Cake", organic: false, discount: 8,
            tags: ["Fudgy", "Intense"],
            description: "An intensely rich and fudgy brownie with a crackly top. Perfect for chocolate lovers.", stock: 28
        },
        {
            id: "bak-19", name: "Glazed Donut", price: 80, originalPrice: 90, rating: 4.5, reviews: 290,
            imageUrl: "https://images.unsplash.com/photo-1551024601-bec78d8d5904?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: false, discount: 11,
            tags: ["Classic", "Sweet"],
            description: "A light and fluffy yeast-raised donut covered in a sweet, simple glaze.", stock: 35
        },
        {
            id: "bak-20", name: "Banana Walnut Bread (Slice)", price: 110, originalPrice: 125, rating: 4.6, reviews: 220,
            imageUrl: "https://images.unsplash.com/photo-1623952327433-228d8b940a04?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: true, discount: 12,
            tags: ["Moist", "Homemade"],
            description: "A moist and flavorful slice of banana bread, packed with crunchy walnuts.", stock: 16
        },
        {
            id: "bak-21", name: "Lemon Drizzle Loaf Cake (Slice)", price: 130, originalPrice: 145, rating: 4.8, reviews: 280,
            imageUrl: "https://images.unsplash.com/photo-1543508287-7af6595267a5?auto=format&fit=crop&w=500&q=60",
            category: "Cake", organic: false, discount: 10,
            tags: ["Zesty", "Tangy"],
            description: "A zesty and moist lemon loaf cake soaked in a tangy lemon syrup and topped with a sweet glaze.", stock: 13
        },
        {
            id: "bak-22", name: "Savory Cheese Straws (100g)", price: 150, rating: 4.5, reviews: 150,
            imageUrl: "https://images.unsplash.com/photo-1621288279973-874a7f0ba2b4?auto=format&fit=crop&w=500&q=60",
            category: "Savory", organic: false, discount: 0,
            tags: ["Cheesy", "Snack"],
            description: "Crispy, flaky puff pastry straws baked with sharp cheddar cheese and a hint of cayenne.", stock: 24
        },
        {
            id: "bak-23", name: "Pain au Chocolat", price: 120, originalPrice: 130, rating: 4.7, reviews: 340,
            imageUrl: "https://images.unsplash.com/photo-1549615428-21f42d4b31e1?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: false, discount: 8,
            tags: ["Chocolate", "French"],
            description: "A buttery, flaky pastry with two sticks of rich dark chocolate baked inside.", stock: 0
        },
        {
            id: "bak-24", name: "Macarons Gift Box (Assorted 5 pcs)", price: 350, originalPrice: 380, rating: 4.9, reviews: 400,
            imageUrl: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&w=500&q=60",
            category: "Cookies", organic: false, discount: 8,
            tags: ["Luxury", "Gift"],
            description: "An elegant box of 5 delicate French macarons in assorted flavors like pistachio, rose, and vanilla.", stock: 7
        },
        {
            id: "bak-25", name: "Rosemary Focaccia Bread", price: 160, rating: 4.6, reviews: 175,
            imageUrl: "https://images.unsplash.com/photo-1579533722933-559410a8c27f?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: true, discount: 0,
            tags: ["Herby", "Italian"],
            description: "Soft, chewy Italian bread topped with fresh rosemary, coarse sea salt, and a drizzle of olive oil.", stock: 10
        },
        {
            id: "bak-26", name: "Apple Crumble Tartlet", price: 180, originalPrice: 200, rating: 4.7, reviews: 260,
            imageUrl: "https://images.unsplash.com/photo-1622397728923-a02a01217e6e?auto=format&fit=crop&w=500&q=60",
            category: "Pastry", organic: true, discount: 10,
            tags: ["Fruity", "Comfort Food"],
            description: "A personal-sized tart with a sweet apple filling and a crunchy oat crumble topping.", stock: 15
        },
        {
            id: "bak-27", name: "Carrot Cake (Slice)", price: 200, originalPrice: 220, rating: 4.8, reviews: 320,
            imageUrl: "https://images.unsplash.com/photo-1623953392418-20412852109e?auto=format&fit=crop&w=500&q=60",
            category: "Cake", organic: true, discount: 9,
            tags: ["Spiced", "Cream Cheese"],
            description: "A moist, spiced carrot cake packed with walnuts and topped with a classic cream cheese frosting.", stock: 12
        },
        {
            id: "bak-28", name: "Double Chocolate Chip Muffin", price: 115, originalPrice: 130, rating: 4.8, reviews: 290,
            imageUrl: "https://images.unsplash.com/photo-1607958999187-b333a3c1050b?auto=format&fit=crop&w=500&q=60",
            category: "Muffin", organic: false, discount: 12,
            tags: ["Indulgent", "Chocolate"],
            description: "A rich chocolate muffin base loaded with both milk and dark chocolate chips.", stock: 20
        },
        {
            id: "bak-29", name: "Pretzel with Sea Salt", price: 90, rating: 4.4, reviews: 140,
            imageUrl: "https://images.unsplash.com/photo-1533630252-45217595a822?auto=format&fit=crop&w=500&q=60",
            category: "Savory", organic: false, discount: 0,
            tags: ["Classic", "Salty"],
            description: "A traditional soft pretzel, perfectly baked and sprinkled with coarse sea salt.", stock: 30
        },
        {
            id: "bak-30", name: "Brioche Loaf", price: 170, originalPrice: 190, rating: 4.7, reviews: 210,
            imageUrl: "https://images.unsplash.com/photo-1594220300223-f38a5b51a0b3?auto=format&fit=crop&w=500&q=60",
            category: "Bread", organic: false, discount: 11,
            tags: ["Rich", "Buttery"],
            description: "A light, slightly sweet bread with a high egg and butter content, making it incredibly rich and tender.", stock: 8
        },
        {
            id: "bak-31", name: "Vegan Chocolate Avocado Mousse", price: 250, originalPrice: 275, rating: 4.6, reviews: 185,
            imageUrl: "https://images.unsplash.com/photo-1585489852356-7a87e8b624b4?auto=format&fit=crop&w=500&q=60",
            category: "Dessert", organic: true, discount: 9,
            tags: ["Vegan", "Healthy"],
            description: "A surprisingly rich and creamy chocolate mousse made from avocado, cocoa, and natural sweeteners.", stock: 10
        },
        {
            id: "bak-32", name: "Quiche Lorraine (Individual)", price: 220, rating: 4.5, reviews: 165,
            imageUrl: "https://images.unsplash.com/photo-1589301763173-9842a27a0545?auto=format&fit=crop&w=500&q=60",
            category: "Savory", organic: false, discount: 0,
            tags: ["Lunch", "Classic"],
            description: "A classic French tart with a creamy egg custard, bacon, and Gruyère cheese in a flaky pastry crust.", stock: 9
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

      if (nextQty === 3) {
        showToast(`3 ${item.name} added! Special offer applied!`, "info");
      }
    } else {
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }

    setAnimatingProduct(item.id);
    timeoutRef.current = setTimeout(() => setAnimatingProduct(null), 500);
  }, [addToCart, updateQuantity, showToast, cartItems]);

  const handleIncrement = useCallback((item) => {
    if (item.stock <= 0) return;

    const inCart = cartItems.find((c) => c.id === item.id);
    if (inCart) {
      if (inCart.quantity >= item.stock) {
        showToast(`Only ${item.stock} items available!`, "error");
        return;
      }
      
      const nextQty = inCart.quantity + 1;
      updateQuantity(item.id, nextQty);
      showToast(`Increased • ${item.name} (x${nextQty})`, "info");
    } else {
      addToCart({ ...item, quantity: 1 });
      showToast(`${item.name} added to cart!`, "success");
    }
  }, [cartItems, updateQuantity, addToCart, showToast]);

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
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
        aria-hidden="true"
      />
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
    
    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }
    
    debouncedSearch.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">Freshly Baked Delights</h1>
        <p className="text-amber-600">Handcrafted with love, from our oven to your home.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Truck className="mx-auto text-amber-600 mb-2" size={24} /><p className="text-sm font-semibold">Fast Delivery</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Shield className="mx-auto text-amber-600 mb-2" size={24} /><p className="text-sm font-semibold">Freshness Guarantee</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Star className="mx-auto text-amber-600 mb-2" size={24} /><p className="text-sm font-semibold">Top Rated</p></div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm"><Filter className="mx-auto text-amber-600 mb-2" size={24} /><p className="text-sm font-semibold">Organic Options</p></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-amber-600" size={20} />
          <input type="text" placeholder="Search bakery items..."
            className="w-full border border-amber-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            defaultValue={searchTerm} onChange={handleSearchChange} aria-label="Search products"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryFilter === category ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="md:hidden flex items-center gap-1 px-3 py-2 bg-amber-100 text-amber-800 rounded-full" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />{showFilters ? <X size={16} /> : "Filters"}
          </button>
          <select className={`border border-amber-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-amber-400 bg-white ${showFilters ? "flex" : "hidden md:flex"}`}
            value={sortOption} onChange={(e) => setSortOption(e.target.value)} aria-label="Sort products by"
          >
            <option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Top Rated</option><option>Most Popular</option>
          </select>
        </div>
      </div>

      <div id="filters-section" className={`bg-white p-4 rounded-2xl shadow-md mb-8 ${showFilters ? "block" : "hidden md:block"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-amber-900">Advanced Filters</h3>
          <button className="text-amber-600 text-sm flex items-center" onClick={() => setShowMoreFilters(!showMoreFilters)}>
            {showMoreFilters ? "Show Less" : "More Filters"}
            {showMoreFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
        </div>

        <div id="more-filters" className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showMoreFilters ? "block" : "hidden md:grid"}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">0</span>
              <input type="range" min="0" max="500" step="10" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
              />
              <input type="range" min="0" max="500" step="10" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-gray-500">500</span>
            </div>
          </div>
          <div className="flex items-end"><button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200" onClick={resetFilters}>Reset Filters</button></div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          const inCart = cartItems.find((c) => c.id === item.id);
          const currentQuantity = inCart ? inCart.quantity : 0;
          const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
          const isInWishlist = wishlist.find((w) => w.id === item.id);
          const isOutOfStock = item.stock <= 0;

          return (
            <div key={item.id} className={`bg-white rounded-2xl shadow-md hover:shadow-lg p-5 relative transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${isOutOfStock ? 'opacity-70' : ''}`}>
              {discount > 0 && <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">SAVE {discount}%</div>}
              {item.organic && <div className="absolute top-4 left-4 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold z-10">🌱 ORGANIC</div>}
              {isOutOfStock && <div className="absolute top-4 right-1/2 translate-x-1/2 bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-bold z-20">OUT OF STOCK</div>}

              <button className="absolute top-4 right-4 z-10" onClick={() => !isOutOfStock && handleWishlistToggle(item)} disabled={isOutOfStock}>
                <Heart className={isInWishlist ? "fill-red-500 text-red-500" : isOutOfStock ? "text-gray-300 cursor-not-allowed" : "text-gray-300 hover:text-red-500"} size={24} />
              </button>

              <div className="h-48 flex items-center justify-center mb-4 relative">
                <img src={item.imageUrl} alt={item.name} className="max-h-44 mx-auto object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 overflow-hidden">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2 h-10">{item.description}</p>
              <div className="flex items-center mb-2">{renderStars(item.rating)}<span className="text-sm text-gray-500 ml-1">({item.reviews.toLocaleString()})</span></div>
              <div className="mb-4">
                <span className="text-xl font-bold text-amber-700">₹{item.price.toLocaleString()}</span>
                {item.originalPrice && <span className="text-sm line-through text-gray-400 ml-2">₹{item.originalPrice.toLocaleString()}</span>}
              </div>

              {!isOutOfStock && item.stock < 10 && <div className="mb-2 text-xs text-red-600">Only {item.stock} left in stock!</div>}

              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(tag => <span key={tag} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{tag}</span>)}
              </div>

              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-amber-300 rounded-full overflow-hidden bg-amber-50">
                    <button onClick={() => !isOutOfStock && handleDecrement(item)} className="p-2 text-amber-700 hover:bg-amber-200" disabled={isOutOfStock}>
                      {currentQuantity === 1 ? <Trash2 size={14} /> : <Minus size={16} />}
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-800 min-w-[2rem] text-center">{currentQuantity}</span>
                    <button onClick={() => !isOutOfStock && handleIncrement(item)} className="p-2 text-amber-700 hover:bg-amber-200" disabled={isOutOfStock || currentQuantity >= item.stock}>
                      <Plus size={16} />
                    </button>
                  </div>
                ) : <div className="w-10"></div>}

                <button onClick={() => !isOutOfStock && handleAddToCart(item)} disabled={isOutOfStock}
                  className={`flex items-center justify-center rounded-full p-3 shadow-md transition-all duration-300 transform ${currentQuantity > 0 ? "bg-amber-700 text-white hover:bg-amber-800" : "bg-amber-600 text-white hover:bg-amber-700 hover:scale-105"} ${animatingProduct === item.id ? 'animate-bounce' : ''} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                >
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
          <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600" onClick={resetFilters}>Reset All Filters</button>
        </div>
      )}
    </div>
  );
};

export default Bakery;