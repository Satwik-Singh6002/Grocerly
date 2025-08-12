import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttaAndFlour = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Aashirvaad Whole Wheat Atta 5kg', price: 250, imageUrl: 'https://www.bbassets.com/media/uploads/p/xl/126903_12-aashirvaad-atta-whole-wheat.jpg', tag: 'Bestseller' },
    { id: 2, name: 'Fortune Chakki Fresh Atta 5kg', price: 245, imageUrl: 'https://m.media-amazon.com/images/I/71EcRUbX-BL._UF894,1000_QL80_.jpg', tag: 'Popular' },
    { id: 3, name: 'Pillsbury Chakki Fresh Atta 5kg', price: 260, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIF0kvi4i0LrMLuseYmxUJdr2pmgOaKs1X6A&s', tag: 'Top Rated' },
    { id: 4, name: '24 Mantra Organic Wheat Flour 1kg', price: 120, imageUrl: 'https://www.bbassets.com/media/uploads/p/l/279853_8-24-mantra-organic-atta-whole-wheat.jpg', tag: 'Organic' },
    { id: 5, name: 'Nature Fresh Sampoorna Atta 5kg', price: 240, imageUrl: 'https://m.media-amazon.com/images/I/71x6KxIFMfL._UF894,1000_QL80_.jpg', tag: 'Fresh Stock' },
    { id: 6, name: 'Annapurna Whole Wheat Atta 5kg', price: 235, imageUrl: 'https://m.media-amazon.com/images/I/81byI4o3N-L._UF894,1000_QL80_.jpg', tag: 'Budget Pick' },
    { id: 7, name: 'Organic India Wheat Flour 1kg', price: 135, imageUrl: 'https://5.imimg.com/data5/ECOM/Default/2023/9/348807512/AG/DB/RQ/199273948/organicwholewheatflour1-500x500.jpg', tag: 'Gluten Free' },
    { id: 8, name: 'Golden Harvest Atta 10kg', price: 450, imageUrl: 'https://m.media-amazon.com/images/I/819uPN8XmdL._UF1000,1000_QL80_.jpg', tag: 'Bulk Saver' },
    { id: 9, name: 'Shakti Bhog Whole Wheat Atta 5kg', price: 230, imageUrl: 'https://m.media-amazon.com/images/I/71z5wUZipwL._UF1000,1000_QL80_.jpg', tag: 'Family Choice' },
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
        style={{
          backgroundImage: 'url("https://aashirvaadchakki.com/cdn/shop/articles/blog-08-khapli-wheat-flour_1920x.jpg?v=1706604703")',
        }}
      ></div>

      {/* Foreground */}
      <div className="relative z-10 px-4 sm:px-8 py-10 text-white">
        <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg">Atta & Flour</h1>
        <p className="text-center text-gray-100 max-w-2xl mx-auto mb-10">
          Browse premium chakki atta, organic flours, and more from trusted brands.
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
              <p className="text-green-300 font-medium mb-2">₹{item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
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
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default AttaAndFlour;
