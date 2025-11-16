import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

// Components
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import Request from './components/Request';
import About from './components/About';
import Favorites from './components/Favorites';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  // Load user and favorites from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
      // Load favorites for this user
      loadFavorites(userData.id);
    }
  }, []);

  // Load favorites from backend
  const loadFavorites = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/favorites/${userId}`);
      setFavorites(response.data.favorites || []);
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Load user's favorites
    loadFavorites(userData.id);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('user');
  };

  const toggleFavorite = async (item) => {
    // Check if user is logged in
    if (!isAuthenticated || !user) {
      alert('Please login to add items to favorites!');
      return;
    }

    try {
      const exists = favorites.find(fav => fav.id === item.id);
      
      if (exists) {
        // Remove from favorites
        await axios.delete(`http://localhost:8000/favorites/${user.id}/${item.id}`);
        setFavorites(prev => prev.filter(fav => fav.id !== item.id));
      } else {
        // Add to favorites - send item_id as string and full item object as item_data
        await axios.post(`http://localhost:8000/favorites/${user.id}`, {
          item_id: String(item.id),
          item_data: {
            id: item.id,
            name: item.name,
            category: item.category,
            rating: item.rating,
            downloads: item.downloads,
            size: item.size,
            version: item.version,
            image: item.image
          }
        });
        setFavorites(prev => [...prev, item]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      console.error('Error details:', err.response?.data);
      alert('Failed to update favorites. Please try again.');
    }
  };

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.id === itemId);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} toggleFavorite={toggleFavorite} isFavorite={isFavorite} isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} toggleFavorite={toggleFavorite} isFavorite={isFavorite} isAuthenticated={isAuthenticated} />} />
          <Route path="/categories" element={<Categories user={user} onLogout={handleLogout} toggleFavorite={toggleFavorite} isFavorite={isFavorite} isAuthenticated={isAuthenticated} />} />
          <Route path="/favorites" element={<Favorites user={user} onLogout={handleLogout} favorites={favorites} toggleFavorite={toggleFavorite} isAuthenticated={isAuthenticated} />} />
          <Route path="/request" element={<Request user={user} onLogout={handleLogout} isAuthenticated={isAuthenticated} />} />
          <Route path="/about" element={<About user={user} onLogout={handleLogout} isAuthenticated={isAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
