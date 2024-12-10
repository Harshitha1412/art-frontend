import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminProfile.css"; // Ensure to create this CSS file

const AdminProfilePage = () => {
  const [adminDetails, setAdminDetails] = useState({
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

  const adminId = localStorage.getItem("adminId"); // Fetch adminId from localStorage

  // Fetch admin details on component mount
  useEffect(() => {
    if (!adminId) {
      setErrorMessage("Admin not logged in.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/admin/${adminId}`)
      .then((response) => {
        setAdminDetails(response.data);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch admin details.");
        console.error(error);
      });
  }, [adminId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", adminDetails.name);
    formData.append("email", adminDetails.email);
    formData.append("username", adminDetails.username);
    formData.append("role", adminDetails.role);
    if (newImage) formData.append("image", newImage);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/update/${adminId}`,
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
        `http://localhost:8080/api/admin/${adminId}`
      );
      setAdminDetails(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch updated profile.");
      console.error(error);
    }
  };

  return (
    <div className="profile-page-container">
      {/* Centered Profile */}
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={
                  adminDetails.imagePath
                    ? `http://localhost:8080${adminDetails.imagePath}?${new Date().getTime()}`
                    : "/default-avatar.jpg"
                }
                alt="Profile"
                className="profile-image"
              />
              {isEditing && (
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="file-input"
                />
              )}
            </div>
            <div className="profile-username-container">
              <h2>{adminDetails.username}</h2>
            </div>
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
                  value={adminDetails.name}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, name: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{adminDetails.name}</p>
              )}

              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={adminDetails.email}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, email: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{adminDetails.email}</p>
              )}

              <label>Role</label>
              {isEditing ? (
                <input
                  type="text"
                  value={adminDetails.role}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, role: e.target.value })
                  }
                  className="input-field"
                />
              ) : (
                <p>{adminDetails.role}</p>
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
    </div>
  );
};

export default AdminProfilePage;
