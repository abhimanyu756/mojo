import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}/`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      await api.post('/api/cart/add/', {
        product: product.id,
        quantity: 1
      });
      setMessage('Product added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding product to cart');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="product-detail-container">
        {message && (
          <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}
        
        <div className="product-detail-grid">
          <div className="product-detail-image">
            <div className="product-image-container">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0].image} 
                  alt={product.title}
                  className="detail-image"
                />
              ) : (
                <div className="no-image-placeholder">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="product-detail-info">
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-price">${product.price}</p>
            
            <div className="product-badges">
              <span className="badge category-badge">{product.category_name}</span>
              <span className="badge condition-badge">{product.condition}</span>
            </div>
            
            <div className="seller-info">
              <p>Sold by <strong>{product.seller_name}</strong></p>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-actions">
              {user && user.id !== product.seller && product.is_available && (
                <button 
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="btn btn-primary add-to-cart-btn"
                >
                  {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
              )}
              
              {!product.is_available && (
                <div className="unavailable-notice">
                  This item is no longer available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;