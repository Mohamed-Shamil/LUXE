import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

const Wishlist = () => {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-6xl">
                <h1 className="text-4xl font-serif font-bold text-luxury mb-8">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-400">Your wishlist is empty</h2>
                        <a href="/collections/all" className="text-luxury font-bold hover:underline mt-4 inline-block">Explore Collection</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((item, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={item.id} 
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                     <button 
                                        onClick={() => toggleWishlist(item)}
                                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 hover:bg-white transition-colors"
                                     >
                                         <Trash2 className="w-4 h-4" />
                                     </button>
                                </div>
                                
                                <div className="p-4">
                                    <h3 className="font-serif font-bold text-luxury text-lg mb-1">{item.name}</h3>
                                    <p className="text-secondary font-bold mb-4">${item.price}</p>
                                    
                                    <Button 
                                        fullWidth 
                                        onClick={() => addToCart(item)}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Move to Cart
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
