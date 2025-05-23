import React, { useEffect, useState } from 'react';
import { FaBell, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaHandshake } from 'react-icons/fa';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

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
  if (msg.includes('match request') && msg.includes('has sent you')) return 'match-request';
  if (msg.includes('accepted')) return 'match-accepted';
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
  const [filter, setFilter] = useState('unread');
  const [loading, setLoading] = useState(true);

  // Fetch profile to get current user ID
  useEffect(() => {
    api.get('/profile/')
      .then((res) => setUserId(res.data.id))
      .catch((err) => console.error('Failed to fetch profile:', err));
  }, []);

  // Fetch notifications once userId is available
  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    api.get('/notifications/')
      .then((res) => {
        const formatted = res.data
          .filter((n) => n.user_to?.id === userId)
          .map((n) => ({
            id: n.id,
            matchId: n.match_id,
            type: determineType(n.message),
            message: n.message,
            time: formatTime(n.timestamp),
            is_read: n.is_read,
          }));
        setNotifications(formatted.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load notifications:', err);
        setLoading(false);
      });
  }, [userId]);

  // Collect unread notifications
  const unreadNotifications = notifications.filter((n) => !n.is_read);

  // Mark unread as read when user leaves the page
  useEffect(() => {
    return () => {
      if (unreadNotifications.length > 0) {
        const unreadIds = unreadNotifications.map((n) => n.id);
        api
          .post('/notifications/mark-read/', { ids: unreadIds })
          .catch((err) => console.error('Failed to mark notifications as read:', err));
      }
    };
  }, [unreadNotifications]);



  const handleAccept = (matchId, notifId) => {
    api.post(`/matches/${matchId}/accept/`)
      .then(() => {
        toast.success('Match request accepted!');
        // handleDismiss(notifId); 
      })
      .catch((err) => {
        console.error('Failed to accept match:', err);
        toast.error('Failed to accept match.');
      });
  };
  

  const handleReject = (matchId, notifId) => {
    api.post(`/matches/${matchId}/reject/`)
      .then(() => {
        toast.success('Match request rejected.');
        // handleDismiss(notifId); 
      })
      .catch((err) => {
        console.error('Failed to reject match:', err);
        toast.error('Failed to reject match.');
      });
  };
  
  const handleDismiss = (id) => {
    api
      .delete(`/notifications/${id}/`)
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        toast.success('Notification dismissed');
      })
      .catch((err) => {
        console.error('Failed to delete notification:', err);
        toast.error('Failed to dismiss notification.');
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

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            {['unread', 'all'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: filter === f ? '#9747FF' : '#fff',
                  color: filter === f ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <Loader />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notifications.filter((n) => (filter === 'all' ? true : !n.is_read)).length === 0 ? (
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
                  <p style={{ margin: 0 }} className='no-matches'>No notifications in this category.</p>
                </div>
              ) : (
                notifications
                  .filter((n) => (filter === 'all' ? true : !n.is_read))
                  .map((notification) => (
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

                      {/* {notification.type === 'match-request' ? (
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
                      ) : ( */}
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
                      {/* )} */}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default NotificationPage;
