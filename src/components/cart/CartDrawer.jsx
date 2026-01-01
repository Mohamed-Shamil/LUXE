import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const CartDrawer = () => {
    const navigate = useNavigate();
  const { isOpen, closeCart, items, removeFromCart, total } = useCart();
  const freeShippingThreshold = 500;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-serif font-bold text-luxury flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Bag ({items.length})
              </h2>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Gamification Bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              {total >= freeShippingThreshold ? (
                <p className="text-sm font-medium text-green-600 text-center">🎉 You've unlocked <strong>Free Express Shipping!</strong></p>
              ) : (
                <p className="text-sm text-gray-600 text-center mb-2">
                  Add <strong>${freeShippingThreshold - total}</strong> more for free shipping
                </p>
              )}
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-secondary"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500">Your bag is empty.</p>
                  <Button variant="outline" className="mt-4" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-luxury">{item.name}</h3>
                          <span className="font-bold text-luxury">${item.price * item.quantity}</span>
                        </div>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
                          <button className="text-gray-400 hover:text-luxury"><Minus className="w-3 h-3" /></button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button className="text-gray-400 hover:text-luxury"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between mb-4 text-lg font-bold text-luxury">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <Button 
                  fullWidth 
                  className="py-4 text-lg shadow-xl shadow-blue-900/10"
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                >
                  Checkout Now
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
