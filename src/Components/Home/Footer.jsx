import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-600 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 border-b border-white/20">
        
        {/* Brand Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Kirana<span className="text-yellow-300">Store</span>
          </h2>
          <p className="mt-3 text-gray-100 text-sm sm:text-base max-w-md">
            Your trusted grocery partner delivering fresh produce and household essentials right to your doorstep.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <a
              href="https://facebook.com/kiranastore"
              aria-label="Visit our Facebook page"
              className="p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com/kiranastore"
              aria-label="Follow us on Instagram"
              className="p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://twitter.com/kiranastore"
              aria-label="Follow us on Twitter"
              className="p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaTwitter size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-yellow-300 transition-colors duration-200">About Us</a></li>
            <li><a href="/products" className="hover:text-yellow-300 transition-colors duration-200">Products</a></li>
            <li><a href="/offers" className="hover:text-yellow-300 transition-colors duration-200">Special Offers</a></li>
            <li><a href="/locations" className="hover:text-yellow-300 transition-colors duration-200">Store Locations</a></li>
          </ul>
        </div>

        {/* Contact & Policy Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">Support</h3>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-yellow-300 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-yellow-300 transition-colors duration-200">Terms & Conditions</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition-colors duration-200">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-yellow-300 transition-colors duration-200">FAQ</a></li>
          </ul>
        </div>
      </div>

      {/* Contact Information Bar */}
      <div className="bg-green-900/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-sm">
            <div className="flex items-center gap-2">
              <FaPhone className="text-yellow-300" size={14} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-300" size={14} />
              <span>support@kiranastore.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-300" size={14} />
              <span>123 Grocery Street, City, Country</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center py-5 text-sm text-gray-200 bg-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p>© {currentYear} <span className="font-semibold">KiranaStore</span>. All rights reserved.</p>
          <p className="mt-1 text-xs">Designed with ❤️ for your grocery needs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;