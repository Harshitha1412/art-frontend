import React, { useState, useEffect } from 'react';

const CuratorDashboard = () => {
  const [totalExhibitions, setTotalExhibitions] = useState(0);
  const [upcomingExhibition, setUpcomingExhibition] = useState(null); // Single upcoming event
  const [recentExhibitions, setRecentExhibitions] = useState([]); // All other exhibitions

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/exhibitions') // Adjust backend API endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setTotalExhibitions(data.length);

        if (data.length > 0) {
          const sortedExhibitions = [...data].sort(
            (a, b) =>
              new Date(a.dates.split(' - ')[0]) - new Date(b.dates.split(' - ')[0])
          );

          const upcoming = sortedExhibitions[sortedExhibitions.length - 1]; // Last event
          setUpcomingExhibition(upcoming);

          const recent = sortedExhibitions.slice(0, -1); // All except the last one
          setRecentExhibitions(recent);
        }
      })
      .catch((error) => console.error('Error fetching exhibitions:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Curator Dashboard</h1>

      <div style={styles.card}>
        <h2 style={styles.cardHeading}>Total Exhibitions</h2>
        <p style={styles.cardContent}>{totalExhibitions}</p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardHeading}>Upcoming Exhibition</h2>
        {upcomingExhibition ? (
          <p style={styles.cardContent}>
            <strong>{upcomingExhibition.title}</strong> - {upcomingExhibition.dates} @{' '}
            {upcomingExhibition.place}
          </p>
        ) : (
          <p style={styles.cardContent}>No upcoming exhibition.</p>
        )}
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardHeading}>Recent Exhibitions</h2>
        {recentExhibitions.length === 0 ? (
          <p style={styles.cardContent}>No recent exhibitions.</p>
        ) : (
          <ul style={styles.list}>
            {recentExhibitions.map((exhibition) => (
              <li key={exhibition.id} style={styles.listItem}>
                <strong>{exhibition.title}</strong> - {exhibition.dates}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardHeading: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#007bff',
  },
  cardContent: {
    fontSize: '16px',
    color: '#555',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    fontSize: '16px',
    padding: '5px 0',
    borderBottom: '1px solid #ddd',
    color: '#333',
  },
};

export default CuratorDashboard;
