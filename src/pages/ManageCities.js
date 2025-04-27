import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const ManageCities = () => {
  const [cities, setCities] = useState([]);
  const [show, setShow] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleClose = () => {
    setShow(false);
    setCityInput('');
    setEditIndex(null);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...cities];
      updated[editIndex] = cityInput;
      setCities(updated);
    } else {
      setCities([...cities, cityInput]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setCityInput(cities[index]);
    setEditIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = cities.filter((_, i) => i !== index);
    setCities(updated);
  };

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
          {cities.map((city, index) => (
            <tr key={index}>
              <td>{city}</td>
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
          <Modal.Title>{editIndex !== null ? 'Edit City' : 'Add City'}</Modal.Title>
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

