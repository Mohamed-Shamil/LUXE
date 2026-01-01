import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { Filter, X, ChevronDown, LayoutGrid, Grid, Columns, Search } from 'lucide-react';

const ProductListing = () => {
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    priceRange: [0, 1000],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // Native Instant Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = activeFilters.category.length === 0 || activeFilters.category.includes(product.category);
      const priceMatch = product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1];
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured default
    });
  }, [activeFilters, sortBy, searchQuery]);

  const toggleCategory = (cat) => {
    setActiveFilters(prev => ({
      ...prev,
      category: prev.category.includes(cat) 
        ? prev.category.filter(c => c !== cat)
        : [...prev.category, cat]
    }));
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white animate-fade-in transition-all duration-300">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-slide-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury mb-4">The Collection</h1>
            <p className="text-gray-500 max-w-lg">
              Explore our meticulously curated selection of essentials. Designed for the modern connoisseur.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-4 mt-8 md:mt-0">
             <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block group">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-luxury w-48 transition-all focus:w-64"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-luxury transition-colors" />
                </div>

                {/* Layout Toggle */}
                <div className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-lg">
                   {[2, 3, 4].map(cols => (
                      <button
                        key={cols}
                        onClick={() => setGridCols(cols)}
                        className={`p-2 rounded-md transition-all ${gridCols === cols ? 'bg-white shadow-sm text-luxury' : 'text-gray-400 hover:text-luxury'}`}
                        title={`${cols} Columns`}
                      >
                         {cols === 2 ? <Columns className="w-4 h-4" /> : 
                          cols === 3 ? <LayoutGrid className="w-4 h-4" /> : 
                          <Grid className="w-4 h-4" />}
                      </button>
                   ))}
                </div>

                <div className="h-6 w-px bg-gray-200 hidden md:block" />

                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:border-luxury transition-colors"
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
                
                <div className="relative group">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:border-luxury transition-colors">
                        Sort <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                        {['featured', 'price-asc', 'price-desc'].map(sort => (
                            <button 
                                key={sort}
                                onClick={() => setSortBy(sort)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 capitalize"
                            >
                                {sort.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar - Native & Instant */}
          <motion.aside 
            initial={false}
            animate={{ 
              width: isFilterOpen ? 280 : 0, 
              opacity: isFilterOpen ? 1 : 0,
              display: isFilterOpen ? 'block' : 'none'
            }}
            className="flex-shrink-0 overflow-hidden"
          >
             <div className="w-[280px] pr-8 space-y-8">
                <div>
                   <h3 className="font-bold text-luxury mb-4 flex justify-between">
                     Category 
                     <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{filteredProducts.length}</span>
                   </h3>
                   <div className="space-y-3">
                     {categories.map(cat => (
                       <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${activeFilters.category.includes(cat) ? 'bg-luxury border-luxury' : 'border-gray-300 group-hover:border-luxury'}`}>
                             {activeFilters.category.includes(cat) && <X className="w-3 h-3 text-white" />}
                          </div>
                          <input 
                            type="checkbox" 
                            checked={activeFilters.category.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="hidden" 
                          />
                          <span className={`${activeFilters.category.includes(cat) ? 'font-medium text-luxury' : 'text-gray-500'}`}>{cat}</span>
                       </label>
                     ))}
                   </div>
                </div>

                <div>
                   <h3 className="font-bold text-luxury mb-4">Price Range</h3>
                   <div className="h-1 bg-gray-200 rounded-full relative">
                      <div className="absolute left-0 top-0 h-full bg-luxury w-full" />
                   </div>
                   <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>$0</span>
                      <span>$1000+</span>
                   </div>
                </div>
             </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="flex-1">
             <AnimatePresence mode='popLayout'>
               <motion.div 
                 layout
                 className={`grid gap-8 ${
                     gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 
                     gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 
                     'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                 }`}
               >
                 {filteredProducts.map(product => (
                   <motion.div
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.3 }}
                     key={product.id}
                   >
                     <ProductCard product={product} />
                   </motion.div>
                 ))}
               </motion.div>
             </AnimatePresence>
             
             {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
                   <p className="text-gray-500 text-lg">No products match your criteria.</p>
                   <button 
                     onClick={() => setActiveFilters({ category: [], priceRange: [0, 1000] })}
                     className="text-luxury underline mt-2 font-medium"
                   >
                     Clear all filters
                   </button>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
