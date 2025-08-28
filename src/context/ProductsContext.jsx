// src/context/ProductsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Initial product data (can be moved to a separate file or fetched from API)
const initialProducts = [
  // 🥖 Atta & Flour
  { id: "atta-1", name: "Aashirvaad Whole Wheat Atta 5kg", price: 250, imageUrl: "https://www.bbassets.com/media/uploads/p/xl/126903_12-aashirvaad-atta-whole-wheat.jpg", tag: "Bestseller", category: "Atta & Flour" },
  { id: "atta-2", name: "Fortune Chakki Fresh Atta 5kg", price: 245, imageUrl: "https://m.media-amazon.com/images/I/71EcRUbX-BL._UF894,1000_QL80_.jpg", tag: "Popular", category: "Atta & Flour" },
  { id: "atta-3", name: "Pillsbury Chakki Fresh Atta 5kg", price: 260, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIF0kvi4i0LrMLuseYmxUJdr2pmgOaKs1X6A&s", tag: "Top Rated", category: "Atta & Flour" },
  { id: "atta-4", name: "24 Mantra Organic Wheat Flour 1kg", price: 120, imageUrl: "https://www.bbassets.com/media/uploads/p/l/279853_8-24-mantra-organic-atta-whole-wheat.jpg", tag: "Organic", category: "Atta & Flour" },
  { id: "atta-5", name: "Nature Fresh Sampoorna Atta 5kg", price: 240, imageUrl: "https://m.media-amazon.com/images/I/71x6KxIFMfL._UF894,1000_QL80_.jpg", tag: "Fresh Stock", category: "Atta & Flour" },
  { id: "atta-6", name: "Annapurna Whole Wheat Atta 5kg", price: 235, imageUrl: "https://m.media-amazon.com/images/I/81byI4o3N-L._UF894,1000_QL80_.jpg", tag: "Budget Pick", category: "Atta & Flour" },
  { id: "atta-7", name: "Organic India Wheat Flour 1kg", price: 135, imageUrl: "https://5.imimg.com/data5/ECOM/Default/2023/9/348807512/AG/DB/RQ/199273948/organicwholewheatflour1-500x500.jpg", tag: "Gluten Free", category: "Atta & Flour" },
  { id: "atta-8", name: "Golden Harvest Atta 10kg", price: 450, imageUrl: "https://m.media-amazon.com/images/I/819uPN8XmdL._UF1000,1000_QL80_.jpg", tag: "Bulk Saver", category: "Atta & Flour" },
  { id: "atta-9", name: "Shakti Bhog Whole Wheat Atta 5kg", price: 230, imageUrl: "https://m.media-amazon.com/images/I/71z5wUZipwL._UF1000,1000_QL80_.jpg", tag: "Family Choice", category: "Atta & Flour" },

  // 🥛 Dairy
  { id: "dairy-1", name: "Amul Gold Milk", price: 65, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40101614_2-amul-taaza-milk.jpg", tag: "Bestseller", category: "Dairy" },
  { id: "dairy-2", name: "Mother Dairy Curd", price: 40, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/100002424_15-mother-dairy-curd.jpg", tag: "Fresh", category: "Dairy" },
  { id: "dairy-3", name: "Amul Butter 100g", price: 50, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/100000465_14-amul-salted-table-butter.jpg", tag: "Popular", category: "Dairy" },
  { id: "dairy-4", name: "Go Cheese 200g", price: 110, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40000910_8-go-cheese-cheese-slices.jpg", tag: "Top Rated", category: "Dairy" },
  
  // 🍚 Rice & Grains
  { id: "rice-1", name: "India Gate Basmati Rice 5kg", price: 595, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/1211697_6-india-gate-feast-basmati-rice.jpg", tag: "Premium", category: "Rice & Grains" },
  { id: "rice-2", name: "Daawat Rozana Rice 5kg", price: 299, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40045956_2-dawat-rozana-rice.jpg", tag: "Everyday Use", category: "Rice & Grains" },
  
  // 🍯 Cooking Oil
  { id: "oil-1", name: "Fortune Refined Sunflower Oil 1L", price: 175, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/1211843_7-fortune-sun-lite-refined-sunflower-oil.jpg", tag: "Healthy", category: "Cooking Oil" },
  { id: "oil-2", name: "Saffola Gold Oil 1L", price: 205, imageUrl: "https://www.bigbasket.com/media/uploads/p/l/267469_13-saffola-gold-oil.jpg", tag: "Heart Healthy", category: "Cooking Oil" },
];

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In a real app, this would fetch from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(initialProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Using default data.");
        console.error("Error fetching products:", err);
        setProducts(initialProducts); // Fallback to initial data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get all unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Get products by category
  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  // Get product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  // Search products
  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery) ||
      (product.tag && product.tag.toLowerCase().includes(lowerCaseQuery))
    );
  };

  const value = {
    products,
    categories,
    loading,
    error,
    getProductsByCategory,
    getProductById,
    searchProducts
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};