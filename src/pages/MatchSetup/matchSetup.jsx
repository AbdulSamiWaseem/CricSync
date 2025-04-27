import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './matchSetup.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';

const MatchSetup = () => {
  const [formData, setFormData] = useState({
    city: '',
    area: '',
    date: '',
    time: '',
    format: '5-over',
    match_type: 'Quick',
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchCitiesAndAreas = async () => {
      try {
        // replace URLs with your actual endpoints
        const cityRes = await axios.get('http://localhost:8000/api/cities/');
        const areaRes = await axios.get('http://localhost:8000/api/areas/');
        setCities(cityRes.data);
        setAreas(areaRes.data);
      } catch (err) {
        console.error("Error fetching cities or areas:", err);
      }
    };
    fetchCitiesAndAreas();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/matches/create/', formData);
      alert('Match created successfully!');
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Failed to create match.');
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
                  <label className="item1">Select City</label>
                  <select name="city" onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="item2">Input Date</label>
                  <input name="date" type="date" onChange={handleChange} />
                </div>
              </div>
              <div className="second-col">
                <div className="form-group">
                  <label className="item1">Select Area</label>
                  <select name="area" onChange={handleChange}>
                    <option value="">Select Area</option>
                    {areas.map(area => (
                      <option key={area.id} value={area.name}>{area.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="item2">Input Time</label>
                  <input name="time" type="time" onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="dropdown-wrapper">
              <div className="dropdown-1">
                <label>Select Format</label>
                <select name="format" onChange={handleChange}>
                  <option>5-over</option>
                  <option>10-over</option>
                  <option>20-over</option>
                  <option>50-over</option>
                </select>
              </div>

              <div className="dropdown-2">
                <label>Select Match Type</label>
                <select name="match_type" onChange={handleChange}>
                  <option>Quick</option>
                  <option>Tournament</option>
                </select>
              </div>
            </div>

            <div className="submit">
              <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default MatchSetup;
