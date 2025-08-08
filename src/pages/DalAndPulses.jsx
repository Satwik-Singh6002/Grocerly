import React from "react";
import { useCart } from "../context/CartContext"; // adjust path if needed

const dalProducts = [
  {
    id: 1,
    name: "Tata Sampann Toor Dal 1kg",
    price: 130,
    label: "Bestseller",
    image:
      "https://www.bbassets.com/media/uploads/p/xl/40000291_14-tata-sampann-unpolished-toor-dalarhar-dal.jpg",
  },
  {
    id: 2,
    name: "24 Mantra Organic Moong Dal 1kg",
    price: 145,
    label: "Organic",
    image:
      "https://www.bbassets.com/media/uploads/p/xl/20001056_8-24-mantra-organic-yellow-moong-dal.jpg",
  },
  {
    id: 3,
    name: "Fortune Urad Dal 1kg",
    price: 115,
    label: "Popular",
    image:
      "https://eu.dookan.com/cdn/shop/files/FORTUNEUradgotax500px.png?v=1751293201",
  },
  {
    id: 4,
    name: "Neu Farm Unpolished Toor Dal 1kg",
    price: 120,
    label: "Value Pack",
    image:
      "https://www.jiomart.com/images/product/original/492570976/neu-farm-unpolished-desi-toor-dal-1-kg-product-images-o492570976-p590891753-0-202206011226.jpg?im=Resize=(1000,1000)",
  },
  {
    id: 5,
    name: "Organic Tattva Chana Dal 1kg",
    price: 99,
    label: "Top Rated",
    image:
      "https://www.bbassets.com/media/uploads/p/l/30002299_4-organic-tattva-organic-chana-dal.jpg",
  },
  {
    id: 6,
    name: "Unpolished Desi Masoor Malka Dal 1kg",
    price: 110,
    label: "Fresh",
    image:
      "https://www.bbassets.com/media/uploads/p/l/40293860_2-fortune-masoor-malka-desi-unpolished-sortex-cleaned.jpg",
  },
  {
    id: 7,
    name: "Organic Rajma Red 1kg",
    price: 135,
    label: "Rich Protein",
    image: "https://organictattva.com/cdn/shop/files/8906055440117_01_e0886063-e7a8-46b8-a1eb-d2acab425791.png?v=1716207936",
  },
  {
    id: 8,
    name: "Tata Moong Dal Yellow Split 1kg",
    price: 112,
    label: "Healthy",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/d0799cef-246f-4750-a878-49f893403c2c.png",
  },
  {
    id: 9,
    name: "Natureland Organic Urad Dal Chilka 1kg",
    price: 125,
    label: "Certified Organic",
    image:
      "https://www.jiomart.com/images/product/original/rv3ykksuvl/vgbnp-natural-urad-chilka-urad-dal-unpolished-skinned-urad-dal-urad-dal-chilka-500g-product-images-orv3ykksuvl-p606245991-0-202311201953.jpg?im=Resize=(1000,1000)",
  },
];

const DalAndPulses = () => {
  const { addToCart } = useCart();

  return (
    <div
      className="min-h-screen py-14 px-4 sm:px-6 lg:px-12 bg-center bg-cover relative"
      style={{
        backgroundImage:
          "url('https://www.protectourlivelihood.in/wp-content/uploads/2025/04/Image-Pulses.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto text-white">
        <h2 className="text-4xl font-extrabold text-center text-white mb-4 drop-shadow-lg">
          Dal & Pulses
        </h2>
        <p className="text-center text-lg text-gray-300 mb-12">
          Nutrient-rich lentils and pulses for a healthy lifestyle.
        </p>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {dalProducts.map((item, index) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block mb-4">
                {item.label}
              </span>
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 object-contain mix-blend-multiply drop-shadow-md"
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 text-white text-center">
                {item.name}
              </h3>
              <p className="text-green-300 font-bold text-center my-2 text-xl">
                ₹{item.price}
              </p>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm font-semibold transition-all"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Keyframes */}
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

export default DalAndPulses;
