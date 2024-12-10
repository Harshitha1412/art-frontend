import React, { useState, useEffect } from "react";

const ExhibitionHighlights = () => {
  const [exhibitions, setExhibitions] = useState([]); // State to store all exhibitions
  const [error, setError] = useState(""); // State to handle errors

  // Fetch all exhibitions on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/exhibitions") // Adjust backend API endpoint as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch exhibitions.");
        }
        return response.json();
      })
      .then((data) => setExhibitions(data))
      .catch((error) => {
        console.error("Error fetching exhibitions:", error);
        setError("Failed to load exhibitions. Please try again later.");
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "15px",
          color: "#333",
          textAlign: "center",
        }}
      >
        Organized Exhibitions
      </h1>

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: "#fdd",
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {exhibitions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>
          No exhibitions available.
        </p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {exhibitions.map((exhibition) => (
            <li
              key={exhibition.id}
              style={{
                marginBottom: "15px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "#007bff" }}>
                {exhibition.title}
              </h3>
              <p style={{ marginBottom: "5px" }}>
                <strong>Description:</strong> {exhibition.description}
              </p>
              <p style={{ marginBottom: "5px" }}>
                <strong>Dates:</strong> {exhibition.dates}
              </p>
              <p style={{ marginBottom: "5px" }}>
                <strong>Place:</strong> {exhibition.place}
              </p>
              <p>
                <strong>Organizer Name:</strong> {exhibition.organizerName}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExhibitionHighlights;
