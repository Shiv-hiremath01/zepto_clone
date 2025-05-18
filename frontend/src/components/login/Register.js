import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [registrationId, setRegistrationId] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      contactNumber: form.contactNumber.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      role: form.role.value,
    };

    const contactNumberPattern = /^[6-9]\d{9}$/;
    if (!contactNumberPattern.test(data.contactNumber)) {
      alert('Contact number must be 10 digits and start with 6, 7, 8, or 9');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      alert('Please enter a valid email address (e.g., user@domain.com)');
      return;
    }

    const res = await fetch('http://15.207.17.186:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const data1 = await res.json();
    console.log("Registration Data:", data1);

    if (data1?.success) {
      setRegistrationId(data1.registrationId);
      setShowOTP(true);
    } else {
      alert(data1.message || 'Registration failed');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://15.207.17.186:5000/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationId, otp }),
    });

    const dataress = await res.json();
    if (dataress.success) {
      alert(dataress.message);
      navigate('/login');
    } else {
      alert(dataress.message || 'OTP verification failed');
    }
  };

  return (
    <div className="custom-wrapper">
      <div className="custom-form-container">
        <h2 className="custom-form-title">{showOTP ? 'Verify OTP' : 'Register'}</h2>
        {!showOTP ? (
          <form onSubmit={handleSubmit} className="custom-form-content">
            <div className="custom-form-group">
              <label htmlFor="firstName" className="custom-form-label">First Name</label>
              <input type="text" id="firstName" name="firstName" required className="custom-form-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="lastName" className="custom-form-label">Last Name</label>
              <input type="text" id="lastName" name="lastName" required className="custom-form-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="email" className="custom-form-label">Email</label>
              <input type="email" id="email" name="email" required className="custom-form-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="contactNumber" className="custom-form-label">Contact Number</label>
              <input type="tel" id="contactNumber" name="contactNumber" required className="custom-form-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="password" className="custom-form-label">Password</label>
              <input type="password" id="password" name="password" required className="custom-form-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="confirmPassword" className="custom-form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required className="custom-form-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="role" className="custom-form-label">Role</label>
              <select id="role" name="role" required className="custom-form-input">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <button type="submit" className="custom-form-button">Register</button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="custom-form-content">
            <div className="custom-form-group">
              <label htmlFor="otp" className="custom-form-label">Enter OTP</label>
              <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required className="custom-form-input" />
            </div>
            <button type="submit" className="custom-form-button">Verify OTP</button>
          </form>
        )}
        <div className="custom-form-footer">
          Already have an account? <a href="/login" className="custom-form-link">Login here</a>
        </div>
      </div>

      <style>{`
        .custom-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          /* Background removed */
        }

        .custom-form-container {
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

        .custom-form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .custom-form-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
        }

        .custom-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .custom-form-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: #333333;
        }

        .custom-form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          background: #f9f9f9;
          color: #333333;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .custom-form-input:focus {
          outline: none;
          border-color: #7e22ce;
          box-shadow: 0 0 8px rgba(126, 34, 206, 0.3);
        }

        .custom-form-button {
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

        .custom-form-button:hover {
          background: #6b21a8;
          transform: scale(1.02);
        }

        .custom-form-button:active {
          transform: scale(0.98);
        }

        .custom-form-footer {
          margin-top: 1.25rem;
          text-align: center;
          font-size: 0.9rem;
          color: #666666;
        }

        .custom-form-link {
          color: #7e22ce;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }

        .custom-form-link:hover {
          color: #6b21a8;
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .custom-form-container {
            padding: 1.5rem;
            max-width: 90%;
          }

          .custom-form-title {
            font-size: 1.5rem;
          }

          .custom-form-input {
            padding: 0.65rem;
            font-size: 0.95rem;
          }

          .custom-form-button {
            padding: 0.65rem;
            font-size: 0.95rem;
          }

          .custom-form-footer {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
