import React from 'react';
import './dashboardHeader.css';
import farhan from '../../assets/farhan.png'
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const DashboardHeader = ({ children }) => {
  return (
    <div style={{ height: "100vh" }}>
      <header className="dashboard-header">
        <div className='notification-online'></div>
        <Link to="/notifications">
        <IoMdNotificationsOutline className='notification' />
        </Link>
        <div className="profile-section">
          <div className='online'></div>
          <img src={farhan} alt="Profile" className="profile-pic" />
          <span>Farhan KING (Admin)</span>
        </div>
        <button className='m-2 p-2' style={{ backgroundColor: "#9747ff", color: "white", fontWeight: "600", borderRadius: "10px", border: "none" }}>Logout</button>

      </header>
      {children}
    </div>
  );
};

export default DashboardHeader;
