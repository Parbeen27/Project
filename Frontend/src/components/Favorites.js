import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites({ user, onLogout, favorites, toggleFavorite, isAuthenticated }) {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star text-warning"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-warning"></i>);
      }
    }
    return stars;
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
            <Link to="/favorites" className="nav-link-mobile active">
              <i className="fas fa-heart"></i>
              <span>Favorites</span>
            </Link>
            <Link to="/request" className="nav-link-mobile">
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
              <i className="fas fa-heart me-2 text-danger"></i>My Favorites
            </h2>

            {!isAuthenticated ? (
              <div className="text-center py-5">
                <i className="fas fa-lock fa-5x text-muted mb-4"></i>
                <h3 className="text-muted">Login Required</h3>
                <p className="text-muted mb-4">Please login to view and manage your favorites!</p>
                <Link to="/login" className="btn btn-primary me-2">
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
                <Link to="/signup" className="btn btn-success">
                  <i className="fas fa-user-plus me-2"></i>Sign Up
                </Link>
              </div>
            ) : favorites && favorites.length > 0 ? (
              <>
                <div className="alert alert-info mb-4">
                  <i className="fas fa-info-circle me-2"></i>
                  You have {favorites.length} favorite {favorites.length === 1 ? 'item' : 'items'}
                </div>

                <div className="row">
                  {favorites.map(item => (
                    <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100 shadow-sm">
                        <img src={item.image} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text text-muted small">{item.category}</p>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>{renderStars(item.rating)}</div>
                            <span className="badge bg-primary">{item.rating}</span>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">
                              <i className="fas fa-download me-1"></i>{item.downloads.toLocaleString()} downloads
                            </small>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">
                              <i className="fas fa-hdd me-1"></i>{item.size} | v{item.version}
                            </small>
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-primary btn-sm flex-grow-1">
                              <i className="fas fa-download me-1"></i>Download
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => toggleFavorite(item)}
                              title="Remove from favorites"
                            >
                              <i className="fas fa-heart-broken"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-heart-broken fa-5x text-muted mb-4"></i>
                <h3 className="text-muted">No Favorites Yet</h3>
                <p className="text-muted mb-4">Start adding items to your favorites to see them here!</p>
                <Link to="/categories" className="btn btn-primary">
                  <i className="fas fa-th me-2"></i>Browse Categories
                </Link>
              </div>
            )}
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

export default Favorites;
