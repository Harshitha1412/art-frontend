import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import AdminNavbar from '../components/AdminNavbar';

const AdminHomePage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div 
        className="dashboard-content" 
        style={{ marginLeft: isSidebarExpanded ? '200px' : '60px' }}
      >
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Dashboard where you can manage users, artworks, and permissions.</p>

        {/* Dashboard Overview */}
        <div className="dashboard-overview">
          <h2>Overview</h2>
          <div className="dashboard-stats">
            <div className="stat">
              <h3>Total Users</h3>
              <p>10</p> 
            </div>
            <div className="stat">
              <h3>Active Sessions</h3>
              <p>45</p> 
            </div>
            <div className="stat">
              <h3>Artworks Published</h3>
              <p>8</p> 
            </div>
            <div className="stat">
              <h3>Pending Approvals</h3>
              <p>4</p> 
            </div>
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default AdminHomePage;
