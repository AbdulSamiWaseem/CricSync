import React, { useState } from 'react';
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaHandshake
} from 'react-icons/fa';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';

const initialNotifications = [
  {
    id: 1,
    type: 'success',
    message: 'Your match setup is complete!',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'match-request',
    message: 'Ali sent you a match request.',
    time: '10 minutes ago',
  },
  {
    id: 3,
    type: 'match-accepted',
    message: 'Umar accepted your match request!',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'error',
    message: 'Team registration failed. Please try again.',
    time: 'Yesterday',
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle color="#4BB543" size={20} />;
    case 'error':
      return <FaTimesCircle color="#FF4C4C" size={20} />;
    case 'match-request':
      return <FaHandshake color="#9747FF" size={20} />;
    case 'match-accepted':
      return <FaCheckCircle color="#4BB543" size={20} />;
    case 'info':
    default:
      return <FaInfoCircle color="#3B82F6" size={20} />;
  }
};

const getBorderColor = (type) => {
  switch (type) {
    case 'success':
    case 'match-accepted':
      return '#4BB543';
    case 'error':
      return '#FF4C4C';
    case 'match-request':
      return '#9747FF';
    case 'info':
    default:
      return '#3B82F6';
  }
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAccept = (id) => {
    // Future: Send accept match request to backend
    alert("Match request accepted!");
    handleDismiss(id);
  };

  const handleReject = (id) => {
    // Future: Send reject match request to backend
    alert("Match request rejected.");
    handleDismiss(id);
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div
          style={{
            padding: '20px',
            minHeight: '100vh',
            backgroundColor: '#f4f6f8',
            overflowY: 'auto',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#9747FF',
            }}
          >
            <FaBell /> Notifications
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#fff',
                  borderLeft: `6px solid ${getBorderColor(notification.type)}`,
                  borderRadius: '10px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                }}
              >
                {getIcon(notification.type)}

                <div style={{ flexGrow: 1 }}>
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '16px', color: 'gray' }}>
                    {notification.message}
                  </p>
                  <span style={{ fontSize: '12px', color: '#666' }}>{notification.time}</span>
                </div>

                {notification.type === 'match-request' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAccept(notification.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReject(notification.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {notification.type !== 'match-request' && (
                  <button
                    onClick={() => handleDismiss(notification.id)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                    title="Dismiss"
                  >
                    <FaTimesCircle color="#888" size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default NotificationPage;
