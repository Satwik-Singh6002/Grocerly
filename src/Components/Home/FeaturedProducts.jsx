import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Star, Heart, Zap, Plus, Minus, ShoppingCart } from "lucide-react";
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
    >
      <ChevronLeft size={24} className="group-hover:animate-pulse" />
      <span className="sr-only">Previous products</span>
    </div>
  );
}

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 -right-3 sm:-right-4 z-20 transform -translate-y-1/2 cursor-pointer bg-white shadow-xl rounded-full p-2 sm:p-3 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110 group"
      onClick={onClick}
    >
      <ChevronRight size={24} className="group-hover:animate-pulse" />
      <span className="sr-only">Next products</span>
    </div>
  );
}

const FeaturedProducts = () => {
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const [wishlist, setWishlist] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: { borderRadius: "12px", background: "#10b981", color: "#fff" }
    });
  };

  const handleIncreaseQuantity = (productId, productName) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem) {
      increaseQuantity(productId, productName);
      toast.success(`Increased quantity of ${productName}`, {
        icon: "➕",
        style: { borderRadius: "12px", background: "#3b82f6", color: "#fff" },
        duration: 1500
      });
    } else {
      // This shouldn't happen with the fixed increaseQuantity, but as a fallback
      const product = featuredProducts.find(p => p.id === productId);
      if (product) {
        handleAddToCart(product);
      }
    }
  };

  const handleDecreaseQuantity = (productId, productName) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      decreaseQuantity(productId, productName);
      toast.success(`Decreased quantity of ${productName}`, {
        icon: "➖",
        style: { borderRadius: "12px", background: "#f59e0b", color: "#fff" },
        duration: 1500
      });
    } else if (cartItem && cartItem.quantity === 1) {
      // Don't decrease below 1, show warning
      toast.error("Quantity cannot be less than 1", {
        icon: "⚠️",
        style: { borderRadius: "12px", background: "#ef4444", color: "#fff" },
        duration: 1500
      });
    }
  };

  const toggleWishlist = (productId, productName) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      setWishlist([...wishlist, productId]);
      toast.success(`${productName} added to wishlist!`, { icon: "❤️" });
    }
  };

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

  const renderStars = (rating) => {
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
  };

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
                      className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 z-10"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist.includes(product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }
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
                      <div className="flex items-center border border-green-300 rounded-full overflow-hidden">
                        <button
                          onClick={() => handleDecreaseQuantity(product.id, product.name)}
                          className="p-2 text-green-700 hover:bg-green-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-gray-800">
                          {currentQuantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(product.id, product.name)}
                          className="p-2 text-green-700 hover:bg-green-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center bg-green-600 text-white rounded-full p-3 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative"
                      >
                        <ShoppingCart size={18} />
                        {cartItem && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItem.quantity}
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

export default FeaturedProducts;