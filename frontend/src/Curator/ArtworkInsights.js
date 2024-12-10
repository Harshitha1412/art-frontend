import React, { useState, useEffect } from 'react';
import img1 from '../static/god1.jpg';
import img2 from '../static/god2.jpg';
import img3 from '../static/god3.jpg';
import img4 from '../static/art2.jpg';
import img5 from '../static/paint2.jpg';
import img6 from '../static/god4.jpg';
import '../styles/ArtworkInsights.css';

const artworks = [
  { id: 1, artist: 'Lord Ganesha Oil Paint', imageUrl: img1 },
  { id: 2, artist: 'Vishnu and Lakshmi: The Cosmic Balance', imageUrl: img2 },
  { id: 3, artist: 'Radha and Krishna in a Serene Embrace', imageUrl: img3 },
  { id: 4, artist: 'Vigorous Fight With Enemy On Elephant', imageUrl: img4 },
  { id: 5, artist: 'Modern Art of Woman', imageUrl: img5 },
  { id: 6, artist: 'The Woman and Her Bird', imageUrl: img6 },
];

export default function ArtworkInsights() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [insight, setInsight] = useState('');
  const [insightsData, setInsightsData] = useState(() => {
    // Retrieve saved insights from localStorage
    return JSON.parse(localStorage.getItem('insightsData')) || {};
  });

  useEffect(() => {
    localStorage.setItem('insightsData', JSON.stringify(insightsData));
  }, [insightsData]);

  const handleSelectArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setInsight(insightsData[artwork.id] || ''); // Load saved insight if available
  };

  const handleSaveInsight = () => {
    if (selectedArtwork) {
      const newInsightsData = { ...insightsData, [selectedArtwork.id]: insight };
      setInsightsData(newInsightsData);
      alert(`Insight saved for ${selectedArtwork.artist}`);
    }
  };

  return (
    <div className="artwork-manager">
      <h1>Curator Artwork Insights</h1>

      
      <div className="artwork-list">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-item">
            <img src={artwork.imageUrl} alt={artwork.artist} />
            <h2>{artwork.artist}</h2>
            <button className="select-button" onClick={() => handleSelectArtwork(artwork)}>
              Select for Insight
            </button>
          </div>
        ))}
      </div>

      {/* Insights Section */}
      {selectedArtwork && (
        <div className="insights-section">
          <h2>Add Insights for: {selectedArtwork.artist}</h2>
          <textarea
            value={insight}
            onChange={(e) => setInsight(e.target.value)}
            placeholder="Write your insights here..."
            className="insights-textarea"
          />
          <button onClick={handleSaveInsight} className="save-insight-button">Save Insight</button>
        </div>
      )}
    </div>
  );
}
