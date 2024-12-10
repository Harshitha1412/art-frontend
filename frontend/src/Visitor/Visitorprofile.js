import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Visitorprofile.css"; // Ensure to create this CSS file

const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    username: "",
    imagePath: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userId = localStorage.getItem("userId"); // Fetch userId from localStorage

  // Fetch user details on component mount
  useEffect(() => {
    if (!userId) {
      setErrorMessage("User not logged in.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch user details.");
        console.error(error);
      });
  }, [userId]);

  // Handle image change when selecting a new file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("role", userDetails.role || ""); // Append role if available
    if (newImage) {
      formData.append("image", newImage); // Append image file
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/update/${userId}`,
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
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}`
      );
      setUserDetails(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch updated profile.");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Left Side Profile */}
      <div className="profile-container" style={{ width: "60%" }}>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={
                  userDetails.imagePath
                    ? `http://localhost:8080${userDetails.imagePath}?${new Date().getTime()}`
                    : "/default-avatar.jpg"
                }
                alt="Profile"
                className="profile-image"
              />
            </div>
            <h2>{userDetails.username}</h2> {/* Display username here */}
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

          <div className="profile-body">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            <div className="info">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{userDetails.name}</p>
              )}

              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    })
                  }
                  className="input-field"
                />
              ) : (
                <p>{userDetails.email}</p>
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

      {/* Right Side - Order History, Saved Art */}
      <div
        className="statistics-container"
        style={{ width: "40%", padding: "10px", borderLeft: "1px solid #ccc" }}
      >
        <div className="statistics-card">
          <h3>Order History</h3>
          {/* Add dynamic order history here */}
          <div className="statistics-item">
            <label>Order 1:</label>
            <p>Details about order</p>
          </div>
          <div className="statistics-item">
            <label>Order 2:</label>
            <p>Details about order</p>
          </div>
        </div>

        <div className="statistics-card">
          <h3>Saved Art</h3>
          {/* Add dynamic saved art here */}
          <div className="statistics-item">
            <label>Art 1:</label>
            <p>Details about art saved</p>
          </div>
          <div className="statistics-item">
            <label>Art 2:</label>
            <p>Details about art saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
