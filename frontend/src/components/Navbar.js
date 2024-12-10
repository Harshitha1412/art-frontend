import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Store userId from localStorage
  const [role, setRole] = useState(null); // Store role from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check for authentication token
    const storedUserId = localStorage.getItem('userId'); // Fetch userId from localStorage
    const storedRole = localStorage.getItem('role'); // Fetch role from localStorage
    setIsAuthenticated(!!token); // Set authentication state
    setUserId(storedUserId); // Set userId
    setRole(storedRole); // Set role
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove auth token
    localStorage.removeItem('userId'); // Remove userId
    localStorage.removeItem('role'); // Remove role
    setIsAuthenticated(false); // Update state
    setUserId(null); // Clear userId
    setRole(null); // Clear role
    navigate('/login'); // Redirect to home
  };

  // Only apply dynamic link for 'profile', leave the rest as static
  const dynamicLink = (path) => {
    if (!userId || !role ||  path === 'about') {
      return `/${userId}/${path}`; // Static paths for home, artworks, cart, about
    }
    return `/${role.toLowerCase()}/${userId}/${path}`; // Dynamic path for profile
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" style={{ color: 'white' }}>Art Gallery</div>
      <div className="navbar-links">
      <Link to={`/${userId}/`}>Home</Link>

<Link to={`/${userId}/artworks`}>Artworks</Link>

<Link to={`/${userId}/cart`}>cart</Link>
        <Link to={dynamicLink('about')}>About</Link>
        {isAuthenticated && userId ? (
          <>
            {/* Profile link with dynamic path */}
            <Link to={dynamicLink('profile')}>
              <img
                src="/default-profile.png" // Replace with actual profile image if available
                alt="Profile"
                className="navbar-profile-image"
              />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login/Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
