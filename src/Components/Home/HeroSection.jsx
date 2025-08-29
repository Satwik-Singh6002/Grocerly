import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slide data - could be moved to a separate file for better organization
const slides = [
  {
    image:
      "https://blog.grabon.in/wp-content/uploads/2021/07/Online-Grocery-Stores-in-india.jpg",
    title: "India's #1 Online Grocery Destination",
    description: "Get the best quality groceries at your doorstep with just a few clicks",
    buttonText: "Start Shopping",
    buttonAria: "Start shopping for groceries",
  },
  {
    image:
      "https://www.financialexpress.com/wp-content/uploads/2020/06/fruits.jpg",
    title: "Fresh Vegetables Delivered to Your Doorstep",
    description: "Farm-fresh produce delivered within hours of harvesting",
    buttonText: "Shop Now",
    buttonAria: "Shop for fresh vegetables",
  },
  {
    image:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-06/beautiful-tasty-appetizing-ingredients-spices-grocery-cooking-healthy-kitchen-blue-old-wooden-background-top-view.jpg",
    title: "Import Different Kinds of Spices to Your Home",
    description: "Discover authentic spices from across India and beyond",
    buttonText: "Explore Deals",
    buttonAria: "Explore spice deals",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  // Memoize slider settings to prevent re-renders
  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        }
      },
    ],
  }), []);

  const handleShopClick = () => {
    navigate("/login");
  };

  return (
    <section aria-label="Featured promotions" className="relative w-full">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative outline-none">
            {/* Image with lazy loading and better alt text */}
            <img
              src={slide.image}
              alt={`Promotional banner: ${slide.title}`}
              className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            
            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight drop-shadow-md">
                  {slide.title}
                </h2>
                
                {slide.description && (
                  <p className="text-white text-sm sm:text-base md:text-lg mb-5 md:mb-6 max-w-2xl mx-auto drop-shadow-md">
                    {slide.description}
                  </p>
                )}
                
                <button
                  onClick={handleShopClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
                  aria-label={slide.buttonAria}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;