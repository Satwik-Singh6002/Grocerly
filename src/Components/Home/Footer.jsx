import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-500 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-b border-white/20">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">
            Kirana<span className="text-yellow-300">Store</span>
          </h2>
          <p className="mt-2 text-gray-100 text-sm sm:text-base">
            Your trusted grocery partner.
          </p>
          <div className="flex justify-center md:justify-start items-center gap-3 sm:gap-4 mt-4">
            <a
              href="#"
              className="p-2.5 sm:p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="p-2.5 sm:p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              className="p-2.5 sm:p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition"
            >
              <FaTwitter size={16} />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:items-end text-center md:text-right space-y-1 sm:space-y-2 text-sm sm:text-base">
          <a href="#" className="hover:text-yellow-300 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Contact Us
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-4 text-xs sm:text-sm text-gray-200">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">KiranaStore</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
