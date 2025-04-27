import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState(['Lahore', 'Karachi', 'Islamabad']); // You can load this dynamically too
  const [selectedCity, setSelectedCity] = useState('');
  const [locationName, setLocationName] = useState('');
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedCity('');
    setLocationName('');
    setEditIndex(null);
  };

  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!selectedCity || !locationName.trim()) return;

    const newLocation = {
      city: selectedCity,
      name: locationName
    };

    if (editIndex !== null) {
      const updated = [...locations];
      updated[editIndex] = newLocation;
      setLocations(updated);
    } else {
      setLocations([...locations, newLocation]);
    }

    handleClose();
  };

  const handleEdit = (index) => {
    const loc = locations[index];
    setSelectedCity(loc.city);
    setLocationName(loc.name);
    setEditIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = locations.filter((_, i) => i !== index);
    setLocations(updated);
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
            <tr key={index}>
              <td>{loc.city}</td>
              <td>{loc.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>✏️</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Location' : 'Add Location'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="citySelect">
              <Form.Label>Select City</Form.Label>
              <Form.Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">-- Select City --</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
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
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageLocations;
