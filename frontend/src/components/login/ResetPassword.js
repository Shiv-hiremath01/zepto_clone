// import React, { useState } from "react";
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [role, setRole] = useState('user');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmNewPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const res = await fetch('http://15.207.17.186:5000/auth/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ newPassword, token, role }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       alert(data.message);
//     } else {
//       alert(data.message || 'Password reset failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="hidden" name="token" value={token} />
//         <div className="input-group">
//           <label htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             id="newPassword"
//             name="newPassword"
//             placeholder="Enter your new password"
//             required
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="confirmNewPassword">Confirm New Password</label>
//           <input
//             type="password"
//             id="confirmNewPassword"
//             name="confirmNewPassword"
//             placeholder="Confirm your new password"
//             required
//             value={confirmNewPassword}
//             onChange={(e) => setConfirmNewPassword(e.target.value)}
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="role">Role</label>
//           <select
//             id="role"
//             name="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//             <option value="vendor">Vendor</option>
//           </select>
//         </div>
//         <input type="submit" value="Reset Password" />
//       </form>
//     </div>



import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { role, email } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!role || !email) {
      alert("Missing role or email. Please try the forgot password process again.");
      return;
    }

    const res = await fetch('http://15.207.17.186:5000/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword, token, role }),
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      navigate('/loginpage');
    } else {
      alert(data.message || 'Password reset failed');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="form-heading">Reset Password</h2>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-field">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email || ''}
              readOnly
              className="input read-only"
            />
          </div>
          <div className="form-field">
            <label htmlFor="role" className="label">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={role || ''}
              readOnly
              className="input read-only"
            />
          </div>
          <div className="form-field">
            <label htmlFor="newPassword" className="label">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="confirmNewPassword" className="label">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm your new password"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="input"
            />
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="submit-btn"
          />
        </form>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f5f5;
          padding: 1rem;
        }

        .form-box {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .form-heading {
          font-size: 1.75rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .form-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-size: 0.95rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .input {
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 1.5px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          color: #333;
          transition: border-color 0.3s ease;
        }

        .input:focus {
          outline: none;
          border-color: #00b386;
          box-shadow: 0 0 0 2px rgba(0, 179, 134, 0.2);
        }

        .read-only {
          background-color: #f1f1f1;
          color: #888;
          cursor: not-allowed;
        }

        .submit-btn {
          background-color: #00b386;
          color: #fff;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }

        .submit-btn:hover {
          background-color: #009e74;
          transform: scale(1.01);
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 480px) {
          .form-box {
            padding: 1.5rem;
          }

          .form-heading {
            font-size: 1.5rem;
          }

          .submit-btn {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;

//   );
// };

// export default ResetPassword;
