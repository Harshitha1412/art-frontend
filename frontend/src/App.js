import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ArtworkList from './components/ArtworkList';
import AdminHomePage from './Admin/AdminHomePage';
import ArtistHomePage from './Artist/ArtistHomePage';
import CuratorHomePage from './Curator/CuratorDashboard';
import Visitorprofile from './Visitor/Visitorprofile';
import CartPage from './components/CartPage';
import AboutPage from './components/About';
import ManageUsers from './Admin/ManageUsers';
import ManageArtworks from './Admin/ManageArtworks';
import SiteSettings from './Admin/SiteSettings';

import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import ArtistNavbar from './components/ArtistNavbar';
import CuratorNavbar from './components/CuratorNavbar';
import AddArtwork from './Artist/AddArts';
import MyArtworks from './Artist/Myartworks';
import ArtistProfilePage from './Artist/ArtistProfile';
import OrganizeExhibitions from './Curator/OrganizeExhibitions';
import ExhibitionHighlights from './Curator/ExhibitionHighlights';
import ManageExhibitions from './Curator/ManageExhibitions';
import CuratorDashboard from './Curator/CuratorDashboard';
import CuratorProfile from './Curator/CuratorProfile';
import AdminProfilePage from './Admin/AdminProfile';

const App = () => {
  const [userId, setUserId] = useState(null); // Store common userId from localStorage
  const [role, setRole] = useState(null); // Store role from localStorage
  const [specificRoleId, setSpecificRoleId] = useState(null); // Store role-specific ID (artistId, adminId, curatorId)
  const location = useLocation();

  // Fetch userId, role, and role-specific IDs on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    // Fetch common userId
    const commonUserId = localStorage.getItem('userId');
    setUserId(commonUserId);

    // Based on the role, fetch the correct role-specific ID from localStorage
    if (storedRole === 'ADMIN') {
      setSpecificRoleId(localStorage.getItem('adminId')); // Fetch adminId for Admin role
    } else if (storedRole === 'ARTIST') {
      setSpecificRoleId(localStorage.getItem('artistId')); // Fetch artistId for Artist role
    } else if (storedRole === 'CURATOR') {
      setSpecificRoleId(localStorage.getItem('curatorId')); // Fetch curatorId for Curator role
    }
  }, []);

  // Function to determine which navbar to display based on the current route
  const getNavbar = () => {
    if (location.pathname.startsWith('/admin')) return <AdminNavbar />;
    if (location.pathname.startsWith('/artist')) return <ArtistNavbar />;
    if (location.pathname.startsWith('/curator')) return <CuratorNavbar />;
    return <Navbar />;
  };

  return (
    <div>
      {getNavbar()} {/* Display the appropriate navbar based on the route */}
      <Routes>
        {/* Main Routes with userId and role-specific ID included */}
        <Route path={`/${userId}/`} element={<Home />} />
        <Route path={`/${userId}/about`} element={<AboutPage />} />
        <Route path={`/${userId}/artworks`} element={<ArtworkList />} />
        <Route path={`/${userId}/cart`} element={<CartPage />} />

        {/* Login/Register Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        {specificRoleId && role === 'ADMIN' && (
          <>
            <Route path={`/admin/${specificRoleId}`} element={<AdminHomePage />} />
            <Route path={`/admin/${specificRoleId}/manage-users`} element={<ManageUsers />} />
            <Route path={`/admin/${specificRoleId}/manage-artworks`} element={<ManageArtworks />} />
            <Route path={`/admin/${specificRoleId}/site-settings`} element={<SiteSettings />} />
            <Route path={`/admin/${specificRoleId}/profile`} element={<AdminProfilePage />} />
          </>
        )}

        {/* Artist Routes */}
        {specificRoleId && role === 'ARTIST' && (
          <>
            <Route path={`/artist/${specificRoleId}`} element={<ArtistHomePage />} />
            <Route path={`/artist/${specificRoleId}/myartworks`} element={<MyArtworks />} />
            <Route path={`/artist/${specificRoleId}/addartwork`} element={<AddArtwork />} />
            <Route path={`/artist/${specificRoleId}/profile`} element={<ArtistProfilePage />} />
          </>
        )}

        {/* Curator Routes */}
        {specificRoleId && role === 'CURATOR' && (
          <>
            <Route path={`/curator/${specificRoleId}`} element={<CuratorDashboard />} />
            <Route path={`/curator/${specificRoleId}/organize-exhibitions`} element={<OrganizeExhibitions />} />
            <Route path={`/curator/${specificRoleId}/exhibition-highlights`} element={<ExhibitionHighlights />} />
            <Route path={`/curator/${specificRoleId}/manage-artworks`} element={<ManageExhibitions />} />
            <Route path={`/curator/${specificRoleId}/profile`} element={<CuratorProfile />} />
          </>
        )}

        {/* Visitor Profile Route */}
        {userId && role === 'VISITOR' && (
          <Route path={`/visitor/${userId}/profile`} element={<Visitorprofile />} />
        )}
      </Routes>

    </div>
  );
};

export default App;
