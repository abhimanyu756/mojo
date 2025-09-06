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
    fetchMyProducts();
  }, [user, navigate]);

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

  const primaryBtnClasses = "inline-block text-center bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300";
  const secondaryBtnClasses = "inline-block text-center bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300";


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center my-10 md:my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">My Listings</h1>
        <Link to="/add-product" className={`${primaryBtnClasses} py-3 px-5`}>
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading your listings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-500">
                  {product.primary_image ? (
                    <img
                      src={product.primary_image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                <div className="p-5 flex flex-col h-[calc(100%-14rem)]"> {/* 14rem is h-56 */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.title}>{product.title}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">${parseFloat(product.price).toFixed(2)}</p>
                  <p className="text-gray-500 text-sm mb-2.5">
                    {product.category_name} • {product.condition}
                  </p>
                  <p className={`text-xs font-bold ${product.is_available ? 'text-green-600' : 'text-red-500'}`}>
                    {product.is_available ? 'Available' : 'Sold'}
                  </p>

                  <div className="flex gap-2.5 mt-auto pt-4">
                    <Link
                      to={`/product/${product.id}`}
                      className={`${primaryBtnClasses} flex-1 text-sm py-2 px-3`}
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className={`${secondaryBtnClasses} flex-1 text-sm py-2 px-3`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">You haven't listed any products yet.</p>
              <Link to="/add-product" className={`${primaryBtnClasses} mt-6 py-3 px-6`}>
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