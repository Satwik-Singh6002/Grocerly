import React, { useState } from "react";
import { Quote, Send } from "lucide-react";

const testimonials = [
  { quote: "Amazing service! Got all my groceries in under an hour.", name: "Ravi Kumar" },
  { quote: "Very affordable prices and fresh products. Totally recommend!", name: "Anjali Sharma" },
  { quote: "Great variety of items and super user-friendly interface.", name: "Suresh Verma" },
  { quote: "Excellent packaging and fast delivery. Happy customer!", name: "Meera Joshi" },
  { quote: "Loved the variety of organic products. Will order again!", name: "Tarun Mehta" },
  { quote: "Impressive discounts and easy navigation!", name: "Sneha Reddy" },
];

const Testimonials = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      console.log("Customer Feedback:", feedback);
      setSubmitted(true);
      setFeedback("");
      setTimeout(() => setSubmitted(false), 4000); // Reset after 4s
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-12">
        What Our Customers Say
      </h2>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-green-100 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <Quote className="text-green-500 mb-3 w-6 h-6" />
            <p className="text-gray-800 italic mb-4 leading-relaxed">
              "{item.quote}"
            </p>
            <p className="font-semibold text-green-800">– {item.name}</p>
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="mt-16 max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 text-center">
          Leave Your Feedback
        </h3>
        {submitted ? (
          <p className="text-green-600 font-medium text-center animate-fadeIn">
            Thanks for your feedback! 💚
          </p>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
            <textarea
              className="w-full p-4 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="4"
              placeholder="Write your thoughts or feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Send size={18} />
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
