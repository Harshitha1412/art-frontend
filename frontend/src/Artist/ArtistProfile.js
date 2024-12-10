import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/ArtistProfile.css"; // Ensure to create this CSS file

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ArtistProfilePage = () => {
  const [artistDetails, setArtistDetails] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
    imagePath: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptedOrders, setAcceptedOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [totalArtworks, setTotalArtworks] = useState(0);
  const [salesData, setSalesData] = useState([100, -50, 200, -100, 300]); // Mixed growth and downfall values

  const artistId = localStorage.getItem("artistId"); // Fetch artistId from localStorage

  useEffect(() => {
    if (!artistId) {
      setErrorMessage("Artist not logged in.");
      return;
    }

    // Fetch artist details from the API
    axios
      .get(`http://localhost:8080/api/artists/${artistId}`)
      .then((response) => {
        setArtistDetails(response.data);
        // Simulating fetching statistics (replace with actual data)
        setAcceptedOrders(150);
        setRejectedOrders(50);
        setTotalArtworks(200);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch artist details.");
        console.error(error);
      });
  }, [artistId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", artistDetails.name);
    formData.append("email", artistDetails.email);
    formData.append("username", artistDetails.username);
    formData.append("role", artistDetails.role);
    if (newImage) formData.append("image", newImage);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/artists/update/${artistId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        fetchUpdatedProfile();
      } else {
        setErrorMessage("Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage("Failed to update profile.");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const fetchUpdatedProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/artists/${artistId}`);
      setArtistDetails(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch updated profile.");
      console.error(error);
    }
  };

  // Sales graph data with growth (positive) and downfall (negative) values
  const salesGraphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales Growth & Downfall",
        data: salesData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
        backgroundColor: (context) => {
          // Dynamic color based on growth or downfall
          const value = context.raw;
          return value > 0 ? "green" : "red";
        },
      },
    ],
  };

  return (
    <div className="artist-profile-page-container">
      <div className="left-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={
                  artistDetails.imagePath
                    ? `http://localhost:8080${artistDetails.imagePath}?${new Date().getTime()}`
                    : "/default-avatar.jpg"
                }
                alt="Profile"
                className="profile-image"
              />
              {isEditing && (
                <div className="image-upload-container">
                  <label htmlFor="file-input" className="file-label">
                    Choose File
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </div>
              )}
            </div>
            <div className="profile-username-container">
              <h2>{artistDetails.username}</h2>
            </div>
          </div>

          <div className="profile-body">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="info">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={artistDetails.name}
                  onChange={(e) =>
                    setArtistDetails({ ...artistDetails, name: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{artistDetails.name}</p>
              )}

              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={artistDetails.email}
                  onChange={(e) =>
                    setArtistDetails({ ...artistDetails, email: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{artistDetails.email}</p>
              )}

              <label>Role</label>
              {isEditing ? (
                <input
                  type="text"
                  value={artistDetails.role}
                  onChange={(e) =>
                    setArtistDetails({ ...artistDetails, role: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{artistDetails.role}</p>
              )}
            </div>

            {isEditing ? (
              <div className="button-group">
                <button className="save-button" onClick={handleSaveChanges}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Container - Artist Stats */}
      <div className="right-container">
        <div className="stats-card">
          <h3>Artist Stats</h3>
          <div className="stats">
            <p>Total Artworks: {totalArtworks}</p>
            <p>Accepted Orders: {acceptedOrders}</p>
            <p>Rejected Orders: {rejectedOrders}</p>
          </div>

          <div className="sales-graph">
            <h4>Sales Growth & Downfall</h4>
            <Line data={salesGraphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
