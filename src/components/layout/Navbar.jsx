import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-luxury"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-luxury tracking-tight">
            LUXE.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/collections/all" className="text-sm font-medium text-luxury hover:text-accent transition-colors">
              New Arrivals
            </Link>
            <Link to="/collections/all" className="text-sm font-medium text-luxury hover:text-accent transition-colors">
              Collections
            </Link>
            <Link to="/account" className="text-sm font-medium text-luxury hover:text-accent transition-colors">
              Account
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="text-luxury hover:scale-110 transition-transform" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="text-luxury hover:scale-110 transition-transform" aria-label="Wishlist">
               <Heart className="w-5 h-5" />
            </Link>
            <Link to="/account" className="text-luxury hover:scale-110 transition-transform" aria-label="Account">
               <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                 JD
               </div>
            </Link>
            <button onClick={openCart} className="relative text-luxury hover:scale-110 transition-transform" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white md:hidden"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <span className="text-2xl font-serif font-bold">LUXE.</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-luxury" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
                <Link 
                  to="/collections/all" 
                  className="text-xl font-medium text-luxury"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop All
                </Link>
                <Link 
                  to="/account" 
                  className="text-xl font-medium text-luxury"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
