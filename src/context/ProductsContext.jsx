import React, { createContext, useContext, useState } from "react";

// Create Context
const ProductsContext = createContext();

// Provider Component
export const ProductsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Example products (replace with your category products)
  const allProducts = [
    { id: 1, name: "Tata Sampann Toor Dal", category: "Dal & Pulses", price: 145, image: "/products/toor-dal.jpg" },
    { id: 2, name: "Fortune Chakki Atta", category: "Atta & Flour", price: 250, image: "/products/atta.jpg" },
    { id: 3, name: "Parle-G Biscuit", category: "Snacks", price: 10, image: "/products/parleg.jpg" },
    // Add more...
  ];

  // Filtered products based on search query
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProductsContext.Provider value={{ searchQuery, setSearchQuery, filteredProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook
export const useProducts = () => useContext(ProductsContext);
