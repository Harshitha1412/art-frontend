import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      setErrorMessage('Please select a role.');
      return;
    }

    const loginData = { username, password, role };
    let loginUrl = '';

    // Determine the login URL based on the selected role
    switch (role) {
      case 'ADMIN':
        loginUrl = 'http://localhost:8080/api/admin/login';
        break;
      case 'ARTIST':
        loginUrl = 'http://localhost:8080/api/artists/login';
        break;
      case 'CURATOR':
        loginUrl = 'http://localhost:8080/api/curators/login';
        break;
      case 'VISITOR':
        loginUrl = 'http://localhost:8080/api/login';
        break;
      default:
        setErrorMessage('Invalid role');
        return;
    }

    try {
      const response = await axios.post(loginUrl, loginData);
      console.log('Login Response:', response.data);  // Log the full response

      const { role: responseRole, userId, artistId, curatorId, adminId, message } = response.data;

      // Check if the response contains relevant IDs and role
      if (userId || artistId || curatorId || adminId) {
        // Store the specific ID based on the role in localStorage
        localStorage.setItem('authToken', 'valid-auth-token'); // Mock token for authentication
        localStorage.setItem('role', responseRole);  // Storing the role

        // Store ID based on role
        if (responseRole === 'ADMIN') {
          localStorage.setItem('adminId', adminId);  // Storing adminId
        } else if (responseRole === 'ARTIST') {
          localStorage.setItem('artistId', artistId);  // Storing artistId
        } else if (responseRole === 'CURATOR') {
          localStorage.setItem('curatorId', curatorId);  // Storing curatorId
        } else if (responseRole === 'VISITOR') {
          localStorage.setItem('userId', userId);  // Storing userId for visitors
        }

        // Log localStorage values to ensure they are set
        console.log('LocalStorage role:', localStorage.getItem('role'));
        console.log('LocalStorage ID:', responseRole === 'ADMIN' ? localStorage.getItem('adminId') :
                                    responseRole === 'ARTIST' ? localStorage.getItem('artistId') :
                                    responseRole === 'CURATOR' ? localStorage.getItem('curatorId') :
                                    localStorage.getItem('userId'));

        // Redirect user based on role
        switch (responseRole) {
          case 'ADMIN':
            setTimeout(() => {
              window.location.href = `/admin/${adminId}`; // Redirect to admin page with adminId
            }, 3000); 
            break;
          case 'ARTIST':
            setTimeout(() => {
              window.location.href = `/artist/${artistId}`; // Redirect to artist page with artistId
            }, 3000); 
            break;
          case 'VISITOR':
            setTimeout(() => {
              window.location.href = `/${userId}`; // Redirect to visitor page with userId
            }, 3000); 
            break;
          case 'CURATOR':
            setTimeout(() => {
              window.location.href = `/curator/${curatorId}`; // Redirect to curator page with curatorId
            }, 3000); 
            break;
          default:
            setTimeout(() => {
              window.location.href = '/login'; // Fallback to login page
            }, 3000); // 3 seconds delay
            break;
        }
        
      } else {
        setErrorMessage(message || 'Login failed. No user ID received.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <h2 style={{ color: 'white', fontSize: '30px', textAlign: 'center' }}>Login</h2>
          <label style={{ color: 'white', fontSize: '15px' }}>Username</label>
          <input
            type="text"
            style={{ backgroundColor: 'white', color: 'black' }}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: 'white', fontSize: '15px' }}>Password</label>
          <input
            type="password"
            style={{ backgroundColor: 'white', color: 'black' }}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: 'white', fontSize: '15px' }}>Role</label>
          <select
            style={{ backgroundColor: 'white', color: 'black' }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="ADMIN">Admin</option>
            <option value="ARTIST">Artist</option>
            <option value="VISITOR">Visitor</option>
            <option value="CURATOR">Curator</option>
          </select>
        </div>
        {errorMessage && (
          <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
            {errorMessage}
          </p>
        )}
        <div className="login-button">
          <button type="submit">
            <span style={{ fontWeight: 'bold' }}>LOGIN</span>
          </button>
        </div>
        <p style={{ marginTop: '10px', color: 'white' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: 'lightblue' }}>
            Create one here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
