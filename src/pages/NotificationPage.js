

import React from 'react';
import { FaBell, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';
const notifications = [
  {
    id: 1,
    type: 'success',
    message: 'Your match setup is complete!',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'info',
    message: 'New tournament added in your city.',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'error',
    message: 'Team registration failed. Please try again.',
    time: 'Yesterday',
  },
  {
    id: 4,
    type: 'success',
    message: 'You followed a new team.',
    time: '2 days ago',
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle color="#4BB543" size={20} />;
    case 'error':
      return <FaTimesCircle color="#FF4C4C" size={20} />;
    case 'info':
    default:
      return <FaInfoCircle color="#3B82F6" size={20} />;
  }
};

const NotificationPage = () => {
  return (
    <DashboardHeader>
      <Sidebar>
      
    <div
      style={{
        backgroundColor:"#9747FF",        // adjust based on sidebar width
        padding: "20px",
        minHeight: "100vh",         // full height
        boxSizing: "border-box",
        backgroundColor: "#f4f6f8",
        overflowY: "auto",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px",color:"#9747FF" }}>
        <FaBell /> Notifications
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            {getIcon(notification.type)}
            <div style={{ flexGrow: 1 }}>
              <p style={{ margin: 0, fontWeight: "500", fontSize: "16px",color:"gray" }}>{notification.message}</p>
              <span style={{ fontSize: "12px", color: "#666" }}>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Sidebar>
    </DashboardHeader>
  );
};

export default NotificationPage;

