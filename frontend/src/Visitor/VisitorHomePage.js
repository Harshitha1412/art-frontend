import React from 'react';
import '../styles/VisitorHomePage.css';

const VisitorHomePage = () => {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/explore-gallery">Explore Artworks</a></li>
          <li><a href="/virtual-tours">Virtual Tours</a></li>
          <li><a href="/purchase-art">Purchase Art</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
      <div className="homepage-content">
        <h1>Welcome to the Virtual Art Gallery</h1>
        <p>Explore the latest artworks and exhibitions, and discover new artists!</p>
        <ul>
          <li><a href="/explore-gallery" className="btn">Explore Artworks</a></li>
          <li><a href="/virtual-tours" className="btn">Join Virtual Tours</a></li>
          <li><a href="/purchase-art" className="btn">Purchase Art</a></li>
        </ul>
      </div>
    </div>
  );
};

export default VisitorHomePage;
