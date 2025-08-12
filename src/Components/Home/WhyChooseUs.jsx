import React from "react";
import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    "Fresh and Quality Products",
    "Fast and Reliable Delivery",
    "Affordable Pricing",
    "Easy Returns",
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700 text-center mb-12">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <div className="p-3 rounded-full bg-green-100 border border-green-500 flex-shrink-0">
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>
            <span className="text-lg font-medium text-gray-800">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
