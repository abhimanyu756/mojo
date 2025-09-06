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
    fetchOrders();
  }, [user, navigate]);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      confirmed: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#666';
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Order History</h1>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading orders...</p>
        </div>
      ) : (
        <div>
          {orders.length > 0 ? (
            <div style={{ display: 'grid', gap: '20px' }}>
              {orders.map(order => (
                <div key={order.id} className="card">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '15px',
                    paddingBottom: '15px',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p style={{ color: '#666', margin: '5px 0' }}>
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        color: '#4CAF50',
                        margin: '0 0 5px 0'
                      }}>
                        ${order.total_amount}
                      </p>
                      <span style={{ 
                        background: getStatusColor(order.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ marginBottom: '10px' }}>Items:</h4>
                    {order.items && order.items.map(item => (
                      <div key={item.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <span>{item.product_title}</span>
                        <span>
                          {item.quantity} × ${item.price} = ${(item.quantity * parseFloat(item.price)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
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