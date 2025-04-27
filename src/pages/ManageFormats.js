import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const ManageFormats = () => {
  const [formats, setFormats] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [overs, setOvers] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleClose = () => {
    setShow(false);
    setName('');
    setOvers('');
    setEditIndex(null);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = () => {
    if (!name || !overs) return;
    const newFormat = { name, overs };

    if (editIndex !== null) {
      const updated = [...formats];
      updated[editIndex] = newFormat;
      setFormats(updated);
    } else {
      setFormats([...formats, newFormat]);
    }

    handleClose();
  };

  const handleEdit = (index) => {
    const format = formats[index];
    setName(format.name);
    setOvers(format.overs);
    setEditIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = formats.filter((_, i) => i !== index);
    setFormats(updated);
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
          {formats.map((format, index) => (
            <tr key={index}>
              <td>{format.name}</td>
              <td>{format.overs}</td>
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
          <Modal.Title>{editIndex !== null ? 'Edit Format' : 'Add Format'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formatName">
              <Form.Label>Format Name</Form.Label>
              <Form.Control
                as="select"
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="">Select format</option>
                <option value="T10">T10</option>
                <option value="T20">T20</option>
                <option value="ODI">ODI</option>
                <option value="Test">Test</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="overs" className="mt-3">
              <Form.Label>Overs</Form.Label>
              <Form.Control
                as="select"
                value={overs}
                onChange={(e) => setOvers(e.target.value)}
              >
                <option value="">Select overs</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Form.Control>
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
