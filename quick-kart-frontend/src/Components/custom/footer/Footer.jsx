import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-20">
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-black">
              <span className="text-orange-500">Q</span>uickCart
            </h2>
            <p className="mt-4 text-sm text-gray-600 leading-6">
              Your trusted online shopping partner delivering quality 
              products at unbeatable prices across India.
            </p>

            <div className="flex gap-4 mt-5 text-gray-500">
              <Facebook className="hover:text-orange-500 cursor-pointer transition" size={18}/>
              <Instagram className="hover:text-orange-500 cursor-pointer transition" size={18}/>
              <Twitter className="hover:text-orange-500 cursor-pointer transition" size={18}/>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-black font-semibold mb-5">Popular Categories</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer">Electronics</li>
              <li className="hover:text-orange-500 cursor-pointer">Fashion</li>
              <li classNameggj="hover:text-orange-500 cursor-pointer">Home & Living</li>
              <li className="hover:text-orange-500 cursor-pointer">Groceries</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-black font-semibold mb-5">Customer Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Free Shipping</li>
              <li>Easy Returns</li>
              <li>Secure Payments</li>
              <li>24/7 Assistance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-black font-semibold mb-5">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>21 Tech Park, Bangalore</li>
              <li>+91 98765 43210</li>
              <li>support@quickcart.in</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 QuickCart. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-orange-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-orange-500 cursor-pointer">Terms</span>
            <span className="hover:text-orange-500 cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;