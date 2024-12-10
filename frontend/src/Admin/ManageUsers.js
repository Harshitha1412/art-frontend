import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch users data here
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', dateJoined: '2024-01-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', dateJoined: '2024-01-02' },
      // Add more mock users
    ]);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkAction = (action) => {
    // Implement bulk action (delete, deactivate, change role, etc.)
    console.log(`Bulk action: ${action} for users ${selectedUsers}`);
  };

  return (
    <div className="page-content">
      <h1>Manage Users</h1>
      <p>Here you can view, edit, and manage users.</p>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={(e) => console.log(`Filtering by ${e.target.value}`)}>
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          {/* Add more roles */}
        </select>
      </div>

      {/* Bulk Actions */}
      <div className="bulk-actions">
        <button onClick={() => handleBulkAction('delete')}>Delete Selected</button>
        <button onClick={() => handleBulkAction('deactivate')}>Deactivate Selected</button>
        <button onClick={() => handleBulkAction('change-role')}>Change Role</button>
      </div>

      {/* User List */}
      <table className="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={(e) => setSelectedUsers(e.target.checked ? users.map(u => u.id) : [])} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelect(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.dateJoined}</td>
              <td>
                <button onClick={() => console.log(`Viewing ${user.name}`)}>View</button>
                <button onClick={() => console.log(`Editing ${user.name}`)}>Edit</button>
                <button onClick={() => console.log(`Deleting ${user.name}`)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
