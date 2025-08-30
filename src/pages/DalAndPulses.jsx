import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Star, Heart, Plus, Minus, Filter, X, Trash2, ShoppingCart, ChevronDown, ChevronUp, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const DalAndPulses = () => {
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

  // Products data - Expanded to 28 products
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Tata Sampann Toor Dal 1kg",
        price: 130,
        originalPrice: 150,
        rating: 4.5,
        reviews: 234,
        imageUrl: "https://www.bbassets.com/media/uploads/p/xl/40000291_14-tata-sampann-unpolished-toor-dalarhar-dal.jpg",
        category: "Toor Dal",
        organic: false,
        discount: 13,
        tags: ["Bestseller"],
        description: "High-quality unpolished toor dal for authentic Indian dishes",
        stock: 15
      },
      {
        id: 2,
        name: "24 Mantra Organic Moong Dal 1kg",
        price: 145,
        originalPrice: 165,
        rating: 4.7,
        reviews: 189,
        imageUrl: "https://www.bbassets.com/media/uploads/p/xl/20001056_8-24-mantra-organic-yellow-moong-dal.jpg",
        category: "Moong Dal",
        organic: true,
        discount: 12,
        tags: ["Organic"],
        description: "Certified organic yellow moong dal with rich nutrients",
        stock: 8
      },
      {
        id: 3,
        name: "Fortune Urad Dal 1kg",
        price: 115,
        originalPrice: 130,
        rating: 4.3,
        reviews: 167,
        imageUrl: "https://eu.dookan.com/cdn/shop/files/FORTUNEUradgotax500px.png?v=1751293201",
        category: "Urad Dal",
        organic: false,
        discount: 12,
        tags: ["Popular"],
        description: "Premium quality urad dal for delicious dals and batters",
        stock: 12
      },
      {
        id: 4,
        name: "Neu Farm Unpolished Toor Dal 1kg",
        price: 120,
        originalPrice: 140,
        rating: 4.6,
        reviews: 98,
        imageUrl: "https://www.jiomart.com/images/product/original/492570976/neu-farm-unpolished-desi-toor-dal-1-kg-product-images-o492570976-p590891743.jpg",
        category: "Toor Dal",
        organic: false,
        discount: 14,
        tags: ["Value Pack"],
        description: "Unpolished desi toor dal with authentic flavor",
        stock: 5
      },
      {
        id: 5,
        name: "Organic Tattva Chana Dal 1kg",
        price: 99,
        originalPrice: 120,
        rating: 4.8,
        reviews: 312,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/30002299_4-organic-tattva-organic-chana-dal.jpg",
        category: "Chana Dal",
        organic: true,
        discount: 18,
        tags: ["Top Rated"],
        description: "Organic chana dal packed with protein and fiber",
        stock: 10
      },
      {
        id: 6,
        name: "Unpolished Desi Masoor Malka Dal 1kg",
        price: 110,
        originalPrice: 125,
        rating: 4.4,
        reviews: 145,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/40293860_2-fortune-masoor-malka-desi-unpolished-sortex-cleaned.jpg",
        category: "Masoor Dal",
        organic: false,
        discount: 12,
        tags: ["Fresh"],
        description: "Desi unpolished masoor dal with rich flavor",
        stock: 20
      },
      {
        id: 7,
        name: "Organic Rajma Red 1kg",
        price: 135,
        originalPrice: 160,
        rating: 4.2,
        reviews: 87,
        imageUrl: "https://organictattva.com/cdn/shop/files/8906055440117_01_e0886063-e7a8-46b8-a1eb-d2acab425791.png?v=1716207936",
        category: "Rajma",
        organic: true,
        discount: 16,
        tags: ["Rich Protein"],
        description: "Organic red rajma perfect for Punjabi-style dishes",
        stock: 6
      },
      {
        id: 8,
        name: "Tata Moong Dal Yellow Split 1kg",
        price: 112,
        originalPrice: 130,
        rating: 4.1,
        reviews: 203,
        imageUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70/da/cms-assets/cms-product/d0799cef-246f-4750-a878-49f893403c2c.png",
        category: "Moong Dal",
        organic: false,
        discount: 14,
        tags: ["Healthy"],
        description: "Yellow split moong dal for light and nutritious meals",
        stock: 9
      },
      {
        id: 9,
        name: "Natureland Organic Urad Dal Chilka 1kg",
        price: 125,
        originalPrice: 145,
        rating: 4.9,
        reviews: 267,
        imageUrl: "https://www.jiomart.com/images/product/original/rv3ykksuvl/vgbnp-natural-urad-chilka.jpg",
        category: "Urad Dal",
        organic: true,
        discount: 14,
        tags: ["Certified Organic"],
        description: "Organic urad dal chilka with skin for traditional recipes",
        stock: 11
      },
      {
        id: 10,
        name: "Tata Sampann Masoor Dal 1kg",
        price: 135,
        originalPrice: 155,
        rating: 4.5,
        reviews: 178,
        imageUrl: "https://m.media-amazon.com/images/I/71qPWxhLsmL.jpg",
        category: "Masoor Dal",
        organic: false,
        discount: 13,
        tags: ["Everyday Use"],
        description: "Premium masoor dal for everyday cooking",
        stock: 4
      },
      {
        id: 11,
        name: "Organic Tattva Urad Whole 1kg",
        price: 150,
        originalPrice: 175,
        rating: 4.7,
        reviews: 210,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/40293667_1-organic-tattva-urad-whole.jpg",
        category: "Urad Dal",
        organic: true,
        discount: 14,
        tags: ["Organic"],
        description: "Whole organic urad dal for authentic Indian dishes",
        stock: 18
      },
      {
        id: 12,
        name: "Fortune Chana Dal 1kg",
        price: 105,
        originalPrice: 120,
        rating: 4.3,
        reviews: 195,
        imageUrl: "https://m.media-amazon.com/images/I/71TmmikAeeL.jpg",
        category: "Chana Dal",
        organic: false,
        discount: 13,
        tags: ["Budget"],
        description: "Economical chana dal without compromising on quality",
        stock: 25
      },
      {
        id: 13,
        name: "24 Mantra Organic Rajma Chitra 1kg",
        price: 140,
        originalPrice: 165,
        rating: 4.8,
        reviews: 168,
        imageUrl: "https://www.jiomart.com/images/product/original/491695678/24-mantra-organic-chitra-rajma.jpg",
        category: "Rajma",
        organic: true,
        discount: 15,
        tags: ["Organic Special"],
        description: "Organic chitra rajma with excellent taste and texture",
        stock: 3
      },
      {
        id: 14,
        name: "Organic Tattva Kabuli Chana 1kg",
        price: 120,
        originalPrice: 138,
        rating: 4.5,
        reviews: 210,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/40247356_1-organic-tattva-organic-kabuli-chana.jpg",
        category: "Chana Dal",
        organic: true,
        discount: 13,
        tags: ["Protein Rich"],
        description: "Organic kabuli chana for nutritious meals and snacks",
        stock: 14
      },
      {
        id: 15,
        name: "Neu Farm Moong Dal Chilka 1kg",
        price: 118,
        originalPrice: 135,
        rating: 4.4,
        reviews: 142,
        imageUrl: "https://m.media-amazon.com/images/I/71s7BdCNzNL.jpg",
        category: "Moong Dal",
        organic: false,
        discount: 12,
        tags: ["Unpolished"],
        description: "Unpolished moong dal chilka with skin for extra nutrition",
        stock: 7
      },
      {
        id: 16,
        name: "Fortune Toor Dal Premium 1kg",
        price: 138,
        originalPrice: 155,
        rating: 4.6,
        reviews: 320,
        imageUrl: "https://m.media-amazon.com/images/I/81HvdWJTUyL.jpg",
        category: "Toor Dal",
        organic: false,
        discount: 11,
        tags: ["Premium"],
        description: "Premium quality toor dal for the perfect dal tadka",
        stock: 10
      },
      {
        id: 17,
        name: "Organic Tattva Toor Dal 1kg",
        price: 160,
        originalPrice: 185,
        rating: 4.7,
        reviews: 145,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/40293669_1-organic-tattva-toor-dal.jpg",
        category: "Toor Dal",
        organic: true,
        discount: 14,
        tags: ["Organic"],
        description: "Certified organic toor dal with rich flavor",
        stock: 8
      },
      {
        id: 18,
        name: "Tata Sampann Moong Dal 1kg",
        price: 125,
        originalPrice: 140,
        rating: 4.3,
        reviews: 210,
        imageUrl: "https://www.jiomart.com/images/product/original/490000186/tata-sampann-unpolished-moong-dal-500-g-product-images-o490000186-p490000186_0-202203170311.jpg",
        category: "Moong Dal",
        organic: false,
        discount: 11,
        tags: ["Bestseller"],
        description: "Unpolished moong dal for healthy meals",
        stock: 12
      },
      {
        id: 19,
        name: "Fortune Urad Dal Whole 1kg",
        price: 130,
        originalPrice: 150,
        rating: 4.4,
        reviews: 178,
        imageUrl: "https://m.media-amazon.com/images/I/71X1D3pL2kL.jpg",
        category: "Urad Dal",
        organic: false,
        discount: 13,
        tags: ["Whole Grain"],
        description: "Whole urad dal for traditional recipes",
        stock: 9
      },
      {
        id: 20,
        name: "24 Mantra Organic Masoor Dal 1kg",
        price: 135,
        originalPrice: 155,
        rating: 4.6,
        reviews: 195,
        imageUrl: "https://www.jiomart.com/images/product/original/491695679/24-mantra-organic-masoor-whole.jpg",
        category: "Masoor Dal",
        organic: true,
        discount: 13,
        tags: ["Organic"],
        description: "Organic whole masoor dal with rich nutrients",
        stock: 7
      },
      {
        id: 21,
        name: "Organic Tattva Rajma 1kg",
        price: 155,
        originalPrice: 180,
        rating: 4.5,
        reviews: 165,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/40293670_1-organic-tattva-rajma.jpg",
        category: "Rajma",
        organic: true,
        discount: 14,
        tags: ["Organic"],
        description: "Organic rajma for protein-rich meals",
        stock: 6
      },
      {
        id: 22,
        name: "Neu Farm Chana Dal 1kg",
        price: 115,
        originalPrice: 130,
        rating: 4.2,
        reviews: 145,
        imageUrl: "https://m.media-amazon.com/images/I/71r3WlQZkEL.jpg",
        category: "Chana Dal",
        organic: false,
        discount: 12,
        tags: ["Fresh"],
        description: "Fresh chana dal for delicious recipes",
        stock: 11
      },
      {
        id: 23,
        name: "Tata Sampann Urad Dal 1kg",
        price: 140,
        originalPrice: 160,
        rating: 4.4,
        reviews: 190,
        imageUrl: "https://www.jiomart.com/images/product/original/490000187/tata-sampann-unpolished-urad-dal-500-g-product-images-o490000187-p490000187_0-202203170312.jpg",
        category: "Urad Dal",
        organic: false,
        discount: 13,
        tags: ["Premium"],
        description: "Premium urad dal for authentic Indian dishes",
        stock: 8
      },
      {
        id: 24,
        name: "Fortune Moong Dal 1kg",
        price: 110,
        originalPrice: 125,
        rating: 4.3,
        reviews: 175,
        imageUrl: "https://m.media-amazon.com/images/I/71QzJkZkZEL.jpg",
        category: "Moong Dal",
        organic: false,
        discount: 12,
        tags: ["Everyday Use"],
        description: "Quality moong dal for daily cooking",
        stock: 15
      },
      {
        id: 25,
        name: "Organic Tattva Moong Dal 1kg",
        price: 170,
        originalPrice: 195,
        rating: 4.8,
        reviews: 230,
        imageUrl: "https://www.bbassets.com/media/uploads/p/l/40293668_1-organic-tattva-moong-dal.jpg",
        category: "Moong Dal",
        organic: true,
        discount: 13,
        tags: ["Organic"],
        description: "Certified organic moong dal with rich flavor",
        stock: 5
      },
      {
        id: 26,
        name: "24 Mantra Organic Toor Dal 1kg",
        price: 165,
        originalPrice: 190,
        rating: 4.7,
        reviews: 210,
        imageUrl: "https://www.jiomart.com/images/product/original/491695680/24-mantra-organic-toor-dal.jpg",
        category: "Toor Dal",
        organic: true,
        discount: 13,
        tags: ["Organic"],
        description: "Organic toor dal for nutritious meals",
        stock: 7
      },
      {
        id: 27,
        name: "Neu Farm Rajma 1kg",
        price: 145,
        originalPrice: 165,
        rating: 4.3,
        reviews: 155,
        imageUrl: "https://m.media-amazon.com/images/I/71r3WlQZkEL.jpg",
        category: "Rajma",
        organic: false,
        discount: 12,
        tags: ["Fresh"],
        description: "Fresh rajma for protein-rich dishes",
        stock: 9
      },
      {
        id: 28,
        name: "Tata Sampann Chana Dal 1kg",
        price: 125,
        originalPrice: 140,
        rating: 4.4,
        reviews: 185,
        imageUrl: "https://www.jiomart.com/images/product/original/490000188/tata-sampann-unpolished-chana-dal-500-g-product-images-o490000188-p490000188_0-202203170313.jpg",
        category: "Chana Dal",
        organic: false,
        discount: 11,
        tags: ["Premium"],
        description: "Premium chana dal for delicious recipes",
        stock: 12
      },
{
  id: 29,
  name: "24 Mantra Organic Toor Dal 500g",
  price: 85,
  originalPrice: 95,
  rating: 4.6,
  reviews: 120,
  imageUrl: "https://www.jiomart.com/images/product/original/491695681/24-mantra-organic-toor-dal-500g.jpg",
  category: "Toor Dal",
  organic: true,
  discount: 11,
  tags: ["Organic", "Small Pack"],
  description: "Organic toor dal in convenient 500g pack",
  stock: 15
},
{
  id: 30,
  name: "Organic Tattva Masoor Dal 500g",
  price: 75,
  originalPrice: 85,
  rating: 4.5,
  reviews: 95,
  imageUrl: "https://www.bbassets.com/media/uploads/p/l/40293671_1-organic-tattva-masoor-dal.jpg",
  category: "Masoor Dal",
  organic: true,
  discount: 12,
  tags: ["Organic", "Small Pack"],
  description: "Organic masoor dal in convenient 500g pack",
  stock: 10
},
{
  id: 31,
  name: "Fortune Urad Dal 500g",
  price: 60,
  originalPrice: 70,
  rating: 4.3,
  reviews: 110,
  imageUrl: "https://m.media-amazon.com/images/I/71X1D3pL2kL.jpg",
  category: "Urad Dal",
  organic: false,
  discount: 14,
  tags: ["Budget", "Small Pack"],
  description: "Economical urad dal in 500g pack",
  stock: 18
},
{
  id: 32,
  name: "Tata Sampann Moong Dal 500g",
  price: 65,
  originalPrice: 75,
  rating: 4.4,
  reviews: 130,
  imageUrl: "https://www.jiomart.com/images/product/original/490000186/tata-sampann-unpolished-moong-dal-500-g.jpg",
  category: "Moong Dal",
  organic: false,
  discount: 13,
  tags: ["Bestseller", "Small Pack"],
  description: "Premium moong dal in convenient 500g pack",
  stock: 12
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

  const categories = ["All", "Toor Dal", "Moong Dal", "Urad Dal", "Chana Dal", "Masoor Dal", "Rajma"];

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
    <div className="p-4 md:p-8 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">Premium Dal & Pulses</h1>
        <p className="text-green-600">Nutrient-rich lentils for healthy meals</p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Truck className="mx-auto text-green-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Free Delivery</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Shield className="mx-auto text-green-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Quality Guarantee</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Star className="mx-auto text-green-600 mb-2" size={24} />
          <p className="text-sm font-semibold">4.8/5 Rating</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
          <Filter className="mx-auto text-green-600 mb-2" size={24} />
          <p className="text-sm font-semibold">Organic Options</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-2.5 text-green-600" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search dal and pulses..."
            className="w-full border border-green-200 rounded-xl pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
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
            className="md:hidden flex items-center gap-1 px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filters-section"
          >
            <Filter size={16} aria-hidden="true" />
            {showFilters ? <X size={16} aria-hidden="true" /> : "Filters"}
          </button>

          <select
            className={`border border-green-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 bg-white ${showFilters ? "flex" : "hidden md:flex"
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
          <h3 className="font-semibold text-green-900">Advanced Filters</h3>
          <button
            className="text-green-600 text-sm flex items-center"
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
                max="500"
                step="10"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={500}
                aria-valuenow={priceRange[0]}
              />
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={500}
                aria-valuenow={priceRange[1]}
              />
              <span className="text-xs text-gray-500">500</span>
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
        <div className="text-sm text-green-600">
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
                <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                  SAVE {discount}%
                </div>
              )}

              {item.organic && (
                <div className="absolute top-4 left-14 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold z-10">
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
                    e.currentTarget.src = "https://via.placeholder.com/300x220/C8E6C9/000000?text=Dal+Image";
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
                <span className="text-xl font-bold text-green-700">
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
                <div className="mb-2 text-xs text-green-600">
                  Only {item.stock} left in stock!
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cart buttons */}
              <div className="flex items-center justify-between">
                {currentQuantity > 0 ? (
                  <div className="flex items-center border border-green-300 rounded-full overflow-hidden bg-green-50">
                    <button
                      onClick={() => !isOutOfStock && handleDecrement(item)}
                      className="p-2 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="p-2 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      ? "bg-green-700 text-white hover:bg-green-800 hover:shadow-lg"
                      : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:scale-105"
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
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DalAndPulses;