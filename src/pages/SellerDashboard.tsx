import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Wand2, Mic, Upload, Save, X } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';

const SellerDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Jewelry',
    image: '',
    sustainable: false
  });

  const categories = ['Jewelry', 'Paintings', 'Home Décor', 'Crafts'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image || 'https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=300',
      seller: 'Your Store',
      rating: 5,
      reviews: 0,
      sustainable: formData.sustainable,
      featured: false
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Jewelry',
      image: '',
      sustainable: false
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      image: product.image,
      sustainable: product.sustainable
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    resetForm();
  };

  const generateDescription = () => {
    const sampleDescriptions = [
      'Handcrafted with premium materials using traditional techniques passed down through generations.',
      'Unique artisan creation featuring intricate details and sustainable eco-friendly materials.',
      'Beautiful handmade piece that combines modern aesthetics with traditional craftsmanship.',
      'Carefully crafted using natural materials, perfect for those who appreciate authentic handmade quality.'
    ];
    
    const randomDesc = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
    setFormData(prev => ({ ...prev, description: randomDesc }));
  };

  const startVoiceInput = (field: string) => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({ ...prev, [field]: transcript }));
      };

      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-rose-600 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </motion.button>
        </div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                      placeholder="Enter product title"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => startVoiceInput('title')}
                      className="absolute right-3 top-3 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Mic className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹) - Optional
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Enter original price"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <div className="relative">
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Describe your product..."
                    required
                  />
                  <div className="absolute right-3 top-3 flex space-x-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={generateDescription}
                      className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      title="AI Generate Description"
                    >
                      <Wand2 className="w-4 h-4" />
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => startVoiceInput('description')}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      title="Voice Input"
                    >
                      <Mic className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Enter image URL or upload"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sustainable"
                  checked={formData.sustainable}
                  onChange={(e) => setFormData(prev => ({ ...prev, sustainable: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="sustainable" className="text-sm font-medium text-gray-700">
                  This is an eco-friendly/sustainable product
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-rose-600 transition-all duration-300 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.slice(0, 10).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{product.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <p className="font-semibold text-gray-900">₹{product.price}</p>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-700">{product.rating}</span>
                        <span className="text-gray-500">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;