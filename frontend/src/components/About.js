import React, { useEffect, useRef } from 'react';
import '../styles/AboutPage.css';
import galleryImage from '../static/pattern1.jpg';
import icon from '../static/image1.png'; // Import your styles here

const AboutPage = () => {
  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add('fade-in');
        } else {
          section.classList.remove('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
       
      <h1>About Art Gallery</h1>
      <section className="about-image-section">
        <img src={galleryImage} alt="Art Gallery" className="about-image" />
      </section>
      <section className="about-section" ref={addToRefs}>
        <h2>Our Mission</h2>
        <p>
          At Art Gallery, we aim to bring art and culture to the community by showcasing
          exceptional artworks from talented artists around the world. We believe that
          art has the power to inspire, provoke thought, and bring people together.
        </p>
      </section>

      <section className="about-section" ref={addToRefs}>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Integrity:</strong> We operate with honesty and transparency.</li>
          <li><strong>Creativity:</strong> We celebrate and nurture creativity in all its forms.</li>
          <li><strong>Diversity:</strong> We embrace diverse perspectives and backgrounds.</li>
          <li><strong>Community:</strong> We strive to create a welcoming space for all art lovers.</li>
        </ul>
      </section>

      <section className="about-section" ref={addToRefs}>
        <h2>Our Team</h2>
        <p>
          Our team is composed of passionate art enthusiasts, curators, and educators
          dedicated to promoting art in our community. Each member brings a unique
          perspective and expertise to our gallery.
        </p>
        <div className="team-members">
          <div className="team-member">
            <h3>Lakshmi Harshitha</h3>
            <p>Founder</p>
          </div>
          <div className="team-member">
            <h3>Sahithi</h3>
            <p>Curator</p>
          </div>
          <div className="team-member">
            <h3>Bhavana</h3>
            <p>Marketing Manager</p>
          </div>
        </div>
      </section>
      

      <section className="about-section" ref={addToRefs}>
        <h2>Join Us</h2>
        <p>
          We invite you to explore our gallery and participate in our events. 
          Whether you are an artist, collector, or simply an art lover, there is a place for you here.
        </p>
      </section>
      <h2>Follow Us</h2>
        <div className="social-icons">
          
        <img 
  style={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center" 
  }} 
  src={icon} 
  alt="Instagram" 
  className="social-icon" 
/>

         
          </div>
    </div>
  );
};

export default AboutPage;
