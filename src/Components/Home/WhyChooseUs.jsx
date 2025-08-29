import React from "react";
import { 
  CheckCircle, 
  Truck, 
  Shield, 
  PiggyBank, 
  Sparkles,
  RefreshCw 
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fresh and Quality Products",
      description: "Sourced directly from local farms and trusted suppliers",
      icon: Sparkles,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200"
    },
    {
      title: "Fast and Reliable Delivery",
      description: "Get your orders delivered within 2 hours in the city",
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Affordable Pricing",
      description: "Best prices with regular discounts and offers",
      icon: PiggyBank,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-200"
    },
    {
      title: "Easy Returns",
      description: "30-day return policy with no questions asked",
      icon: RefreshCw,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      title: "Secure Payments",
      description: "100% secure payment gateway with encryption",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-200"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries",
      icon: CheckCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-4">
            Why Choose KiranaStore?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why thousands of customers trust us for their daily grocery needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative z-10">
                  <div className={`p-4 rounded-2xl ${feature.bgColor} border ${feature.borderColor} w-14 h-14 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-green-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-700">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700">10K+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700">15+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700">98%</div>
              <div className="text-gray-600">Positive Reviews</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to experience the difference?</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Start Shopping Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;