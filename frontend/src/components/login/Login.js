// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('user');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await fetch('http://localhost:5000/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password, role }),
//             });

//             const data = await res.json();
//             if (data.success) {
//                 localStorage.setItem('token', data.token);
//                 navigate('/');
//             } else {
//                 alert(data.message || 'Invalid credentials');
//             }
//         } catch (err) {
//             console.error('Login Error:', err);
//             alert('Login failed. Please try again.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
//             <div className="form-container">
//                 <h2 className="form-title">Login</h2>
//                 <form onSubmit={handleLogin} className="form-content">
//                     <div className="form-group">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="role" className="form-label">Role</label>
//                         <select
//                             id="role"
//                             name="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             required
//                             className="form-input"
//                         >
//                             <option value="user">User</option>
//                             <option value="admin">Admin</option>
//                             <option value="vendor">Vendor</option>
//                         </select>
//                     </div>
//                     <button
//                         type="submit"
//                         className="form-button"
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <div className="form-footer">
//                     <a href="/forgot-password" className="form-link">
//                         Forgot Password?
//                     </a>
//                     <span className="divider">|</span>
//                     <a href="/register" className="form-link">
//                         Create an Account
//                     </a>
//                 </div>
//             </div>
//             <style>{`
//                 .form-container {
//                     background: #ffffff;
//                     border-radius: 16px;
//                     padding: 2rem;
//                     width: 100%;
//                     max-width: 400px;
//                     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//                 }

//                 .form-title {
//                     font-size: 1.75rem;
//                     font-weight: 700;
//                     color: #212529;
//                     text-align: center;
//                     margin-bottom: 1.5rem;
//                 }

//                 .form-content {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 1.25rem;
//                 }

//                 .form-group {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 0.5rem;
//                 }

//                 .form-label {
//                     font-size: 0.95rem;
//                     font-weight: 600;
//                     color: #495057;
//                 }

//                 .form-input {
//                     padding: 0.65rem 0.9rem;
//                     border: 1px solid #ced4da;
//                     border-radius: 10px;
//                     font-size: 1rem;
//                     background: #f8f9fa;
//                     transition: border-color 0.2s, box-shadow 0.2s;
//                 }

//                 .form-input:focus {
//                     outline: none;
//                     border-color: #00b386;
//                     box-shadow: 0 0 0 3px rgba(0, 179, 134, 0.2);
//                 }

//                 .form-button {
//                     background: #00b386;
//                     color: #fff;
//                     padding: 0.75rem;
//                     border: none;
//                     border-radius: 10px;
//                     font-size: 1.1rem;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: background 0.3s, transform 0.2s;
//                 }

//                 .form-button:hover {
//                     background: #009e75;
//                     transform: scale(1.02);
//                 }

//                 .form-button:active {
//                     transform: scale(0.98);
//                 }

//                 .form-footer {
//                     margin-top: 1.5rem;
//                     text-align: center;
//                     font-size: 0.9rem;
//                     color: #6c757d;
//                 }

//                 .form-link {
//                     color: #00b386;
//                     font-weight: 600;
//                     text-decoration: none;
//                     transition: color 0.3s;
//                 }

//                 .form-link:hover {
//                     color: #007f5f;
//                 }

//                 .divider {
//                     margin: 0 0.5rem;
//                 }

//                 @media (max-width: 640px) {
//                     .form-container {
//                         padding: 1.5rem;
//                         max-width: 95%;
//                     }

//                     .form-title {
//                         font-size: 1.5rem;
//                     }

//                     .form-input {
//                         font-size: 0.95rem;
//                     }

//                     .form-button {
//                         font-size: 1rem;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default LoginForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // If token exists, fetch user profile to verify
        const fetchProfile = async () => {
          try {
            const res = await fetch('http://localhost:5000/auth/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
              setUser({
                token,
                profile: {
                  phone: data.user.contactNumber,
                  name: `${data.user.firstName} ${data.user.lastName}`,
                },
                role: data.role,
                id: data.user.id,
              });
              // Navigate based on role
              if (data.role === 'vendor') {
                navigate('/vendor-dashboard', { replace: true });
              } else if (data.role === 'admin') {
                navigate('/admin-dashboard', { replace: true });
              } else {
                navigate('/', { replace: true });
              }
            } else {
              localStorage.removeItem('token');
            }
          } catch (err) {
            console.error('Profile Fetch Error:', err);
            localStorage.removeItem('token');
          }
        };
        fetchProfile();
      }
    }, [navigate, setUser]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                // Update app state with user info
                setUser({
                  token: data.token,
                  profile: {
                    name: data.user.name,
                    phone: data.user.contactNumber || '', // Fallback if not present
                  },
                  role: data.user.role,
                  id: data.user.id,
                });
                // Redirect based on role
                if (data.user.role === 'vendor') {
                    navigate('/vendor-dashboard', { replace: true });
                } else if (data.user.role === 'admin') {
                    navigate('/admin-dashboard', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                alert(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login Error:', err);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="form-container">
                <h2 className="form-title">Login</h2>
                <form onSubmit={handleLogin} className="form-content">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="form-input"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="form-button"
                    >
                        Login
                    </button>
                </form>
                <div className="form-footer">
                    <a href="/forgot-password" className="form-link">
                        Forgot Password?
                    </a>
                    <span className="divider">|</span>
                    <a href="/register" className="form-link">
                        Create an Account
                    </a>
                </div>
            </div>
            <style jsx>{`
  .min-h-screen {
    /* Background removed */
  }

  .form-container {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333333;
  }

  .form-input {
    padding: 0.75rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    background: #f9f9f9;
    color: #333333;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .form-input:focus {
    outline: none;
    border-color: #7e22ce;
    box-shadow: 0 0 8px rgba(126, 34, 206, 0.3);
  }

  .form-button {
    background: #7e22ce;
    color: #ffffff;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }

  .form-button:hover {
    background: #6b21a8;
    transform: scale(1.02);
  }

  .form-button:active {
    transform: scale(0.98);
  }

  .form-footer {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.9rem;
    color: #666666;
  }

  .form-link {
    color: #7e22ce;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s;
  }

  .form-link:hover {
    color: #6b21a8;
    text-decoration: underline;
  }

  .divider {
    margin: 0 0.5rem;
    color: #666666;
  }

  @media (max-width: 640px) {
    .form-container {
      padding: 1.5rem;
      max-width: 90%;
    }

    .form-title {
      font-size: 1.5rem;
    }

    .form-input {
      padding: 0.65rem;
      font-size: 0.95rem;
    }

    .form-button {
      padding: 0.65rem;
      font-size: 0.95rem;
    }

    .form-footer {
      font-size: 0.85rem;
    }
  }
`}</style>
        </div>
    );
};

export default LoginForm;