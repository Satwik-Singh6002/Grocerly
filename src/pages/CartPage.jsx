import React, { useState } from 'react';
import CartItem from './CartItem';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Neu Farm Unpolished Toor Dal 1kg',
      price: 120,
      quantity: 4,
      image: 'https://via.placeholder.com/64', // replace with actual product image
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleDeleteItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart
      </h1>

      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <CartItem
                key={item.id}
                product={item}
                onDelete={handleDeleteItem}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</h2>
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>

          <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
