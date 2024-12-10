import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CuratorProfilePage = () => {
  const [curatorDetails, setCuratorDetails] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    bio: "",
    joinedDate: "",
    role: "",
    imagePath: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [organizedExhibitions, setOrganizedExhibitions] = useState(0);

  const curatorId = localStorage.getItem("curatorId");

  useEffect(() => {
    if (!curatorId) {
      setErrorMessage("Curator not logged in.");
      return;
    }

    fetchCuratorDetails();
  }, [curatorId]);

  useEffect(() => {
    if (curatorDetails.name) {
      fetchExhibitions();
    }
  }, [curatorDetails]);

  const fetchCuratorDetails = () => {
    axios
      .get(`http://localhost:8080/api/curators/${curatorId}`)
      .then((response) => {
        setCuratorDetails(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch curator details.");
        console.error(error);
      });
  };

  const fetchExhibitions = () => {
    axios
      .get(`http://localhost:8080/api/exhibitions`)
      .then((response) => {
        const exhibitions = response.data;
        const organizedCount = exhibitions.filter(
          (exhibition) => exhibition.organizerName === curatorDetails.name
        ).length;

        setOrganizedExhibitions(organizedCount);
      })
      .catch((error) => {
        console.error("Failed to fetch exhibitions:", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", curatorDetails.name);
    formData.append("email", curatorDetails.email);
    formData.append("phone", curatorDetails.phone);
    formData.append("bio", curatorDetails.bio);
    formData.append("role", curatorDetails.role);
    if (newImage) formData.append("image", newImage);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/curators/update/${curatorId}`,
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
        fetchCuratorDetails();
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update profile."
      );
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Exhibitions Organized Over Time",
        data: [3, 5, 2, 8, 6, 7],
        fill: false,
        borderColor: "#007bff",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={
                  curatorDetails.imagePath
                    ? `http://localhost:8080${curatorDetails.imagePath}?${new Date().getTime()}`
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
                  value={curatorDetails.name}
                  onChange={(e) =>
                    setCuratorDetails({
                      ...curatorDetails,
                      name: e.target.value,
                    })
                  }
                  className="input-field"
                />
              ) : (
                <p>{curatorDetails.name}</p>
              )}

              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={curatorDetails.email}
                  onChange={(e) =>
                    setCuratorDetails({
                      ...curatorDetails,
                      email: e.target.value,
                    })
                  }
                  className="input-field"
                />
              ) : (
                <p>{curatorDetails.email}</p>
              )}

              <label>Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  value={curatorDetails.phone}
                  onChange={(e) =>
                    setCuratorDetails({
                      ...curatorDetails,
                      phone: e.target.value,
                    })
                  }
                  className="input-field"
                />
              ) : (
                <p>{curatorDetails.phone}</p>
              )}

              <label>Bio</label>
              {isEditing ? (
                <textarea
                  value={curatorDetails.bio}
                  onChange={(e) =>
                    setCuratorDetails({
                      ...curatorDetails,
                      bio: e.target.value,
                    })
                  }
                  className="input-field"
                />
              ) : (
                <p>{curatorDetails.bio}</p>
              )}

              <label>Role</label>
              {isEditing ? (
                <input
                  type="text"
                  value={curatorDetails.role}
                  onChange={(e) =>
                    setCuratorDetails({
                      ...curatorDetails,
                      role: e.target.value,
                    })
                  }
                  className="input-field"
                />
              ) : (
                <p>{curatorDetails.role}</p>
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

      <div className="statistics-container">
        <div className="statistics-card">
          <h3>Number of Exhibitions Organized</h3>
          <p>{organizedExhibitions}</p>
        </div>
        <div className="statistics-card">
          <h3>Exhibitions Timeline</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CuratorProfilePage;
