import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Truck, ChevronRight } from 'lucide-react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} color="#FF9017" />;
      case 'processing': return <Package size={16} color="#1877F2" />;
      case 'shipped': return <Truck size={16} color="#1877F2" />;
      case 'delivered': return <CheckCircle size={16} color="#00B517" />;
      case 'cancelled': return <XCircle size={16} color="#FA3434" />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status}`;
  };

  if (loading) {
    return <div className="container orders-loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page fade-in">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> <ChevronRight size={14} /> 
          <span>My Orders</span>
        </div>

        <h2 className="section-title">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders card">
            <Package size={64} color="#BDC4CD" strokeWidth={1} />
            <h3>No orders yet</h3>
            <p>Looks like you haven't placed any orders.</p>
            <Link to="/products" className="btn btn-primary mt-20">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card card">
                <div className="order-header">
                  <div className="order-meta">
                    <div className="order-id">
                      Order ID: <span>#{order._id.substring(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="order-date">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="order-status-wrap">
                    <span className={getStatusBadgeClass(order.status)}>
                      {getStatusIcon(order.status)} 
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.products.map(item => (
                    <div key={item._id} className="order-item">
                      <div className="item-img">
                        <img 
                          src={item.productId?.imageURL || 'https://via.placeholder.com/80'} 
                          alt={item.productId?.title || 'Product'} 
                        />
                      </div>
                      <div className="item-info">
                        <Link to={`/product/${item.productId?._id}`} className="item-title">
                          {item.productId?.title || 'Product unavailable'}
                        </Link>
                        <div className="item-qty-price">
                          <span className="qty">Qty: {item.quantity}</span>
                          <span className="price">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    Total Amount: <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-outline-primary">View Details</button>
                    {order.status === 'delivered' && (
                      <button className="btn btn-outline">Write Review</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
