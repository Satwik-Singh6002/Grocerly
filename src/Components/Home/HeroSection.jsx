import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image:
      "https://blog.grabon.in/wp-content/uploads/2021/07/Online-Grocery-Stores-in-india.jpg",
    title: "India’s #1 Online Grocery Destination",
    buttonText: "Start Shopping",
  },
  {
    image:
      "https://www.financialexpress.com/wp-content/uploads/2020/06/fruits.jpg",
    title: "Fresh Vegetables Delivered to Your Doorstep",
    buttonText: "Shop Now",
  },
  {
    image:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-06/beautiful-tasty-appetizing-ingredients-spices-grocery-cooking-healthy-kitchen-blue-old-wooden-background-top-view.jpg",
    title: "Import different kind of Spices to your Home",
    buttonText: "Explore Deals",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 px-4 text-center">
              <h2 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {slide.title}
              </h2>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-medium transition duration-300"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
