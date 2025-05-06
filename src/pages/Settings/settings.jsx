import React, { useEffect, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import './settings.css';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Settings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    profile_picture: null,
  });

  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('profile/');
      const data = res.data;

      setFormData({
        username: data.username || '',
        email: data.email || '',
        phone_number: data.phone_number || '',
        profile_picture: null,
      });

      setPreviewImage(data.profile_picture || '');
    } catch (error) {
      toast.error('Failed to load profile.');
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_picture: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const updatedData = new FormData();
    updatedData.append('username', formData.username);
    updatedData.append('email', formData.email);
    updatedData.append('phone_number', formData.phone_number || '');

    if (formData.profile_picture) {
      updatedData.append('profile_picture', formData.profile_picture);
    }

    setUpdating(true);
    try {
      await api.put('/profile/', updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await api.delete('/profile/');
        toast.success('Account deleted!');
        navigate('/login');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete account');
      }
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="settings-container">
          <div className="settings-header">
            <h2 className="team-name">Team Settings</h2>
          </div>

          <div className="settings-form">
            <h4>Edit Profile</h4>

            <label>Username *</label>
            <input
              className="form-input"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email *</label>
            <input
              className="form-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              className="form-input"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />

            <label>Profile Photo</label>
            <input
              type="file"
              className="form-input"
              onChange={handleFileChange}
              accept="image/*"
            />

            {previewImage && (
              <div className="image-preview">
                <p>Preview:</p>
                <img src={previewImage} alt="Preview" className="preview-img" />
              </div>
            )}

            <div className="btn-group">
              <button className="btn save-btn" onClick={handleUpdate} disabled={updating}>
                {updating ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button className="btn delete-btn" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default Settings;
