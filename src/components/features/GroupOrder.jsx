import React, { useState } from 'react';
import { Users, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export const GroupOrder = ({ sizes = ['S', 'M', 'L', 'XL', 'XXL'] }) => {
    const [isActive, setIsActive] = useState(false);
    const [quantities, setQuantities] = useState(sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {}));

    const updateQty = (size, delta) => {
        setQuantities(prev => ({
            ...prev,
            [size]: Math.max(0, prev[size] + delta)
        }));
    };

    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

    return (
        <div className="mb-6 border-b border-gray-100 pb-6">
             <div className="flex items-center justify-between mb-4">
                 <button 
                    onClick={() => setIsActive(!isActive)}
                    className="flex items-center gap-2 font-bold text-luxury hover:text-primary transition-colors"
                 >
                     <Users className="w-5 h-5" />
                     <span>Outfit the Crew / Group Order</span>
                 </button>
             </div>

             <AnimatePresence>
                 {isActive && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                     >
                         <div className="p-4 bg-gray-50 border-b border-gray-100">
                             <p className="text-xs text-gray-500">
                                 Perfect for weddings or events. Select quantities for each size below.
                             </p>
                         </div>
                         <div className="p-4 space-y-3">
                             {sizes.map(size => (
                                 <div key={size} className="flex items-center justify-between">
                                     <span className="font-bold text-luxury w-12">{size}</span>
                                     <div className="flex items-center gap-4">
                                         <button onClick={() => updateQty(size, -1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"><Minus className="w-3 h-3" /></button>
                                         <span className="font-mono w-4 text-center">{quantities[size]}</span>
                                         <button onClick={() => updateQty(size, 1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"><Plus className="w-3 h-3" /></button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                         {totalItems > 0 && (
                             <div className="p-4 bg-gray-50 border-t border-gray-100">
                                 <Button fullWidth icon={ShoppingBag}>
                                     Add {totalItems} Items to Cart
                                 </Button>
                             </div>
                         )}
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>
    );
};
