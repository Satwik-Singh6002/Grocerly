import React from 'react';
import { useCart } from "../context/CartContext"; // ✅ Correct import

const Rice = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'India Gate Basmati Rice 1kg',
      price: '₹125',
      imageUrl: 'https://m.media-amazon.com/images/I/81mHz4XKK0L.jpg',
      tag: 'Basmati',
    },
    {
      id: 2,
      name: 'Daawat Rozana Super 5kg',
      price: '₹420',
      imageUrl: 'https://m.media-amazon.com/images/I/71xqTSRdbML._UF894,1000_QL80_.jpg',
      tag: 'Long Grain',
    },
    {
      id: 3,
      name: 'Fortune Everyday Biryani Rice',
      price: '₹99',
      imageUrl: 'https://www.jiomart.com/images/product/original/491215473/fortune-everyday-full-grain-basmati-rice-1-kg-product-images-o491215473-p491215473-0-202203150346.jpg',
      tag: 'Biryani',
    },
    {
      id: 4,
      name: 'Kohinoor Basmati Rice 1kg',
      price: '₹135',
      imageUrl: 'https://m.media-amazon.com/images/I/71xIb0tGQNL._UF1000,1000_QL80_.jpg',
      tag: 'Fragrant',
    },
    {
      id: 5,
      name: 'Lal Qilla Traditional Basmati 1kg',
      price: '₹145',
      imageUrl: 'https://m.media-amazon.com/images/I/51HoaLo97FS._AC_.jpg',
      tag: 'Premium',
    },
    {
      id: 6,
      name: 'Aeroplane Jeerakasala Rice 1kg',
      price: '₹160',
      imageUrl: 'https://www.jiomart.com/images/product/original/491297292/aeroplane-1121-extra-long-grain-basmati-rice-1-kg-product-images-o491297292-p591041688-0-202204262006.jpg?im=Resize=(420,420)',
      tag: 'South Indian',
    },
    {
      id: 7,
      name: 'Golden Harvest Everyday Rice 5kg',
      price: '₹315',
      imageUrl: 'https://www.jiomart.com/images/product/original/491971770/golden-harvest-pulao-basmati-rice-5-kg-product-images-o491971770-p591217811-0-202206091827.jpg?im=Resize=(1000,1000)',
      tag: 'Budget',
    },
    {
      id: 8,
      name: 'Organic Tattva Brown Rice 1kg',
      price: '₹110',
      imageUrl: 'https://m.media-amazon.com/images/I/61v88n1C0BL.jpg',
      tag: 'Healthy',
    },
    {
      id: 9,
      name: 'Tilda Basmati Rice 1kg',
      price: '₹220',
      imageUrl: 'https://m.media-amazon.com/images/I/71SRL6dUx0L._UF1000,1000_QL80_.jpg',
      tag: 'Export Quality',
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-90"
        style={{
          backgroundImage:
            'url("https://cdn.britannica.com/17/176517-050-6F2B774A/Pile-uncooked-rice-grains-Oryza-sativa.jpg")',
        }}
      ></div>

      <div className="relative z-10 bg-black bg-opacity-60 min-h-screen px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Rice Collection</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Find premium Basmati, biryani, and everyday rice at great prices.
          </p>
        </div>

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
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl transition"
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

export default Rice;
