import React, { useEffect, useState } from 'react';
import './dashboardHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Logo from '../../assets/logo.png';
import { useAuth } from "../../context/AuthContext";
import { capitalizeFirstLetter } from '../../utils/helper';
import { MdNotificationsActive } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

const DashboardHeader = ({ children }) => {
  const { logout } = useAuth();
  const [sidebar, setSideBar] = useState(false);
  const [userData, setUserData] = useState({
    teamName: '',
    teamLogo: '',
    teamId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/profile/');
      setUserData({
        teamName: res.data.username || 'My Team',
        teamLogo: res.data.profile_picture,
        teamId: res.data.id,
      });
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const enhancedChildren = React.Children.map(children, child =>
    React.isValidElement(child) ? React.cloneElement(child, { sidebar, setSideBar }) : child
  );

  return (
    <div style={{ height: "100vh" }}>
      <header className="dashboard-header">
        <RxHamburgerMenu className='hamburger' onClick={() => {setSideBar(true)}} />
        <Link to="/notifications">
          <MdNotificationsActive className='notification' />
        </Link>

        <div className="profile-section">
          <Link to={`/team/${userData.teamId}`} className="team-info">
            <img
              src={userData.teamLogo ? `${process.env.REACT_APP_BASE_URL}${userData.teamLogo}` : Logo}
              alt="Team Logo"
              className="team-logo"
            />
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

      {enhancedChildren}
    </div>
  );
};

export default DashboardHeader;
