import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify';  // Added toast import
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Spices = () => {
  const { addToCart } = useCart();

  const spices = [
    {
      id: 1,
      name: "Everest Red Chilli Powder 200g",
      price: 65,
      label: "Bestseller",
      image: "https://www.jiomart.com/images/product/original/490000128/everest-tikhalal-chilli-powder-200-g-product-images-o490000128-p490000128-0-202203151831.jpg",
    },
    {
      id: 2,
      name: "Catch Turmeric Powder 100g",
      price: 30,
      label: "Popular",
      image: "https://m.media-amazon.com/images/I/71AK6ErhjhL.jpg",
    },
    {
      id: 3,
      name: "MDH Garam Masala 100g",
      price: 50,
      label: "Top Rated",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4iJplCfsEQSqVQnkMmAXR3TB1-BNkKVaVg&s",
    },
    {
      id: 4,
      name: "Everest Cumin Powder 100g",
      price: 55,
      label: "New",
      image: "https://m.media-amazon.com/images/I/81Y4dOt-V1L.jpg",
    },
    {
      id: 5,
      name: "Catch Coriander Powder 100g",
      price: 40,
      label: "Value Pack",
      image: "https://m.media-amazon.com/images/I/71Xj03FrWFL.jpg",
    },
    {
      id: 6,
      name: "MDH Kitchen King Masala 100g",
      price: 60,
      label: "Chef's Choice",
      image: "https://m.media-amazon.com/images/I/61sl3bcYjOL.jpg",
    },
    {
      id: 7,
      name: "Badshah Chole Masala 100g",
      price: 45,
      label: "Zesty",
      image: "https://m.media-amazon.com/images/I/718RQRdCmiL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 8,
      name: "Everest Pav Bhaji Masala 100g",
      price: 52,
      label: "Hot Pick",
      image: "https://m.media-amazon.com/images/I/716k7raMD2L._UF1000,1000_QL80_.jpg",
    },
    {
      id: 9,
      name: "MDH Rajmah Masala 100g",
      price: 47,
      label: "Rich Flavor",
      image: "https://m.media-amazon.com/images/I/61sUPHRHVxL._UF894,1000_QL80_.jpg",
    },
  ];

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      image: item.image,
      quantity: 1,
    });
    toast.success(`${item.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-90"
        style={{
          backgroundImage:
            "url('https://ec.europa.eu/eurostat/documents/4187653/16620287/monticello_shutterstock_577601638_RV.jpg')",
        }}
      ></div>

      <div className="relative z-10 bg-black bg-opacity-60 min-h-screen px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Premium Spices Collection</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Flavorful & authentic spices handpicked for your kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
          {spices.map((item, index) => (
            <div
              key={item.id}
              className="relative bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              <span className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                {item.label}
              </span>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain mb-4 rounded"
              />
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold text-white text-center">{item.name}</h3>
                <p className="text-green-300 font-medium text-center my-2">₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Spices;
