import React, { useState } from 'react';
import '../styles/AddArtwork.css'; // Optional: Style this page as needed

export default function AddArtwork() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!title || !artist || !cost || !description || !category || !image) {
      setMessage('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('cost', cost);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/api/artworks', { // Ensure the correct URL
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Artwork added successfully! ID: ${data.id}`);
        // Reset fields
        setTitle('');
        setArtist('');
        setCost('');
        setDescription('');
        setCategory('');
        setImage(null);
        document.getElementById('image').value = ''; // Reset file input
      } else {
        const errorData = await response.json();
        setMessage(`Failed to add artwork: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding artwork:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-artwork">
      <h1>Add New Artwork</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artist Name:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Painting">Painting</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Photography">Photography</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Printmaking">Printmaking</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Artwork</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
