import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AIChat from './components/AIChat';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <AIChat />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;