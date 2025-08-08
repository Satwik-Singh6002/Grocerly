import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 border-b border-white/20">
        
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold">Kirana<span className="text-yellow-300">Store</span></h2>
          <p className="mt-2 text-gray-100">Your trusted grocery partner.</p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:items-end space-y-2">
          <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-300 transition">Terms & Conditions</a>
          <a href="#" className="hover:text-yellow-300 transition">Contact Us</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-4 text-sm text-gray-200">
        © {new Date().getFullYear()} <span className="font-semibold">KiranaStore</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
