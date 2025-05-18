import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://15.207.17.186:5000/api/products/${id}`);
        const data = await res.json();
        console.log('Fetch product response:', data);
        if (data.success) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    console.log('User object:', user);
    console.log('Adding to cart with payload:', {
      productId: id,
      quantity,
      token: user.token,
    });

    try {
      const res = await fetch('http://15.207.17.186:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
      });
      const data = await res.json();
      console.log('Add to cart response:', data);
      if (data.items) { // cartController.js returns the updated cart object
        alert('Product added to cart!');
        navigate('/cart');
      } else {
        setError(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Error adding to cart: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="product-image">
          <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category.join(', ')}</p>
          <div className="price-section">
            <p className="selling-price">₹{product.sellingPrice}</p>
            {product.discountPercentage > 0 && (
              <>
                <p className="original-price">₹{product.mrp}</p>
                <p className="discount">{product.discountPercentage}% OFF</p>
              </>
            )}
          </div>
          <p className="stock">{product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}</p>
          <div className="quantity-selector">
            <label>Quantity: </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={product.stock === 0}
            >
              {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
          </button>
        </div>
      </div>
      <style>
        {`
          .product-detail {
            padding: 30px;
            max-width: 1200px;
            margin: 0 auto;
            font-family: 'Roboto', sans-serif;
            background-color: #f7fafc;
            min-height: 100vh;
          }
          .product-container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 40px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            padding: 30px;
            margin-bottom: 20px;
          }
          .product-image {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .product-image img {
            max-width: 100%;
            max-height: 450px;
            object-fit: contain;
            border-radius: 8px;
            transition: transform 0.3s ease;
          }
          .product-image img:hover {
            transform: scale(1.05);
          }
          .product-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .product-info h1 {
            font-size: 32px;
            font-weight: 700;
            color: #2d3748;
            margin: 0;
            line-height: 1.2;
          }
          .category {
            font-size: 16px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .price-section {
            display: flex;
            align-items: baseline;
            gap: 12px;
            flex-wrap: wrap;
          }
          .selling-price {
            font-size: 28px;
            font-weight: 600;
            color: #e53e3e;
          }
          .original-price {
            font-size: 18px;
            color: #a0aec0;
            text-decoration: line-through;
          }
          .discount {
            font-size: 16px;
            font-weight: 500;
            color: #38a169;
            background: #c6f6d5;
            padding: 2px 8px;
            border-radius: 4px;
          }
          .stock {
            font-size: 16px;
            font-weight: 500;
            color: ${product.stock > 0 ? '#38a169' : '#e53e3e'};
          }
          .quantity-selector {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 10px;
          }
          .quantity-selector label {
            font-size: 16px;
            font-weight: 500;
            color: #2d3748;
          }
          .quantity-selector select {
            padding: 8px 12px;
            font-size: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            background: #fff;
            cursor: pointer;
            transition: border-color 0.2s ease;
          }
          .quantity-selector select:focus {
            outline: none;
            border-color: #3182ce;
            box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
          }
          .add-to-cart-btn {
            background: linear-gradient(90deg, #3182ce, #2b6cb0);
            color: #fff;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.2s ease;
            width: fit-content;
          }
          .add-to-cart-btn:hover:not(:disabled) {
            background: linear-gradient(90deg, #2b6cb0, #2c5282);
            transform: translateY(-2px);
          }
          .add-to-cart-btn:disabled {
            background: #e2e8f0;
            color: #a0aec0;
            cursor: not-allowed;
          }
          .error {
            color: #e53e3e;
            font-size: 18px;
            font-weight: 500;
            text-align: center;
            padding: 20px;
            background: #fed7d7;
            border-radius: 8px;
            margin: 20px 0;
          }
          @media (max-width: 768px) {
            .product-container {
              grid-template-columns: 1fr;
              padding: 20px;
              gap: 20px;
            }
            .product-info h1 {
              font-size: 24px;
            }
            .selling-price {
              font-size: 24px;
            }
            .original-price {
              font-size: 16px;
            }
            .add-to-cart-btn {
              width: 100%;
              padding: 10px;
            }
          }
          @media (max-width: 480px) {
            .product-detail {
              padding: 15px;
            }
            .product-image img {
              max-height: 300px;
            }
            .product-info h1 {
              font-size: 20px;
            }
            .category, .stock, .quantity-selector label {
              font-size: 14px;
            }
            .selling-price {
              font-size: 20px;
            }
            .original-price, .discount {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ProductDetail;
