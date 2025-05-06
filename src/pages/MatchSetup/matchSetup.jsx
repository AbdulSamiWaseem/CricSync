import React, { useState, useEffect } from 'react';
import './matchSetup.css';
import api from '../../utils/api'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import { toast } from 'react-toastify';

const MatchSetup = () => {
  const [formData, setFormData] = useState({
    date: "",
    from_time: "",
    to_time: "",
    team_name: "",
    city_id: "",
    location_id: "",
    format_id: ""
  });

  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityRes, locationRes, formatRes, userRes] = await Promise.all([
          api.get('/cities/'),
          api.get('/locations/'),
          api.get('/formats/'),
          api.get('/profile/')
        ]);
        setCities(cityRes.data);
        setLocations(locationRes.data);
        setFormats(formatRes.data);
        setFormData(prev => ({
          ...prev,
          team_name: userRes.data.id
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'city_id' || name === 'location_id' || name === 'format_id' ? parseInt(value) : value
    }));
  };

  const initialFormData = {
    date: "",
    from_time: "",
    to_time: "",
    team_name: "",
    city_id: "",
    location_id: "",
    format_id: ""
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/matchsetups/', formData);
      toast.success('Match created successfully!');

      // Clear form after success
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating match:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.detail || 'Failed to create match.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };




  return (
    <DashboardHeader>
      <Sidebar>
        <div className="match-setup" style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }}>
          <div className="match-setup-section container">
            <div className="form-container">
              <div className="first-col">
                <div className="form-group">
                  <label>Select City</label>
                  <select name="city_id" onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input name="date" type="date" onChange={handleChange} />
                </div>
              </div>

              <div className="second-col">
                <div className="form-group">
                  <label>Select Location</label>
                  <select name="location_id" onChange={handleChange}>
                    <option value="">Select Location</option>
                    {locations
                      .filter(loc => loc.city_id === formData.city_id) // 🔍 Filter by selected city
                      .map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Time</label>
                  <input name="from_time" type="time" onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="dropdown-wrapper">
              <div className="form-group">
                <label>Finish Time</label>
                <input name="to_time" type="time" onChange={handleChange} />
              </div>
              <div className="form-group dropdown-1">
                <label>Select Format</label>
                <select name="format_id" onChange={handleChange}>
                  <option value="">Select Format</option>
                  {formats.map(format => (
                    <option key={format.id} value={format.id}>{format.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="submit">
              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                ) : (
                  'Submit'
                )}
              </button>

            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default MatchSetup;
