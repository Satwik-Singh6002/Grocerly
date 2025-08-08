import React from 'react';
import { useCart } from "../context/CartContext"; // ✅ Correct import

const Snacks = () => {
  const { addToCart } = useCart(); // ✅ Correct usage

  const snacks = [
    {
      id: 'snack-01',
      name: 'Kurkure Masala Munch 100g',
      imageUrl:
        'https://tiimg.tistatic.com/fp/1/007/694/100-vegetarian-fantastic-crunch-spicy-combo-kurkure-masala-munch-089.jpg',
      price: '₹20',
      tag: 'Best Seller',
    },
    {
      id: 'snack-02',
      name: 'Lays Classic Salted 52g',
      imageUrl: 'https://m.media-amazon.com/images/I/61e+UwnsWwL.jpg',
      price: '₹20',
      tag: 'Popular',
    },
    {
      id: 'snack-03',
      name: 'Bingo! Mad Angles Achaari Masti 80g',
      imageUrl:
        'https://www.jiomart.com/images/product/original/491551829/bingo-achaari-masti-mad-angles-130-g-product-images-o491551829-p491551829-0-202409301839.jpg',
      price: '₹25',
      tag: 'Tasty Pick',
    },
    {
      id: 'snack-04',
      name: "Haldiram's Aloo Bhujia 200g",
      imageUrl: 'https://m.media-amazon.com/images/I/71xG-BZxeCL._UF894,1000_QL80_.jpg',
      price: '₹35',
      tag: 'Crunchy',
    },
    {
      id: 'snack-05',
      name: 'Parle Monaco Classic 75g',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFZLSfkMx3uk9JRpXU0bjsnHKOFVuzDooVw&s',
      price: '₹10',
      tag: 'Light Snack',
    },
    {
      id: 'snack-06',
      name: 'Peri Peri Nachos 100g',
      imageUrl: 'https://m.media-amazon.com/images/I/71mAtXA3NHL._UF1000,1000_QL80_.jpg',
      price: '₹40',
      tag: 'Spicy',
    },
    {
      id: 'snack-07',
      name: 'Unibic Choco Chip Cookies 75g',
      imageUrl: 'https://www.bbassets.com/media/uploads/p/l/40016293_2-unibic-cookies-chocolate-chip.jpg',
      price: '₹25',
      tag: 'Sweet Treat',
    },
    {
      id: 'snack-08',
      name: 'Britannia Good Day Cashew 60g',
      imageUrl: 'https://www.bbassets.com/media/uploads/p/xl/270729_21-britannia-good-day-cashew-cookies.jpg',
      price: '₹15',
      tag: 'Classic',
    },
    {
      id: 'snack-09',
      name: 'Pringles Original 107g',
      imageUrl: 'https://www.bbassets.com/media/uploads/p/l/100550_16-pringles-original.jpg',
      price: '₹99',
      tag: 'Premium',
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4qsPQbSs0AitfB-_olKopVhfzp4qrBq3vZQ&s")',
        }}
      ></div>

      <div className="min-h-screen relative z-10 bg-black bg-opacity-60 backdrop-blur-sm px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Snacks</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Enjoy crispy, spicy, and savory snacks — perfect for every mood and moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
          {snacks.map((item, index) => (
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
                className="w-full h-48 object-contain rounded mb-4"
              />
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-green-300 font-medium mb-2">{item.price}</p>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                  onClick={() => addToCart(item)}
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

export default Snacks;
