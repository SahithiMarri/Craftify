import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Star, MessageCircle, Share2, Shield } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const mockReviews = [
    {
      id: '1',
      user: 'Anita Sharma',
      rating: 5,
      comment: 'Absolutely beautiful! The craftsmanship is exceptional and the colors are even more vibrant than in the photos.',
      date: '2 days ago',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50'
    },
    {
      id: '2',
      user: 'Rohit Gupta',
      rating: 4,
      comment: 'Great quality product. Fast shipping and excellent packaging. Highly recommended!',
      date: '5 days ago',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              {product.sustainable && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Eco-Friendly
                </div>
              )}
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-2 overflow-x-auto">
              {[product.image, product.image, product.image].map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sold by</p>
                  <p className="font-semibold text-gray-900">{product.seller}</p>
                </div>
                <button className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm hover:bg-orange-200 transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
                
                <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                Buy Now
              </button>

              <div className="flex justify-center space-x-6 pt-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Seller</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Secure Purchase</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                100% authentic handmade products • 7-day return policy • Secure payment
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({product.reviews})
          </h2>
          
          <div className="space-y-6">
            {mockReviews.map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{review.user}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;