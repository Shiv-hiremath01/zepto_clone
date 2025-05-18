// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // function Profile() {
// // //   const [user, setUser] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         navigate('/login');
// // //         return;
// // //       }

// // //       try {
// // //         const res = await fetch('http://localhost:5000/profile', {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         const data = await res.json();
// // //         if (data.success) {
// // //           setUser({
// // //             profile: {
// // //               phone: data.user.contactNumber,
// // //               name: `${data.user.firstName} ${data.user.lastName}`,
// // //             },
// // //             role: data.role,
// // //           });
// // //         } else {
// // //           navigate('/login');
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //         navigate('/login');
// // //       }
// // //     };

// // //     fetchProfile();
// // //   }, [navigate]);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem('token');
// // //     navigate('/login');
// // //   };

// // //   if (!user) return <div>Loading...</div>;

// // //   return (
// // //     <div className="container mt-5 d-flex justify-content-center">
// // //       <div
// // //         className="card shadow"
// // //         style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}
// // //       >
// // //         <div
// // //           className="card-header text-white"
// // //           style={{ backgroundColor: '#6f42c1', borderRadius: '15px 15px 0 0' }}
// // //         >
// // //           <h1>User Profile</h1>
// // //         </div>
// // //         <div className="card-body" style={{ padding: '20px' }}>
// // //           <p><strong>Phone:</strong> {user.profile.phone}</p>
// // //           <p><strong>Name:</strong> {user.profile.name || 'N/A'}</p>
// // //           <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
// // //           <button
// // //             onClick={handleLogout}
// // //             className="btn w-100"
// // //             style={{
// // //               backgroundColor: '#e91e63',
// // //               color: '#fff',
// // //               borderRadius: '10px',
// // //               padding: '10px',
// // //               fontSize: '16px',
// // //               fontWeight: 'bold',
// // //               marginTop: '15px',
// // //             }}
// // //           >
// // //             Logout
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Profile;


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // function Profile() {
// //   const [user, setUser] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         navigate('/login');
// //         return;
// //       }

// //       try {
// //         const res = await fetch('http://localhost:5000/profile', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const data = await res.json();
// //         if (data.success) {
// //           setUser({
// //             profile: {
// //               phone: data.user.contactNumber,
// //               name: `${data.user.firstName} ${data.user.lastName}`,
// //             },
// //             role: data.role,
// //           });
// //         } else {
// //           navigate('/login');
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         navigate('/login');
// //       }
// //     };

// //     fetchProfile();
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     navigate('/login');
// //   };

// //   if (!user) return <div>Loading...</div>;

// //   return (
// //     <div className="profile-container">
// //       <div className="sidebar">
// //         <div className="header">
// //           <div className="back-arrow">←</div>
// //           <h2 className="settings-title">Settings</h2>
// //         </div>
// //         <div className="user-info">
// //           <div className="user-icon">👤</div>
// //           <div className="user-details">
// //             <span className="user-name">{user.profile.name || 'N/A'}</span>
// //             <span className="user-phone">{user.profile.phone}</span>
// //           </div>
// //         </div>
// //         <div className="zepto-cash-section">
// //           <span className="section-title">Zepto Cash & Gift Card</span>
// //           <div className="balance-row">
// //             <span className="balance-label">Available Balance: ₹0</span>
// //             <button className="add-balance-btn">Add Balance</button>
// //           </div>
// //         </div>
// //         <div className="free-cash-section">
// //           <span className="section-title">FREE CASH ℹ️</span>
// //           <span className="free-cash-amount">₹50</span>
// //         </div>
// //         <div className="nav-items">
// //           <div className="nav-item">
// //             <span className="nav-icon">🛒</span>
// //             <span className="nav-text">Orders</span>
// //           </div>
// //           <div className="nav-item">
// //             <span className="nav-icon">💬</span>
// //             <span className="nav-text">Customer Support</span>
// //           </div>
// //           <div className="nav-item">
// //             <span className="nav-icon">❤️</span>
// //             <span className="nav-text">Manage Referrals</span>
// //           </div>
// //           <div className="nav-item">
// //             <span className="nav-icon">📍</span>
// //             <span className="nav-text">Addresses</span>
// //           </div>
// //           <div className="nav-item">
// //             <span className="nav-icon">👤</span>
// //             <span className="nav-text">Profile</span>
// //           </div>
// //           <div className="nav-item logout" onClick={handleLogout}>
// //             <span className="nav-text">Log Out</span>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="main-content">
// //         <div className="no-orders">
// //           <div className="zepto-logo">Z</div>
// //           <span className="no-orders-text">No orders yet</span>
// //           <button className="browse-products-btn">Browse products</button>
// //         </div>
// //       </div>
// //       <style>
// //         {`
// //           .profile-container {
// //             display: flex;
// //             height: 100vh;
// //             background-color: #f5f6f8;
// //             font-family: 'Arial', sans-serif;
// //           }

// //           .sidebar {
// //             width: 280px;
// //             background-color: #fff;
// //             padding: 20px;
// //             border-right: 1px solid #e0e0e0;
// //             display: flex;
// //             flex-direction: column;
// //             gap: 20px;
// //           }

// //           .header {
// //             display: flex;
// //             align-items: center;
// //             gap: 10px;
// //           }

// //           .back-arrow {
// //             font-size: 20px;
// //             color: #333;
// //             cursor: pointer;
// //           }

// //           .settings-title {
// //             font-size: 20px;
// //             font-weight: 600;
// //             background: linear-gradient(90deg, #6B46C1, #D53F8C);
// //             -webkit-background-clip: text;
// //             -webkit-text-fill-color: transparent;
// //           }

// //           .user-info {
// //             display: flex;
// //             align-items: center;
// //             gap: 10px;
// //           }

// //           .user-icon {
// //             width: 40px;
// //             height: 40px;
// //             background-color: #6B46C1;
// //             border-radius: 50%;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             color: #fff;
// //             font-size: 20px;
// //           }

// //           .user-details {
// //             display: flex;
// //             flex-direction: column;
// //           }

// //           .user-name {
// //             font-size: 16px;
// //             font-weight: 600;
// //             color: #333;
// //           }

// //           .user-phone {
// //             font-size: 14px;
// //             color: #666;
// //           }

// //           .zepto-cash-section {
// //             border-bottom: 1px solid #e0e0e0;
// //             padding-bottom: 15px;
// //           }

// //           .section-title {
// //             font-size: 14px;
// //             font-weight: 600;
// //             color: #333;
// //           }

// //           .balance-row {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             margin-top: 10px;
// //           }

// //           .balance-label {
// //             font-size: 14px;
// //             color: #666;
// //           }

// //           .add-balance-btn {
// //             background-color: #000;
// //             color: #fff;
// //             border: none;
// //             border-radius: 5px;
// //             padding: 6px 12px;
// //             font-size: 14px;
// //             font-weight: 500;
// //             cursor: pointer;
// //             transition: background-color 0.3s;
// //           }

// //           .add-balance-btn:hover {
// //             background-color: #333;
// //           }

// //           .free-cash-section {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             background-color: #f5e9ff;
// //             padding: 10px;
// //             border-radius: 8px;
// //             margin-bottom: 20px;
// //           }

// //           .free-cash-amount {
// //             font-size: 16px;
// //             font-weight: 600;
// //             color: #6B46C1;
// //           }

// //           .nav-items {
// //             display: flex;
// //             flex-direction: column;
// //             gap: 15px;
// //           }

// //           .nav-item {
// //             display: flex;
// //             align-items: center;
// //             gap: 10px;
// //             cursor: pointer;
// //             padding: 10px;
// //             border-radius: 5px;
// //             transition: background-color 0.3s;
// //           }

// //           .nav-item:hover {
// //             background-color: #f5f6f8;
// //           }

// //           .nav-icon {
// //             font-size: 20px;
// //             color: #666;
// //           }

// //           .nav-text {
// //             font-size: 14px;
// //             font-weight: 500;
// //             color: #333;
// //           }

// //           .logout .nav-text {
// //             font-weight: 600;
// //           }

// //           .main-content {
// //             flex: 1;
// //             display: flex;
// //             justify-content: center;
// //             align-items: center;
// //             background-color: #f5f6f8;
// //           }

// //           .no-orders {
// //             text-align: center;
// //             display: flex;
// //             flex-direction: column;
// //             align-items: center;
// //             gap: 15px;
// //           }

// //           .zepto-logo {
// //             width: 60px;
// //             height: 60px;
// //             background-color: #6B46C1;
// //             color: #fff;
// //             font-size: 36px;
// //             font-weight: bold;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             border-radius: 10px;
// //           }

// //           .no-orders-text {
// //             font-size: 18px;
// //             font-weight: 500;
// //             color: #333;
// //           }

// //           .browse-products-btn {
// //             background-color: transparent;
// //             color: #6B46C1;
// //             border: 1px solid #6B46C1;
// //             border-radius: 20px;
// //             padding: 8px 20px;
// //             font-size: 14px;
// //             font-weight: 500;
// //             cursor: pointer;
// //             transition: all 0.3s;
// //           }

// //           .browse-products-btn:hover {
// //             background-color: #6B46C1;
// //             color: #fff;
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // }

// // export default Profile;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProfileSidebar from '../ProfileSidebar';

// function Profile() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       try {
//         const res = await fetch('http://localhost:5000/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (data.success) {
//           setUser({
//             profile: {
//               phone: data.user.contactNumber,
//               name: `${data.user.firstName} ${data.user.lastName}`,
//             },
//             role: data.role,
//           });
//         } else {
//           navigate('/login');
//         }
//       } catch (err) {
//         console.error(err);
//         navigate('/login');
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="profile-container">
//       <ProfileSidebar user={user} handleLogout={handleLogout} />
//       <div className="main-content">
//         <div className="no-orders">
//           <div className="zepto-logo">Z</div>
//           <span className="no-orders-text">No orders yet</span>
//           <button
//             className="browse-products-btn"
//             onClick={() => navigate('/')}
//           >
//             Browse products
//           </button>
//         </div>
//       </div>
//       <style>
//         {`
//           .profile-container {
//             display: flex;
//             height: 100vh;
//             background-color: #f5f6f8;
//             font-family: 'Arial', sans-serif;
//           }

//           .main-content {
//             flex: 1;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             background-color: #f5f6f8;
//           }

//           .no-orders {
//             text-align: center;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 15px;
//           }

//           .zepto-logo {
//             width: 60px;
//             height: 60px;
//             background-color: #6B46C1;
//             color: #fff;
//             font-size: 36px;
//             font-weight: bold;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 10px;
//           }

//           .no-orders-text {
//             font-size: 18px;
//             font-weight: 500;
//             color: #333;
//           }

//           .browse-products-btn {
//             background-color: transparent;
//             color: #6B46C1;
//             border: 1px solid #6B46C1;
//             border-radius: 20px;
//             padding: 8px 20px;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.3s;
//           }

//           .browse-products-btn:hover {
//             background-color: #6B46C1;
//             color: #fff;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../ProfileSidebar';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://15.207.17.186:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUser({
            profile: {
              phone: data.user.contactNumber,
              name: `${data.user.firstName} ${data.user.lastName}`,
            },
            role: data.role,
          });
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <ProfileSidebar user={user} handleLogout={handleLogout} />
      <div className="main-content">
        <div className="no-orders">
          <div className="zepto-logo">Z</div>
          <span className="no-orders-text">No orders yet</span>
          <button
            className="browse-products-btn"
            onClick={() => navigate('/')}
          >
            Browse products
          </button>
        </div>
      </div>
      <style>
        {`
          .profile-container {
            display: flex;
            height: 100vh;
            background-color: #f5f6f8;
            font-family: 'Arial', sans-serif;
          }

          .main-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f5f6f8;
          }

          .no-orders {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .zepto-logo {
            width: 60px;
            height: 60px;
            background-color: #6B46C1;
            color: #fff;
            font-size: 36px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
          }

          .no-orders-text {
            font-size: 18px;
            font-weight: 500;
            color: #333;
          }

          .browse-products-btn {
            background-color: transparent;
            color: #6B46C1;
            border: 1px solid #6B46C1;
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
          }

          .browse-products-btn:hover {
            background-color: #6B46C1;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}

export default Profile;
