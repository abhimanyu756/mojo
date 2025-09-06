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
    fetchProduct();
  }, [id]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden my-6 md:my-10">
        {message && (
          <div className={`m-6 md:m-10 rounded-lg p-4 font-medium shadow-md ${message.includes('Error') ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-gradient-to-r from-green-500 to-green-400 text-white'}`}>
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2">
          {/* Product Image Section */}
          <div className="bg-gray-100">
            <div className="w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0].image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="p-6 md:p-10 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">{product.title}</h1>
            <p className="text-4xl md:text-5xl font-bold text-green-600 mb-6">${parseFloat(product.price).toFixed(2)}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">{product.category_name}</span>
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800">{product.condition}</span>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Sold by <strong className="font-semibold">{product.seller_name}</strong></p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-auto pt-6">
              {user && user.id !== product.seller && product.is_available ? (
                <button
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="w-full text-white bg-gradient-to-r from-green-500 to-green-600 hover:-translate-y-0.5 hover:shadow-xl shadow-lg font-semibold rounded-lg text-lg px-6 py-4 text-center transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
                >
                  {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
              ) : null}

              {!product.is_available && (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center font-medium">
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