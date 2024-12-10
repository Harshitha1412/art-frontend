import React, { useState } from 'react';

const OrganizeExhibitions = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dates, setDates] = useState('');
  const [place, setPlace] = useState('');
  const [organizerName, setOrganizerName] = useState(''); // Organizer Name field
  const [message, setMessage] = useState(''); // Success/Error Message

  const handleSave = async () => {
    // Validate input fields
    if (!title || !description || !dates || !place || !organizerName) {
      setMessage('All fields are required.');
      return;
    }

    const exhibitionData = { title, description, dates, place, organizerName };

    try {
      const response = await fetch('http://localhost:8080/api/exhibitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exhibitionData),
      });

      if (response.ok) {
        const savedExhibition = await response.json();
        console.log('Exhibition saved:', savedExhibition);
        setMessage('Exhibition saved successfully!');
        // Reset form fields
        setTitle('');
        setDescription('');
        setDates('');
        setPlace('');
        setOrganizerName('');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to save exhibition: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('Failed to save exhibition. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '15px' }}>Organize Exhibitions</h1>

      {message && (
        <div
          style={{
            marginBottom: '15px',
            color: message.includes('successfully') ? 'green' : 'red',
            backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            padding: '10px',
            border: '1px solid',
            borderColor: message.includes('successfully') ? '#c3e6cb' : '#f5c6cb',
            borderRadius: '4px',
          }}
        >
          {message}
        </div>
      )}

      <label style={{ display: 'block', margin: '10px 0 5px', fontWeight: 'bold' }}>Exhibition Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter exhibition title"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />

      <label style={{ display: 'block', margin: '10px 0 5px', fontWeight: 'bold' }}>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter exhibition description"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />

      <label style={{ display: 'block', margin: '10px 0 5px', fontWeight: 'bold' }}>Exhibition Dates</label>
      <input
        type="text"
        value={dates}
        onChange={(e) => setDates(e.target.value)}
        placeholder="Enter exhibition dates (e.g., Jan 1 - Jan 10)"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />

      <label style={{ display: 'block', margin: '10px 0 5px', fontWeight: 'bold' }}>Exhibition Place</label>
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Enter exhibition place"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />

      <label style={{ display: 'block', margin: '10px 0 5px', fontWeight: 'bold' }}>Organizer Name</label>
      <input
        type="text"
        value={organizerName}
        onChange={(e) => setOrganizerName(e.target.value)}
        placeholder="Enter organizer name"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />

      <button
        onClick={handleSave}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Save Exhibition
      </button>
    </div>
  );
};

export default OrganizeExhibitions;
