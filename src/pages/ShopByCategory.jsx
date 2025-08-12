import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Dal & Pulses", icon: "💧", path: "/dal-pulses" },
  { name: "Atta & Flour", icon: "🌾", path: "/atta-flour" },
  { name: "Snacks", icon: "🍪", path: "/snacks" },
  { name: "Oil & Ghee", icon: "🧈", path: "/oil-ghee" },
  { name: "Beverages", icon: "🥤", path: "/beverages" },
  { name: "Dairy", icon: "🥛", path: "/dairy" },
  { name: "Spices", icon: "🌿", path: "/spices" },
  { name: "Rice", icon: "🍚", path: "/rice" },
  { name: "Fruits", icon: "🍎", path: "/fruits" },
  { name: "Vegetables", icon: "🥕", path: "/vegetables" },
  { name: "Bakery", icon: "🍞", path: "/bakery" },
  { name: "Frozen Foods", icon: "❄️", path: "/frozen-foods" },
];

const ShopByCategory = () => {
  return (
    <section
      id="shop-by-category"
      className="py-10 bg-gradient-to-b from-green-50 to-white w-full"
      aria-label="Shop by Category section"
    >
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Shop by Category
      </h2>
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Fixed 3 columns layout */}
        <div className="grid grid-cols-3 gap-6">
          {categories.map(({ name, icon, path }) => (
            <Link
              to={path}
              key={name}
              aria-label={`Shop category ${name}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <div className="text-4xl mb-3 transition-transform duration-300 hover:scale-110">
                {icon}
              </div>
              <p className="font-semibold text-gray-800 text-sm sm:text-lg">
                {name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
