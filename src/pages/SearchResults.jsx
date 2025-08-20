import React from "react";
import { useLocation } from "react-router-dom";
import { allProducts } from "../data/productsData"; // ✅ product data
import { useCart } from "../context/CartContext";

const SearchResults = () => {
  const location = useLocation();
  const query =
    new URLSearchParams(location.search).get("query")?.trim().toLowerCase() || "";

  const { addToCart } = useCart();

  let results = [];

  if (query.length > 0) {
    // ✅ First try to match by product name
    results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    // ✅ If no product name matches, then match by category
    if (results.length === 0) {
      results = allProducts.filter((product) =>
        product.category?.toLowerCase().includes(query)
      );
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{query || "…"}"{" "}
        {results.length > 0 && <span className="text-gray-500">({results.length})</span>}
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-2 shadow hover:shadow-md transition"
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-medium">{product.name}</h3>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          {query
            ? "No products found. Try searching by product name."
            : "Type a product name in the search bar to see results."}
        </p>
      )}
    </div>
  );
};

export default SearchResults;
