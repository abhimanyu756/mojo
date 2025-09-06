import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const MyListings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyProducts();
  }, [user, navigate]);

  const fetchMyProducts = async () => {
    try {
      const response = await api.get('/api/products/my-products/');
      setProducts(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/api/products/${productId}/edit/`);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">My Listings</h1>
        <Link to="/add-product" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading your listings...</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.primary_image ? (
                    <img 
                      src={product.primary_image} 
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
                
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                    {product.category_name} • {product.condition}
                  </p>
                  <p style={{ 
                    color: product.is_available ? '#4CAF50' : '#f44336', 
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {product.is_available ? 'Available' : 'Sold'}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    marginTop: '15px' 
                  }}>
                    <Link 
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                      style={{ 
                        flex: 1,
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '14px',
                        padding: '8px'
                      }}
                    >
                      View
                    </Link>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="btn btn-secondary"
                      style={{ 
                        flex: 1,
                        fontSize: '14px',
                        padding: '8px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
              <p>You haven't listed any products yet.</p>
              <Link to="/add-product" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Create Your First Listing
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyListings;