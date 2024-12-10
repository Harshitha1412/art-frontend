import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import '../styles/SiteSettings.css';

const SiteSettings = () => {
  // State placeholders for settings; can be updated based on actual requirements.
  const [siteName, setSiteName] = useState('');
  const [tagline, setTagline] = useState('');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div className="page-content">
      <h1>Site Settings</h1>
      <p>Here you can adjust the site settings and permissions.</p>

      {/* General Settings */}
      <section className="settings-section">
        <h2>General Settings</h2>
        <label>
          Site Name:
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </label>
        <label>
          Tagline:
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </label>
        <label>
          Default Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            {/* Add more language options as needed */}
          </select>
        </label>
        <label>
          Time Zone:
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            <option value="UTC">UTC</option>
            <option value="GMT">GMT</option>
            {/* Add more time zones as needed */}
          </select>
        </label>
      </section>

      {/* Appearance Settings */}
      <section className="settings-section">
        <h2>Appearance</h2>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            {/* Add more theme options if available */}
          </select>
        </label>
        <label>
          Logo:
          <input type="file" />
        </label>
        <label>
          Favicon:
          <input type="file" />
        </label>
      </section>

      {/* User and Access Management */}
      <section className="settings-section">
        <h2>User and Access Management</h2>
        <label>
          Enable Notifications:
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </label>
        <label>
          Default Role for New Users:
          <select>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            {/* More roles as required */}
          </select>
        </label>
        <label>
          Two-Factor Authentication (2FA):
          <input type="checkbox" />
        </label>
      </section>

      <section className="settings-section">
        <h2>Security Settings</h2>
        <label>
          Password Strength:
          <select>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Enable SSL/TLS:
          <input type="checkbox" />
        </label>
        <label>
          Limit Login Attempts:
          <input type="number" placeholder="Max attempts" />
        </label>
      </section>

     
      <section className="settings-section">
        <h2>Integrations</h2>
        <label>
          Google Analytics ID:
          <input type="text" placeholder="UA-XXXXX-Y" />
        </label>
        <label>
          Facebook Pixel ID:
          <input type="text" />
        </label>
        {/* Add more integration options as needed */}
      </section>

      {/* Save Settings Button */}
      <button onClick={() => console.log('Settings saved')}>Save Settings</button>
    </div>
  );
};

export default SiteSettings;
