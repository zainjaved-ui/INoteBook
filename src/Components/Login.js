import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // import css file

const Login = ({ showAlert }) => {
  const [Credential, setCredential] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: Credential.email, password: Credential.password }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      showAlert("Logged in successfully ✅", "success");
      navigate('/');
    } else {
      showAlert("Invalid credentials ❌", "danger");
    }
  };

  const handleChange = (e) => {
    setCredential({ ...Credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg">
        <h2 className="text-center mb-4">Welcome Back 👋</h2>
        <p className="text-center text-muted">Login to continue to <b>iNotebook</b></p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control modern-input"
              value={Credential.email}
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We’ll never share your email with anyone.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control modern-input"
              value={Credential.password}
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn login-btn w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
