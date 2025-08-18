import React, { useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ product, onDelete, onIncrease, onDecrease }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition relative">
      
      {/* Product Image */}
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-20 h-20 object-cover rounded mx-auto sm:mx-0"
      />

      {/* Product Details */}
      <div className="flex-1 mt-3 sm:mt-0 sm:mx-4 text-center sm:text-left">
        <h2 className="text-lg font-semibold break-words">{product.name}</h2>
        <p className="text-sm text-gray-500">
          ₹{product.price} x {product.quantity}
        </p>
      </div>

      {/* Quantity + Delete controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-3 sm:mt-0">
        
        {/* Quantity Controls */}
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => onDecrease(product.id)}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center">{product.quantity}</span>
          <button
            onClick={() => onIncrease(product.id)}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Delete Icon */}
        <button 
          onClick={() => setShowConfirm(true)} 
          className="text-red-500 hover:text-red-600 mt-2 sm:mt-0"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="absolute right-2 top-full sm:top-auto sm:right-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 bg-white border p-4 rounded shadow-md mt-2 z-10 w-56">
          <p className="text-sm">Remove item from cart?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button 
              onClick={() => setShowConfirm(false)} 
              className="text-sm px-2 py-1 rounded bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={() => onDelete(product.id)} 
              className="text-sm px-2 py-1 rounded bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
