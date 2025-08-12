import React from "react";
import { useProducts } from "../context/ProductsContext";

const SearchResults = () => {
  const { filteredProducts, searchQuery } = useProducts();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Search Results for "{searchQuery}"
      </h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-32 w-full object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-sm">{product.name}</h3>
              <p className="text-green-600 font-bold">₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
