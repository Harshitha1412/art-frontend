import React, { useState } from 'react';
import axios from 'axios';  // Import axios for HTTP requests
import '../styles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('VISITOR'); // Default role
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters, include one uppercase letter, one number, and one special character.'
      );
      return;
    }

   
    setErrorMessage('');

   
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);

  
    let registerUrl = '';
    if (role === 'ADMIN') {
      registerUrl = 'http://localhost:8080/api/admin/register';
    } else if (role === 'ARTIST') {
      registerUrl = 'http://localhost:8080/api/artists/register';
    } else if (role === 'CURATOR') {
      registerUrl = 'http://localhost:8080/api/curators/register';
    } else {
      registerUrl = 'http://localhost:8080/api/register'; // For default visitor role
    }

    try {
      
      const response = await axios.post(registerUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    
      if (response.status === 200) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
        }, 2000); // 2-second delay for the user to see the success message
      }
    } catch (error) {
      // Handle error response from the backend
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            style={{ backgroundColor: 'white', color: 'black' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            style={{ backgroundColor: 'white', color: 'black' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            style={{ backgroundColor: 'white', color: 'black' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            style={{ backgroundColor: 'white', color: 'black' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Role</label>
          <select
            style={{ backgroundColor: 'white', color: 'black' }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">Admin</option>
            <option value="ARTIST">Artist</option>
            <option value="VISITOR">Visitor</option>
            <option value="CURATOR">Curator</option>
          </select>
        </div>
        <button type="submit">
          <span style={{ fontWeight: 'bold' }}>REGISTER</span>
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <p style={{ marginTop: '10px', color: 'white' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: 'lightblue' }}>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
