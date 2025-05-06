import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import api from '../utils/api'; // Adjust the path if needed

const ManageFormats = () => {
  const [formats, setFormats] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [overs, setOvers] = useState('');
  const [editFormat, setEditFormat] = useState(null);

  // Fetch all formats from backend
  const fetchFormats = async () => {
    try {
      const res = await api.get('/formats/');
      setFormats(res.data);
    } catch (err) {
      console.error('Error fetching formats:', err);
    }
  };

  useEffect(() => {
    fetchFormats();
  }, []);

  const handleClose = () => {
    setShow(false);
    setName('');
    setOvers('');
    setEditFormat(null);
  };

  const handleShow = () => setShow(true);

  const handleSave = async () => {
    if (!name || !overs) return;

    const formatData = {
      name,
      overs: parseInt(overs, 10)
    };

    try {
      if (editFormat) {
        await api.put(`/formats/${editFormat.id}/`, formatData);
      } else {
        await api.post('/formats/', formatData);
      }
      fetchFormats();
      handleClose();
    } catch (err) {
      console.error('Error saving format:', err);
    }
  };

  const handleEdit = (format) => {
    setName(format.name);
    setOvers(format.overs);
    setEditFormat(format);
    handleShow();
  };

  const handleDelete = async (formatId) => {
    try {
      await api.delete(`/formats/${formatId}/`);
      fetchFormats();
    } catch (err) {
      console.error('Error deleting format:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Formats</h2>
      <Button variant="success" className="mb-3" onClick={handleShow}>
        + Add New Format
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Overs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formats.map((format) => (
            <tr key={format.id}>
              <td>{format.name}</td>
              <td>{format.overs}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(format)}>✏️</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(format.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editFormat ? 'Edit Format' : 'Add Format'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formatName">
              <Form.Label>Format Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Format Name"
              />
            </Form.Group>
            <Form.Group controlId="overs" className="mt-3">
              <Form.Label>Overs</Form.Label>
              <Form.Control
                type="number"
                value={overs}
                onChange={(e) => setOvers(e.target.value)}
                placeholder="Enter Overs"
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

export default ManageFormats;
