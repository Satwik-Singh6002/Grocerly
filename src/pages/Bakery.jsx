import React from 'react';
import { useCart } from '../context/CartContext';

const Bakery = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Brown Bread (400g)',
      price: '₹40',
      imageUrl:
        'https://m.media-amazon.com/images/I/71U-Pz+n8TL._SL1500_.jpg',
      tag: 'Healthy',
    },
    {
      id: 2,
      name: 'White Bread (400g)',
      price: '₹35',
      imageUrl:
        'https://m.media-amazon.com/images/I/81VPHv0jQ+L._SL1500_.jpg',
      tag: 'Classic',
    },
    {
      id: 3,
      name: 'Garlic Bread',
      price: '₹60',
      imageUrl:
        'https://m.media-amazon.com/images/I/71JkqPQ-6vL._SL1500_.jpg',
      tag: 'Bestseller',
    },
    {
      id: 4,
      name: 'Burger Buns (Pack of 4)',
      price: '₹45',
      imageUrl:
        'https://m.media-amazon.com/images/I/81kN5UINvCL._SL1500_.jpg',
      tag: 'Soft & Fresh',
    },
    {
      id: 5,
      name: 'Pav Buns (Pack of 6)',
      price: '₹30',
      imageUrl:
        'https://m.media-amazon.com/images/I/71+AmWnbU6L._SL1500_.jpg',
      tag: 'Mumbai Style',
    },
    {
      id: 6,
      name: 'Multigrain Bread',
      price: '₹50',
      imageUrl:
        'https://m.media-amazon.com/images/I/71Zw9rM6IlL._SL1500_.jpg',
      tag: 'Nutritional',
    },
    {
      id: 7,
      name: 'Banana Cake (200g)',
      price: '₹75',
      imageUrl:
        'https://m.media-amazon.com/images/I/81yPHPIBGxL._SL1500_.jpg',
      tag: 'Sweet Treat',
    },
    {
      id: 8,
      name: 'Tea Rusk (300g)',
      price: '₹60',
      imageUrl:
        'https://m.media-amazon.com/images/I/81c6ZnyRWuL._SL1500_.jpg',
      tag: 'Crunchy',
    },
    {
      id: 9,
      name: 'Vanilla Muffins (Pack of 2)',
      price: '₹55',
      imageUrl:
        'https://m.media-amazon.com/images/I/61+F2e6OwtL._SL1200_.jpg',
      tag: 'Snack Time',
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1565958011703-44f9829ba187")',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 px-4 sm:px-8 py-10 text-white">
        <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg">
          Fresh from the Bakery
        </h1>
        <p className="text-center text-gray-100 max-w-2xl mx-auto mb-10">
          Breads, buns, cakes, and more — all soft, fresh, and perfect for any time of the day.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((item, index) => (
            <div
              key={item.id}
              className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-500 animate-fade-in"
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
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-green-300 font-medium mb-2">{item.price}</p>
              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: parseInt(item.price.replace(/[₹,]/g, '')),
                    image: item.imageUrl,
                  })
                }
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl transition"
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

export default Bakery;
