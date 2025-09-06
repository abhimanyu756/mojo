import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/cart/orders/');
        setOrders(response.data.results || response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClasses = (status) => {
    const classMap = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-600',
      cancelled: 'bg-red-500'
    };
    return classMap[status.toLowerCase()] || 'bg-gray-500';
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center my-10 md:my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Order History</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading your orders...</p>
        </div>
      ) : (
        <div>
          {orders.length > 0 ? (
            <div className="grid gap-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 transition-shadow hover:shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                      <p className="text-gray-500 text-sm mt-1">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="text-left sm:text-right mt-4 sm:mt-0">
                      <p className="text-xl font-bold text-green-600 mb-1.5">${parseFloat(order.total_amount).toFixed(2)}</p>
                      <span className={`text-white px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${getStatusClasses(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-gray-700">Items:</h4>
                    <div className="space-y-2">
                      {order.items && order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 text-sm">
                          <span className="text-gray-800 pr-4">{item.product_title}</span>
                          <span className="text-gray-600 text-right whitespace-nowrap">
                            {item.quantity} × ${parseFloat(item.price).toFixed(2)} = <span className="font-medium text-gray-800">${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/')}
                className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-transform duration-300"
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

export default OrderHistory;