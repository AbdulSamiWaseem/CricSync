import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import api from '../utils/api'; // Adjust the path if needed

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [locationName, setLocationName] = useState('');
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editLocationId, setEditLocationId] = useState(null);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get('/cities/');
        setCities(res.data);
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };

    fetchCities();
  }, []);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/locations/');
        setLocations(res.data);
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    fetchLocations();
  }, []);

  const handleClose = () => {
    setShow(false);
    setSelectedCity('');
    setLocationName('');
    setEditIndex(null);
    setEditLocationId(null);
  };

  const handleShow = () => setShow(true);

  const handleSave = async () => {
    if (!selectedCity || !locationName.trim()) return;

    const payload = {
      name: locationName.trim(),
      city_id: parseInt(selectedCity),
    };

    try {
      if (editIndex !== null) {
        // Update
        await api.put(`/locations/${editLocationId}/`, payload);
      } else {
        // Create
        await api.post('/locations/', payload);
      }

      // Refresh data
      const res = await api.get('/locations/');
      setLocations(res.data);
      handleClose();
    } catch (err) {
      console.error('Error saving location:', err);
    }
  };

  const handleEdit = (index) => {
    const loc = locations[index];
    setSelectedCity(loc.city_id.toString());
    setLocationName(loc.name);
    setEditIndex(index);
    setEditLocationId(loc.id);
    handleShow();
  };

  const handleDelete = async (index) => {
    const location = locations[index];
    try {
      await api.delete(`/locations/${location.id}/`);
      setLocations(locations.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Error deleting location:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Locations (Areas in Cities)</h2>
      <Button variant="success" className="mb-3" onClick={handleShow}>
        + Add New Location
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>City</th>
            <th>Location Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, index) => (
            <tr key={loc.id}>
              <td>{cities.find((c) => c.id === loc.city_id)?.name || 'Unknown'}</td>
              <td>{loc.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>✏️</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Location' : 'Add Location'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="citySelect">
              <Form.Label>Select City</Form.Label>
              <Form.Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">-- Select City --</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3" controlId="locationName">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter area name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageLocations;
