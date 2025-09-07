import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useProducts } from '../contexts/ProductContext';
import { Search, Mic } from 'lucide-react';

const HomePage = () => {
  const { products, filteredProducts, setSearchQuery, setFilters } = useProducts();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Discover Handmade
            <span className="block">Treasures</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Support local artisans and find unique, sustainable products crafted with love
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 max-w-md mx-auto shadow-lg"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for handmade products..."
              className="flex-1 outline-none text-gray-700"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Mic className="w-4 h-4 text-gray-500" />
            </button>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked by our curators, these exceptional pieces showcase the finest craftsmanship
            </p>
          </motion.div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Filters
            </button>
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <FilterSidebar 
              showMobile={showFilters} 
              onClose={() => setShowFilters(false)}
              onFiltersChange={setFilters}
            />

            {/* Products Grid */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 text-lg">
                    No products match your current filters. Try adjusting your search criteria.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Jewelry', 'Paintings', 'Home Décor', 'Crafts'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl font-bold">
                    {category[0]}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;