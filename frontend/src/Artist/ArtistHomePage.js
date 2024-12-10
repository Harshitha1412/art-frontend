import React from 'react';

const ArtistHomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Artist Dashboard</h1>
      <p style={styles.description}>Welcome to the Artist Dashboard where you can upload and manage your artworks.</p>
      <ul style={styles.list}>
        <li style={styles.listItem}><a href="/addartwork" style={styles.link}>Upload Artwork</a></li>
        <li style={styles.listItem}><a href="/manage-artwork" style={styles.link}>Manage Your Artworks</a></li>
        <li style={styles.listItem}><a href="/view-sales" style={styles.link}>View Sales</a></li>
      </ul>
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    margin: '10px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#0056b3',
  },
};

export default ArtistHomePage;
