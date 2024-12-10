import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ArtistNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [artistId, setArtistId] = useState(null); // Store artistId from localStorage
  const [role, setRole] = useState(null); // Store role from localStorage
  const navigate = useNavigate();

  // Fetch user data from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check for authentication token
    const storedArtistId = localStorage.getItem('artistId'); // Fetch artistId from localStorage
    const storedRole = localStorage.getItem('role'); // Fetch role from localStorage
    setIsAuthenticated(!!token); // Set authentication state
    setArtistId(storedArtistId); // Set artistId
    setRole(storedRole); // Set role
  }, []);

  // Handle logout and clear user data from localStorage
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.clear();
  
    // Update state
    setIsAuthenticated(false);
    setArtistId(null);
    setRole(null);
  
    // Redirect to login page using absolute URL
    window.location.href = 'http://localhost:3000/login';
  };
  

  // If not authenticated or artistId is not available, show login prompt
  if (!isAuthenticated || !artistId) {
    return (
      <div style={{ color: 'white', textAlign: 'center' }}>
        Please log in to access the artist dashboard.
      </div>
    );
  }

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to={`/artist/${artistId}`} style={styles.navLink}>Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to={`/artist/${artistId}/myartworks`} style={styles.navLink}>My Artworks</Link>
        </li>
        <li style={styles.navItem}>
          <Link to={`/artist/${artistId}/addartwork`} style={styles.navLink}>Upload Artwork</Link>
        </li>
        <li style={styles.navItem}>
          <Link to={`/artist/${artistId}/profile`} style={styles.navLink}>Profile</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="#" onClick={handleLogout} style={styles.navLink}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '15px',
    borderBottom: '2px solid #444',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s, transform 0.2s',
  },
  navLinkHover: {
    color: '#ffcc00',
  }
};

export default ArtistNavbar;
