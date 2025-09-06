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
    fetchCartItems();
  }, [user, navigate]);

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
    <div className="container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 && (
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading cart...</p>
        </div>
      ) : (
        <div className="cart-content">
          {cartItems.length > 0 ? (
            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {item.product.primary_image ? (
                        <img 
                          src={item.product.primary_image} 
                          alt={item.product.title}
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.product.title}</h3>
                      <div className="cart-item-meta">
                        <span>{item.product.category_name}</span>
                        <span>{item.product.condition}</span>
                      </div>
                      <p className="cart-item-seller">by {item.product.seller_name}</p>
                    </div>
                    
                    <div className="cart-item-actions">
                      <p className="cart-item-price">${item.total_price}</p>
                      <p className="cart-item-quantity">Qty: {item.quantity}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-card">
                  <h3>Order Summary</h3>
                  <div className="summary-line">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={checkout}
                    disabled={checkingOut}
                    className="checkout-btn"
                  >
                    {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-content">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <button 
                  onClick={() => navigate('/')}
                  className="btn btn-primary"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;