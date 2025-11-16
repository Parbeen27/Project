import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/login', {
        identifier: formData.identifier,
        password: formData.password
      });

      // Backend returns {message, user}
      if (response.data.user) {
        onLogin(response.data.user);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.detail || 
        'Unable to connect to server. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-4">
          <svg width="80" height="80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="95" fill="url(#logoGrad)"/>
            <g transform="translate(100, 60)">
              <rect x="-8" y="0" width="16" height="60" fill="white" rx="4"/>
              <path d="M -30 50 L 0 80 L 30 50 Z" fill="white"/>
            </g>
            <rect x="50" y="140" width="100" height="10" fill="white" rx="5"/>
            <text x="100" y="180" fontFamily="Arial" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle">DH</text>
          </svg>
          <h2 className="mt-3">Welcome Back</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle me-2"></i>{error}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="identifier" className="form-label">Username or Email</label>
            <input
              type="text"
              className="form-control"
              id="identifier"
              name="identifier"
              placeholder="Enter username or email"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>Login
              </>
            )}
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="#forgot" className="d-block mb-2">Forgot Password?</a>
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
