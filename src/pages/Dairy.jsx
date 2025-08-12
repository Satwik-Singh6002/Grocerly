import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dairy = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Amul Gold Milk 1L', price: '₹64', imageUrl: 'https://www.jiomart.com/images/product/original/590002686/amul-gold-full-cream-milk-1-l-pouch-product-images-o590002686-p590049228-0-202409131647.jpg', tag: 'Full Cream' },
    { id: 2, name: 'Mother Dairy Curd 400g', price: '₹35', imageUrl: 'https://wholesalemeans.com/image/cache/catalog/product/Grocery/Mother%20Dairy%20Classic%20Dahi%20(Curd)%20400%20G%20Front%20Pic-700x800.png', tag: 'Fresh' },
    { id: 3, name: 'Amul Paneer 200g', price: '₹85', imageUrl: 'https://m.media-amazon.com/images/I/81hD14MN91L.jpg', tag: 'Soft & Fresh' },
    { id: 4, name: 'Amul Butter 500g', price: '₹255', imageUrl: 'https://www.jiomart.com/images/product/original/490001392/amul-butter-500-g-carton-product-images-o490001392-p490001392-3-202203152128.jpg?im=Resize=(420,420)', tag: 'Classic' },
    { id: 5, name: 'Nestlé Milkmaid 400g', price: '₹135', imageUrl: 'https://m.media-amazon.com/images/I/71CE0VUaGmL._UF1000,1000_QL80_.jpg', tag: 'Dessert Essential' },
    { id: 6, name: 'Amul Cheese Cubes 200g', price: '₹125', imageUrl: 'https://m.media-amazon.com/images/I/71JIA49IdYL._UF1000,1000_QL80_.jpg', tag: 'Snack Friendly' },
    { id: 7, name: 'Gowardhan Ghee 1L', price: '₹535', imageUrl: 'https://www.jiomart.com/images/product/original/490010244/gowardhan-pure-cow-ghee-1-l-pouch-product-images-o490010244-p490010244-0-202203150918.jpg', tag: 'Pure Desi Ghee' },
    { id: 8, name: 'Amul Masti Buttermilk 500ml', price: '₹22', imageUrl: 'https://5.imimg.com/data5/CR/UN/BP/SELLER-40904399/500-ml-amul-buttermilk-500x500.jpg', tag: 'Cooling Drink' },
    { id: 9, name: 'Epigamia Greek Yogurt 90g', price: '₹50', imageUrl: 'https://m.media-amazon.com/images/I/61N9nePDbZL._UF1000,1000_QL80_.jpg', tag: 'Protein Rich' },
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
            'url("https://www.asknestle.in/sites/default/files/2022-06/Role-of-dairy-products-in-supporting-healthy-immune-system-in-children_640x380.jpg")',
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 bg-black bg-opacity-60 min-h-screen px-4 sm:px-8 py-10">
        <div className="text-center pt-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Dairy Products</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Fresh milk, curd, paneer, butter, cheese, ghee and more from trusted dairy brands.
          </p>
        </div>

        {/* Product Grid */}
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
              <span className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
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

export default Dairy;
