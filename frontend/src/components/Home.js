import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import img1 from '../static/art1.jpg';  
import img2 from '../static/art2.jpg';  
import img3 from '../static/god3.jpg';  
import img4 from '../static/god1.jpg';  
import img5 from '../static/god2.jpg';  
import Login from './Login'; // Import the Login component

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control the visibility of the login modal
  const carouselItems = [img1, img2, img3]; 
  const newArrivals = [img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const openLoginModal = () => {
    setIsLoginOpen(true); // Show the login modal
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false); // Close the login modal
  };

  return (
    <div>
      {/* Carousel */}
      <div className="carousel">
        {carouselItems.map((item, index) => (
          <div
            className="carousel-item"
            style={{ opacity: current === index ? 1 : 0 }}
            key={index}
          >
            <img src={item} alt={`Artwork ${index + 1}`} />
          </div>
        ))}
      </div>

      <h1 style={{ textAlign: 'center' }}>Welcome to the Art Gallery</h1>
      <p style={{ textAlign: 'center' }}>
        Explore a stunning collection of contemporary and classical artworks. 
        Login or Register to curate your own gallery, save favorites, and discover the artists behind each masterpiece.
      </p>

      

      {/* New Arrivals Section */}
      <div className="new-arrivals-section">
        <h2>New Arrivals</h2>
        <div className="blocks">
          {newArrivals.map((item, index) => (
            <a href="#" className="block" key={index} style={{ '--bg': `var(--gradient-${index + 1})` }}>
              <div className="block__item">
                <img src={item} alt={`New Arrival ${index + 1}`} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Modal for Login */}
      {isLoginOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeLoginModal}>X</button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
