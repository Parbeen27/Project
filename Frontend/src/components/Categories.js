import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { softwareData, gamesData } from '../data/items';

function Categories({ user, onLogout, toggleFavorite, isFavorite, isAuthenticated }) {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('software');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('downloads');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const currentData = activeTab === 'software' ? softwareData : gamesData;

  // Get unique categories
  const categories = ['all', ...new Set(currentData.map(item => item.category))];

  // Filter and sort data
  const filteredData = currentData
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

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
            <Link to="/categories" className="nav-link-mobile active">
              <i className="fas fa-th"></i>
              <span>Browse</span>
            </Link>
            <Link to="/favorites" className="nav-link-mobile">
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
            <h2 className="mb-4"><i className="fas fa-th me-2"></i>Browse Categories</h2>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'software' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('software'); setSelectedCategory('all'); }}
                >
                  <i className="fas fa-laptop-code me-2"></i>Software
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'games' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('games'); setSelectedCategory('all'); }}
                >
                  <i className="fas fa-gamepad me-2"></i>Games
                </button>
              </li>
            </ul>

            {/* Filters */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <select 
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="downloads">Sort by Downloads</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-3">
              <p className="text-muted">
                Showing {filteredData.length} {activeTab === 'software' ? 'software' : 'games'}
              </p>
            </div>

            {/* Items Grid */}
            {filteredData.length > 0 ? (
              <div className="row">
                {filteredData.map(item => (
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
                            className={`btn btn-sm ${isFavorite(item.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => toggleFavorite(item)}
                          >
                            <i className="fas fa-heart"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info text-center">
                <i className="fas fa-search fa-3x mb-3 d-block"></i>
                <h4>No items found</h4>
                <p>Try adjusting your search or filters</p>
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

export default Categories;
