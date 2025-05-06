import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import api from '../utils/api'; // Adjust the path if necessary

const ManageCities = () => {
  const [cities, setCities] = useState([]);
  const [show, setShow] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editCityId, setEditCityId] = useState(null);
  
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await api.get('/cities/');
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setCityInput('');
    setEditIndex(null);
    setEditCityId(null);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = async () => {
    if (editCityId !== null) {
      // Edit city
      try {
        await api.put(`/cities/${editCityId}/`, { name: cityInput });
        fetchCities(); // Re-fetch cities after update
      } catch (error) {
        console.error("Error updating city", error);
      }
    } else {
      // Add new city
      try {
        await api.post('/cities/', { name: cityInput });
        fetchCities(); // Re-fetch cities after adding
      } catch (error) {
        console.error("Error adding city", error);
      }
    }
    handleClose();
  };

  const handleEdit = (cityId, cityName) => {
    setCityInput(cityName);
    setEditCityId(cityId);
    handleShow();
  };

  const handleDelete = async (cityId) => {
    try {
      await api.delete(`/cities/${cityId}/`);
      fetchCities(); // Re-fetch cities after deletion
    } catch (error) {
      console.error("Error deleting city", error);
    }
  };

  // Protect route, check if user is admin
  const userIsAdmin = localStorage.getItem('role') === 'admin'; // Adjust based on how role is stored

  // if (!userIsAdmin) {
  //   return <div>You do not have permission to view this page.</div>;
  // }

  return (
    <div className="container mt-5">
      <h2>Manage Cities</h2>
      <Button variant="success" className="mb-3" onClick={handleShow}>
        + Add New City
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(city.id, city.name)}>✏️</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(city.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editCityId !== null ? 'Edit City' : 'Add City'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cityName">
              <Form.Label>City Name</Form.Label>
              <Form.Control
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCities;
