import React from 'react';
import { useCart } from '../context/CartContext';

const Vegetables = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes (1kg)',
      price: '₹40',
      imageUrl:
        'https://m.media-amazon.com/images/I/61ZJhcdG7LL._UF894,1000_QL80_.jpg',
      tag: 'Daily Use',
    },
    {
      id: 2,
      name: 'Potatoes (1kg)',
      price: '₹30',
      imageUrl:
        'https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/e21d501a-0f8d-4c14-ac17-376707961c02.jpg?ts=1711473680',
      tag: 'Staple',
    },
    {
      id: 3,
      name: 'Onions (1kg)',
      price: '₹32',
      imageUrl:
        'https://www.bbassets.com/media/uploads/p/l/10000148_34-fresho-onion.jpg',
      tag: 'Essential',
    },
    {
      id: 4,
      name: 'Cauliflower (1pc)',
      price: '₹45',
      imageUrl:
        'https://www.jiomart.com/images/product/original/590000619/cauliflower-1-pc-approx-300-g-500-g-product-images-o590000619-p590000619-0-202411061152.jpg?im=Resize=(420,420)',
      tag: 'Fresh Stock',
    },
    {
      id: 5,
      name: 'Cabbage (1pc)',
      price: '₹30',
      imageUrl:
        'https://m.media-amazon.com/images/I/51vl9RzME3L._UF1000,1000_QL80_.jpg',
      tag: 'Budget Pick',
    },
    {
      id: 6,
      name: 'Carrots (500g)',
      price: '₹35',
      imageUrl:
        'https://cdn.shopaccino.com/rootz/products/carrots-1894040663788240_m.jpg?v=569',
      tag: 'Winter Veggie',
    },
    {
      id: 7,
      name: 'Green Beans (500g)',
      price: '₹40',
      imageUrl:
        'https://www.jiomart.com/images/product/original/590003549/french-beans-500-g-product-images-o590003549-p590003549-0-202411061150.jpg?im=Resize=(420,420)',
      tag: 'Seasonal',
    },
    {
      id: 8,
      name: 'Spinach Bunch',
      price: '₹25',
      imageUrl:
        'https://media.istockphoto.com/id/1006196472/photo/bunch-of-spinach-leaves-on-isolated-white-background.jpg?s=612x612&w=0&k=20&c=OAIswtUC1aMNDwtMEFIaZv6fSIftsoAV-cgJZSGLJ7A=',
      tag: 'Leafy Green',
    },
    {
      id: 9,
      name: 'Brinjal (500g)',
      price: '₹38',
      imageUrl:
        'https://www.jiomart.com/images/product/original/590003544/brinjal-black-big-500-g-product-images-o590003544-p590003544-0-202410011659.jpg?im=Resize=(420,420)',
      tag: 'Tasty Pick',
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://t3.ftcdn.net/jpg/01/47/51/60/360_F_147516063_hCXI8VUIdBYud0B0hhS3Yo5CFTT1a4g8.jpg")',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 px-4 sm:px-8 py-10 text-white">
        <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg">
          Fresh Vegetables
        </h1>
        <p className="text-center text-gray-100 max-w-2xl mx-auto mb-10">
          Handpicked vegetables sourced daily from farms to keep your kitchen fresh and healthy.
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
              <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
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

export default Vegetables;
