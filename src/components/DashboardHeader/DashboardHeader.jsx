import React from 'react';
import './dashboardHeader.css';
import farhan from '../../assets/farhan.png'
import { IoMdNotificationsOutline } from "react-icons/io";

const DashboardHeader = ({children}) => {
  return (
    <div style={{height:"100vh"}}>
    <header className="dashboard-header">
      <div className='notification-online'></div>
      <IoMdNotificationsOutline className='notification' />
      <div className="profile-section">
        <div className='online'></div>
        <img src={farhan} alt="Profile" className="profile-pic" />
        <span>Farhan KING (Admin)</span>
      </div>
    </header>
    {children}
    </div>
  );
};

export default DashboardHeader;
