import React from 'react';
import { useCart } from '../context/CartContext';

const Fruit = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Fresh Apples (1kg)',
      price: '₹180',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuNjANsr--1acwUzfK8cT2DFXibiktnzlyw&s',
      tag: 'Bestseller',
    },
    {
      id: 2,
      name: 'Bananas (Dozen)',
      price: '₹60',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ZmGkn6WbrNqrTGlyK0zv0F2p4c6R6_-Icg&s',
      tag: 'Daily Use',
    },
    {
      id: 3,
      name: 'Seedless Grapes (500g)',
      price: '₹90',
      imageUrl: 'https://m.media-amazon.com/images/I/71xGBrNnv2L.jpg',
      tag: 'Sweet Pick',
    },
    {
      id: 4,
      name: 'Kiwis Imported (3 pcs)',
      price: '₹120',
      imageUrl:
        'https://www.jiomart.com/images/product/original/590009674/kiwi-imported-3-pcs-pack-product-images-o590009674-p590317377-1-202408070949.jpg?im=Resize=(420,420)',
      tag: 'Exotic',
    },
    {
      id: 5,
      name: 'Fresh Papaya (Medium)',
      price: '₹75',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTda2i4bz29qWYeRC6pBCi5xDz3EcHtsVR3LA&s',
      tag: 'Immunity Boost',
    },
    {
      id: 6,
      name: 'Fresh Mangoes (1kg)',
      price: '₹140',
      imageUrl:
        'https://m.media-amazon.com/images/I/31cXlUcvRVL._UF894,1000_QL80_.jpg',
      tag: 'Seasonal',
    },
    {
      id: 7,
      name: 'Oranges Imported (1kg)',
      price: '₹110',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAV8YmdiUIR1WMsH9GSK5QE_ZRXC55NG6ifQ&s',
      tag: 'Vitamin C',
    },
    {
      id: 8,
      name: 'Pomegranate (500g)',
      price: '₹95',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8E59K88g7bJk3jNIIbdnNWOLihPjARBH9OA&s',
      tag: 'Rich in Iron',
    },
    {
      id: 9,
      name: 'Strawberries (200g)',
      price: '₹85',
      imageUrl:
        'https://www.bbassets.com/media/uploads/p/l/10000263_15-fresho-strawberry.jpg',
      tag: 'Fresh Pick',
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/fruit-background-with-various-fresh-ripe-fruits-top-view-healthy-eating-concept_88281-1308.jpg")',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 px-4 sm:px-8 py-10 text-white">
        <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg">
          Fresh Fruits
        </h1>
        <p className="text-center text-gray-100 max-w-2xl mx-auto mb-10">
          Enjoy our handpicked range of fresh, organic, and seasonal fruits delivered to your doorstep.
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
              <span className="absolute top-3 left-3 bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">
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
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
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

export default Fruit;
