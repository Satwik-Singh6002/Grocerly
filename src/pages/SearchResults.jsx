import React from "react";
import { useLocation } from "react-router-dom";
import { allProducts } from "../data/productsData";

import { useCart } from "../context/CartContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const { addToCart } = useCart();

  const results = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <div key={product.id} className="border rounded-lg p-2 shadow">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <h3 className="mt-2 font-medium">{product.name}</h3>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
