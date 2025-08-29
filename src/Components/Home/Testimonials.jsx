import React, { useState } from "react";
import { Quote, Send, Star, User } from "lucide-react";

const testimonials = [
  { 
    quote: "Amazing service! Got all my groceries in under an hour.", 
    name: "Ravi Kumar",
    rating: 5
  },
  { 
    quote: "Very affordable prices and fresh products. Totally recommend!", 
    name: "Anjali Sharma",
    rating: 4
  },
  { 
    quote: "Great variety of items and super user-friendly interface.", 
    name: "Suresh Verma",
    rating: 5
  },
  { 
    quote: "Excellent packaging and fast delivery. Happy customer!", 
    name: "Meera Joshi",
    rating: 5
  },
  { 
    quote: "Loved the variety of organic products. Will order again!", 
    name: "Tarun Mehta",
    rating: 4
  },
  { 
    quote: "Impressive discounts and easy navigation!", 
    name: "Sneha Reddy",
    rating: 5
  },
];

const Testimonials = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim() || rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      console.log("Customer Feedback:", { feedback, rating });
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setFeedback("");
      setRating(0);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Hear from our satisfied customers about their experience with KiranaStore
        </p>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100"
            >
              <div className="flex mb-3">
                {renderStars(item.rating)}
              </div>
              <Quote className="text-green-500 mb-3 w-6 h-6" />
              <p className="text-gray-800 mb-4 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center mt-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <User size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-700 mb-2 text-center">
            Share Your Experience
          </h3>
          <p className="text-gray-600 text-center mb-6">
            We value your feedback to help us improve our service
          </p>
          
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg inline-flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="font-medium">Thank you for your feedback! 💚</span>
              </div>
              <p className="mt-4 text-gray-600">We appreciate you taking the time to share your experience.</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                      aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                      <Star
                        size={28}
                        className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full p-4 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-colors"
                  rows="4"
                  placeholder="What did you like about our service? How can we improve?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  maxLength={500}
                  aria-describedby="feedback-help"
                />
                <div className="flex justify-between mt-1">
                  <p id="feedback-help" className="text-sm text-gray-500">
                    Maximum 500 characters
                  </p>
                  <span className={`text-sm ${feedback.length > 450 ? 'text-amber-600' : 'text-gray-500'}`}>
                    {feedback.length}/500
                  </span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!feedback.trim() || rating === 0 || isSubmitting}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;