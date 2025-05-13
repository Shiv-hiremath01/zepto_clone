// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import Register from './components/login/Register';
// import LoginForm from './components/login/Login';
// import ForgotPassword from './components/login/ForgotPassword';
// import ResetPassword from './components/login/ResetPassword';
// import Profile from './components/login/Profile';
// import Home from './Home';
// import Products from './components/Products';
// import Cart from './components/Cart';
// import { categoryMap, backendCategories } from '../src/components/Categories';

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [page, setPage] = useState('home');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fetchProfile = async (token) => {
//     try {
//       const res = await fetch('http://localhost:5000/profile', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser({
//           token,
//           profile: {
//             phone: data.user.contactNumber,
//             name: `${data.user.firstName} ${data.user.lastName}`,
//           },
//           role: data.role,
//         });
//       } else {
//         setUser(null);
//         localStorage.removeItem('token');
//       }
//     } catch (err) {
//       console.error('Profile Fetch Error:', err);
//       setUser(null);
//       localStorage.removeItem('token');
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchProfile(token);
//     }
//     if (location.pathname === '/products' && location.search === '') {
//       navigate('/', { replace: true });
//     }
//   }, [location, navigate]);

//   // Navigate based on page state
//   useEffect(() => {
//     if (page === 'cart') {
//       navigate('/cart');
//     }
//   }, [page, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/');
//   };

//   // Function to refresh user state to trigger cart count update
//   const refreshUser = () => {
//     setUser((prev) => (prev ? { ...prev } : null)); // Trigger Navbar useEffect
//   };

//   const getCategoryRedirect = (pathname) => {
//     const path = pathname.replace(/^\/+/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     if (path === '' || path === 'home') return '/';
//     const frontendCategory = backendCategories.find(
//       (cat) => cat.label.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '-') === path
//     )?.label;
//     const backendCategory = frontendCategory ? categoryMap[frontendCategory] : 'All';
//     const queryParams = new URLSearchParams(location.search);
//     const query = queryParams.get('query');
//     let redirectPath = backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`;
//     if (query) {
//       redirectPath += `${redirectPath.includes('?') ? '&' : '?'}query=${encodeURIComponent(query)}`;
//     }
//     return redirectPath;
//   };

//   return (
//     <div className="App">
//       <Navbar user={user} setPage={setPage} handleLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/products" element={<Products user={user} setUser={setUser} refreshUser={refreshUser} />} />
//         <Route path="/cart" element={user ? <Cart user={user} /> : <Navigate to="/login" />} />
//         <Route path="/*" element={<Navigate to={getCategoryRedirect(location.pathname)} replace />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import Register from './components/login/Register';
// import LoginForm from './components/login/Login';
// import ForgotPassword from './components/login/ForgotPassword';
// import ResetPassword from './components/login/ResetPassword';
// import Profile from './components/login/Profile';
// import Home from './Home';
// import Products from './components/Products';
// import Cart from './components/Cart';
// import ProductDetail from './pages/ProductDetails';
// import { categoryMap, backendCategories } from '../src/components/Categories';
// import VendorDashboard from './pages/VendorDashboard';

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [page, setPage] = useState('home');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fetchProfile = async (token) => {
//     try {
//       console.log('Fetching profile with token:', token);
//       const res = await fetch('http://localhost:5000/profile', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       console.log('Profile fetch response:', data);
//       if (data.success) {
//         setUser({
//           token,
//           profile: {
//             phone: data.user.contactNumber,
//             name: `${data.user.firstName} ${data.user.lastName}`,
//           },
//           role: data.role,
//           id: data.user.id, // Store the user ID for later use if needed
//         });
//       } else {
//         console.log('Profile fetch failed, clearing token:', data.message);
//         setUser(null);
//         localStorage.removeItem('token');
//         navigate('/login'); // Redirect to login if profile fetch fails
//       }
//     } catch (err) {
//       console.error('Profile Fetch Error:', err);
//       setUser(null);
//       localStorage.removeItem('token');
//       navigate('/login'); // Redirect to login on error
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Decode the token to check its payload (for debugging)
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         console.log('Token payload in App.js:', payload);
//       } catch (err) {
//         console.error('Error decoding token:', err);
//       }
//       fetchProfile(token);
//     }
//     if (location.pathname === '/products' && location.search === '') {
//       navigate('/', { replace: true });
//     }
//   }, [location, navigate]);

//   // Navigate based on page state
//   useEffect(() => {
//     if (page === 'cart') {
//       navigate('/cart');
//     }
//   }, [page, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/');
//   };

//   // Function to refresh user state to trigger cart count update
//   const refreshUser = () => {
//     setUser((prev) => (prev ? { ...prev } : null)); // Trigger Navbar useEffect
//   };

//   const getCategoryRedirect = (pathname) => {
//     const path = pathname.replace(/^\/+/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     if (path === '' || path === 'home') return '/';
//     const frontendCategory = backendCategories.find(
//       (cat) => cat.label.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '-') === path
//     )?.label;
//     const backendCategory = frontendCategory ? categoryMap[frontendCategory] : 'All';
//     const queryParams = new URLSearchParams(location.search);
//     const query = queryParams.get('query');
//     let redirectPath = backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`;
//     if (query) {
//       redirectPath += `${redirectPath.includes('?') ? '&' : '?'}query=${encodeURIComponent(query)}`;
//     }
//     return redirectPath;
//   };

//   return (
//     <div className="App">
//       <Navbar user={user} setPage={setPage} handleLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/products" element={<Products user={user} setUser={setUser} refreshUser={refreshUser} />} />
//         <Route path="/cart" element={user ? <Cart user={user} /> : <Navigate to="/login" />} />
//         <Route path="/products/:id" element={<ProductDetail user={user} />} />
//         <Route path="/*" element={<Navigate to={getCategoryRedirect(location.pathname)} replace />} />
//         <Route path="/vendor-profile" element={<VendorDashboard user={user} handleLogout={handleLogout} />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import Register from './components/login/Register';
// import LoginForm from './components/login/Login';
// import ForgotPassword from './components/login/ForgotPassword';
// import ResetPassword from './components/login/ResetPassword';
// import Profile from './components/login/Profile';
// import Home from './Home';
// import Products from './components/Products';
// import Cart from './components/Cart';
// import ProductDetail from './pages/ProductDetails';
// import VendorDashboard from './pages/VendorDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import { backendCategories } from '../src/components/Categories';
// import OrderSuccess from './pages/OrderSuccess';
// import 'leaflet/dist/leaflet.css';


// // ProtectedRoute component to restrict access based on role
// const ProtectedRoute = ({ user, allowedRole, children }) => {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== allowedRole) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [page, setPage] = useState('home');
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const fetchProfile = async (token) => {
//         try {
//           console.log('Fetching profile with token:', token);
//           const res = await fetch('http://localhost:5000/auth/profile', {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           const data = await res.json();
//           console.log('Profile fetch response:', data);
//           if (data.success) {
//             setUser({
//               token,
//               profile: {
//                 phone: data.user.contactNumber || '',
//                 name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || 'Unknown',
//               },
//               role: data.role,
//               id: data.user.id,
//             });
//             console.log('Set user:', {
//               token,
//               profile: {
//                 phone: data.user.contactNumber || '',
//                 name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || 'Unknown',
//               },
//               role: data.role,
//               id: data.user.id,
//             });
//           } else {
//             console.log('Profile fetch failed, clearing token:', data.message);
//             setUser(null);
//             localStorage.removeItem('token');
//             if (location.pathname !== '/login') {
//               navigate('/login', { replace: true });
//             }
//           }
//         } catch (err) {
//           console.error('Profile Fetch Error:', err);
//           setUser(null);
//           localStorage.removeItem('token');
//           if (location.pathname !== '/login') {
//             navigate('/login', { replace: true });
//           }
//         }
//       };

//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         console.log('Token payload in App.js:', payload);
//         const currentTime = Math.floor(Date.now() / 1000);
//         if (payload.exp < currentTime) {
//           console.log('Token expired, clearing token');
//           localStorage.removeItem('token');
//           setUser(null);
//           if (location.pathname !== '/login') {
//             navigate('/login', { replace: true });
//           }
//         } else {
//           fetchProfile(token);
//         }
//       } catch (err) {
//         console.error('Error decoding token:', err);
//         localStorage.removeItem('token');
//         setUser(null);
//         if (location.pathname !== '/login') {
//           navigate('/login', { replace: true });
//         }
//       }
//     }
//     if (location.pathname === '/products' && location.search === '') {
//       navigate('/', { replace: true });
//     }
//   }, [location, navigate]);

//   useEffect(() => {
//     if (page === 'cart') {
//       navigate('/cart');
//     }
//   }, [page, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/');
//   };

//   const refreshUser = () => {
//     setUser((prev) => (prev ? { ...prev } : null));
//   };

//   const getCategoryRedirect = (pathname) => {
//     const path = pathname.replace(/^\/+/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     if (path === '' || path === 'home') return '/';
//     const category = backendCategories.find(
//       (cat) => cat.label.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '-') === path
//     );
//     const backendCategory = category ? category.value : 'All';
//     const queryParams = new URLSearchParams(location.search);
//     const query = queryParams.get('query');
//     let redirectPath = backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`;
//     if (query) {
//       redirectPath += `${redirectPath.includes('?') ? '&' : '?'}query=${encodeURIComponent(query)}`;
//     }
//     return redirectPath;
//   };

//   return (
//     <div className="App">
//       <Navbar user={user} setPage={setPage} handleLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<LoginForm setUser={setUser} />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/products" element={<Products user={user} setUser={setUser} refreshUser={refreshUser} />} />
//         <Route path="/cart" element={user ? <Cart user={user} /> : <Navigate to="/login" />} />
//         <Route path="/success" element={<OrderSuccess />} />
//         <Route path="/products/:id" element={<ProductDetail user={user} />} />
//         <Route path="/vendor-dashboard" element={
//           <ProtectedRoute user={user} allowedRole="vendor">
//             <VendorDashboard user={user} />
//           </ProtectedRoute>
//         } />
//         <Route path="/admin-dashboard" element={
//           <ProtectedRoute user={user} allowedRole="admin">
//             <AdminDashboard user={user} setUser={setUser} />
//           </ProtectedRoute>
//         } />
//         <Route path="/*" element={<Navigate to={getCategoryRedirect(location.pathname)} replace />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './components/login/Register';
import LoginForm from './components/login/Login';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import Profile from './components/login/Profile';
import Home from './Home';
import Products from './components/Products';
import Cart from './components/Cart';
import ProductDetail from './pages/ProductDetails';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { backendCategories } from '../src/components/Categories';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders'; // Import Orders component
import 'leaflet/dist/leaflet.css';

// ProtectedRoute component to restrict access based on role
const ProtectedRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchProfile = async (token) => {
        try {
          console.log('Fetching profile with token:', token);
          const res = await fetch('http://localhost:5000/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          console.log('Profile fetch response:', data);
          if (data.success) {
            setUser({
              token,
              profile: {
                phone: data.user.contactNumber || '',
                name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || 'Unknown',
              },
              role: data.role,
              id: data.user.id,
            });
            console.log('Set user:', {
              token,
              profile: {
                phone: data.user.contactNumber || '',
                name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || 'Unknown',
              },
              role: data.role,
              id: data.user.id,
            });
          } else {
            console.log('Profile fetch failed, clearing token:', data.message);
            setUser(null);
            localStorage.removeItem('token');
            if (location.pathname !== '/login') {
              navigate('/login', { replace: true });
            }
          }
        } catch (err) {
          console.error('Profile Fetch Error:', err);
          setUser(null);
          localStorage.removeItem('token');
          if (location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
        }
      };

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload in App.js:', payload);
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
          console.log('Token expired, clearing token');
          localStorage.removeItem('token');
          setUser(null);
          if (location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
        } else {
          fetchProfile(token);
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        localStorage.removeItem('token');
        setUser(null);
        if (location.pathname !== '/login') {
          navigate('/login', { replace: true });
        }
      }
    }
    if (location.pathname === '/products' && location.search === '') {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (page === 'cart') {
      navigate('/cart');
    }
  }, [page, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const refreshUser = () => {
    setUser((prev) => (prev ? { ...prev } : null));
  };

  const getCategoryRedirect = (pathname) => {
    const path = pathname.replace(/^\/+/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (path === '' || path === 'home') return '/';
    const category = backendCategories.find(
      (cat) => cat.label.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '-') === path
    );
    const backendCategory = category ? category.value : 'All';
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    let redirectPath = backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`;
    if (query) {
      redirectPath += `${redirectPath.includes('?') ? '&' : '?'}query=${encodeURIComponent(query)}`;
    }
    return redirectPath;
  };

  return (
    <div className="App">
      <Navbar user={user} setPage={setPage} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} />} />
        <Route path="/orders" element={
          <ProtectedRoute user={user}>
            <Orders user={user} />
          </ProtectedRoute>
        } />
        <Route path="/products" element={<Products user={user} setUser={setUser} refreshUser={refreshUser} />} />
        <Route path="/cart" element={user ? <Cart user={user} /> : <Navigate to="/login" />} />
        <Route path="/success" element={<OrderSuccess user={user} />} />
        <Route path="/products/:id" element={<ProductDetail user={user} />} />
        <Route path="/vendor-dashboard" element={
          <ProtectedRoute user={user} allowedRole="vendor">
            <VendorDashboard user={user} />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute user={user} allowedRole="admin">
            <AdminDashboard user={user} setUser={setUser} />
          </ProtectedRoute>
        } />
        <Route path="/*" element={<Navigate to={getCategoryRedirect(location.pathname)} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;