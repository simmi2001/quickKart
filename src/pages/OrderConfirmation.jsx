import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getById(orderId);
      setOrder(response.data);
    } catch (error) {
      setError('Failed to load order details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f39c12',
      'confirmed': '#3498db',
      'preparing': '#9b59b6',
      'out-for-delivery': '#e67e22',
      'delivered': '#27ae60',
      'cancelled': '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="container">
        <div className="error-page">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <div className="error-page">
          <h2>Order Not Found</h2>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="order-confirmation">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order. We'll get it ready for delivery.</p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h2>Order Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Order Number:</strong>
                <span>{order.orderNumber}</span>
              </div>
              <div className="info-item">
                <strong>Order Date:</strong>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <strong>Status:</strong>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="info-item">
                <strong>Total:</strong>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="delivery-info">
            <h3>Delivery Address</h3>
            <div className="address">
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</p>
              <p>Phone: {order.phone}</p>
            </div>
          </div>

          <div className="order-items">
            <h3>Items Ordered</h3>
            {order.items.map((item, index) => (
              <div key={index} className="confirmation-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/orders" className="btn btn-primary">View All Orders</Link>
          <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;