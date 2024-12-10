import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminNavbar.css'; 

const AdminNavbar = ({ isExpanded, toggleSidebar }) => {
  const adminId = localStorage.getItem('adminId'); // Retrieve adminId from localStorage

  return (
    <div className={`vertical-sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="sidebar-item toggle-button" 
        onClick={toggleSidebar}
      >
        <span className="sidebar-icon">≡</span>
        <span className="sidebar-text">Toggle</span>
      </div>
      <Link to={`/admin/${adminId}`} className="sidebar-item">
        <span className="sidebar-icon">🏠</span>
        <span className="sidebar-text">Home</span>
      </Link>
      <Link to={`/admin/${adminId}/manage-users`} className="sidebar-item">
        <span className="sidebar-icon">👤</span>
        <span className="sidebar-text">Manage Users</span>
      </Link>
      <Link to={`/admin/${adminId}/manage-artworks`} className="sidebar-item">
        <span className="sidebar-icon">🖼️</span>
        <span className="sidebar-text">Manage Artworks</span>
      </Link>
      <Link to={`/admin/${adminId}/site-settings`} className="sidebar-item">
        <span className="sidebar-icon">⚙️</span>
        <span className="sidebar-text">Site Settings</span>
      </Link>
      <Link to={`/admin/${adminId}/profile`} className="sidebar-item">
        <span className="sidebar-icon">profile</span>
        <span className="sidebar-text">Profile</span>
      </Link>
      <Link to="/login" className="sidebar-item">
        <span className="sidebar-icon">🔓</span>
        <span className="sidebar-text">Logout</span>
      </Link>
    </div>
  );
};

export default AdminNavbar;
