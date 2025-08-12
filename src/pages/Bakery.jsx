import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bakery = () => {
  const { addToCart } = useCart();

  const bakeryProducts = [
    {
      id: 'bak-01',
      name: 'Brown Bread',
      imageUrl:
        'https://example.com/images/brown-bread.jpg',
      price: '₹40',
      tag: 'Freshly Baked',
    },
    {
      id: 'bak-02',
      name: 'Butter Croissant',
      imageUrl:
        'https://example.com/images/butter-croissant.jpg',
      price: '₹60',
      tag: 'Flaky & Buttery',
    },
    {
      id: 'bak-03',
      name: 'Chocolate Cake Slice',
      imageUrl:
        'https://example.com/images/chocolate-cake.jpg',
      price: '₹120',
      tag: 'Rich & Moist',
    },
    {
      id: 'bak-04',
      name: 'Blueberry Muffin',
      imageUrl:
        'https://example.com/images/blueberry-muffin.jpg',
      price: '₹50',
      tag: 'Sweet & Fruity',
    },
    {
      id: 'bak-05',
      name: 'Cookies Pack',
      imageUrl:
        'https://example.com/images/cookies-pack.jpg',
      price: '₹70',
      tag: 'Crunchy Delight',
    },
    {
      id: 'bak-06',
      name: 'Danish Pastry',
      imageUrl:
        'https://example.com/images/danish-pastry.jpg',
      price: '₹55',
      tag: 'Buttery Layers',
    },
    {
      id: 'bak-07',
      name: 'Bagel',
      imageUrl:
        'https://example.com/images/bagel.jpg',
      price: '₹35',
      tag: 'Soft & Chewy',
    },
    {
      id: 'bak-08',
      name: 'Cupcake',
      imageUrl:
        'https://example.com/images/cupcake.jpg',
      price: '₹45',
      tag: 'Colorful Treat',
    },
    {
      id: 'bak-09',
      name: 'Whole Wheat Bread',
      imageUrl:
        'https://example.com/images/whole-wheat-bread.jpg',
      price: '₹50',
      tag: 'Healthy Choice',
    },
  ];

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: Number(item.price.replace(/[₹,]/g, '')),
      image: item.imageUrl,
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
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1470&q=80")',
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 bg-black bg-opacity-60 min-h-screen px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Bakery</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Enjoy our freshly baked breads, pastries, and treats made with love.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
          {bakeryProducts.map((item, index) => (
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

      {/* Fade-in Animation */}
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
