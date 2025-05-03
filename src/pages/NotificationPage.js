import React, { useEffect, useState } from 'react';
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaHandshake
} from 'react-icons/fa';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';
import api from '../utils/api';

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

const determineType = (message) => {
  const msg = message.toLowerCase();
  if (msg.includes('accepted')) return 'match-accepted';
  if (msg.includes('sent') && msg.includes('request')) return 'match-request';
  if (msg.includes('failed')) return 'error';
  if (msg.includes('complete')) return 'success';
  return 'info';
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user profile
    api.get('/profile/')
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    api.get('/notifications/')
      .then((res) => {
        const formatted = res.data
          .filter((n) => n.receiver === userId) // Filter for this user only
          .map((n) => ({
            id: n.id,
            matchId: n.match_id, // If needed for accept/reject
            type: determineType(n.message),
            message: n.message,
            time: formatTime(n.timestamp),
          }));
        setNotifications(formatted.reverse());
      })
      .catch((err) => {
        console.error('Failed to load notifications:', err);
      });
  }, [userId]);

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAccept = (matchId, notifId) => {
    api.post(`/matches/${matchId}/accept/`)
      .then(() => {
        alert('Match request accepted!');
        handleDismiss(notifId);
      })
      .catch((err) => {
        console.error('Failed to accept match:', err);
        alert('Failed to accept match.');
      });
  };

  const handleReject = (matchId, notifId) => {
    api.post(`/matches/${matchId}/reject/`)
      .then(() => {
        alert('Match request rejected.');
        handleDismiss(notifId);
      })
      .catch((err) => {
        console.error('Failed to reject match:', err);
        alert('Failed to reject match.');
      });
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
            {notifications.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                  color: '#777',
                  fontSize: '16px',
                }}
              >
                <FaInfoCircle size={20} color="#3B82F6" style={{ marginBottom: '0.5rem' }} />
                <p style={{ margin: 0 }}>No notifications yet.</p>
              </div>
            ) : (
              notifications.map((notification) => (
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

                  {notification.type === 'match-request' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleAccept(notification.matchId, notification.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleReject(notification.matchId, notification.id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
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
              )))}
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default NotificationPage;
