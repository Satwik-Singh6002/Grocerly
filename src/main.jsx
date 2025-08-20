// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Correct import
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { ProductsProvider } from './context/ProductsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </ToastProvider>
  </React.StrictMode>
);