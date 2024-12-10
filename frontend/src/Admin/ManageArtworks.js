import React, { useState } from 'react';
import '../styles/ManageArtworks.css';

const ManageArtworks = () => {
  // Sample data for artworks
  const [artworks, setArtworks] = useState([
    { id: 1, title: 'Starry Night', artist: 'Vincent van Gogh', date: '1889', status: 'Approved' },
    { id: 2, title: 'The Scream', artist: 'Edvard Munch', date: '1893', status: 'Pending' },
    { id: 3, title: 'Mona Lisa', artist: 'Leonardo da Vinci', date: '1503', status: 'Approved' },
    // Add more artworks as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtworks = artworks.filter(artwork => 
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-content">
      <h1>Manage Artworks</h1>
      <p>Here you can view, add, edit, or delete artworks in the gallery.</p>

      <div className="artwork-controls">
        <input
          type="text"
          placeholder="Search artworks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button className="add-artwork-btn">Add New Artwork</button>
      </div>

      <table className="artwork-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredArtworks.map(artwork => (
            <tr key={artwork.id}>
              <td><img src={`path/to/thumbnail/${artwork.id}`} alt={artwork.title} className="artwork-thumbnail" /></td>
              <td>{artwork.title}</td>
              <td>{artwork.artist}</td>
              <td>{artwork.date}</td>
              <td>{artwork.status}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageArtworks;
