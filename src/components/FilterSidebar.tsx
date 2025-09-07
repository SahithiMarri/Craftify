import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  showMobile: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  showMobile, 
  onClose, 
  onFiltersChange 
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sustainableOnly, setSustainableOnly] = useState(false);

  const categories = ['Jewelry', 'Paintings', 'Home Décor', 'Crafts'];

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    updateFilters(updatedCategories, priceRange, sustainableOnly);
  };

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
    updateFilters(selectedCategories, newRange, sustainableOnly);
  };

  const handleSustainableChange = (value: boolean) => {
    setSustainableOnly(value);
    updateFilters(selectedCategories, priceRange, value);
  };

  const updateFilters = (categories: string[], price: number[], sustainable: boolean) => {
    onFiltersChange({
      categories,
      priceRange: price,
      sustainableOnly: sustainable
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSustainableOnly(false);
    onFiltersChange({
      categories: [],
      priceRange: [0, 5000],
      sustainableOnly: false
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-orange-600 hover:text-orange-700"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value) || 5000])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-orange-500"
          />
        </div>
      </div>

      {/* Sustainability */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sustainableOnly}
            onChange={(e) => handleSustainableChange(e.target.checked)}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-gray-600">Eco-Friendly Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white rounded-2xl p-6 shadow-md h-fit sticky top-24">
        <FilterContent />
      </div>

      {/* Mobile Sidebar */}
      {showMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="bg-white w-80 h-full p-6 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FilterSidebar;