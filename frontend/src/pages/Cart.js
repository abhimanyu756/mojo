import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/api/cart/');
        setCartItems(response.data.results || response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [user, navigate]);

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/api/cart/remove/${itemId}/`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item from cart');
    }
  };

  const checkout = async () => {
    setCheckingOut(true);
    try {
      await api.post('/api/cart/checkout/');
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error placing order');
    } finally {
      setCheckingOut(false);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center my-10 md:my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
        {!loading && cartItems.length > 0 && (
          <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">Loading cart...</p>
        </div>
      ) : (
        <div className="mb-10">
          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {/* Cart Items */}
              <div className="space-y-5 lg:col-span-2">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 grid grid-cols-[80px_1fr_auto] sm:grid-cols-[120px_1fr_auto] gap-5 items-center">
                    <div className="w-full h-[80px] sm:h-[120px] rounded-lg overflow-hidden bg-gray-100">
                      {item.product.primary_image ? (
                        <img
                          src={item.product.primary_image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">No Image</div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{item.product.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-600">{item.product.category_name}</span>
                        <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-600">{item.product.condition}</span>
                      </div>
                      <p className="text-gray-500 text-sm">by {item.product.seller_name}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-bold text-green-600 mb-1">${parseFloat(item.total_price).toFixed(2)}</p>
                      <p className="text-gray-500 text-sm mb-3">Qty: {item.quantity}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1 lg:sticky lg:top-28">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-4 border-b border-gray-200">Order Summary</h3>
                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t border-gray-200 my-5">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={checkout}
                    disabled={checkingOut}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
                  >
                    {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-transform duration-300"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;