import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast"; // ✅ Import toast

const featuredProducts = [
  {
    id: 101,
    name: "Tata Sampann Toor Dal",
    price: 145,
    image:
      "https://5.imimg.com/data5/ECOM/Default/2023/6/313586684/WR/GG/BP/73577670/tata-sanpann-toor-arhar-dal-1kg-1675247432215-sku-0145-0-500x500.jpg",
  },
  {
    id: 102,
    name: "Aashirvaad Atta 5kg",
    price: 295,
    image: "https://m.media-amazon.com/images/I/519TuDlyStL._AC_.jpg",
  },
  {
    id: 103,
    name: "Fortune Sunflower Oil",
    price: 130,
    image: "https://m.media-amazon.com/images/I/81FbVYZJYyL.jpg",
  },
  {
    id: 104,
    name: "Amul Butter 500g",
    price: 250,
    image: "https://m.media-amazon.com/images/I/61tYlo-mcFL.jpg",
  },
  {
    id: 105,
    name: "Tata Salt 1kg",
    price: 25,
    image: "https://m.media-amazon.com/images/I/71wVtDe3rfL.jpg",
  },
];

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer bg-white shadow-lg rounded-full p-2 hover:bg-green-600 hover:text-white transition transform hover:scale-110"
      onClick={onClick}
    >
      <ChevronLeft size={22} />
    </div>
  );
}

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer bg-white shadow-lg rounded-full p-2 hover:bg-green-600 hover:text-white transition transform hover:scale-110"
      onClick={onClick}
    >
      <ChevronRight size={22} />
    </div>
  );
}

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`); // ✅ Show notification
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-14 bg-gradient-to-b from-green-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-green-700 tracking-tight">
          Featured Products
        </h2>
        <div className="relative">
          <Slider {...settings}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="px-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-44 w-full object-contain mb-5 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-green-600 text-lg font-bold mt-2">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-5 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md hover:shadow-lg transition transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
