// src/context/ProductsContext.jsx
import React, { createContext, useContext } from "react";

const allProducts = [
  // 🥖 Atta & Flour
  { id: "atta-1", name: 'Aashirvaad Whole Wheat Atta 5kg', price: 250, imageUrl: 'https://www.bbassets.com/media/uploads/p/xl/126903_12-aashirvaad-atta-whole-wheat.jpg', tag: 'Bestseller', category: "Atta & Flour" },
  { id: "atta-2", name: 'Fortune Chakki Fresh Atta 5kg', price: 245, imageUrl: 'https://m.media-amazon.com/images/I/71EcRUbX-BL._UF894,1000_QL80_.jpg', tag: 'Popular', category: "Atta & Flour" },
  { id: "atta-3", name: 'Pillsbury Chakki Fresh Atta 5kg', price: 260, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIF0kvi4i0LrMLuseYmxUJdr2pmgOaKs1X6A&s', tag: 'Top Rated', category: "Atta & Flour" },
  { id: "atta-4", name: '24 Mantra Organic Wheat Flour 1kg', price: 120, imageUrl: 'https://www.bbassets.com/media/uploads/p/l/279853_8-24-mantra-organic-atta-whole-wheat.jpg', tag: 'Organic', category: "Atta & Flour" },
  { id: "atta-5", name: 'Nature Fresh Sampoorna Atta 5kg', price: 240, imageUrl: 'https://m.media-amazon.com/images/I/71x6KxIFMfL._UF894,1000_QL80_.jpg', tag: 'Fresh Stock', category: "Atta & Flour" },
  { id: "atta-6", name: 'Annapurna Whole Wheat Atta 5kg', price: 235, imageUrl: 'https://m.media-amazon.com/images/I/81byI4o3N-L._UF894,1000_QL80_.jpg', tag: 'Budget Pick', category: "Atta & Flour" },
  { id: "atta-7", name: 'Organic India Wheat Flour 1kg', price: 135, imageUrl: 'https://5.imimg.com/data5/ECOM/Default/2023/9/348807512/AG/DB/RQ/199273948/organicwholewheatflour1-500x500.jpg', tag: 'Gluten Free', category: "Atta & Flour" },
  { id: "atta-8", name: 'Golden Harvest Atta 10kg', price: 450, imageUrl: 'https://m.media-amazon.com/images/I/819uPN8XmdL._UF1000,1000_QL80_.jpg', tag: 'Bulk Saver', category: "Atta & Flour" },
  { id: "atta-9", name: 'Shakti Bhog Whole Wheat Atta 5kg', price: 230, imageUrl: 'https://m.media-amazon.com/images/I/71z5wUZipwL._UF1000,1000_QL80_.jpg', tag: 'Family Choice', category: "Atta & Flour" },

  // 🥛 Dairy (example)
  { id: "dairy-1", name: "Amul Gold Milk", price: 65, imageUrl: "/images/dairy/amul-gold.jpg", category: "Dairy" },
  { id: "dairy-2", name: "Mother Dairy Curd", price: 40, imageUrl: "/images/dairy/mother-dairy-curd.jpg", category: "Dairy" },

  // Add more categories here...
];

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  return (
    <ProductsContext.Provider value={{ allProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
