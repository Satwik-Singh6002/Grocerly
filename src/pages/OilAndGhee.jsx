import React from 'react';
import { useCart } from '../context/CartContext';

const OilAndGhee = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Fortune Sunflower Oil 1L',
      price: '₹130',
      imageUrl:
        'https://m.media-amazon.com/images/I/41wYtZkL69L._UF1000,1000_QL80_.jpg',
      tag: 'Best Seller',
    },
    {
      id: 2,
      name: 'Patanjali Cow Ghee 1L',
      price: '₹530',
      imageUrl:
        'https://m.media-amazon.com/images/I/61Q+N9jRcZL._UF894,1000_QL80_.jpg',
      tag: 'Pure',
    },
    {
      id: 3,
      name: 'Saffola Gold Oil 1L',
      price: '₹150',
      imageUrl:
        'https://m.media-amazon.com/images/I/61ZSTmboXVL.jpg',
      tag: 'Heart Healthy',
    },
    {
      id: 4,
      name: 'Dhara Refined Oil 1L',
      price: '₹125',
      imageUrl:
        'https://m.media-amazon.com/images/I/41T1xhPt-8L._AC_.jpg',
      tag: 'Affordable',
    },
    {
      id: 5,
      name: 'Anik Ghee 500ml',
      price: '₹260',
      imageUrl:
        'https://www.jiomart.com/images/product/original/490012756/anik-ghee-500-ml-tin-product-images-o490012756-p490012756-0-202410101132.jpg?im=Resize=(1000,1000)',
      tag: 'Rich Aroma',
    },
    {
      id: 6,
      name: 'Fortune Kachi Ghani Mustard Oil 1L',
      price: '₹145',
      imageUrl:
        'https://assets.hyperpure.com/data/images/products/f6640b251a41ea1253570dba280e0516.jpg',
      tag: 'Cold Pressed',
    },
    {
      id: 7,
      name: 'Amul Pure Ghee 1L',
      price: '₹540',
      imageUrl:
        'https://m.media-amazon.com/images/I/81iwctfHH9L.jpg',
      tag: 'Premium',
    },
    {
      id: 8,
      name: 'Gemini Refined Soybean Oil 1L',
      price: '₹120',
      imageUrl:
        'https://www.jiomart.com/images/product/original/490012718/gemini-refined-soyabean-oil-870-g-product-images-o490012718-p490012718-0-202505140944.jpg?im=Resize=(420,420)',
      tag: 'Everyday Use',
    },
    {
      id: 9,
      name: 'Nature Fresh Acti Lite Oil 1L',
      price: '₹135',
      imageUrl:
        'https://m.media-amazon.com/images/I/81QrG08A71L._UF1000,1000_QL80_.jpg',
      tag: 'Low Absorption',
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcd7IBn3F3D8Rlzx7R36UXQ6gSt2XdV7C-Aw&s")',
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 bg-black bg-opacity-60 min-h-screen px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Oil & Ghee</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover a range of healthy cooking oils and pure desi ghee for all your culinary needs.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
          {products.map((item, index) => (
            <div
              key={item.id}
              className="relative bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards',
                opacity: 0,
              }}
            >
              <span className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-contain mb-4 rounded"
              />
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-green-300 font-medium mb-2">{item.price}</p>
                <button
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: Number(item.price.replace(/[₹,]/g, '')),
                      image: item.imageUrl,
                      quantity: 1,
                    })
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
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

export default OilAndGhee;
