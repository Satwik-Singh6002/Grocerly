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

const CategorySection = () => {
  return (
   <section className="py-12 bg-white w-full">
  <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
  <div className="max-w-7xl mx-auto px-8">
    <div className="grid grid-cols-4 gap-8">
      {categories.map((category) => (
        <Link
          to={category.path}
          key={category.name}
          className="border rounded-2xl py-10 px-6 text-center hover:shadow-lg transition bg-white hover:bg-gray-50"
        >
          <div className="text-4xl mb-3">{category.icon}</div>
          <p className="font-semibold text-lg text-gray-800">{category.name}</p>
        </Link>
      ))}
    </div>
  </div>
</section>

  );
};

export default CategorySection;
