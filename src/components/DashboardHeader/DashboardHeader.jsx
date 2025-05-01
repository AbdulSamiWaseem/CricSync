import React, { useEffect, useState } from 'react';
import './dashboardHeader.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Logo from '../../assets/logo.png';
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = ({ children }) => {
  const { logout } = useAuth();
  const [userData, setUserData] = useState({
    teamName: '',
    teamLogo: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("going to fetch profile")
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/profile/');
      setUserData({
        teamName: res.data.username || 'My Team',
        teamLogo: res.data.profile_picture,
      });
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  };

  const handleLogout = () => {
    logout();  
    navigate("/login"); 
  };
  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div style={{ height: "100vh" }}>
      <header className="dashboard-header">
        <div className='notification-online'></div>

        <Link to="/notifications">
          <IoMdNotificationsOutline className='notification' />
        </Link>

        <div className="profile-section">
          <Link to="/team-profile" className="team-info">
            <img src={userData.teamLogo || Logo} alt="Team Logo" className="team-logo" />
            <span className="team-name">{capitalizeFirstLetter(userData.teamName)}</span>
          </Link>
        </div>

        <button
          className='m-2 p-2 logout'
          style={{
            backgroundColor: "#9747ff",
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            border: "none",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {children}
    </div>
  );
};

export default DashboardHeader;
