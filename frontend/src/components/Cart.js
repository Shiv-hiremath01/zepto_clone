
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51RN7eIFV4e3MUMZQhQsRKqBwEhUzwdnFBGYZWJPyxicOe99CmA6sUHgLEYvb8mBoDw8fi4086OcAADCT9ORMEY3X004vIgFYMY'); // Replace with your Stripe publishable key

// function Cart({ user, handleLogout }) {
//   const [cart, setCart] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!user || !user.token) {
//         setError('Please log in to view your cart.');
//         setCart({ items: [] });
//         return;
//       }

//       try {
//         const response = await axios.get('http://15.207.17.186:5000/api/cart', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         console.log('Cart data fetched:', response.data);
//         setCart(response.data || { items: [] });
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//         if (error.response?.status === 401) {
//           setError('Session expired. Please log in again.');
//           handleLogout();
//           navigate('/login');
//         } else {
//           setError('Failed to fetch cart. Please try again.');
//           setCart({ items: [] });
//         }
//       }
//     };
//     fetchCart();
//   }, [user, handleLogout, navigate]);

//   const refreshCart = async () => {
//     try {
//       const response = await axios.get('http://15.207.17.186:5000/api/cart', {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setCart(response.data || { items: [] });
//     } catch (error) {
//       console.error('Error refreshing cart:', error);
//       if (error.response?.status === 401) {
//         setError('Session expired. Please log in again.');
//         handleLogout();
//         navigate('/login');
//       } else {
//         setError('Failed to refresh cart.');
//       }
//     }
//   };

//   const handleIncreaseQuantity = async (productId) => {
//     try {
//       await axios.post(
//         'http://localhost:5000/api/cart/add',
//         { productId, quantity: 1 },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       await refreshCart();
//     } catch (error) {
//       console.error('Error increasing quantity:', error);
//       if (error.response?.status === 401) {
//         setError('Session expired. Please log in again.');
//         handleLogout();
//         navigate('/login');
//       } else {
//         setError('Failed to increase quantity.');
//       }
//     }
//   };

//   const handleDecreaseQuantity = async (productId) => {
//     try {
//       await axios.post(
//         'http://localhost:5000/api/cart/remove',
//         { productId, quantity: 1 },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       await refreshCart();
//     } catch (error) {
//       console.error('Error decreasing quantity:', error);
//       if (error.response?.status === 401) {
//         setError('Session expired. Please log in again.');
//         handleLogout();
//         navigate('/login');
//       } else {
//         setError('Failed to decrease quantity.');
//       }
//     }
//   };

//   const handleClearCart = async () => {
//     try {
//       await axios.post(
//         'http://localhost:5000/api/cart/clear',
//         {},
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       await refreshCart();
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       if (error.response?.status === 401) {
//         setError('Session expired. Please log in again.');
//         handleLogout();
//         navigate('/login');
//       } else {
//         setError('Failed to clear cart.');
//       }
//     }
//   };

//   const handleCheckout = async () => {
//     if (!user || !user.id || !user.token) {
//       setError('Please log in to proceed with checkout.');
//       handleLogout();
//       navigate('/login');
//       return;
//     }

//     if (!cart || !cart.items || cart.items.length === 0) {
//       setError('Your cart is empty. Please add items to proceed.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const stripe = await stripePromise;

//       console.log('Sending checkout request with cartItems:', cart.items, 'and userId:', user.id);
//       const response = await axios.post(
//         'http://localhost:5000/api/payment/create-checkout-session',
//         {
//           cartItems: cart.items,
//           userId: user.id,
//         },
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//         }
//       );

//       console.log('Checkout response:', response.data);
//       if (!response.data.sessionId) {
//         throw new Error('Session ID not returned from server');
//       }

//       const sessionId = response.data.sessionId;
//       const result = await stripe.redirectToCheckout({
//         sessionId,
//       });

//       if (result.error) {
//         console.error('Stripe redirect error:', result.error.message);
//         setError(result.error.message);
//       }
//     } catch (error) {
//       console.error('Checkout error:', error);
//       if (error.response?.status === 401) {
//         setError('Session expired. Please log in again.');
//         handleLogout();
//         navigate('/login');
//       } else {
//         setError(error.response?.data?.message || 'Checkout failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cart) return <div>Loading...</div>;

//   const subtotal = cart.items.reduce((sum, item) => {
//     const product = item.productId;
//     return product ? sum + item.quantity * product.sellingPrice : sum;
//   }, 0);

//   const totalSavings = cart.items.reduce((sum, item) => {
//     const product = item.productId;
//     return product && product.mrp ? sum + (item.quantity * (product.mrp - product.sellingPrice)) : sum;
//   }, 0);

//   const handlingCharges = 9;
//   const deliveryCharges = 36;
//   const grandTotal = subtotal + handlingCharges + deliveryCharges;

//   return (
//     <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
//       <h2>Your Cart</h2>
//       {error && <p className="error-message">{error}</p>}
//       {cart.items.length === 0 ? (
//         <>
//           <p className="empty-cart-message">Your cart is empty.</p>
//           <button className="clear-cart-button" onClick={handleClearCart}>
//             Clear Cart
//           </button>
//           <button className="checkout-button" disabled>
//             Proceed to Checkout
//           </button>
//         </>
//       ) : (
//         <>
//           <ul className="cart-items">
//             {cart.items.map((item) => {
//               const product = item.productId;
//               if (!product) {
//                 return (
//                   <li key={item.productId?._id || item._id} className="cart-item">
//                     Product not found (ID: {item.productId}) - Quantity: {item.quantity}
//                   </li>
//                 );
//               }
//               const savings = product.mrp ? (product.mrp - product.sellingPrice) * item.quantity : 0;
//               return (
//                 <li key={product._id} className="cart-item">
//                   <div className="item-image-container">
//                     <img src={product.imageUrl} alt={product.name} className="item-image" />
//                   </div>
//                   <div className="item-details">
//                     <span className="item-name">{product.name}</span>
//                     <div className="price-details">
//                       <span className="item-price">₹{product.sellingPrice * item.quantity}</span>
//                       {product.mrp && product.mrp > product.sellingPrice && (
//                         <>
//                           <span className="original-price">₹{product.mrp * item.quantity}</span>
//                           <span className="savings">Save ₹{savings}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                   <div className="quantity-selector">
//                     <button
//                       className="quantity-button decrease"
//                       onClick={() => handleDecreaseQuantity(product._id)}
//                     >
//                       −
//                     </button>
//                     <span className="item-quantity">{item.quantity}</span>
//                     <button
//                       className="quantity-button increase"
//                       onClick={() => handleIncreaseQuantity(product._id)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="cart-summary">
//             <div className="summary-row">
//               <span>Subtotal:</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             {totalSavings > 0 && (
//               <div className="summary-row savings">
//                 <span>Total Savings:</span>
//                 <span>₹{totalSavings.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="summary-row">
//               <span>Handling Charges:</span>
//               <span>₹{handlingCharges.toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Delivery Charges:</span>
//               <span>₹{deliveryCharges.toFixed(2)}</span>
//             </div>
//             <div className="summary-row grand-total">
//               <span>Grand Total:</span>
//               <span>₹{grandTotal.toFixed(2)}</span>
//             </div>
//           </div>
//           <button className="clear-cart-button" onClick={handleClearCart}>
//             Clear Cart
//           </button>
//           <button
//             className="checkout-button"
//             onClick={handleCheckout}
//             disabled={loading || cart.items.length === 0}
//           >
//             {loading ? 'Processing...' : 'Proceed to Checkout'}
//           </button>
//         </>
//       )}
//       <style>
//         {`
//           .error-message {
//             color: #e91e63;
//             font-size: 14px;
//             margin-bottom: 10px;
//             text-align: center;
//           }
//           h2 {
//             font-size: 20px;
//             font-weight: 600;
//             color: #1a202c;
//             margin-bottom: 16px;
//             text-align: left;
//           }
//           .cart-items {
//             list-style: none;
//             padding: 0;
//             margin: 0 0 16px 0;
//           }
//           .cart-item {
//             display: flex;
//             align-items: center;
//             background: #fff;
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             padding: 12px;
//             margin-bottom: 12px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//             transition: box-shadow 0.2s ease;
//           }
//           .cart-item:hover {
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }
//           .item-image-container {
//             width: 50px;
//             height: 50px;
//             margin-right: 12px;
//           }
//           .item-image {
//             width: 100%;
//             height: 100%;
//             object-fit: contain;
//             border-radius: 6px;
//           }
//           .item-details {
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             gap: 4px;
//           }
//           .item-name {
//             font-size: 14px;
//             font-weight: 600;
//             color: #1a202c;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//           }
//           .price-details {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//           }
//           .item-price {
//             font-size: 14px;
//             font-weight: 600;
//             color: #00cc44;
//           }
//           .original-price {
//             font-size: 12px;
//             color: #a0aec0;
//             text-decoration: line-through;
//           }
//           .savings {
//             font-size: 12px;
//             color: #00cc44;
//             font-weight: 500;
//           }
//           .quantity-selector {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//           }
//           .item-quantity {
//             font-size: 12px;
//             color: #1a202c;
//             width: 20px;
//             text-align: center;
//           }
//           .quantity-button {
//             width: 20px;
//             height: 20px;
//             font-size: 12px;
//             font-weight: 600;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             background: #00cc44;
//             color: #fff;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: background-color 0.2s ease;
//           }
//           .quantity-button:hover {
//             background: #00b33c;
//           }
//           .cart-summary {
//             background: #fff;
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             padding: 12px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//             margin-bottom: 16px;
//           }
//           .summary-row {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 8px;
//             font-size: 12px;
//             color: #1a202c;
//           }
//           .summary-row span:first-child {
//             font-weight: 500;
//           }
//           .summary-row span:last-child {
//             font-weight: 600;
//           }
//           .summary-row.savings {
//             color: #00cc44;
//           }
//           .summary-row.grand-total {
//             margin-top: 8px;
//             padding-top: 8px;
//             border-top: 1px solid #e5e7eb;
//             font-size: 14px;
//             color: #00cc44;
//           }
//           .summary-row.grand-total span:first-child {
//             font-weight: 600;
//           }
//           .summary-row.grand-total span:last-child {
//             font-weight: 700;
//           }
//           .empty-cart-message {
//             text-align: center;
//             font-size: 14px;
//             color: #6b7280;
//             font-weight: 500;
//             margin: 16px 0;
//             padding: 12px;
//             background: #fff;
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//           }
//           .checkout-button {
//             display: block;
//             width: 100%;
//             padding: 10px;
//             background: #00cc44;
//             color: #fff;
//             font-size: 14px;
//             font-weight: 600;
//             border: none;
//             border-radius: 6px;
//             cursor: pointer;
//             transition: background-color 0.2s ease;
//           }
//           .checkout-button:disabled {
//             background: #ccc;
//             cursor: not-allowed;
//           }
//           .checkout-button:hover:not(:disabled) {
//             background: #00b33c;
//           }
//           .clear-cart-button {
//             display: block;
//             width: fit-content;
//             padding: 6px 12px;
//             margin-bottom: 8px;
//             background: transparent;
//             color: #00cc44;
//             font-size: 12px;
//             font-weight: 600;
//             border: 1px solid #00cc44;
//             border-radius: 6px;
//             cursor: pointer;
//             transition: color 0.2s ease, border-color 0.2s ease;
//           }
//           .clear-cart-button:hover {
//             color: #00b33c;
//             border-color: #00b33c;
//           }
//           @media (max-width: 640px) {
//             .cart-item {
//               flex-direction: column;
//               align-items: flex-start;
//               padding: 8px;
//             }
//             .item-image-container {
//               margin-right: 0;
//               margin-bottom: 8px;
//             }
//             .item-details {
//               margin-left: 0;
//             }
//             .quantity-selector {
//               position: static;
//               transform: none;
//               margin-top: 8px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Cart;



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
        'http://15.207.17.186:5000/api/cart/add',
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
        'http://15.207.17.186:5000/api/cart/remove',
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
        'http://15.207.17.186:5000/api/cart/clear',
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
        'http://15.207.17.186:5000/api/payment/create-checkout-session',
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
      color: #e53935;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #1b1b1b;
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
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: box-shadow 0.2s ease;
    }

    .cart-item:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .item-image-container {
      width: 60px;
      height: 60px;
      margin-right: 16px;
    }

    .item-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
      border: 1px solid #eee;
    }

    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-name {
      font-size: 15px;
      font-weight: 500;
      color: #212121;
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
      font-size: 15px;
      font-weight: 700;
      color: #2e7d32;
    }

    .original-price {
      font-size: 13px;
      color: #9e9e9e;
      text-decoration: line-through;
    }

    .savings {
      font-size: 13px;
      color: #d32f2f;
      font-weight: 500;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .item-quantity {
      font-size: 13px;
      color: #333;
      width: 22px;
      text-align: center;
    }

    .quantity-button {
      width: 24px;
      height: 24px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #43a047;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }

    .quantity-button:hover {
      background: #2e7d32;
    }

    .cart-summary {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      margin-bottom: 20px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
      color: #424242;
    }

    .summary-row span:first-child {
      font-weight: 500;
    }

    .summary-row span:last-child {
      font-weight: 600;
    }

    .summary-row.savings {
      color: #d32f2f;
    }

    .summary-row.grand-total {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #ccc;
      font-size: 16px;
      color: #1b5e20;
    }

    .summary-row.grand-total span:first-child {
      font-weight: 600;
    }

    .summary-row.grand-total span:last-child {
      font-weight: 700;
    }

    .empty-cart-message {
      text-align: center;
      font-size: 15px;
      color: #616161;
      font-weight: 500;
      margin: 16px 0;
      padding: 14px;
      background: #f1f1f1;
      border: 1px dashed #ccc;
      border-radius: 10px;
    }

    .checkout-button {
      display: block;
      width: 100%;
      padding: 12px;
      background: #00c853;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .checkout-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .checkout-button:hover:not(:disabled) {
      background: #00b34f;
    }

    .clear-cart-button {
      display: block;
      width: fit-content;
      padding: 6px 12px;
      margin-bottom: 10px;
      background: transparent;
      color: #00c853;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid #00c853;
      border-radius: 8px;
      cursor: pointer;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .clear-cart-button:hover {
      color: #d32f2f;
      border-color: #d32f2f;
    }

    @media (max-width: 640px) {
      .cart-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
      }

      .item-image-container {
        margin-right: 0;
        margin-bottom: 10px;
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
