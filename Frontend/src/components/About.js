import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function About({ user, onLogout, isAuthenticated }) {
  const [navCollapsed, setNavCollapsed] = useState(true);
  return (
    <div className="horizontal-layout">
      {/* Horizontal Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand">
            <i className="fas fa-download me-2"></i>DownloadHub
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setNavCollapsed(!navCollapsed)}
            aria-expanded={!navCollapsed}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${navCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="fas fa-home me-1"></i>Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  <i className="fas fa-th me-1"></i>Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                  <i className="fas fa-heart me-1"></i>Favorites
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/request" className="nav-link">
                  <i className="fas fa-paper-plane me-1"></i>Request
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link active">
                  <i className="fas fa-info-circle me-1"></i>About
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <>
                  <span className="text-white me-3">
                    <i className="fas fa-user-circle me-1"></i>{user?.username}
                  </span>
                  <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt me-1"></i>Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light btn-sm me-2">
                    <i className="fas fa-sign-in-alt me-1"></i>Login
                  </Link>
                  <Link to="/signup" className="btn btn-success btn-sm">
                    <i className="fas fa-user-plus me-1"></i>Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="page-content">
          <div className="container-fluid">
            <h2 className="mb-4">
              <i className="fas fa-info-circle me-2"></i>About DownloadHub
            </h2>

            {/* Hero Section */}
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center py-5">
                <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="mb-3">
                  <defs>
                    <linearGradient id="aboutLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="95" fill="url(#aboutLogoGrad)"/>
                  <g transform="translate(100, 60)">
                    <rect x="-8" y="0" width="16" height="60" fill="white" rx="4"/>
                    <path d="M -30 50 L 0 80 L 30 50 Z" fill="white"/>
                  </g>
                  <rect x="50" y="140" width="100" height="10" fill="white" rx="5"/>
                  <text x="100" y="180" fontFamily="Arial" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle">DH</text>
                </svg>
                <h3>Your Gateway to Premium Software & Games</h3>
                <p className="text-muted">Empowering users with access to the best digital content since 2024</p>
              </div>
            </div>

            <div className="row mb-4">
              {/* Mission */}
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h4 className="card-title">
                      <i className="fas fa-bullseye text-primary me-2"></i>Our Mission
                    </h4>
                    <p className="card-text">
                      To provide a comprehensive, user-friendly platform where users can discover, 
                      explore, and access premium software and games. We strive to make digital 
                      content accessible to everyone while maintaining the highest standards of quality.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h4 className="card-title">
                      <i className="fas fa-eye text-success me-2"></i>Our Vision
                    </h4>
                    <p className="card-text">
                      To become the world's most trusted platform for software and game distribution, 
                      fostering a community where technology enthusiasts can find everything they need 
                      in one place, backed by exceptional user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  <i className="fas fa-chart-line me-2"></i>Platform Statistics
                </h4>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <i className="fas fa-download fa-3x text-primary mb-2"></i>
                    <h3 className="mb-0">2.5M+</h3>
                    <small className="text-muted">Total Downloads</small>
                  </div>
                  <div className="col-md-3 mb-3">
                    <i className="fas fa-users fa-3x text-success mb-2"></i>
                    <h3 className="mb-0">150K+</h3>
                    <small className="text-muted">Active Users</small>
                  </div>
                  <div className="col-md-3 mb-3">
                    <i className="fas fa-box fa-3x text-warning mb-2"></i>
                    <h3 className="mb-0">24</h3>
                    <small className="text-muted">Software & Games</small>
                  </div>
                  <div className="col-md-3 mb-3">
                    <i className="fas fa-star fa-3x text-danger mb-2"></i>
                    <h3 className="mb-0">4.7</h3>
                    <small className="text-muted">Average Rating</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  <i className="fas fa-star me-2"></i>Key Features
                </h4>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                      <div>
                        <h6>Curated Collection</h6>
                        <small className="text-muted">Hand-picked premium software and games</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                      <div>
                        <h6>Fast Downloads</h6>
                        <small className="text-muted">High-speed servers for quick access</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                      <div>
                        <h6>Regular Updates</h6>
                        <small className="text-muted">Latest versions always available</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                      <div>
                        <h6>User Reviews</h6>
                        <small className="text-muted">Community-driven ratings & feedback</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                      <div>
                        <h6>Favorites System</h6>
                        <small className="text-muted">Save and organize your preferred items</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                      <div>
                        <h6>Request Feature</h6>
                        <small className="text-muted">Request new software or games</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  <i className="fas fa-envelope me-2"></i>Contact Us
                </h4>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-envelope text-primary me-2"></i>
                    <strong>Email:</strong> support@downloadhub.com
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-phone text-success me-2"></i>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-map-marker-alt text-danger me-2"></i>
                    <strong>Location:</strong> San Francisco, CA
                  </div>
                </div>
                <hr />
                <div className="text-center">
                  <p className="text-muted mb-2">Follow us on social media</p>
                  <button className="btn btn-outline-primary btn-sm me-2">
                    <i className="fab fa-facebook me-1"></i>Facebook
                  </button>
                  <button className="btn btn-outline-info btn-sm me-2">
                    <i className="fab fa-twitter me-1"></i>Twitter
                  </button>
                  <button className="btn btn-outline-danger btn-sm me-2">
                    <i className="fab fa-instagram me-1"></i>Instagram
                  </button>
                  <button className="btn btn-outline-dark btn-sm">
                    <i className="fab fa-github me-1"></i>GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default About;
