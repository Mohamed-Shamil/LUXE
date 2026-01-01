import React from 'react';
import { Hero } from '../components/home/Hero';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/products';
import { Truck, Shield, RefreshCw, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
    <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-luxury">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-serif font-bold text-lg mb-2 text-luxury">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      
      {/* Value Props Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureItem 
              icon={Truck} 
              title="Global Shipping" 
              description="Complimentary express shipping on all orders over $250."
            />
            <FeatureItem 
              icon={Shield} 
              title="Secure Payment" 
              description="Encrypted transactions and trusted payment gateways."
            />
            <FeatureItem 
              icon={RefreshCw} 
              title="Free Returns" 
              description="30-day effortless returns for your peace of mind."
            />
            <FeatureItem 
              icon={Star} 
              title="Premium Quality" 
              description="Hand-picked materials and expert craftsmanship."
            />
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Curated For You</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury mt-3 mb-6">Trending Now</h2>
            <p className="max-w-xl mx-auto text-gray-500">
              Discover our most coveted pieces, selected for their timeless appeal and modern sensibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-transparent border border-luxury text-luxury font-bold uppercase tracking-wide hover:bg-luxury hover:text-white transition-all">
               View All Collections
            </button>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-luxury text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
           <div className="md:w-1/2">
             <img 
               src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
               alt="Atelier" 
               className="rounded-lg shadow-2xl opacity-90"
             />
           </div>
           <div className="md:w-1/2 space-y-8">
             <h2 className="text-4xl font-serif font-bold leading-tight">
               Designed for the <br /><span className="text-secondary">Extraordinary</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed">
               Every piece tells a story. From the sourcing of the finest fabrics to the final stitch, we ensure that our products not only look exceptional but feel incredible to wear.
             </p>
             <div className="grid grid-cols-2 gap-8 pt-4">
               <div>
                 <span className="text-4xl font-bold text-white block mb-2">50k+</span>
                 <span className="text-sm text-gray-500 uppercase tracking-widest">Happy Clients</span>
               </div>
               <div>
                 <span className="text-4xl font-bold text-white block mb-2">15+</span>
                 <span className="text-sm text-gray-500 uppercase tracking-widest">Global Awards</span>
               </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
