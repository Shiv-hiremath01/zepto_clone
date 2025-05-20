
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = ({ user, setUser }) => {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // New state for orders
  const navigate = useNavigate();

  // Fetch vendors, products, and orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.token) {
        console.log('No user or token, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('User in AdminDashboard:', user);

      try {
        // Fetch vendors
        const vendorResponse = await axios.get('http://15.207.17.186:5000/api/vendors', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Vendor API Response:', vendorResponse);
        console.log('Vendor Data:', vendorResponse.data);
        const fetchedVendors = vendorResponse.data.vendors || [];
        console.log('Set vendors:', fetchedVendors);
        setVendors(fetchedVendors);

        // Fetch products
        const productResponse = await axios.get('http://15.207.17.186:5000/api/products', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Product API Response:', productResponse);
        console.log('Product Data:', productResponse.data);
        setProducts(productResponse.data.products || []);

        // Fetch orders
        const orderResponse = await axios.get('http://15.207.17.186:5000/api/orders', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Order API Response:', orderResponse);
        console.log('Order Data:', orderResponse.data);
        setOrders(orderResponse.data.orders || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.log('Error Response Status:', error.response.status);
          console.log('Error Response Data:', error.response.data);
        }
        if (error.response?.status === 401) {
          setUser(null);
          navigate('/login');
        } else {
          alert('Failed to fetch data: ' + (error.response?.data?.message || error.message));
        }
      }
    };
    fetchData();
  }, [user, setUser, navigate]);

  // Function to get products listed by a specific vendor
  const getVendorProducts = (vendorId) => {
    return products.filter((product) => product.vendorId === vendorId.toString());
  };

  // Function to delete a vendor
  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm('Are you sure you want to delete this vendor and their products?')) return;

    try {
      await axios.delete(`http://15.207.17.186:5000/api/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setProducts(products.filter((product) => product.vendorId !== vendorId.toString()));
      alert('Vendor and their products deleted successfully!');
    } catch (error) {
      console.error('Error deleting vendor:', error);
      if (error.response?.status === 401) {
        setUser(null);
        navigate('/login');
      } else {
        alert('Failed to delete vendor: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Vendors Section */}
      <h2 className="section-title">Manage Vendors</h2>
      {vendors.length === 0 ? (
        <p className="no-vendors-message">No vendors found.</p>
      ) : (
        <div className="vendors-table-container">
          <table className="vendors-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Listed Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => {
                const vendorProducts = getVendorProducts(vendor._id);
                return (
                  <tr key={vendor._id}>
                    <td>{vendor.firstName}</td>
                    <td>{vendor.lastName}</td>
                    <td>{vendor.email}</td>
                    <td>{vendor.contactNumber}</td>
                    <td>
                      {vendorProducts.length > 0 ? (
                        <ul className="product-list">
                          {vendorProducts.map((product) => (
                            <li key={product._id} className="product-item">
                              {product.name} (₹{product.sellingPrice})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        'No products listed'
                      )}
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteVendor(vendor._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Section */}
      <h2 className="section-title">Manage Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message">No orders found.</p>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId}</td>
                  <td>
                    <ul className="order-items-list">
                      {order.items.map((item, index) => (
                        <li key={index} className="order-item">
                          {item.productId?.name || 'Product N/A'} (Qty: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     <style>
{`
  .admin-dashboard-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #ffffff;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    color: #1b1b1b;
  }

  .dashboard-title {
    font-size: 28px;
    font-weight: 700;
    color: #1b1b1b;
    margin-bottom: 2rem;
    text-align: center;
  }

  .section-title {
    font-size: 22px;
    font-weight: 600;
    color: #007e5a;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  .no-vendors-message,
  .no-orders-message {
    text-align: center;
    font-size: 16px;
    color: #999;
    font-weight: 500;
    margin-top: 2rem;
  }

  .vendors-table-container,
  .orders-table-container {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    overflow-x: auto;
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
  }

  .vendors-table,
  .orders-table {
    width: 100%;
    border-collapse: collapse;
  }

  .vendors-table th,
  .orders-table th {
    padding: 14px 18px;
    text-align: left;
    font-size: 13px;
    background: #e9f9f2;
    color: #008060;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 1px solid #d1d5db;
  }

  .vendors-table td,
  .orders-table td {
    padding: 14px 18px;
    text-align: left;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
  }

  .vendors-table tr:hover,
  .orders-table tr:hover {
    background: #f9fdfb;
  }

  .product-list,
  .order-items-list {
    list-style-type: disc;
    padding-left: 18px;
    margin: 0;
  }

  .product-item,
  .order-item {
    font-size: 13px;
    color: #444;
    margin-bottom: 4px;
  }

  .delete-button {
    padding: 8px 14px;
    background-color: #ff4d4f;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .delete-button:hover {
    background-color: #d9363e;
    transform: scale(1.03);
    box-shadow: 0 4px 10px rgba(255, 77, 79, 0.2);
  }
`}
</style>
    </div>
  );
};

export default AdminDashboard;
