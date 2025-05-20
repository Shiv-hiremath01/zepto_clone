import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51RN7eIFV4e3MUMZQhQsRKqBwEhUzwdnFBGYZWJPyxicOe99CmA6sUHgLEYvb8mBoDw8fi4086OcAADCT9ORMEY3X004vIgFYMY'); // Replace with your Stripe publishable key

function Cart({ user, handleLogout }) {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.token) {
        setError('Please log in to view your cart.');
        setCart({ items: [] });
        return;
      }

      try {
        const response = await axios.get('http://15.207.17.186:5000/api/cart', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Cart data fetched:', response.data);
        setCart(response.data || { items: [] });
      } catch (error) {
        console.error('Error fetching cart:', error);
        if (error.response?.status === 401) {
          setError('Session expired. Please log in again.');
          handleLogout();
          navigate('/login');
        } else {
          setError('Failed to fetch cart. Please try again.');
          setCart({ items: [] });
        }
      }
    };
    fetchCart();
  }, [user, handleLogout, navigate]);

  const refreshCart = async () => {
    try {
      const response = await axios.get('http://15.207.17.186:5000/api/cart', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart(response.data || { items: [] });
    } catch (error) {
      console.error('Error refreshing cart:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
        handleLogout();
        navigate('/login');
      } else {
        setError('Failed to refresh cart.');
      }
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await refreshCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
        handleLogout();
        navigate('/login');
      } else {
        setError('Failed to increase quantity.');
      }
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/remove',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await refreshCart();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
        handleLogout();
        navigate('/login');
      } else {
        setError('Failed to decrease quantity.');
      }
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/clear',
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await refreshCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
        handleLogout();
        navigate('/login');
      } else {
        setError('Failed to clear cart.');
      }
    }
  };

  const handleCheckout = async () => {
    if (!user || !user.id || !user.token) {
      setError('Please log in to proceed with checkout.');
      handleLogout();
      navigate('/login');
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      setError('Your cart is empty. Please add items to proceed.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const stripe = await stripePromise;

      console.log('Sending checkout request with cartItems:', cart.items, 'and userId:', user.id);
      const response = await axios.post(
        'http://localhost:5000/api/payment/create-checkout-session',
        {
          cartItems: cart.items,
          userId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      console.log('Checkout response:', response.data);
      if (!response.data.sessionId) {
        throw new Error('Session ID not returned from server');
      }

      const sessionId = response.data.sessionId;
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error('Stripe redirect error:', result.error.message);
        setError(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
        handleLogout();
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Checkout failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <div>Loading...</div>;

  const subtotal = cart.items.reduce((sum, item) => {
    const product = item.productId;
    return product ? sum + item.quantity * product.sellingPrice : sum;
  }, 0);

  const totalSavings = cart.items.reduce((sum, item) => {
    const product = item.productId;
    return product && product.mrp ? sum + (item.quantity * (product.mrp - product.sellingPrice)) : sum;
  }, 0);

  const handlingCharges = 9;
  const deliveryCharges = 36;
  const grandTotal = subtotal + handlingCharges + deliveryCharges;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h2>Your Cart</h2>
      {error && <p className="error-message">{error}</p>}
      {cart.items.length === 0 ? (
        <>
          <p className="empty-cart-message">Your cart is empty.</p>
          <button className="clear-cart-button" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="checkout-button" disabled>
            Proceed to Checkout
          </button>
        </>
      ) : (
        <>
          <ul className="cart-items">
            {cart.items.map((item) => {
              const product = item.productId;
              if (!product) {
                return (
                  <li key={item.productId?._id || item._id} className="cart-item">
                    Product not found (ID: {item.productId}) - Quantity: {item.quantity}
                  </li>
                );
              }
              const savings = product.mrp ? (product.mrp - product.sellingPrice) * item.quantity : 0;
              return (
                <li key={product._id} className="cart-item">
                  <div className="item-image-container">
                    <img src={product.imageUrl} alt={product.name} className="item-image" />
                  </div>
                  <div className="item-details">
                    <span className="item-name">{product.name}</span>
                    <div className="price-details">
                      <span className="item-price">₹{product.sellingPrice * item.quantity}</span>
                      {product.mrp && product.mrp > product.sellingPrice && (
                        <>
                          <span className="original-price">₹{product.mrp * item.quantity}</span>
                          <span className="savings">Save ₹{savings}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="quantity-selector">
                    <button
                      className="quantity-button decrease"
                      onClick={() => handleDecreaseQuantity(product._id)}
                    >
                      −
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button
                      className="quantity-button increase"
                      onClick={() => handleIncreaseQuantity(product._id)}
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {totalSavings > 0 && (
              <div className="summary-row savings">
                <span>Total Savings:</span>
                <span>₹{totalSavings.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Handling Charges:</span>
              <span>₹{handlingCharges.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges:</span>
              <span>₹{deliveryCharges.toFixed(2)}</span>
            </div>
            <div className="summary-row grand-total">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="clear-cart-button" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={loading || cart.items.length === 0}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </>
      )}
      <style>
        {`
    .error-message {
      color: #D93025;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #222;
      margin-bottom: 16px;
      text-align: left;
    }

    .cart-items {
      list-style: none;
      padding: 0;
      margin: 0 0 16px 0;
    }

    .cart-item {
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #E0E0E0;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 12px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease;
    }

    .cart-item:hover {
      transform: scale(1.01);
    }

    .item-image-container {
      width: 60px;
      height: 60px;
      margin-right: 12px;
    }

    .item-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price-details {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .item-price {
      font-size: 14px;
      font-weight: 600;
      color: #00B37A;
    }

    .original-price {
      font-size: 12px;
      color: #A0AEC0;
      text-decoration: line-through;
    }

    .savings {
      font-size: 12px;
      color: #E53E3E;
      font-weight: 500;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .item-quantity {
      font-size: 12px;
      color: #222;
      width: 20px;
      text-align: center;
    }

    .quantity-button {
      width: 24px;
      height: 24px;
      font-size: 14px;
      font-weight: 600;
      border: 1px solid #00B37A;
      border-radius: 6px;
      background: #fff;
      color: #00B37A;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .quantity-button:hover {
      background: #00B37A;
      color: #fff;
    }

    .cart-summary {
      background: #FAFAFA;
      border: 1px solid #E0E0E0;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
      color: #333;
    }

    .summary-row span:first-child {
      font-weight: 500;
    }

    .summary-row span:last-child {
      font-weight: 600;
    }

    .summary-row.savings {
      color: #E53E3E;
    }

    .summary-row.grand-total {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #E0E0E0;
      font-size: 16px;
      color: #00B37A;
    }

    .summary-row.grand-total span:first-child {
      font-weight: 600;
    }

    .summary-row.grand-total span:last-child {
      font-weight: 700;
    }

    .empty-cart-message {
      text-align: center;
      font-size: 14px;
      color: #777;
      font-weight: 500;
      margin: 16px 0;
      padding: 12px;
      background: #F2F2F2;
      border-radius: 10px;
    }

    .checkout-button {
      display: block;
      width: 100%;
      padding: 12px;
      background: #00B37A;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .checkout-button:disabled {
      background: #CCC;
      cursor: not-allowed;
    }

    .checkout-button:hover:not(:disabled) {
      background: #029b68;
    }

    .clear-cart-button {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 12px;
      background: transparent;
      color: #00B37A;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid #00B37A;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .clear-cart-button:hover {
      background: #00B37A;
      color: #fff;
    }

    @media (max-width: 640px) {
      .cart-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
      }

      .item-image-container {
        margin-right: 0;
        margin-bottom: 8px;
      }

      .quantity-selector {
        margin-top: 8px;
      }
    }
  `}
      </style>

    </div>
  );
}

export default Cart;



