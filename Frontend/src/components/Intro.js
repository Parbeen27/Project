import React from 'react';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <div className="logo-box">
          <div className="logo">
            <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="95" fill="url(#grad1)"/>
              <g transform="translate(100, 60)">
                <rect x="-8" y="0" width="16" height="60" fill="white" rx="4"/>
                <path d="M -30 50 L 0 80 L 30 50 Z" fill="white"/>
              </g>
              <rect x="50" y="140" width="100" height="10" fill="white" rx="5"/>
              <text x="100" y="180" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle">DH</text>
            </svg>
          </div>
          <h1 className="brand-name">DownloadHub</h1>
          <p className="text-muted mb-0">Your Gateway to Premium Software & Games</p>
        </div>
        <div className="action-buttons">
          <Link to="/login" className="btn btn-primary btn-lg mx-2 px-5">
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg mx-2 px-5">
            <i className="fas fa-user-plus me-2"></i>Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Intro;
