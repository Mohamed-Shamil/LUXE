import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const liked = isInWishlist(product.id);

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on action buttons
    if (e.target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4 relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
                <span className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    New In
                </span>
            )}
            {product.rating >= 4.8 && (
                <span className="bg-luxury/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    Best Seller
                </span>
            )}
        </div>

        {/* Wishlist Button - Functional */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
        </button>

        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="w-full bg-white/95 backdrop-blur text-luxury py-3 font-medium text-sm hover:bg-luxury hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
                <ShoppingBag className="w-4 h-4" /> Quick Add
            </button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-serif text-lg font-medium group-hover:text-luxury transition-colors">
            {product.name}
        </h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="flex items-center justify-between">
            <span className="font-medium text-luxury">${product.price}</span>
            
            {/* Color Swatches */}
            <div className="flex -space-x-1">
                {product.colors.map((color, i) => (
                    <div key={i} className="w-3 h-3 rounded-full border border-white ring-1 ring-gray-200" style={{ backgroundColor: color }} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
