import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            {product.sustainable && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Eco-Friendly
              </span>
            )}
            <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
            {product.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-gray-800">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-sm text-orange-600 font-medium">
              by {product.seller}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2 group/button"
          >
            <ShoppingCart className="w-4 h-4 group-hover/button:scale-110 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;