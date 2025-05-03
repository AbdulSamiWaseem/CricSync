import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import './settings.css';
import Logo from '../../assets/logo.png';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Added phone number field
    profile_photo: null, // Added profile photo field
  });

  const [teamData, setTeamData] = useState({
    teamName: '',
    logo: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
    fetchTeamDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/profile/');
      setFormData((prev) => ({
        ...prev,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone, // Assuming the backend sends phone number
      }));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchTeamDetails = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/team/profile/');
      setTeamData({
        teamName: res.data.team_name,
        logo: res.data.logo_url,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team:', error);
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
    const { files } = e.target;
    setFormData((prev) => ({
      ...prev,
      profile_photo: files[0],
    }));
  };

  const handleUpdate = async () => {
    const { name, email, phone, profile_photo } = formData;

    // Create FormData to send the profile photo
    const updatedData = new FormData();
    updatedData.append('name', name);
    updatedData.append('email', email);
    updatedData.append('phone', phone);
    if (profile_photo) {
      updatedData.append('profile_photo', profile_photo);
    }

    try {
      await axios.put('http://localhost:8000/api/user/update/', updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete('http://localhost:8000/api/user/delete/');
        alert('Account deleted!');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="settings-container">
          <div className="settings-header">
            <img className="team-logo" src={Logo} alt="Team Logo" />
            <h2 className="team-name">FAST XI</h2>
          </div>

          <div className="settings-form">
            <h4>Edit Profile</h4>
            <label>Name</label>
            <input
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              className="form-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              className="form-input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Profile Photo</label>
            <input
              type="file"
              className="form-input"
              onChange={handleFileChange}
            />

            <div className="btn-group">
              <button className="btn save-btn" onClick={handleUpdate}>
                Save Changes
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
