import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Request({ user, onLogout, isAuthenticated }) {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    type: 'software',
    description: '',
    urgency: 'normal'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        itemName: '',
        category: '',
        type: 'software',
        description: '',
        urgency: 'normal'
      });
    }, 3000);
  };

  return (
    <div className="horizontal-layout">
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top desktop-navbar">
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand">
            <i className="fas fa-download me-2"></i>DownloadHub
          </Link>
          <div className="d-flex align-items-center ms-auto">
            <Link to="/dashboard" className="nav-link text-white me-3">
              <i className="fas fa-home me-1"></i>Dashboard
            </Link>
            <Link to="/categories" className="nav-link text-white me-3">
              <i className="fas fa-th me-1"></i>Categories
            </Link>
            <Link to="/favorites" className="nav-link text-white me-3">
              <i className="fas fa-heart me-1"></i>Favorites
            </Link>
            <Link to="/request" className="nav-link text-white me-3">
              <i className="fas fa-paper-plane me-1"></i>Request
            </Link>
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
      </nav>

      {/* Mobile Header with Brand Name */}
      <div className="mobile-header">
        <h1 className="mobile-brand">DownloadHub</h1>
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="mobile-navbar">
        <div className="container-fluid">
          <div className="navbar-nav-mobile">
            <Link to="/dashboard" className="nav-link-mobile">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link to="/categories" className="nav-link-mobile">
              <i className="fas fa-th"></i>
              <span>Browse</span>
            </Link>
            <Link to="/favorites" className="nav-link-mobile">
              <i className="fas fa-heart"></i>
              <span>Favorites</span>
            </Link>
            <Link to="/request" className="nav-link-mobile active">
              <i className="fas fa-paper-plane"></i>
              <span>Request</span>
            </Link>
            {isAuthenticated ? (
              <button className="nav-link-mobile" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="nav-link-mobile">
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="page-content">
          <div className="container-fluid">
            <h2 className="mb-4">
              <i className="fas fa-paper-plane me-2"></i>Request New Content
            </h2>

            <div className="row">
              <div className="col-lg-8">
                {submitted ? (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle fa-2x mb-3 d-block"></i>
                    <h4>Request Submitted Successfully!</h4>
                    <p>Thank you for your request. We'll review it and add the content soon.</p>
                  </div>
                ) : (
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="itemName" className="form-label">
                            <i className="fas fa-tag me-2"></i>Item Name *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="itemName"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleChange}
                            placeholder="e.g., Adobe Photoshop 2025, GTA VI"
                            required
                          />
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="type" className="form-label">
                              <i className="fas fa-layer-group me-2"></i>Type *
                            </label>
                            <select
                              className="form-select"
                              id="type"
                              name="type"
                              value={formData.type}
                              onChange={handleChange}
                              required
                            >
                              <option value="software">Software</option>
                              <option value="game">Game</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="category" className="form-label">
                              <i className="fas fa-folder me-2"></i>Category *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              placeholder="e.g., Design & Creativity, RPG"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="urgency" className="form-label">
                            <i className="fas fa-exclamation-circle me-2"></i>Priority
                          </label>
                          <select
                            className="form-select"
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                          >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="description" className="form-label">
                            <i className="fas fa-align-left me-2"></i>Additional Details
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide any additional information about your request (version, features, etc.)"
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg w-100">
                          <i className="fas fa-paper-plane me-2"></i>Submit Request
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-4">
                <div className="card shadow-sm bg-light">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-info-circle me-2"></i>Request Guidelines
                    </h5>
                    <ul className="small">
                      <li className="mb-2">Please be specific with software/game names</li>
                      <li className="mb-2">Include version numbers if possible</li>
                      <li className="mb-2">Check if the item already exists before requesting</li>
                      <li className="mb-2">We process requests within 2-5 business days</li>
                      <li className="mb-2">Popular requests get priority</li>
                    </ul>
                  </div>
                </div>

                <div className="card shadow-sm mt-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-chart-bar me-2"></i>Statistics
                    </h5>
                    <div className="mb-2">
                      <small className="text-muted">Total Requests This Month</small>
                      <h4 className="mb-0">247</h4>
                    </div>
                    <hr />
                    <div className="mb-2">
                      <small className="text-muted">Fulfilled Requests</small>
                      <h4 className="mb-0 text-success">189</h4>
                    </div>
                    <hr />
                    <div>
                      <small className="text-muted">Average Processing Time</small>
                      <h4 className="mb-0 text-info">3 days</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Footer with About Link */}
        <footer className="page-footer">
          <div className="container-fluid text-center">
            <Link to="/about" className="footer-link">
              <i className="fas fa-info-circle me-2"></i>About DownloadHub
            </Link>
            <p className="text-muted mt-2 mb-0">&copy; 2024 DownloadHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Request;
