import React, { useEffect, useState } from 'react';
import '../styles/MyArtworks.css';

export default function MyArtworks() {
  const [artworks, setArtworks] = useState([]);  // Artworks of the logged-in artist
  const [filteredArtworks, setFilteredArtworks] = useState([]); // Filtered artworks for the logged-in artist
  const [errorMessage, setErrorMessage] = useState('');  // Error message state
  const [artistDetails, setArtistDetails] = useState(null);  // Store artist details

  const artistId = localStorage.getItem('artistId'); // Get the logged-in artist ID from localStorage

  // Fetch artist details to get the artist's name
  useEffect(() => {
    if (!artistId) {
      setErrorMessage('Artist not logged in.');
      return;
    }

    // Fetch artist details to identify the logged-in artist
    fetch(`http://localhost:8080/api/artists/${artistId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch artist details');
        }
        return response.json();
      })
      .then((artistData) => {
        setArtistDetails(artistData);  // Store artist details
        fetchArtworks(artistData.name);  // Fetch artworks based on logged-in artist's name
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch artist details.');
        console.error(error);
      });
  }, [artistId]);

  // Fetch artworks from the backend and filter them based on the logged-in artist
  const fetchArtworks = (artistName) => {
    fetch('http://localhost:8080/api/artworks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }
        return response.json();
      })
      .then((data) => {
        // Filter artworks by artist name
        const artistArtworks = data.filter(
          (artwork) => artwork.artist === artistName
        );
        setArtworks(data);  // Set all artworks (if needed for other logic)
        setFilteredArtworks(artistArtworks);  // Set filtered artworks belonging to the logged-in artist
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch artworks.');
        console.error(error);
      });
  };

  const handleEdit = (id) => {
    console.log(`Edit artwork with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete artwork with ID: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="my-artworks">
      <h1>My Artworks</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="artworks-container">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div key={artwork.id} className="artwork-card">
              <img
                src={artwork.imagePath ? `/uploads/${artwork.imagePath}` : '/default-image.jpg'}
                alt={artwork.artist}
                onError={(e) => (e.target.src = '/default-image.jpg')}  // Fallback for missing images
              />
              <h2>{artwork.title || 'Untitled'}</h2>
              <p><strong>Artist:</strong> {artwork.artist || 'Unknown'}</p>
              <p><strong>Cost:</strong> ${artwork.cost || 'N/A'}</p>
              <p><strong>Description:</strong> {artwork.description || 'No description available'}</p>
              <p><strong>Added On:</strong> {artwork.timestamp ? new Date(artwork.timestamp).toLocaleString() : 'Unknown'}</p>
              <div className="actions">
                <button className="edit-button" onClick={() => handleEdit(artwork.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(artwork.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks found for this artist.</p>
        )}
      </div>
    </div>
  );
}
