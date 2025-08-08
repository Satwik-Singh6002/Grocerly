import React, { useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ product, onDelete, onQuantityChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
      {/* Product Image */}
      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />

      {/* Product Details */}
      <div className="flex-1 mx-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">₹{product.price} x {product.quantity}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onQuantityChange(product.id, product.quantity - 1)}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center">{product.quantity}</span>
        <button
          onClick={() => onQuantityChange(product.id, product.quantity + 1)}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Delete Icon */}
      <button onClick={() => setShowConfirm(true)} className="text-red-500 hover:text-red-600 ml-4">
        <Trash2 size={20} />
      </button>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="absolute bg-white border p-4 rounded shadow-md mt-2 z-10">
          <p>Remove item from cart?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={() => setShowConfirm(false)} className="text-sm px-2 py-1 rounded bg-gray-200">Cancel</button>
            <button onClick={() => onDelete(product.id)} className="text-sm px-2 py-1 rounded bg-red-500 text-white">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
