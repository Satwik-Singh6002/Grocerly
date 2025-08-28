import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Star, Heart, Zap, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const featuredProducts = [
  {
    id: 101,
    name: "Tata Sampann Toor Dal",
    price: 145,
    originalPrice: 165,
    image: "https://5.imimg.com/data5/ECOM/Default/2023/6/313586684/WR/GG/BP/73577670/tata-sanpann-toor-arhar-dal-1kg-1675247432215-sku-0145-0-500x500.jpg",
    rating: 4.5,
    reviews: 124,
    tags: ["Best Seller", "Premium Quality"]
  },
  {
    id: 102,
    name: "Aashirvaad Atta 5kg",
    price: 295,
    originalPrice: 325,
    image: "https://m.media-amazon.com/images/I/519TuDlyStL._AC_.jpg",
    rating: 4.7,
    reviews: 289,
    tags: ["Most Popular"]
  },
  {
    id: 103,
    name: "Fortune Sunflower Oil",
    price: 130,
    image: "https://m.media-amazon.com/images/I/81FbVYZJYyL.jpg",
    rating: 4.3,
    reviews: 98,
    tags: ["Low Fat", "Healthy"]
  },
  {
    id: 104,
    name: "Amul Butter 500g",
    price: 250,
    originalPrice: 275,
    image: "https://m.media-amazon.com/images/I/61vr7r8qqsL._UF894,1000_QL80_.jpg",
    rating: 4.6,
    reviews: 203,
    tags: ["Fresh", "Creamy"]
  },
  {
    id: 105,
    name: "Tata Salt 1kg",
    price: 25,
    originalPrice: 30,
    image: "https://redrosemart.com/cdn/shop/files/8df34e1b-ef3b-4c14-863a-5904612665f3202392595.jpg?v=1703947346&width=1946",
    rating: 4.4,
    reviews: 156,
    tags: ["Iodized", "Essential"]
  },
  {
    id: 106,
    name: "Organic Honey 500g",
    price: 399,
    originalPrice: 499,
    image: "https://m.media-amazon.com/images/I/71niBdp-M6L.jpg",
    rating: 4.8,
    reviews: 312,
    tags: ["Organic", "Pure"]
  }
];

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 -left-3 sm:-left-4 z-20 transform -translate-y-1/2 cursor-pointer bg-white shadow-xl rounded-full p-2 sm:p-3 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110 group"
      onClick={onClick}
      role="button"
      aria-label="Previous products"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <ChevronLeft size={24} className="group-hover:animate-pulse" />
    </div>
  );
}

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 -right-3 sm:-right-4 z-20 transform -translate-y-1/2 cursor-pointer bg-white shadow-xl rounded-full p-2 sm:p-3 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110 group"
      onClick={onClick}
      role="button"
      aria-label="Next products"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <ChevronRight size={24} className="group-hover:animate-pulse" />
    </div>
  );
}

const FeaturedProducts = () => {
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [animatingProduct, setAnimatingProduct] = useState(null);

  const handleAddToCart = useCallback((product) => {
    addToCart(product, 1);
    setAnimatingProduct(product.id);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: { borderRadius: "12px", background: "#10b981", color: "#fff" }
    });
    
    // Reset animation after 500ms
    setTimeout(() => setAnimatingProduct(null), 500);
  }, [addToCart]);

  const handleIncreaseQuantity = useCallback((productId, productName) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem) {
      increaseQuantity(productId, productName);
      toast.success(`Increased quantity of ${productName}`, {
        icon: "➕",
        style: { borderRadius: "12px", background: "#3b82f6", color: "#fff" },
        duration: 1500
      });
    } else {
      const product = featuredProducts.find(p => p.id === productId);
      if (product) {
        handleAddToCart(product);
      }
    }
  }, [cartItems, increaseQuantity, handleAddToCart]);

  const handleDecreaseQuantity = useCallback((productId, productName) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      decreaseQuantity(productId, productName);
      toast.success(`Decreased quantity of ${productName}`, {
        icon: "➖",
        style: { borderRadius: "12px", background: "#f59e0b", color: "#fff" },
        duration: 1500
      });
    } else if (cartItem && cartItem.quantity === 1) {
      // Allow removal from cart when quantity is 1
      removeFromCart(productId);
      toast("Removed from cart", { 
        icon: "🗑️",
        style: { borderRadius: "12px", background: "#ef4444", color: "#fff" }
      });
    }
  }, [cartItems, decreaseQuantity, removeFromCart]);

  const toggleWishlist = useCallback((productId, productName) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      setWishlist([...wishlist, productId]);
      toast.success(`${productName} added to wishlist!`, { icon: "❤️" });
    }
  }, [wishlist]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 1, arrows: false } }
    ],
    appendDots: (dots) => (
      <div className="mt-6">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
    )
  };

  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={14}
        className={
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-green-25 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full flex justify-between opacity-10">
        <Zap size={120} className="text-green-400 -rotate-45 -ml-10" />
        <Zap size={120} className="text-green-400 rotate-45 -mr-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-green-800 tracking-tight">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and essential grocery items, carefully
            selected for quality and value.
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {featuredProducts.map((product) => {
              const cartItem = cartItems.find((item) => item.id === product.id);
              const currentQuantity = cartItem ? cartItem.quantity : 0;
              const isInWishlist = wishlist.includes(product.id);

              return (
                <div key={product.id} className="px-3 sm:px-4 focus:outline-none">
                  <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-green-50 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                    {/* Product tags */}
                    <div className="flex justify-center gap-2 mb-3">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className={`absolute top-4 right-4 p-2 rounded-full shadow-sm transition-all duration-300 z-10 ${
                        isInWishlist 
                          ? "bg-red-100 text-red-500 shadow-md" 
                          : "bg-white text-gray-400 hover:shadow-md"
                      }`}
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart
                        size={18}
                        className={isInWishlist ? "fill-current" : ""}
                      />
                    </button>

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-xl mb-5 h-44">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          % OFF
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <p className="text-xl font-bold text-green-700">
                        ₹{product.price}
                      </p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </p>
                      )}
                    </div>

                    {/* Quantity + Cart */}
                    <div className="flex items-center justify-between mb-4">
                      {currentQuantity > 0 ? (
                        <div className="flex items-center border border-green-300 rounded-full overflow-hidden bg-green-50">
                          <button
                            onClick={() => handleDecreaseQuantity(product.id, product.name)}
                            className="p-2 text-green-700 hover:bg-green-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            {currentQuantity === 1 ? <Trash2 size={14} /> : <Minus size={16} />}
                          </button>
                          <span className="px-3 py-1 text-sm font-medium text-gray-800 min-w-[2rem]">
                            {currentQuantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(product.id, product.name)}
                            className="p-2 text-green-700 hover:bg-green-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-10"></div> // Spacer to maintain alignment
                      )}

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex items-center justify-center rounded-full p-3 shadow-md transition-all duration-300 transform ${
                          currentQuantity > 0
                            ? "bg-green-700 text-white hover:bg-green-800 hover:shadow-lg"
                            : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:scale-105"
                        } ${animatingProduct === product.id ? 'animate-bounce' : ''}`}
                        aria-label="Add to cart"
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
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeaturedProducts);