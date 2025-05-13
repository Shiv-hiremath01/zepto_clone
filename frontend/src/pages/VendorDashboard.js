// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { backendCategories } from '../components/Categories';

// const VendorDashboard = ({ user, handleLogout }) => {
//   const [products, setProducts] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     category: '',
//     subcategory: '',
//     newSubcategory: '',
//     mrp: '',
//     sellingPrice: '',
//     discountPercentage: '',
//     imageUrl: '',
//     stock: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [useNewSubcategory, setUseNewSubcategory] = useState(false);

//   useEffect(() => {
//     const fetchVendorProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products/vendor', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setProducts(response.data.products);
//       } catch (err) {
//         console.error('Error fetching vendor products:', err);
//         if (err.response?.status === 401) {
//           handleLogout();
//         }
//         setError('Failed to fetch products.');
//       }
//     };
//     if (user && user.role === 'vendor') {
//       fetchVendorProducts();
//     }
//   }, [user, handleLogout]);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       if (!newProduct.category) {
//         setSubcategories([]);
//         setUseNewSubcategory(false); // Reset when category changes
//         return;
//       }
//       try {
//         const response = await axios.get('http://localhost:5000/api/subcategories', {
//           params: { category: newProduct.category },
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         const fetchedSubcategories = response.data.subcategories || [];
//         setSubcategories(fetchedSubcategories);
//         // If no subcategories exist, automatically switch to adding a new one
//         if (fetchedSubcategories.length === 0) {
//           setUseNewSubcategory(true);
//         } else {
//           setUseNewSubcategory(false);
//         }
//       } catch (err) {
//         console.error('Error fetching subcategories:', err);
//         if (err.response?.status === 401) {
//           handleLogout();
//         }
//         setError('Failed to fetch subcategories.');
//       }
//     };
//     fetchSubcategories();
//   }, [newProduct.category, handleLogout]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setNewProduct((prev) => ({ ...prev, category, subcategory: '', newSubcategory: '' }));
//     setUseNewSubcategory(false);
//   };

//   const toggleSubcategoryMode = () => {
//     setUseNewSubcategory((prev) => !prev);
//     setNewProduct((prev) => ({
//       ...prev,
//       subcategory: '',
//       newSubcategory: '',
//     }));
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     if (!user || !user.token) {
//       setError('User not authenticated. Please log in again.');
//       handleLogout();
//       return;
//     }
//     try {
//       // Validate required fields
//       if (!newProduct.name || !newProduct.category || !newProduct.mrp || !newProduct.sellingPrice || !newProduct.imageUrl) {
//         setError('Please fill in all required fields.');
//         return;
//       }

//       // Validate subcategory
//       let subcategory;
//       if (useNewSubcategory) {
//         if (!newProduct.newSubcategory || newProduct.newSubcategory.trim() === '') {
//           setError('Please enter a new subcategory.');
//           return;
//         }
//         subcategory = newProduct.newSubcategory;
//       } else {
//         if (!newProduct.subcategory || newProduct.subcategory.trim() === '') {
//           setError('Please select a subcategory.');
//           return;
//         }
//         subcategory = newProduct.subcategory;
//       }

//       const productData = {
//         name: newProduct.name,
//         category: newProduct.category,
//         subcategory,
//         mrp: Number(newProduct.mrp),
//         sellingPrice: Number(newProduct.sellingPrice),
//         discountPercentage: newProduct.discountPercentage ? Number(newProduct.discountPercentage) : 0,
//         imageUrl: newProduct.imageUrl,
//         stock: newProduct.stock ? Number(newProduct.stock) : 0,
//       };

//       console.log('Sending productData:', productData);
//       const response = await axios.post(
//         'http://localhost:5000/api/products/add',
//         productData,
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setProducts([...products, response.data.product]);
//       setSuccess('Product added successfully!');
//       setError('');
//       setNewProduct({
//         name: '',
//         category: '',
//         subcategory: '',
//         newSubcategory: '',
//         mrp: '',
//         sellingPrice: '',
//         discountPercentage: '',
//         imageUrl: '',
//         stock: '',
//       });
//       setUseNewSubcategory(false);
//       if (useNewSubcategory && newProduct.newSubcategory) {
//         const subcategoryResponse = await axios.get('http://localhost:5000/api/subcategories', {
//           params: { category: newProduct.category },
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setSubcategories(subcategoryResponse.data.subcategories || []);
//       }
//     } catch (err) {
//       console.error('Error adding product:', err);
//       if (err.response?.status === 401) {
//         handleLogout();
//       }
//       setError('Failed to add product: ' + (err.response?.data?.message || 'Unknown error'));
//       setSuccess('');
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/products/${productId}`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setProducts(products.filter((product) => product._id !== productId));
//         setSuccess('Product deleted successfully!');
//         setError('');
//       } catch (err) {
//         console.error('Error deleting product:', err);
//         if (err.response?.status === 401) {
//           handleLogout();
//         }
//         setError('Failed to delete product.');
//         setSuccess('');
//       }
//     }
//   };

//   return (
//     <div className="vendor-dashboard">
//       <h1>Vendor Dashboard</h1>
//       <div className="dashboard-layout">
//         <div className="sidebar">
//           <div className="profile-details">
//             <h2>Profile</h2>
//             <div className="profile-item">
//               <span className="profile-label">Name:</span>
//               <span>{user.name}</span>
//             </div>
//             <div className="profile-item">
//               <span className="profile-label">Email:</span>
//               <span>{user.email}</span>
//             </div>
//             <div className="profile-item">
//               <span className="profile-label">Role:</span>
//               <span>{user.role}</span>
//             </div>
//             <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="main-content">
//           <div className="add-product-section">
//             <h2>Add New Product</h2>
//             {error && <p className="error-message">{error}</p>}
//             {success && <p className="success-message">{success}</p>}
//             <form onSubmit={handleAddProduct} className="add-product-form">
//               <div className="form-group">
//                 <label htmlFor="name">Product Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={newProduct.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="category">Category</label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={newProduct.category}
//                   onChange={handleCategoryChange}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {backendCategories.map((category) => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {newProduct.category && (
//                 <div className="form-group subcategory-group">
//                   <label>Subcategory</label>
//                   <div className="subcategory-toggle">
//                     <button
//                       type="button"
//                       className="toggle-button"
//                       onClick={toggleSubcategoryMode}
//                     >
//                       {useNewSubcategory ? 'Select Existing' : 'Add New Subcategory'}
//                     </button>
//                   </div>
//                   {useNewSubcategory ? (
//                     <input
//                       type="text"
//                       name="newSubcategory"
//                       value={newProduct.newSubcategory}
//                       onChange={handleInputChange}
//                       placeholder="Enter new subcategory"
//                       required
//                     />
//                   ) : subcategories.length > 0 ? (
//                     <select
//                       id="subcategory"
//                       name="subcategory"
//                       value={newProduct.subcategory}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subcategories.map((subcategory) => (
//                         <option key={subcategory} value={subcategory}>
//                           {subcategory}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <p className="no-subcategories">No subcategories available. Add a new one.</p>
//                   )}
//                 </div>
//               )}
//               <div className="form-group">
//                 <label htmlFor="mrp">MRP (₹)</label>
//                 <input
//                   type="number"
//                   id="mrp"
//                   name="mrp"
//                   value={newProduct.mrp}
//                   onChange={handleInputChange}
//                   min="0"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="sellingPrice">Selling Price (₹)</label>
//                 <input
//                   type="number"
//                   id="sellingPrice"
//                   name="sellingPrice"
//                   value={newProduct.sellingPrice}
//                   onChange={handleInputChange}
//                   min="0"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="discountPercentage">Discount (%)</label>
//                 <input
//                   type="number"
//                   id="discountPercentage"
//                   name="discountPercentage"
//                   value={newProduct.discountPercentage}
//                   onChange={handleInputChange}
//                   min="0"
//                   max="100"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="stock">Stock</label>
//                 <input
//                   type="number"
//                   id="stock"
//                   name="stock"
//                   value={newProduct.stock}
//                   onChange={handleInputChange}
//                   min="0"
//                   placeholder="Enter stock quantity"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="imageUrl">Image URL</label>
//                 <input
//                   type="text"
//                   id="imageUrl"
//                   name="imageUrl"
//                   value={newProduct.imageUrl}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <button type="submit" className="submit-button">
//                 Add Product
//               </button>
//             </form>
//           </div>

//           <div className="product-list-section">
//             <h2>Your Products</h2>
//             {products.length === 0 ? (
//               <p>No products added yet.</p>
//             ) : (
//               <table className="product-table">
//                 <thead>
//                   <tr>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Subcategory</th>
//                     <th>MRP</th>
//                     <th>Selling Price</th>
//                     <th>Discount</th>
//                     <th>Stock</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((product) => (
//                     <tr key={product._id}>
//                       <td>
//                         <img src={product.imageUrl} alt={product.name} className="product-image" />
//                       </td>
//                       <td>{product.name}</td>
//                       <td>{product.category}</td>
//                       <td>{product.subcategory || '-'}</td>
//                       <td>₹{product.mrp}</td>
//                       <td>₹{product.sellingPrice}</td>
//                       <td>{product.discountPercentage}%</td>
//                       <td>{product.stock}</td>
//                       <td>
//                         <button
//                           className="delete-button"
//                           onClick={() => handleDeleteProduct(product._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           .vendor-dashboard {
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 20px;
//             font-family: 'Arial', sans-serif;
//           }
//           h1 {
//             font-size: 28px;
//             font-weight: 700;
//             color: #333;
//             margin-bottom: 20px;
//             text-align: center;
//           }
//           .dashboard-layout {
//             display: flex;
//             gap: 20px;
//             flex-direction: row;
//           }
//           .sidebar {
//             width: 250px;
//             background: #fff;
//             border: 1px solid #e0e0e0;
//             border-radius: 12px;
//             padding: 20px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//           }
//           .profile-details {
//             display: flex;
//             flex-direction: column;
//             gap: 15px;
//           }
//           .profile-details h2 {
//             font-size: 20px;
//             font-weight: 600;
//             color: #333;
//             margin-bottom: 10px;
//           }
//           .profile-item {
//             display: flex;
//             flex-direction: column;
//             gap: 5px;
//           }
//           .profile-label {
//             font-size: 14px;
//             font-weight: 600;
//             color: #666;
//           }
//           .profile-item span:not(.profile-label) {
//             font-size: 14px;
//             color: #333;
//             word-break: break-all;
//           }
//           .logout-button {
//             padding: 10px;
//             background: transparent;
//             color: #e91e63;
//             border: 1px solid #e91e63;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: background-color 0.2s ease, color 0.2s ease;
//             margin-top: 10px;
//           }
//           .logout-button:hover {
//             background: #e91e63;
//             color: #fff;
//           }
//           .main-content {
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             gap: 30px;
//           }
//           .add-product-section,
//           .product-list-section {
//             background: #fff;
//             border: 1px solid #e0e0e0;
//             border-radius: 12px;
//             padding: 20px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//           }
//           h2 {
//             font-size: 20px;
//             font-weight: 600;
//             color: #333;
//             margin-bottom: 15px;
//           }
//           .error-message {
//             color: #e91e63;
//             font-size: 14px;
//             margin-bottom: 10px;
//           }
//           .success-message {
//             color: #6b46c1;
//             font-size: 14px;
//             margin-bottom: 10px;
//           }
//           .add-product-form {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//             gap: 20px;
//           }
//           .form-group {
//             display: flex;
//             flex-direction: column;
//             gap: 8px;
//           }
//           .subcategory-group {
//             position: relative;
//           }
//           .subcategory-toggle {
//             margin-bottom: 8px;
//           }
//           .toggle-button {
//             padding: 6px 12px;
//             background: transparent;
//             color: #6b46c1;
//             border: 1px solid #6b46c1;
//             border-radius: 8px;
//             font-size: 12px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: background-color 0.2s ease, color 0.2s ease;
//           }
//           .toggle-button:hover {
//             background: #6b46c1;
//             color: #fff;
//           }
//           .no-subcategories {
//             font-size: 14px;
//             color: #666;
//             margin: 0;
//           }
//           label {
//             font-size: 14px;
//             font-weight: 600;
//             color: #333;
//           }
//           input,
//           select {
//             padding: 10px;
//             font-size: 14px;
//             border: 1px solid #e0e0e0;
//             border-radius: 8px;
//             outline: none;
//             transition: border-color 0.2s ease;
//           }
//           input:focus,
//           select:focus {
//             border-color: #6b46c1;
//             background: #f5f0ff;
//           }
//           .submit-button {
//             padding: 10px 20px;
//             background: #6b46c1;
//             color: #fff;
//             border: none;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: background-color 0.2s ease;
//             grid-column: span 2;
//             justify-self: center;
//           }
//           .submit-button:hover {
//             background: #5a3aa8;
//           }
//           .product-list-section p {
//             text-align: center;
//             font-size: 16px;
//             color: #666;
//           }
//           .product-table {
//             width: 100%;
//             border-collapse: collapse;
//             font-size: 14px;
//             color: #333;
//           }
//           th,
//           td {
//             padding: 12px;
//             text-align: left;
//             border-bottom: 1px solid #e0e0e0;
//           }
//           th {
//             background: #f5f0ff;
//             font-weight: 600;
//           }
//           .product-image {
//             width: 50px;
//             height: 50px;
//             object-fit: contain;
//             border-radius: 4px;
//           }
//           .delete-button {
//             padding: 6px 12px;
//             background: transparent;
//             color: #e91e63;
//             border: 1px solid #e91e63;
//             border-radius: 8px;
//             font-size: 12px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: background-color 0.2s ease, color 0.2s ease;
//           }
//           .delete-button:hover {
//             background: #e91e63;
//             color: #fff;
//           }
//           @media (max-width: 768px) {
//             .dashboard-layout {
//               flex-direction: column;
//             }
//             .sidebar {
//               width: 100%;
//               margin-bottom: 20px;
//             }
//             .add-product-form {
//               grid-template-columns: 1fr;
//             }
//             .submit-button {
//               grid-column: span 1;
//             }
//             .product-table {
//               font-size: 12px;
//             }
//             th,
//             td {
//               padding: 8px;
//             }
//             .product-image {
//               width: 40px;
//               height: 40px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default VendorDashboard;


// // // import React, { useState } from 'react';
// // // import { backendCategories } from './Categories';

// // // // Derive categories list from backendCategories, excluding 'All'
// // // const categoriesList = backendCategories
// // //   .filter(category => category.value !== 'All')
// // //   .map(category => category.value);

// // // const VendorDashboard = ({ user }) => {
// // //   const [product, setProduct] = useState({
// // //     name: '',
// // //     category1: '',
// // //     category2: '',
// // //     category3: '',
// // //     category4: '',
// // //     subcategory1: '',
// // //     subcategory2: '',
// // //     subcategory3: '',
// // //     subcategory4: '',
// // //     description: '',
// // //     mrp: '',
// // //     sellingPrice: '',
// // //     imageUrl: '',
// // //     discountPercentage: '',
// // //     stock: '',
// // //   });
// // //   const [message, setMessage] = useState('');
// // //   const [errors, setErrors] = useState({});

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setProduct((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //     if (value && (name === 'category1' || name === 'subcategory1' || name === 'name' || name === 'mrp' || name === 'sellingPrice' || name === 'imageUrl' || name === 'stock')) {
// // //       setErrors((prev) => ({ ...prev, [name]: '' }));
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setMessage('');
// // //     setErrors({});

// // //     const newErrors = {};
// // //     if (!product.name) newErrors.name = 'Name is required';
// // //     if (!product.category1) newErrors.category1 = 'Category 1 is required';
// // //     if (!product.subcategory1) newErrors.subcategory1 = 'Subcategory 1 is required';
// // //     if (!product.mrp) newErrors.mrp = 'MRP is required';
// // //     if (!product.sellingPrice) newErrors.sellingPrice = 'Selling Price is required';
// // //     if (!product.imageUrl) newErrors.imageUrl = 'Image URL is required';
// // //     if (!product.stock && product.stock !== 0) newErrors.stock = 'Stock is required';

// // //     const categories = [product.category1, product.category2, product.category3, product.category4].filter(Boolean);
// // //     const uniqueCategories = new Set(categories);
// // //     if (categories.length !== uniqueCategories.size) {
// // //       newErrors.categories = 'Categories must be unique';
// // //     }

// // //     const subcategories = [product.subcategory1, product.subcategory2, product.subcategory3, product.subcategory4]
// // //       .filter(Boolean)
// // //       .map(sub => sub.trim());
// // //     const uniqueSubcategories = new Set(subcategories);
// // //     if (subcategories.length !== uniqueSubcategories.size) {
// // //       newErrors.subcategories = 'Subcategories must be unique';
// // //     }

// // //     if (Object.keys(newErrors).length > 0) {
// // //       setErrors(newErrors);
// // //       return;
// // //     }

// // //     const productData = {
// // //       name: product.name,
// // //       category: categories,
// // //       subcategory: subcategories,
// // //       description: product.description,
// // //       mrp: Number(product.mrp),
// // //       sellingPrice: Number(product.sellingPrice),
// // //       imageUrl: product.imageUrl,
// // //       discountPercentage: Number(product.discountPercentage) || 0,
// // //       stock: Number(product.stock),
// // //     };

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         setMessage('No token found. Please log in again.');
// // //         return;
// // //       }

// // //       const response = await fetch('http://localhost:5000/add-product', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify(productData),
// // //       });

// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setMessage('Product added successfully!');
// // //         setProduct({
// // //           name: '',
// // //           category1: '',
// // //           category2: '',
// // //           category3: '',
// // //           category4: '',
// // //           subcategory1: '',
// // //           subcategory2: '',
// // //           subcategory3: '',
// // //           subcategory4: '',
// // //           description: '',
// // //           mrp: '',
// // //           sellingPrice: '',
// // //           imageUrl: '',
// // //           discountPercentage: '',
// // //           stock: '',
// // //         });
// // //       } else {
// // //         setMessage(data.message || 'Failed to add product');
// // //       }
// // //     } catch (err) {
// // //       console.error('Add Product Error:', err);
// // //       setMessage('Error adding product. Please try again.');
// // //     }
// // //   };

// // //   const renderCategoryField = (field, label, required) => (
// // //     <div className="form-group">
// // //       <label>{label}{required ? ' *' : ''}:</label>
// // //       <select
// // //         name={field}
// // //         value={product[field]}
// // //         onChange={handleChange}
// // //         required={required}
// // //       >
// // //         <option value="">Select a category</option>
// // //         {categoriesList.map((cat) => (
// // //           <option key={cat} value={cat}>
// // //             {cat}
// // //           </option>
// // //         ))}
// // //       </select>
// // //       {errors[field] && <p className="error">{errors[field]}</p>}
// // //     </div>
// // //   );

// // //   const renderSubcategoryField = (field, label, required) => (
// // //     <div className="form-group">
// // //       <label>{label}{required ? ' *' : ''}:</label>
// // //       <input
// // //         type="text"
// // //         name={field}
// // //         value={product[field]}
// // //         onChange={handleChange}
// // //         placeholder="Enter subcategory (e.g., Lipstick)"
// // //         required={required}
// // //       />
// // //       {errors[field] && <p className="error">{errors[field]}</p>}
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="vendor-dashboard">
// // //       <h2>Vendor Dashboard</h2>
// // //       <h3>Add a New Product</h3>
// // //       <form onSubmit={handleSubmit}>
// // //         <div className="form-group">
// // //           <label>Name *:</label>
// // //           <input
// // //             type="text"
// // //             name="name"
// // //             value={product.name}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //           {errors.name && <p className="error">{errors.name}</p>}
// // //         </div>

// // //         {/* Categories */}
// // //         {renderCategoryField('category1', 'Category 1', true)}
// // //         {renderCategoryField('category2', 'Category 2', false)}
// // //         {renderCategoryField('category3', 'Category 3', false)}
// // //         {renderCategoryField('category4', 'Category 4', false)}
// // //         {errors.categories && <p className="error">{errors.categories}</p>}

// // //         {/* Subcategories */}
// // //         {renderSubcategoryField('subcategory1', 'Subcategory 1', true)}
// // //         {renderSubcategoryField('subcategory2', 'Subcategory 2', false)}
// // //         {renderSubcategoryField('subcategory3', 'Subcategory 3', false)}
// // //         {renderSubcategoryField('subcategory4', 'Subcategory 4', false)}
// // //         {errors.subcategories && <p className="error">{errors.subcategories}</p>}

// // //         {/* Description */}
// // //         <div className="form-group">
// // //           <label>Description (optional):</label>
// // //           <textarea
// // //             name="description"
// // //             value={product.description}
// // //             onChange={handleChange}
// // //             rows="4"
// // //             placeholder="Enter product description"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <label>MRP *:</label>
// // //           <input
// // //             type="number"
// // //             name="mrp"
// // //             value={product.mrp}
// // //             onChange={handleChange}
// // //             required
// // //             min="0"
// // //           />
// // //           {errors.mrp && <p className="error">{errors.mrp}</p>}
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Selling Price *:</label>
// // //           <input
// // //             type="number"
// // //             name="sellingPrice"
// // //             value={product.sellingPrice}
// // //             onChange={handleChange}
// // //             required
// // //             min="0"
// // //           />
// // //           {errors.sellingPrice && <p className="error">{errors.sellingPrice}</p>}
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Image URL *:</label>
// // //           <input
// // //             type="text"
// // //             name="imageUrl"
// // //             value={product.imageUrl}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //           {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Discount Percentage (optional):</label>
// // //           <input
// // //             type="number"
// // //             name="discountPercentage"
// // //             value={product.discountPercentage}
// // //             onChange={handleChange}
// // //             min="0"
// // //             max="100"
// // //           />
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Stock *:</label>
// // //           <input
// // //             type="number"
// // //             name="stock"
// // //             value={product.stock}
// // //             onChange={handleChange}
// // //             required
// // //             min="0"
// // //           />
// // //           {errors.stock && <p className="error">{errors.stock}</p>}
// // //         </div>
// // //         <button type="submit">Add Product</button>
// // //       </form>
// // //       {message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}
// // //       <style>
// // //         {`
// // //           .vendor-dashboard {
// // //             max-width: 600px;
// // //             margin: 40px auto;
// // //             padding: 30px;
// // //             background-color: #fff;
// // //             border-radius: 12px;
// // //             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
// // //             font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// // //           }

// // //           h2, h3 {
// // //             text-align: center;
// // //             color: #6B48FF;
// // //             margin-bottom: 20px;
// // //           }

// // //           h3 {
// // //             font-size: 1.2rem;
// // //             color: #333;
// // //           }

// // //           .form-group {
// // //             margin-bottom: 20px;
// // //           }

// // //           label {
// // //             display: block;
// // //             font-weight: 500;
// // //             color: #555;
// // //             margin-bottom: 8px;
// // //           }

// // //           input, select, textarea {
// // //             width: 100%;
// // //             padding: 12px;
// // //             border: 1px solid #ddd;
// // //             border-radius: 8px;
// // //             font-size: 1rem;
// // //             transition: border-color 0.3s ease, box-shadow 0.3s ease;
// // //           }

// // //           textarea {
// // //             resize: vertical;
// // //             min-height: 100px;
// // //           }

// // //           input:focus, select:focus, textarea:focus {
// // //             outline: none;
// // //             border-color: #6B48FF;
// // //             box-shadow: 0 0 8px rgba(107, 72, 255, 0.2);
// // //           }

// // //           button[type="submit"] {
// // //             width: 100%;
// // //             padding: 14px;
// // //             background-color: #6B48FF;
// // //             color: #fff;
// // //             border: none;
// // //             border-radius: 8px;
// // //             font-size: 1.1rem;
// // //             font-weight: 500;
// // //             cursor: pointer;
// // //             transition: background-color 0.3s ease, transform 0.1s ease;
// // //           }

// // //           button[type="submit"]:hover {
// // //             background-color: #5639CC;
// // //             transform: translateY(-2px);
// // //           }

// // //           button[type="submit"]:active {
// // //             transform: translateY(0);
// // //           }

// // //           .error {
// // //             color: #FF4D4F;
// // //             font-size: 0.9rem;
// // //             margin-top: 8px;
// // //           }

// // //           .success {
// // //             color: #28A745;
// // //             font-size: 1rem;
// // //             text-align: center;
// // //             margin-top: 20px;
// // //           }
// // //         `}
// // //       </style>
// // //     </div>
// // //   );
// // // };

// // // export default VendorDashboard;




// // import React, { useState } from 'react';
// // import { backendCategories } from './Categories';

// // const VendorDashboard = ({ user }) => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     mrp: '',
// //     sellingPrice: '',
// //     category: backendCategories[0].value, // Default to first category
// //     subcategories: '', // Text input for comma-separated subcategories
// //     stock: '',
// //     imageUrl: '',
// //   });
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage('');
// //     setError('');

// //     // Validate form data
// //     if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.category || !formData.stock || !formData.imageUrl) {
// //       setError('Please fill in all required fields (Name, MRP, Selling Price, Category, Stock, Image URL).');
// //       return;
// //     }

// //     if (!formData.subcategories) {
// //       setError('Please enter at least one subcategory (e.g., Apples, Oranges).');
// //       return;
// //     }

// //     if (isNaN(formData.mrp) || formData.mrp <= 0) {
// //       setError('MRP must be a positive number.');
// //       return;
// //     }

// //     if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
// //       setError('Selling Price must be a positive number.');
// //       return;
// //     }

// //     if (isNaN(formData.stock) || formData.stock < 0) {
// //       setError('Stock must be a non-negative number.');
// //       return;
// //     }

// //     // Calculate discount percentage
// //     const mrp = parseFloat(formData.mrp);
// //     const sellingPrice = parseFloat(formData.sellingPrice);
// //     const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

// //     // Convert subcategories to an array
// //     const subcategoryArray = formData.subcategories
// //       .split(',')
// //       .map((subcat) => subcat.trim())
// //       .filter((subcat) => subcat.length > 0);

// //     if (subcategoryArray.length === 0) {
// //       setError('Please enter at least one valid subcategory.');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:5000/api/products', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${user.token}`,
// //         },
// //         body: JSON.stringify({
// //           name: formData.name,
// //           description: formData.description,
// //           mrp: mrp,
// //           sellingPrice: sellingPrice,
// //           category: [formData.category], // Send as array
// //           subcategory: subcategoryArray, // Send as array
// //           stock: parseInt(formData.stock, 10),
// //           imageUrl: formData.imageUrl,
// //           vendorId: user.id,
// //           discountPercentage: parseFloat(discountPercentage.toFixed(2)),
// //         }),
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         setMessage('Product added successfully!');
// //         // Reset form
// //         setFormData({
// //           name: '',
// //           description: '',
// //           mrp: '',
// //           sellingPrice: '',
// //           category: backendCategories[0].value,
// //           subcategories: '',
// //           stock: '',
// //           imageUrl: '',
// //         });
// //       } else {
// //         setError(data.message || 'Failed to add product.');
// //       }
// //     } catch (err) {
// //       console.error('Add Product Error:', err);
// //       setError('An error occurred. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="vendor-dashboard">
// //       <h2>Add New Product</h2>
// //       <form onSubmit={handleSubmit} className="product-form">
// //         <div className="form-group">
// //           <label htmlFor="name">Product Name <span className="required">*</span></label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             placeholder="Enter product name"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="description">Description</label>
// //           <textarea
// //             id="description"
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             placeholder="Enter product description"
// //             rows="3"
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="mrp">MRP <span className="required">*</span></label>
// //           <input
// //             type="number"
// //             id="mrp"
// //             name="mrp"
// //             value={formData.mrp}
// //             onChange={handleChange}
// //             placeholder="Enter MRP"
// //             step="0.01"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
// //           <input
// //             type="number"
// //             id="sellingPrice"
// //             name="sellingPrice"
// //             value={formData.sellingPrice}
// //             onChange={handleChange}
// //             placeholder="Enter selling price"
// //             step="0.01"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="category">Category <span className="required">*</span></label>
// //           <select
// //             id="category"
// //             name="category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             required
// //           >
// //             {backendCategories.map((cat) => (
// //               <option key={cat.value} value={cat.value}>
// //                 {cat.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="subcategories">Subcategories <span className="required">*</span></label>
// //           <input
// //             type="text"
// //             id="subcategories"
// //             name="subcategories"
// //             value={formData.subcategories}
// //             onChange={handleChange}
// //             placeholder="Enter subcategories (e.g., Apples, Oranges)"
// //             required
// //           />
// //           <small>Enter subcategories as a comma-separated list (e.g., Apples, Oranges).</small>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="stock">Stock <span className="required">*</span></label>
// //           <input
// //             type="number"
// //             id="stock"
// //             name="stock"
// //             value={formData.stock}
// //             onChange={handleChange}
// //             placeholder="Enter stock quantity"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
// //           <input
// //             type="text"
// //             id="imageUrl"
// //             name="imageUrl"
// //             value={formData.imageUrl}
// //             onChange={handleChange}
// //             placeholder="Enter image URL"
// //             required
// //           />
// //         </div>
// //         {message && <p className="success-message">{message}</p>}
// //         {error && <p className="error-message">{error}</p>}
// //         <button type="submit" className="submit-button">
// //           Add Product
// //         </button>
// //       </form>
// //       <style jsx>{`
// //         .vendor-dashboard {
// //           max-width: 600px;
// //           margin: 40px auto;
// //           padding: 20px;
// //           background-color: #fff;
// //           border-radius: 8px;
// //           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// //         }

// //         h2 {
// //           text-align: center;
// //           margin-bottom: 20px;
// //           color: #333;
// //         }

// //         .product-form {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 15px;
// //         }

// //         .form-group {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 5px;
// //         }

// //         label {
// //           font-weight: 500;
// //           color: #555;
// //         }

// //         .required {
// //           color: red;
// //         }

// //         input,
// //         textarea,
// //         select {
// //           padding: 8px;
// //           border: 1px solid #ddd;
// //           border-radius: 4px;
// //           font-size: 1rem;
// //           width: 100%;
// //           box-sizing: border-box;
// //         }

// //         textarea {
// //           resize: vertical;
// //         }

// //         small {
// //           font-size: 0.85rem;
// //           color: #777;
// //         }

// //         .submit-button {
// //           padding: 10px;
// //           background-color: #6B46C1;
// //           color: white;
// //           border: none;
// //           border-radius: 4px;
// //           font-size: 1rem;
// //           cursor: pointer;
// //           transition: background-color 0.2s;
// //         }

// //         .submit-button:hover {
// //           background-color: #553c9a;
// //         }

// //         .success-message {
// //           color: green;
// //           text-align: center;
// //           margin: 10px 0;
// //         }

// //         .error-message {
// //           color: red;
// //           text-align: center;
// //           margin: 10px 0;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default VendorDashboard;

// import React, { useState } from 'react';
// import { backendCategories } from './Categories';

// const VendorDashboard = ({ user }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     mrp: '',
//     sellingPrice: '',
//     category1: backendCategories[0].value, // First category (required)
//     category2: '', // Second category (optional)
//     category3: '', // Third category (optional)
//     subcategory1: '', // First subcategory (required)
//     subcategory2: '', // Second subcategory (optional)
//     subcategory3: '', // Third subcategory (optional)
//     stock: '',
//     imageUrl: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     // Validate form data
//     if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.stock || !formData.imageUrl) {
//       setError('Please fill in all required fields (Name, MRP, Selling Price, Stock, Image URL).');
//       return;
//     }

//     if (!formData.category1) {
//       setError('Please select at least one category.');
//       return;
//     }

//     if (!formData.subcategory1) {
//       setError('Please enter at least one subcategory.');
//       return;
//     }

//     if (isNaN(formData.mrp) || formData.mrp <= 0) {
//       setError('MRP must be a positive number.');
//       return;
//     }

//     if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
//       setError('Selling Price must be a positive number.');
//       return;
//     }

//     if (isNaN(formData.stock) || formData.stock < 0) {
//       setError('Stock must be a non-negative number.');
//       return;
//     }

//     // Collect categories and remove duplicates
//     const categories = [
//       formData.category1,
//       formData.category2,
//       formData.category3,
//     ].filter((cat) => cat && cat !== '').map((cat) => cat.trim());
    
//     const uniqueCategories = [...new Set(categories)];
//     if (uniqueCategories.length === 0) {
//       setError('Please select at least one category.');
//       return;
//     }

//     // Collect subcategories and remove duplicates
//     const subcategories = [
//       formData.subcategory1,
//       formData.subcategory2,
//       formData.subcategory3,
//     ].filter((subcat) => subcat && subcat !== '').map((subcat) => subcat.trim());

//     const uniqueSubcategories = [...new Set(subcategories)];
//     if (uniqueSubcategories.length === 0) {
//       setError('Please enter at least one valid subcategory.');
//       return;
//     }

//     // Calculate discount percentage
//     const mrp = parseFloat(formData.mrp);
//     const sellingPrice = parseFloat(formData.sellingPrice);
//     const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

//     try {
//       const response = await fetch('http://localhost:5000/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           description: formData.description,
//           mrp: mrp,
//           sellingPrice: sellingPrice,
//           category: uniqueCategories, // Send as array
//           subcategory: uniqueSubcategories, // Send as array
//           stock: parseInt(formData.stock, 10),
//           imageUrl: formData.imageUrl,
//           vendorId: user.id,
//           discountPercentage: parseFloat(discountPercentage.toFixed(2)),
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMessage('Product added successfully!');
//         // Reset form
//         setFormData({
//           name: '',
//           description: '',
//           mrp: '',
//           sellingPrice: '',
//           category1: backendCategories[0].value,
//           category2: '',
//           category3: '',
//           subcategory1: '',
//           subcategory2: '',
//           subcategory3: '',
//           stock: '',
//           imageUrl: '',
//         });
//       } else {
//         setError(data.message || 'Failed to add product.');
//       }
//     } catch (err) {
//       console.error('Add Product Error:', err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="vendor-dashboard">
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-group">
//           <label htmlFor="name">Product Name <span className="required">*</span></label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter product name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter product description"
//             rows="3"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="mrp">MRP <span className="required">*</span></label>
//           <input
//             type="number"
//             id="mrp"
//             name="mrp"
//             value={formData.mrp}
//             onChange={handleChange}
//             placeholder="Enter MRP"
//             step="0.01"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
//           <input
//             type="number"
//             id="sellingPrice"
//             name="sellingPrice"
//             value={formData.sellingPrice}
//             onChange={handleChange}
//             placeholder="Enter selling price"
//             step="0.01"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="category1">Category 1 <span className="required">*</span></label>
//           <select
//             id="category1"
//             name="category1"
//             value={formData.category1}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select a category</option>
//             {backendCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="category2">Category 2</label>
//           <select
//             id="category2"
//             name="category2"
//             value={formData.category2}
//             onChange={handleChange}
//           >
//             <option value="">Select a category (optional)</option>
//             {backendCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="category3">Category 3</label>
//           <select
//             id="category3"
//             name="category3"
//             value={formData.category3}
//             onChange={handleChange}
//           >
//             <option value="">Select a category (optional)</option>
//             {backendCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="subcategory1">Subcategory 1 <span className="required">*</span></label>
//           <input
//             type="text"
//             id="subcategory1"
//             name="subcategory1"
//             value={formData.subcategory1}
//             onChange={handleChange}
//             placeholder="Enter subcategory (e.g., Apples)"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="subcategory2">Subcategory 2</label>
//           <input
//             type="text"
//             id="subcategory2"
//             name="subcategory2"
//             value={formData.subcategory2}
//             onChange={handleChange}
//             placeholder="Enter subcategory (optional, e.g., Oranges)"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="subcategory3">Subcategory 3</label>
//           <input
//             type="text"
//             id="subcategory3"
//             name="subcategory3"
//             value={formData.subcategory3}
//             onChange={handleChange}
//             placeholder="Enter subcategory (optional, e.g., Green Apples)"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="stock">Stock <span className="required">*</span></label>
//           <input
//             type="number"
//             id="stock"
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//             placeholder="Enter stock quantity"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
//           <input
//             type="text"
//             id="imageUrl"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             placeholder="Enter image URL"
//             required
//           />
//         </div>
//         {message && <p className="success-message">{message}</p>}
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" className="submit-button">
//           Add Product
//         </button>
//       </form>
//       <style jsx>{`
//         .vendor-dashboard {
//           max-width: 600px;
//           margin: 40px auto;
//           padding: 20px;
//           background-color: #fff;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }

//         h2 {
//           text-align: center;
//           margin-bottom: 20px;
//           color: #333;
//         }

//         .product-form {
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 5px;
//         }

//         label {
//           font-weight: 500;
//           color: #555;
//         }

//         .required {
//           color: red;
//         }

//         input,
//         textarea,
//         select {
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 1rem;
//           width: 100%;
//           box-sizing: border-box;
//         }

//         textarea {
//           resize: vertical;
//         }

//         .submit-button {
//           padding: 10px;
//           background-color: #6B46C1;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .submit-button:hover {
//           background-color: #553c9a;
//         }

//         .success-message {
//           color: green;
//           text-align: center;
//           margin: 10px 0;
//         }

//         .error-message {
//           color: red;
//           text-align: center;
//           margin: 10px 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { backendCategories } from '../components/Categories';

// const VendorDashboard = ({ user }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     mrp: '',
//     sellingPrice: '',
//     category1: backendCategories[0].value, // First category (required)
//     category2: '', // Second category (optional)
//     subcategory1: '', // First subcategory (required)
//     subcategory2: '', // Second subcategory (optional)
//     stock: '',
//     imageUrl: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [vendorProducts, setVendorProducts] = useState([]);

//   // Fetch vendor's products on component mount
//   useEffect(() => {
//     const fetchVendorProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/products?vendorId=${user.id}`, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//           },
//         });
//         const data = await response.json();
//         if (data.success) {
//           setVendorProducts(data.products);
//         } else {
//           setError('Failed to fetch vendor products.');
//         }
//       } catch (err) {
//         console.error('Fetch Vendor Products Error:', err);
//         setError('An error occurred while fetching products.');
//       }
//     };

//     fetchVendorProducts();
//   }, [user.id, user.token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     // Validate form data
//     if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.stock || !formData.imageUrl) {
//       setError('Please fill in all required fields (Name, MRP, Selling Price, Stock, Image URL).');
//       return;
//     }

//     if (!formData.category1) {
//       setError('Please select at least one category.');
//       return;
//     }

//     if (!formData.subcategory1) {
//       setError('Please enter at least one subcategory.');
//       return;
//     }

//     if (isNaN(formData.mrp) || formData.mrp <= 0) {
//       setError('MRP must be a positive number.');
//       return;
//     }

//     if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
//       setError('Selling Price must be a positive number.');
//       return;
//     }

//     if (isNaN(formData.stock) || formData.stock < 0) {
//       setError('Stock must be a non-negative number.');
//       return;
//     }

//     // Collect categories and remove duplicates
//     const categories = [
//       formData.category1,
//       formData.category2,
//     ].filter((cat) => cat && cat !== '').map((cat) => cat.trim());
    
//     const uniqueCategories = [...new Set(categories)];
//     if (uniqueCategories.length === 0) {
//       setError('Please select at least one category.');
//       return;
//     }

//     // Collect subcategories and remove duplicates
//     const subcategories = [
//       formData.subcategory1,
//       formData.subcategory2,
//     ].filter((subcat) => subcat && subcat !== '').map((subcat) => subcat.trim());

//     const uniqueSubcategories = [...new Set(subcategories)];
//     if (uniqueSubcategories.length === 0) {
//       setError('Please enter at least one valid subcategory.');
//       return;
//     }

//     // Calculate discount percentage
//     const mrp = parseFloat(formData.mrp);
//     const sellingPrice = parseFloat(formData.sellingPrice);
//     const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

//     const productData = {
//       name: formData.name,
//       description: formData.description,
//       mrp: mrp,
//       sellingPrice: sellingPrice,
//       category: uniqueCategories,
//       subcategory: uniqueSubcategories,
//       stock: parseInt(formData.stock, 10),
//       imageUrl: formData.imageUrl,
//       vendorId: user.id,
//       discountPercentage: parseFloat(discountPercentage.toFixed(2)),
//     };

//     console.log('Sending product data:', productData);

//     try {
//       const response = await fetch('http://localhost:5000/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();
//       console.log('Response from server:', data);

//       if (data.success) {
//         setMessage('Product added successfully!');
//         setVendorProducts((prev) => [...prev, { ...productData, _id: data.productId }]);
//         setFormData({
//           name: '',
//           description: '',
//           mrp: '',
//           sellingPrice: '',
//           category1: backendCategories[0].value,
//           category2: '',
//           subcategory1: '',
//           subcategory2: '',
//           stock: '',
//           imageUrl: '',
//         });
//       } else {
//         setError(data.message || 'Failed to add product.');
//       }
//     } catch (err) {
//       console.error('Add Product Error:', err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   // Function to delete a product
//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setVendorProducts((prev) => prev.filter((product) => product._id !== productId));
//         setMessage('Product deleted successfully!');
//       } else {
//         setError(data.message || 'Failed to delete product.');
//       }
//     } catch (err) {
//       console.error('Delete Product Error:', err);
//       setError('An error occurred while deleting the product.');
//     }
//   };

//   return (
//     <div className="vendor-dashboard">
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="name">Product Name <span className="required">*</span></label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter product name"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="mrp">MRP <span className="required">*</span></label>
//             <input
//               type="number"
//               id="mrp"
//               name="mrp"
//               value={formData.mrp}
//               onChange={handleChange}
//               placeholder="Enter MRP"
//               step="0.01"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
//             <input
//               type="number"
//               id="sellingPrice"
//               name="sellingPrice"
//               value={formData.sellingPrice}
//               onChange={handleChange}
//               placeholder="Enter selling price"
//               step="0.01"
//               required
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="category1">Category 1 <span className="required">*</span></label>
//             <select
//               id="category1"
//               name="category1"
//               value={formData.category1}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a category</option>
//               {backendCategories.map((cat) => (
//                 <option key={cat.value} value={cat.value}>
//                   {cat.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="category2">Category 2</label>
//             <select
//               id="category2"
//               name="category2"
//               value={formData.category2}
//               onChange={handleChange}
//             >
//               <option value="">Select a category (optional)</option>
//               {backendCategories.map((cat) => (
//                 <option key={cat.value} value={cat.value}>
//                   {cat.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="subcategory1">Subcategory 1 <span className="required">*</span></label>
//             <input
//               type="text"
//               id="subcategory1"
//               name="subcategory1"
//               value={formData.subcategory1}
//               onChange={handleChange}
//               placeholder="Enter subcategory (e.g., Apples)"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="subcategory2">Subcategory 2</label>
//             <input
//               type="text"
//               id="subcategory2"
//               name="subcategory2"
//               value={formData.subcategory2}
//               onChange={handleChange}
//               placeholder="Enter subcategory (optional, e.g., Oranges)"
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="stock">Stock <span className="required">*</span></label>
//             <input
//               type="number"
//               id="stock"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               placeholder="Enter stock quantity"
//               required
//             />
//           </div>
//           <div className="form-group full-width">
//             <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
//             <input
//               type="text"
//               id="imageUrl"
//               name="imageUrl"
//               value={formData.imageUrl}
//               onChange={handleChange}
//               placeholder="Enter image URL"
//               required
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group full-width">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter product description"
//               rows="3"
//             />
//           </div>
//         </div>
//         {message && <p className="success-message">{message}</p>}
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-row">
//           <button type="submit" className="submit-button">
//             Add Product
//           </button>
//         </div>
//       </form>

//       {/* Vendor's Listed Products Section */}
//       <div className="vendor-products">
//         <h2>Your Listed Products</h2>
//         {vendorProducts.length > 0 ? (
//           <table className="products-table">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Categories</th>
//                 <th>Subcategories</th>
//                 <th>MRP</th>
//                 <th>Selling Price</th>
//                 <th>Discount (%)</th>
//                 <th>Stock</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendorProducts.map((product) => (
//                 <tr key={product._id}>
//                   <td>
//                     <img src={product.imageUrl} alt={product.name} className="product-image" />
//                   </td>
//                   <td>{product.name}</td>
//                   <td>{product.category.join(', ')}</td>
//                   <td>{product.subcategory.join(', ')}</td>
//                   <td>₹{product.mrp.toFixed(2)}</td>
//                   <td>₹{product.sellingPrice.toFixed(2)}</td>
//                   <td>{product.discountPercentage.toFixed(2)}%</td>
//                   <td>{product.stock}</td>
//                   <td>
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDeleteProduct(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="no-products">No products listed yet.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .vendor-dashboard {
//           max-width: 1000px;
//           margin: 40px auto;
//           padding: 20px;
//           background-color: #fff;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }

//         h2 {
//           text-align: center;
//           margin-bottom: 20px;
//           color: #333;
//         }

//         .product-form {
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//           margin-bottom: 40px;
//         }

//         .form-row {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 20px;
//           align-items: flex-start;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 5px;
//           flex: 1;
//           min-width: 200px; /* Ensure fields don't get too narrow */
//         }

//         .form-group.full-width {
//           flex: 1 0 100%; /* Full width for description and image URL */
//         }

//         label {
//           font-weight: 500;
//           color: #555;
//         }

//         .required {
//           color: red;
//         }

//         input,
//         textarea,
//         select {
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 1rem;
//           width: 100%;
//           box-sizing: border-box;
//         }

//         textarea {
//           resize: vertical;
//         }

//         .submit-button {
//           padding: 10px 20px;
//           background-color: #6B46C1;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//           margin: 0 auto; /* Center the button */
//         }

//         .submit-button:hover {
//           background-color: #553c9a;
//         }

//         .success-message {
//           color: green;
//           text-align: center;
//           margin: 10px 0;
//         }

//         .error-message {
//           color: red;
//           text-align: center;
//           margin: 10px 0;
//         }

//         .vendor-products {
//           margin-top: 40px;
//         }

//         .products-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }

//         .products-table th,
//         .products-table td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           text-align: left;
//           font-size: 0.9rem;
//         }

//         .products-table th {
//           background-color: #f5f5f5;
//           font-weight: 600;
//           color: #333;
//         }

//         .products-table td {
//           color: #555;
//         }

//         .product-image {
//           width: 50px;
//           height: 50px;
//           object-fit: cover;
//           border-radius: 4px;
//         }

//         .no-products {
//           text-align: center;
//           color: #777;
//           font-style: italic;
//         }

//         .delete-button {
//           padding: 6px 12px;
//           background-color: #dc3545;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           font-size: 0.9rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .delete-button:hover {
//           background-color: #c82333;
//         }

//         @media (max-width: 768px) {
//           .form-row {
//             flex-direction: column;
//             gap: 15px;
//           }

//           .form-group {
//             min-width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VendorDashboard;

import React, { useState, useEffect } from 'react';
import { backendCategories } from '../components/Categories';

const VendorDashboard = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mrp: '',
    sellingPrice: '',
    category1: backendCategories[0].value, // First category (required)
    category2: '', // Second category (optional)
    subcategory1: '', // First subcategory (required)
    subcategory2: '', // Second subcategory (optional)
    stock: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [vendorProducts, setVendorProducts] = useState([]);
  const [vendorOrders, setVendorOrders] = useState([]);
  const [ordersError, setOrdersError] = useState('');

  // Fetch vendor's products on component mount
  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?vendorId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        console.log('Vendor Products Response:', data);
        if (data.success) {
          // Filter out invalid products
          const validProducts = data.products.filter(
            (product) => {
              const isValid =
                product &&
                typeof product.mrp === 'number' &&
                typeof product.sellingPrice === 'number' &&
                typeof product.discountPercentage === 'number';
              if (!isValid) {
                console.warn('Invalid product found:', product);
              }
              return isValid;
            }
          );
          setVendorProducts(validProducts);
          if (validProducts.length === 0) {
            setError('No valid products found.');
          }
        } else {
          setError('Failed to fetch vendor products: ' + (data.message || 'Unknown error'));
        }
      } catch (err) {
        console.error('Fetch Vendor Products Error:', err);
        setError('An error occurred while fetching products.');
      }
    };

    fetchVendorProducts();
  }, [user.id, user.token]);

  // Fetch orders for the vendor's products
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/vendor', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        console.log('Orders Response:', data);
        if (response.ok && data.success) {
          // Filter out invalid orders
          const validOrders = data.orders.filter(
            (order) => {
              const isValid =
                order &&
                typeof order.totalAmount === 'number' &&
                Array.isArray(order.items);
              if (!isValid) {
                console.warn('Invalid order found:', order);
              }
              return isValid;
            }
          );
          setVendorOrders(validOrders);
          if (validOrders.length === 0) {
            setOrdersError('No orders found containing your products.');
          }
        } else {
          setOrdersError(data.message || 'Failed to fetch orders.');
        }
      } catch (err) {
        console.error('Fetch Orders Error:', err);
        setOrdersError('An error occurred while fetching orders.');
      }
    };

    // Fetch orders only after vendor products are loaded
    if (vendorProducts.length > 0) {
      fetchOrders();
    }
  }, [vendorProducts, user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate form data
    if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.stock || !formData.imageUrl) {
      setError('Please fill in all required fields (Name, MRP, Selling Price, Stock, Image URL).');
      return;
    }

    if (!formData.category1) {
      setError('Please select at least one category.');
      return;
    }

    if (!formData.subcategory1) {
      setError('Please enter at least one subcategory.');
      return;
    }

    if (isNaN(formData.mrp) || formData.mrp <= 0) {
      setError('MRP must be a positive number.');
      return;
    }

    if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
      setError('Selling Price must be a positive number.');
      return;
    }

    if (isNaN(formData.stock) || formData.stock < 0) {
      setError('Stock must be a non-negative number.');
      return;
    }

    // Collect categories and remove duplicates
    const categories = [
      formData.category1,
      formData.category2,
    ].filter((cat) => cat && cat !== '').map((cat) => cat.trim());
    
    const uniqueCategories = [...new Set(categories)];
    if (uniqueCategories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    // Collect subcategories and remove duplicates
    const subcategories = [
      formData.subcategory1,
      formData.subcategory2,
    ].filter((subcat) => subcat && subcat !== '').map((subcat) => subcat.trim());

    const uniqueSubcategories = [...new Set(subcategories)];
    if (uniqueSubcategories.length === 0) {
      setError('Please enter at least one valid subcategory.');
      return;
    }

    // Calculate discount percentage
    const mrp = parseFloat(formData.mrp);
    const sellingPrice = parseFloat(formData.sellingPrice);
    const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

    const productData = {
      name: formData.name,
      description: formData.description,
      mrp: mrp,
      sellingPrice: sellingPrice,
      category: uniqueCategories,
      subcategory: uniqueSubcategories,
      stock: parseInt(formData.stock, 10),
      imageUrl: formData.imageUrl,
      vendorId: user.id,
      discountPercentage: parseFloat(discountPercentage.toFixed(2)),
    };

    console.log('Sending product data:', productData);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.success) {
        setMessage('Product added successfully!');
        setVendorProducts((prev) => [...prev, { ...productData, _id: data.productId }]);
        setFormData({
          name: '',
          description: '',
          mrp: '',
          sellingPrice: '',
          category1: backendCategories[0].value,
          category2: '',
          subcategory1: '',
          subcategory2: '',
          stock: '',
          imageUrl: '',
        });
      } else {
        setError(data.message || 'Failed to add product.');
      }
    } catch (err) {
      console.error('Add Product Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setVendorProducts((prev) => prev.filter((product) => product._id !== productId));
        setMessage('Product deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete product.');
      }
    } catch (err) {
      console.error('Delete Product Error:', err);
      setError('An error occurred while deleting the product.');
    }
  };

  return (
    <div className="vendor-dashboard">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mrp">MRP <span className="required">*</span></label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="Enter MRP"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              placeholder="Enter selling price"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category1">Category 1 <span className="required">*</span></label>
            <select
              id="category1"
              name="category1"
              value={formData.category1}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {backendCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category2">Category 2</label>
            <select
              id="category2"
              name="category2"
              value={formData.category2}
              onChange={handleChange}
            >
              <option value="">Select a category (optional)</option>
              {backendCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subcategory1">Subcategory 1 <span className="required">*</span></label>
            <input
              type="text"
              id="subcategory1"
              name="subcategory1"
              value={formData.subcategory1}
              onChange={handleChange}
              placeholder="Enter subcategory (e.g., Apples)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subcategory2">Subcategory 2</label>
            <input
              type="text"
              id="subcategory2"
              name="subcategory2"
              value={formData.subcategory2}
              onChange={handleChange}
              placeholder="Enter subcategory (optional, e.g., Oranges)"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stock">Stock <span className="required">*</span></label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="3"
            />
          </div>
        </div>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="form-row">
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </div>
      </form>

      {/* Vendor's Listed Products Section */}
      <div className="vendor-products">
        <h2>Your Listed Products</h2>
        {vendorProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Subcategories</th>
                <th>MRP</th>
                <th>Selling Price</th>
                <th>Discount (%)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.imageUrl || 'default-image.jpg'}
                      alt={product.name || 'Unnamed Product'}
                      className="product-image"
                    />
                  </td>
                  <td>{product.name || 'N/A'}</td>
                  <td>{product.category?.join(', ') || 'N/A'}</td>
                  <td>{product.subcategory?.join(', ') || 'N/A'}</td>
                  <td>₹{(typeof product.mrp === 'number' ? product.mrp : 0).toFixed(2)}</td>
                  <td>₹{(typeof product.sellingPrice === 'number' ? product.sellingPrice : 0).toFixed(2)}</td>
                  <td>{(typeof product.discountPercentage === 'number' ? product.discountPercentage : 0).toFixed(2)}%</td>
                  <td>{product.stock ?? 'N/A'}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-products">No products listed yet.</p>
        )}
      </div>

      {/* Vendor's Orders Section */}
      <div className="vendor-orders">
        <h2>Orders for Your Products</h2>
        {ordersError && <p className="error-message">{ordersError}</p>}
        {vendorOrders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Products (Your Items)</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {vendorOrders.map((order) => {
                console.log('Rendering order:', order); // Debug log
                // Filter items to include only this vendor's products
                const vendorItems = order.items.filter((item) => {
                  const isVendorProduct = vendorProducts.some(
                    (product) => product._id.toString() === item.productId?._id?.toString()
                  );
                  if (!item.productId) {
                    console.warn('Invalid item in order:', item, 'Order ID:', order._id);
                  }
                  return isVendorProduct;
                });
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId || 'N/A'}</td>
                    <td>
                      {vendorItems.length > 0 ? (
                        vendorItems.map((item, index) => (
                          <div key={index}>
                            {(item.productId?.name || 'Unknown Product')} (Qty: {item.quantity || 0})
                          </div>
                        ))
                      ) : (
                        'No items'
                      )}
                    </td>
                    <td>₹{(typeof order.totalAmount === 'number' ? order.totalAmount : 0).toFixed(2)}</td>
                    <td>{order.status || 'N/A'}</td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !ordersError && <p className="no-orders">No orders found for your products.</p>
        )}
      </div>

      <style jsx>{`
        .vendor-dashboard {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #f9fafb;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .product-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.25rem;
          align-items: start;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .required {
          color: #e11d48;
        }

        input,
        textarea,
        select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          color: #1f2937;
          background-color: #f9fafb;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(to right, #0ea5e9, #06b6d4);
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin: 0 auto;
          display: block;
        }

        .submit-button:hover {
          background: linear-gradient(to right, #0891b2, #0e7490);
          transform: translateY(-1px);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .success-message {
          color: #059669;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0.75rem 0;
        }

        .error-message {
          color: #e11d48;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0.75rem 0;
        }

        .vendor-products,
        .vendor-orders {
          margin-top: 2.5rem;
          padding: 1.5rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .products-table,
        .orders-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin-top: 1.5rem;
          font-size: 0.875rem;
        }

        .products-table th,
        .orders-table th,
        .products-table td,
        .orders-table td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .products-table th,
        .orders-table th {
          background-color: #f1f5f9;
          color: #1f2937;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .products-table tr:hover,
        .orders-table tr:hover {
          background-color: #f9fafb;
        }

        .products-table tr:nth-child(even),
        .orders-table tr:nth-child(even) {
          background-color: #f8fafc;
        }

        .products-table td,
        .orders-table td {
          color: #4b5563;
        }

        .product-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }

        .no-products,
        .no-orders {
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
          font-style: italic;
          padding: 1.5rem;
        }

        .delete-button {
          padding: 0.5rem 1rem;
          background: linear-gradient(to right, #e11d48, #be123c);
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .delete-button:hover {
          background: linear-gradient(to right, #be123c, #9f1239);
          transform: translateY(-1px);
        }

        .delete-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .vendor-dashboard {
            padding: 1rem;
            margin: 1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-group {
            min-width: 100%;
          }

          .products-table,
          .orders-table {
            font-size: 0.75rem;
          }

          .products-table th,
          .orders-table th,
          .products-table td,
          .orders-table td {
            padding: 0.5rem;
          }

          .product-image {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default VendorDashboard;