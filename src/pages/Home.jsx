import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/products';
import { Truck, Shield, RefreshCw, Star, ChevronRight, Instagram, Quote, ArrowRight, Sparkles, Crown, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group">
    <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-5 text-luxury group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="font-serif font-bold text-lg mb-3 text-luxury">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const CategoryCard = ({ title, image, count }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="relative group cursor-pointer overflow-hidden rounded-[2rem] aspect-[4/5]"
  >
    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <h3 className="text-white font-serif text-2xl font-bold mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{count} Products</p>
    </div>
    <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ArrowRight className="w-5 h-5 text-white" />
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, text, image }) => (
  <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow relative">
    <Quote className="w-10 h-10 text-secondary/20 absolute top-6 right-6" />
    <div className="flex items-center gap-4 mb-6">
      <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover" />
      <div>
        <h4 className="font-bold text-luxury">{name}</h4>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 leading-relaxed italic">"{text}"</p>
    <div className="flex gap-1 mt-4 text-secondary">
      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
  </div>
);

const Home = () => {
  const [email, setEmail] = useState('');
  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const categories = [
    { title: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000", count: 24 },
    { title: "Accessories", image: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?q=80&w=1000", count: 56 },
    { title: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000", count: 18 },
    { title: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000", count: 32 },
  ];

  const testimonials = [
    { name: "Alexandra Chen", role: "Fashion Editor", text: "The quality is unmatched. Every piece feels like it was made specifically for me. True luxury without the pretense.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
    { name: "Marcus Webb", role: "Creative Director", text: "Finally, a brand that understands modern elegance. Their attention to detail is remarkable.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    { name: "Sophia Laurent", role: "Interior Designer", text: "I've been a loyal customer for 3 years. The consistency in quality and style is what keeps me coming back.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" },
  ];

  return (
    <div className="animate-fade-in">
      <Hero />
      
      {/* Curved Value Props Section */}
      <section className="relative py-24 bg-gray-50">
        {/* Top curve */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-white" style={{ borderRadius: '0 0 50% 50% / 0 0 100% 100%' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              icon={Crown} 
              title="VIP Rewards" 
              description="Earn points on every purchase and unlock exclusive perks."
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Explore</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury mt-3">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/collections/all">
                  <CategoryCard {...cat} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Curved Section */}
      <section className="relative py-24 bg-luxury text-white overflow-hidden">
        {/* Top curve */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gray-50" style={{ borderRadius: '0 0 50% 50% / 0 0 100% 100%' }} />
        
        <div className="container mx-auto px-6 relative z-10 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Just Landed
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">New Arrivals</h2>
            </div>
            <Link to="/collections/all" className="text-secondary font-medium flex items-center gap-2 hover:gap-4 transition-all mt-6 md:mt-0">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white" style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }} />
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Curated For You</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury mt-3 mb-6">Trending Now</h2>
            <p className="max-w-xl mx-auto text-gray-500">
              Discover our most coveted pieces, selected for their timeless appeal and modern sensibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/collections/all" className="inline-block px-10 py-4 bg-luxury text-white font-bold uppercase tracking-wide rounded-full hover:bg-secondary hover:text-luxury transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
               View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        {/* Top curve */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-white" style={{ borderRadius: '0 0 50% 50% / 0 0 100% 100%' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-current" /> Loved by Thousands
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury mt-3">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Instagram Section */}
      <section className="py-24 bg-luxury text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2 space-y-8">
               <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Story</span>
               <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                 Designed for the <br /><span className="text-secondary">Extraordinary</span>
               </h2>
               <p className="text-gray-400 text-lg leading-relaxed">
                 Every piece tells a story. From the sourcing of the finest fabrics to the final stitch, we ensure that our products not only look exceptional but feel incredible to wear. This is luxury, reimagined.
               </p>
               <div className="grid grid-cols-3 gap-8 pt-4">
                 <div>
                   <span className="text-4xl font-bold text-white block mb-2">50k+</span>
                   <span className="text-sm text-gray-500 uppercase tracking-widest">Happy Clients</span>
                 </div>
                 <div>
                   <span className="text-4xl font-bold text-white block mb-2">15+</span>
                   <span className="text-sm text-gray-500 uppercase tracking-widest">Global Awards</span>
                 </div>
                 <div>
                   <span className="text-4xl font-bold text-white block mb-2">200+</span>
                   <span className="text-sm text-gray-500 uppercase tracking-widest">Collections</span>
                 </div>
               </div>
             </div>
             <div className="lg:w-1/2">
               <div className="grid grid-cols-3 gap-3">
                 {[
                   "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400",
                   "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400",
                   "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400",
                   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400",
                   "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=400",
                   "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=400",
                 ].map((img, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative"
                   >
                     <img src={img} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Instagram className="w-6 h-6 text-white" />
                     </div>
                   </motion.div>
                 ))}
               </div>
               <a href="#" className="flex items-center justify-center gap-3 mt-6 text-secondary font-bold hover:gap-5 transition-all">
                 <Instagram className="w-5 h-5" /> Follow @luxe_official
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Curved Design */}
      <section className="relative py-32 bg-gray-50 overflow-hidden">
        {/* Top curve */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-luxury" style={{ borderRadius: '0 0 50% 50% / 0 0 100% 100%' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Stay Connected</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury mt-3 mb-6">Join the Inner Circle</h2>
              <p className="text-gray-500 text-lg mb-10">
                Subscribe to receive exclusive access to new collections, private sales, and curated style guides.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-luxury text-luxury placeholder-gray-400"
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-luxury text-white font-bold uppercase tracking-wide rounded-full hover:bg-secondary hover:text-luxury transition-all shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
