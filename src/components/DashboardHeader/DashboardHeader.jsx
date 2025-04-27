import React, { useEffect, useState } from 'react';
import './dashboardHeader.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/logo.png'

const DashboardHeader = ({ children }) => {
  const [userData, setUserData] = useState({
    teamName: '',
    teamLogo: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/profile/', { withCredentials: true });
      setUserData({
        teamName: res.data.team_name || 'My Team',
        teamLogo: res.data.team_logo || '/default-logo.png',
      });
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/user/logout/', {}, { withCredentials: true });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
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
            {/* <img src={userData.teamLogo} alt="Team Logo" className="team-logo" />
            <span className="team-name">{userData.teamName}</span> */}
            <img src={Logo} alt="Team Logo" className="team-logo" />
            <span className="team-name">FAST XI</span>
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
