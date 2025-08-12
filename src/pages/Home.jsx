import React from "react";
import HeroSection from "../components/Home/HeroSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
