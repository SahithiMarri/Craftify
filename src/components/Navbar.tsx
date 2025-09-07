import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Mic, User, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import VoiceSearch from './VoiceSearch';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              Craftify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Explore
            </Link>
            <Link to="/seller-dashboard" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Seller Dashboard
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md mx-8">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search handmade products..."
              className="bg-transparent flex-1 outline-none text-gray-700"
            />
            <button
              onClick={() => setShowVoiceSearch(true)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Mic className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-rose-600 transition-all">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search handmade products..."
                  className="bg-transparent flex-1 outline-none text-gray-700"
                />
                <Mic className="w-4 h-4 text-gray-500" />
              </div>
              <Link to="/" className="text-gray-700 font-medium">Home</Link>
              <Link to="/" className="text-gray-700 font-medium">Explore</Link>
              <Link to="/seller-dashboard" className="text-gray-700 font-medium">Seller Dashboard</Link>
            </div>
          </div>
        )}
      </div>

      {/* Voice Search Modal */}
      {showVoiceSearch && (
        <VoiceSearch onClose={() => setShowVoiceSearch(false)} />
      )}
    </nav>
  );
};

export default Navbar;