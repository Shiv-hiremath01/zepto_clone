// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// // Import placeholder images (replace with your own)
// // import paan1 from '../assets/paan1.jpg';
// // import paan2 from '../assets/paan2.jpg';
// // import paan3 from '../assets/paan3.jpg';

//  {/* Paan Corner Banner */}
//       <div className="pan-corner-banner d-flex justify-content-center overflow-auto py-2 px-3" >
//         <Link to="/paanCorner">
//           <img
//             src={"https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png"}
//             alt="Paan Corner Banner"
//             className="img-fluid rounded"
//           />
          
//         </Link>
//       </div>
// const paanProducts = [
//   {
//     id: 1,
//     name: 'Sweet Paan',
//     price: 20,
//     image:'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1240-1480,pr-true,f-auto,q-80/cms/product_variant/eed25775-75bf-4554-a219-c9949e2ac486/Rajnigandha-Silver-Pearls-Mouthfreshener.jpeg',
//     description: 'Traditional sweet paan with gulkand and betel leaf.',
//   },
//   {
//     id: 2,
//     name: 'Maghai Paan',
//     price: 15,
//     image:  'https://source.unsplash.com/random/300x200?paan2',
//     description: 'Authentic Maghai paan with a refreshing taste.',
//   },
//   {
//     id: 3,
//     name: 'Sada Paan',
//     price: 10,
//     image:  'https://source.unsplash.com/random/300x200?paan3',
//     description: 'Simple and classic paan with minimal ingredients.',
//   },
// ];

// function PaanCorner() {
//   // State for cart
//   const [cart, setCart] = useState([]);

//   // Function to add item to cart
//   const addToCart = (product) => {
//     const existingItem = cart.find((item) => item.id === product.id);
//     if (existingItem) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//     alert(`${product.name} added to cart!`); // Replace with toast if desired
//   };

//   return (
//     <div className="paan-corner-container">
//       {/* Internal CSS */}
//       <style>
//         {`
//           .paan-corner-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 20px;
//             text-align: center;
//           }

//           .paan-corner-container h1 {
//             font-size: 32px;
//             margin-bottom: 10px;
//           }

//           .paan-corner-container p {
//             font-size: 18px;
//             color: #555;
//             margin-bottom: 20px;
//           }

//           .cart-summary {
//             margin: 20px 0;
//             padding: 15px;
//             background-color: #F9F9F9;
//             border-radius: 8px;
//           }

//           .cart-summary h3 {
//             font-size: 24px;
//             margin-bottom: 10px;
//           }

//           .cart-summary ul {
//             list-style: none;
//             padding: 0;
//           }

//           .cart-summary li {
//             font-size: 16px;
//             margin: 5px 0;
//           }

//           .product-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 20px;
//           }

//           .product-card {
//             background-color: #fff;
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             padding: 15px;
//             text-align: center;
//             transition: transform 0.2s;
//           }

//           .product-card:hover {
//             transform: scale(1.05);
//           }

//           .product-image {
//             width: 100%;
//             height: 150px;
//             object-fit: cover;
//             border-radius: 8px;
//             margin-bottom: 10px;
//           }

//           .product-card h3 {
//             font-size: 20px;
//             margin: 10px 0;
//           }

//           .product-card p {
//             font-size: 14px;
//             color: #666;
//             margin: 5px 0;
//           }

//           .price {
//             font-size: 18px;
//             font-weight: bold;
//             color: #28a745;
//             margin: 10px 0;
//           }

//           .add-to-cart-btn {
//             background-color: #28a745;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 5px;
//             cursor: pointer;
//             font-size: 16px;
//           }

//           .add-to-cart-btn:hover {
//             background-color: #218838;
//           }

//           @media (max-width: 768px) {
//             .product-grid {
//               grid-template-columns: 1fr;
//             }
//           }
//         `}
//       </style>

//       <h1>Paan Corner</h1>
//       <p>Explore our exclusive range of paan products!</p>

//       {/* Cart Summary */}
//       <div className="cart-summary">
//         <h3>Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h3>
//         {cart.length > 0 ? (
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id}>
//                 {item.name} - ₹{item.price} x {item.quantity}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}
//       </div>

//       {/* Product Grid */}
//       <div className="product-grid">
//         {paanProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="product-image"
//             />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p className="price">₹{product.price}</p>
//             <button
//               onClick={() => addToCart(product)}
//               className="add-to-cart-btn"
//               aria-label={`Add ${product.name} to cart`}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PaanCorner;