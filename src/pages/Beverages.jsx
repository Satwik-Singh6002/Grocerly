import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Beverages = () => {
  const { addToCart } = useCart();

  const beverages = [
    {
      id: 'bev-01',
      name: 'Coca-Cola 750ml',
      imageUrl:
        'https://www.bbassets.com/media/uploads/p/xl/251023_11-coca-cola-soft-drink-original-taste.jpg',
      price: '₹40',
      tag: 'Refreshing',
    },
    {
      id: 'bev-02',
      name: 'Tropicana Orange Juice 1L',
      imageUrl:
        'https://m.media-amazon.com/images/I/71ZNcuBUV5L._UF1000,1000_QL80_.jpg',
      price: '₹110',
      tag: 'No Added Sugar',
    },
    {
      id: 'bev-03',
      name: 'Red Bull Energy Drink 250ml',
      imageUrl:
        'https://m.media-amazon.com/images/I/51Bp30CR3IL._UF1000,1000_QL80_.jpg',
      price: '₹120',
      tag: 'Energy Boost',
    },
    {
      id: 'bev-04',
      name: 'Pepsi Black 600ml',
      imageUrl:
        'https://jagsfresh-bucket.s3.amazonaws.com/media/package/img_one/2020-10-17/Pepsi_Soft_Drink_-_Pepsi_Black_Slim_Can_250_Ml.jpg',
      price: '₹35',
      tag: 'Zero Sugar',
    },
    {
      id: 'bev-05',
      name: 'Frooti Mango Drink 1L',
      imageUrl:
        'https://m.media-amazon.com/images/I/61mkqJNXGJL._UF1000,1000_QL80_.jpg',
      price: '₹65',
      tag: 'Popular',
    },
    {
      id: 'bev-06',
      name: 'Paper Boat Aamras 200ml',
      imageUrl:
        'https://www.jiomart.com/images/product/original/491055555/paper-boat-aamras-200-ml-product-images-o491055555-p491055555-0-202407011644.jpg?im=Resize=(420,420)',
      price: '₹30',
      tag: 'Indian Classic',
    },
    {
      id: 'bev-07',
      name: 'Bournvita Health Drink 500g',
      imageUrl: 'https://m.media-amazon.com/images/I/61hcbU+OVaL.jpg',
      price: '₹190',
      tag: 'Kids Favorite',
    },
    {
      id: 'bev-08',
      name: 'Bru Instant Coffee 100g',
      imageUrl: 'https://m.media-amazon.com/images/I/61L96Ywi7aL.jpg',
      price: '₹110',
      tag: 'Hot Pick',
    },
    {
      id: 'bev-09',
      name: 'Nescafe Classic 100g Jar',
      imageUrl: 'https://m.media-amazon.com/images/I/71KO+B2m5wL._UF894,1000_QL80_.jpg',
      price: '₹140',
      tag: 'Morning Essential',
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
            'url("https://static.vecteezy.com/system/resources/thumbnails/026/500/574/small_2x/summer-refreshing-beverages-photo.jpg")',
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 bg-black bg-opacity-60 min-h-screen px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Beverages</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Quench your thirst with our wide range of refreshing and energizing drinks.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
          {beverages.map((item, index) => (
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

export default Beverages;
