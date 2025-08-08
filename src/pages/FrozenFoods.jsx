import React from 'react';
import { useCart } from '../context/CartContext';

const FrozenFoods = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'McCain French Fries (750g)',
      price: '₹120',
      imageUrl: 'https://m.media-amazon.com/images/I/81cvCjCJtuL._SL1500_.jpg',
      tag: 'Crispy',
    },
    {
      id: 2,
      name: 'Sumeru Green Peas (500g)',
      price: '₹85',
      imageUrl: 'https://m.media-amazon.com/images/I/61BaHpFYB9L._SL1000_.jpg',
      tag: 'Fresh Frozen',
    },
    {
      id: 3,
      name: 'Godrej Yummiez Chicken Nuggets (400g)',
      price: '₹180',
      imageUrl: 'https://m.media-amazon.com/images/I/71DCZlwlN0L._SL1500_.jpg',
      tag: 'Best Seller',
    },
    {
      id: 4,
      name: 'ITC Master Chef Veg Patty (500g)',
      price: '₹110',
      imageUrl: 'https://m.media-amazon.com/images/I/81MkKYdKJVL._SL1500_.jpg',
      tag: 'Snack Time',
    },
    {
      id: 5,
      name: 'Mother Dairy Ice Cream Vanilla (1L)',
      price: '₹160',
      imageUrl: 'https://m.media-amazon.com/images/I/71koBqB80GL._SL1500_.jpg',
      tag: 'Dessert',
    },
    {
      id: 6,
      name: 'McCain Aloo Tikki (420g)',
      price: '₹105',
      imageUrl: 'https://m.media-amazon.com/images/I/51Nq4XXAgXL._SL1000_.jpg',
      tag: 'Popular',
    },
    {
      id: 7,
      name: 'Safal Mixed Veg (500g)',
      price: '₹70',
      imageUrl:
        'https://www.bigbasket.com/media/uploads/p/l/10000169_14-safal-frozen-mixed-vegetables.jpg',
      tag: 'Healthy Mix',
    },
    {
      id: 8,
      name: 'Amul Frozen Paneer (200g)',
      price: '₹90',
      imageUrl:
        'https://www.bigbasket.com/media/uploads/p/l/30006821_3-amul-malai-paneer-frozen.jpg',
      tag: 'Protein Rich',
    },
    {
      id: 9,
      name: 'Vadilal Ice Cream Choco Bar (70ml)',
      price: '₹25',
      imageUrl:
        'https://www.bigbasket.com/media/uploads/p/l/1203619_3-vadilal-chocobar.jpg',
      tag: 'Kids Favorite',
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1586190848861-99aa4a171e90")',
        }}
      ></div>

      {/* Foreground */}
      <div className="relative z-10 px-4 sm:px-8 py-10 text-white">
        <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg">
          Frozen Foods
        </h1>
        <p className="text-center text-gray-100 max-w-2xl mx-auto mb-10">
          Quick-fix meals, frozen snacks, peas, and desserts ready in minutes.
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
              <span className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
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
                    price: Number(item.price.replace(/[₹,]/g, '')),
                    image: item.imageUrl,
                    quantity: 1,
                  })
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
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

export default FrozenFoods;
