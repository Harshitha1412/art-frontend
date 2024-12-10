import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CuratorNavbar = () => {
  const location = useLocation();
  const [curatorid, setCuratorId] = useState(null); // State to store curator ID

  // Fetch curator ID from localStorage when the component mounts
  useEffect(() => {
    const storedCuratorId = localStorage.getItem('curatorId');
    setCuratorId(storedCuratorId);
  }, []);

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  // If curator ID is not available, prompt user to log in
  if (!curatorid) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
        Please log in to access the curator dashboard.
      </div>
    );
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.curatorInfo}>
        <p>Welcome, Curator ID: {curatorid}</p>
      </div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to={`/curator/${curatorid}`} style={isActive(`/curator/${curatorid}`) ? styles.activeNavLink : styles.navLink}>Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to={`/curator/${curatorid}/exhibition-highlights`} style={isActive(`/curator/${curatorid}/exhibition-highlights`) ? styles.activeNavLink : styles.navLink}>All Exhibitions</Link>
        </li>
  
        <li style={styles.navItem}>
          <Link to={`/curator/${curatorid}/manage-artworks`} style={isActive(`/curator/${curatorid}/manage-artworks`) ? styles.activeNavLink : styles.navLink}>Manage Artworks</Link>
        </li>
        <li style={styles.navItem}>
          <Link to={`/curator/${curatorid}/organize-exhibitions`} style={isActive(`/curator/${curatorid}/organize-exhibitions`) ? styles.activeNavLink : styles.navLink}>Organize Exhibition</Link>
        </li>
        <li style={styles.navItem}>
          <Link to={`/curator/${curatorid}/profile`} style={isActive(`/curator/${curatorid}/profile`) ? styles.activeNavLink : styles.navLink}>Profile</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={isActive("/login") ? styles.activeNavLink : styles.navLink}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: '#fff',
    borderBottom: '2px solid #444',
  },
  curatorInfo: {
    textAlign: 'center',
    color: '#ffcc00',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  activeNavLink: {
    color: '#ffcc00',
    fontSize: '16px',
    fontWeight: '600',
  },
};

export default CuratorNavbar;
