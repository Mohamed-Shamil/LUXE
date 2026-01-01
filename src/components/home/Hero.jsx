import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { useShowcase } from '../../context/ShowcaseContext';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const { settings } = useShowcase();
  const navigate = useNavigate();

  return (
    <div className="relative h-[90vh] w-full overflow-hidden flex items-center">
      {/* Background Image / Video Mockup */}
      <div className="absolute inset-0 bg-gray-900">
         <motion.div
           key={settings.heroStyle}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="w-full h-full"
         >
           {settings.heroStyle === 'video' ? (
              /* Simulated high-end video feel with a different image for now or actual video tag if I had a source */
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                alt="Fashion Video Mockup"
                className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow" 
              />
           ) : (
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                alt="Hero Static"
                className="w-full h-full object-cover opacity-60"
              />
           )}
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-r from-luxury/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <motion.span 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="block text-secondary font-bold tracking-widest uppercase mb-4"
          >
            Spring Summer '26
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
            The Essence of <br />
            <span className="italic text-gray-200">Modern Luxury</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
            Curated collections for those who seek elegance in every detail. 
            Experience quality that speaks for itself.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('/collections/all')} className="bg-white text-luxury hover:bg-gray-100 border-none">
              Shop New Arrivals
            </Button>
            <Button variant="outline" onClick={() => navigate('/collections/all')} className="text-white border-white hover:bg-white/10 hover:border-white">
              View Lookbook
            </Button>
          </div>
          
          {/* FOMO Timer Mockup */}
          {settings.showFomo && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }} 
               animate={{ opacity: 1, height: 'auto' }}
               className="mt-8 p-4 bg-red-600/20 border border-red-500/50 backdrop-blur-md rounded-lg inline-block"
             >
               <span className="text-white font-bold flex items-center gap-2">
                 ⚡ Flash Sale Ends in: 04:23:12
               </span>
             </motion.div>
          )}

        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
      >
        <span className="text-sm tracking-widest uppercase">Scroll</span>
      </motion.div>
    </div>
  );
};
