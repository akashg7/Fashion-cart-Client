import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900  z-50  text-white py-12 mt-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          

          <div>
            <h2 className="text-2xl font-bold text-yellow-500">ShopEase</h2>
            <p className="mt-3 text-gray-400">
              Your one-stop destination for all things fashionable and stylish. We offer a wide range of products to fit any lifestyle.
            </p>
            <div className="flex space-x-4 mt-4">
              <button className="text-yellow-500 hover:text-white transition"><FaFacebook size={24} /></button>
              <button className="text-yellow-500 hover:text-white transition"><FaTwitter size={24} /></button>
              <button className="text-yellow-500 hover:text-white transition"><FaInstagram size={24} /></button>
              <button className="text-yellow-500 hover:text-white transition"><FaLinkedin size={24} /></button>
              <button className="text-yellow-500 hover:text-white transition"><FaYoutube size={24} /></button>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><button className="text-gray-400 hover:text-yellow-500 transition">About Us</button></li>
              <li><button className="text-gray-400 hover:text-yellow-500 transition">Contact</button></li>
              <li><button className="text-gray-400 hover:text-yellow-500 transition">FAQs</button></li>
              <li><button className="text-gray-400 hover:text-yellow-500 transition">Return Policy</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold">Customer Service</h3>
            <ul className="mt-4 space-y-2">
              <li><button className="text-gray-400 hover:text-yellow-500 transition">Order Tracking</button></li>
              <li><button className="text-gray-400 hover:text-yellow-500 transition">Shipping Info</button></li>
              <li><button className="text-gray-400 hover:text-yellow-500 transition">Privacy Policy</button></li>
              <li><button className="text-gray-400 hover:text-yellow-500 transition">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="mt-2 text-gray-400">
              Subscribe to our newsletter for the latest updates on our products and offers.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-black rounded-l-md outline-none"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-md transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Fashon Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
