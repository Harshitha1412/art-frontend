import React, { useState, useEffect } from "react";

const ManageExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState(null);

  // Fetch exhibitions when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/exhibitions")
      .then((response) => response.json())
      .then((data) => setExhibitions(data))
      .catch((error) => console.error("Error fetching exhibitions:", error));
  }, []);

  // Handle updating an exhibition
  const handleUpdate = async () => {
    if (!selectedExhibition) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/exhibitions/${selectedExhibition.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedExhibition),
        }
      );

      if (response.ok) {
        const updatedExhibition = await response.json();
        setExhibitions((prev) =>
          prev.map((exhibition) =>
            exhibition.id === updatedExhibition.id ? updatedExhibition : exhibition
          )
        );
        setEditMode(false);
        setSelectedExhibition(null);
      } else {
        console.error("Failed to update exhibition.");
      }
    } catch (error) {
      console.error("Error updating exhibition:", error);
    }
  };

  // Handle editing an exhibition
  const startEditing = (exhibition) => {
    setSelectedExhibition({ ...exhibition });
    setEditMode(true);
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedExhibition((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
        Manage Exhibitions
      </h1>

      {/* List exhibitions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {exhibitions.map((exhibition) => (
          <div
            key={exhibition.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div>
              <strong>{exhibition.title}</strong> - {exhibition.dates} @ {exhibition.place}
              <br />
              <em>Organizer: {exhibition.organizerName}</em>
            </div>
            <button
              onClick={() => startEditing(exhibition)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit exhibition form */}
      {editMode && selectedExhibition && (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Edit Exhibition</h2>

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Title
          </label>
          <input
            type="text"
            name="title"
            value={selectedExhibition.title}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Description
          </label>
          <textarea
            name="description"
            value={selectedExhibition.description}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Dates
          </label>
          <input
            type="text"
            name="dates"
            value={selectedExhibition.dates}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Place
          </label>
          <input
            type="text"
            name="place"
            value={selectedExhibition.place}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Organizer Name
          </label>
          <input
            type="text"
            name="organizerName"
            value={selectedExhibition.organizerName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleUpdate}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setSelectedExhibition(null);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExhibitions;
