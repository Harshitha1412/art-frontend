import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ArtworkList.css';

export default function ArtworkList() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]); // State to store filtered artworks
  const [cartItems, setCartItems] = useState([]); // Store cart items in the state
  const [userId, setUserId] = useState(null); // Store userId from localStorage
  const [addedToCart, setAddedToCart] = useState({}); // Track added items
  const [categoryFilter, setCategoryFilter] = useState(''); // Track the selected category
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in
  const navigate = useNavigate();

  // Check if the user is logged in and set state
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Get userId from localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Set userId in state
      setIsLoggedIn(true); // Mark the user as logged in
      fetchArtworks(); // Fetch artworks if user is logged in
    } else {
      setIsLoggedIn(false); // Mark the user as not logged in
    }
  }, []);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart); // Set cart items from saved cart in localStorage
  }, []);

  // Fetch artworks from the API
  const fetchArtworks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/artworks');
      if (response.ok) {
        const data = await response.json();
        setArtworks(data); // Set artworks data
        setFilteredArtworks(data); // Initially set all artworks as filtered
      } else {
        console.error('Failed to fetch artworks');
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);

    // Filter artworks based on selected category
    if (selectedCategory === '') {
      setFilteredArtworks(artworks); // If no category is selected, show all artworks
    } else {
      const filtered = artworks.filter((artwork) => artwork.category === selectedCategory);
      setFilteredArtworks(filtered); // Set filtered artworks based on category
    }
  };

  // Handle adding an item to the cart and navigating to the cart page
  const handleAddToCartAndRedirect = (artwork) => {
    const newCartItems = [...cartItems, artwork];
    setCartItems(newCartItems); // Update cart items in state

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Save to localStorage

    // Update the added to cart state
    setAddedToCart((prev) => ({
      ...prev,
      [artwork.id]: true, // Mark this artwork as added
    }));
  };

  // Handle navigation to the cart page
  const handleGoToCart = () => {
    if (userId) {
      navigate(`/${userId}/cart`); // Navigate to the cart page using userId
    } else {
      console.error('User ID is not available');
    }
  };

  return (
    <div className="artwork-list">
      {/* Display message if user is not logged in */}
      {!isLoggedIn ? (
        <h1>Please log in to view arts</h1>
      ) : (
        <>
          <h1>Artworks</h1>

          {/* Category Filter Dropdown */}
          <div className="category-filter">
            <label htmlFor="category">Select Category: </label>
            <select id="category" value={categoryFilter} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              <option value="Painting">Painting</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Photography">Photography</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Printmaking">Printmaking</option>
            </select>
          </div>

          <div className="artwork-grid">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="artwork-card">
                <div className="artwork-image-container">
                  <img
                    src={`http://localhost:8080${artwork.imagePath}`}
                    alt={artwork.title}
                    className="artwork-image"
                  />
                </div>
                <h2 className="artwork-title">{artwork.title}</h2>
                <div className="artwork-hover-details">
                  <p className="artwork-artist">By: {artwork.artist}</p>
                  <p className="artwork-description">{artwork.description}</p>
                </div>
                <p className="artwork-cost">Cost: {artwork.cost}</p>

                {/* Add to Cart / Go to Cart button */}
                {addedToCart[artwork.id] ? (
                  <button className="cart-button" onClick={handleGoToCart}>
                    Go to Cart
                  </button>
                ) : (
                  <button
                    className="cart-button"
                    onClick={() => handleAddToCartAndRedirect(artwork)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
