import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-luxury text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">LUXE.</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining luxury for the modern era. Quality, craftsmanship, and timeless design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clothing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6">Stay Connected</h4>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="button" 
                className="w-full bg-white text-luxury font-bold rounded-full px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-4 mt-6">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Luxe Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
