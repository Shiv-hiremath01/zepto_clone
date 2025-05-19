// import React, { useState } from "react";

// const ForgotPassword = () => {
//   const [role, setRole] = useState('user');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;

//     const res = await fetch('http://15.207.17.186:5000/auth/forgot-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, role }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       alert(data.message);
//     } else {
//       alert(data.message || 'Failed to send reset link');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-1 font-medium">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your registered email"
//               required
//               className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="role" className="mb-1 font-medium">Role</label>
//             <select
//               id="role"
//               name="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//               className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="vendor">Vendor</option>
//             </select>
//           </div>
//           <input
//             type="submit"
//             value="Submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer"
//           />
//         </form>
//         <div className="mt-4 text-center">
//           Remembered your password?{" "}
//           <a href="/loginpage" className="text-blue-500 hover:underline">
//             Login here
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const res = await fetch('http://15.207.17.186:5000/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });

    const data = await res.json();
    if (data.success) {
      navigate(`/reset-password/${data.resetToken}`, { state: { role: data.role, email: data.email } });
    } else {
      alert(data.message || 'Failed to initiate password reset');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="form-container">
        <h2 className="form-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your registered email"
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
          <input
            type="submit"
            value="Submit"
            className="form-button"
          />
        </form>
        <div className="form-footer">
          Remembered your password?{" "}
          <a href="/loginpage" className="form-link">
            Login here
          </a>
        </div>
      </div>
      <style jsx>{`
        .form-container {
          background: #fff;
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          color: #222;
        }

        .form-title {
          font-size: 2rem;
          font-weight: 700;
          color: #00b058;
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.4rem;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1.5px solid #ccc;
          border-radius: 12px;
          font-size: 1rem;
          background: #f9f9f9;
          color: #111;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: #00b058;
          box-shadow: 0 0 5px rgba(0, 176, 88, 0.3);
        }

        .form-button {
          background: #00b058;
          color: #fff;
          padding: 0.75rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .form-button:hover {
          background: #00994a;
          transform: translateY(-1px);
        }

        .form-button:active {
          transform: scale(0.98);
        }

        .form-footer {
          margin-top: 1.5rem;
          text-align: center;
          color: #444;
        }

        .form-link {
          color: #00b058;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
        }

        .form-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .form-container {
            padding: 1.5rem;
            max-width: 90%;
          }

          .form-title {
            font-size: 1.8rem;
          }

          .form-input {
            padding: 0.65rem;
            font-size: 0.95rem;
          }

          .form-button {
            padding: 0.6rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
