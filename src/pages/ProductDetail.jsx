import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { Star, Truck, Shield, ChevronRight } from 'lucide-react';
import { NativeReviews } from '../components/features/NativeReviews';
import { BulkQuoteForm } from '../components/features/BulkQuoteForm';
import { GroupOrder } from '../components/features/GroupOrder';
import { RentalSystem } from '../components/features/RentalSystem';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const found = products.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setSelectedColor(found.colors[0]);
    }
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const upsellProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="animate-fade-in pt-10">
      <div className="container mx-auto px-6 mb-24">
        {/* Breadcrumb - Optional */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <span>Home</span> <ChevronRight className="w-4 h-4" /> 
          <span>{product.category}</span> <ChevronRight className="w-4 h-4" /> 
          <span className="text-luxury font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
               <motion.img 
                 key={selectedColor}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:opacity-75 transition-opacity overflow-hidden">
                   <img src={product.image} className="w-full h-full object-cover" alt="thumbnail" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
             <div className="flex items-center gap-2 text-yellow-500 mb-4">
               <Star className="w-4 h-4 fill-current" />
               <Star className="w-4 h-4 fill-current" />
               <Star className="w-4 h-4 fill-current" />
               <Star className="w-4 h-4 fill-current" />
               <Star className="w-4 h-4 fill-current" />
               <span className="text-gray-400 text-sm ml-2">(128 Reviews)</span>
             </div>

             <h1 className="text-4xl font-serif font-bold text-luxury mb-4">{product.name}</h1>
             <p className="text-2xl font-medium text-luxury mb-6">${product.price}</p>
             
             <p className="text-gray-500 leading-relaxed mb-8">
               Meticulously crafted from premium materials, this piece embodies the perfect balance of style and comfort. 
               Designed for the modern individual who values quality above all else.
             </p>

             {/* Color Selection */}
             <div className="mb-8">
               <span className="text-sm font-bold text-luxury block mb-3">Color</span>
               <div className="flex gap-3">
                 {product.colors.map(color => (
                   <button
                     key={color}
                     onClick={() => setSelectedColor(color)}
                     className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-luxury' : 'border-transparent'} ring-1 ring-gray-200`}
                     style={{ backgroundColor: color }}
                   />
                 ))}
               </div>
             </div>

             {/* Subscribe & Save Mockup */}
             <div className="mb-6 p-4 border border-luxury/20 rounded-lg bg-gray-50/50">
               <div className="flex items-center gap-3 mb-2">
                 <input type="radio" name="purchaseType" id="one-time" defaultChecked className="accent-luxury" />
                 <label htmlFor="one-time" className="text-sm font-medium text-luxury">One-time purchase</label>
               </div>
               <div className="flex items-center gap-3">
                 <input type="radio" name="purchaseType" id="subscribe" className="accent-luxury" />
                 <label htmlFor="subscribe" className="text-sm font-medium text-luxury flex items-center gap-2">
                   <span>Subscribe & Save 15%</span>
                   <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full font-bold">BEST VALUE</span>
                 </label>
               </div>
             </div>

             {/* Actions */}
             <div className="flex flex-col gap-4 mb-8">
               <Button fullWidth onClick={handleAddToCart} className="py-4 text-lg">
                 Add to Cart
               </Button>
               <Button fullWidth variant="secondary" className="py-4">
                 Buy It Now
               </Button>
             </div>

             {/* Trust Badges */}
             <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-8">
               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                 <Truck className="w-5 h-5 text-luxury" />
                 <span>Free Shipping & Returns</span>
               </div>
               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                 <Shield className="w-5 h-5 text-luxury" />
                 <span>2-Year Warranty</span>
               </div>
             </div>

             {/* Real-World Solutions: Group & Rental */}
             <RentalSystem dailyRate={45} />
             <GroupOrder />
             <BulkQuoteForm />
             
             {/* Native Reviews Mockup */}
             <div className="hidden md:block">
                 <NativeReviews productId={product.id} />
             </div>
          </div>
        </div>
        
        {/* Mobile Reviews */}
        <div className="md:hidden mt-12">
           <NativeReviews productId={product.id} />
        </div>
      </div>

      {/* Upsell Section / Complete the Look */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl font-serif font-bold text-luxury mb-12 text-center">Complete The Look</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {upsellProducts.map(p => (
                 <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer">
                    <ProductCard product={p} />
                 </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
