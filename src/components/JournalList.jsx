// src/components/JournalList.jsx

import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { fetchEntriesAPI, updateEntryAPI, deleteEntryAPI } from '../services/allAPI'; // Import the API functions
import { useEntries } from '../contexts/EntriesContext'; // Import the context

const JournalList = () => {
  const { entries, setEntries } = useEntries(); // Use the context
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [viewEntryShow, setViewEntryShow] = useState(false);
  const viewEntryHandleClose = () => setViewEntryShow(false);
  const viewEntryHandleShow = (entry) => {
    setSelectedEntry(entry);
    setViewEntryShow(true);
  };

  const [editEntryShow, setEditEntryShow] = useState(false);
  const editEntryHandleClose = () => setEditEntryShow(false);
  const editEntryHandleShow = (entry) => {
    setSelectedEntry(entry);
    setEditEntryShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
      try {
        const entries = await fetchEntriesAPI(userId);
        setEntries(entries);
      } catch (error) {
        alert('Failed to fetch entries. Please try again.');
      }
    };
    fetchData();
  }, [setEntries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEntry({ ...selectedEntry, [name]: value });
  };

  const handleSaveChanges = async () => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
    try {
      await updateEntryAPI(userId, selectedEntry);
      setEntries(entries.map(entry => (entry.date === selectedEntry.date ? selectedEntry : entry)));
      editEntryHandleClose();
    } catch (error) {
      alert('Failed to update entry. Please try again.');
    }
  };

  const handleDeleteEntry = async (entryDate) => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
    try {
      await deleteEntryAPI(userId, entryDate);
      setEntries(entries.filter(entry => entry.date !== entryDate));
    } catch (error) {
      alert('Failed to delete entry. Please try again.');
    }
  };

  return (
    <>
      {entries.map((entry) => (
        <div key={entry.date} className="border py-3 mb-4 px-5 rounded-5 d-flex justify-content-between align-items-center">
          <div>
            <h5 style={{ cursor: 'pointer' }} className='text-dark' onClick={() => viewEntryHandleShow(entry)}>
              {entry.title}
              <span className="ms-2 text-dark">{new Date(entry.date).toLocaleDateString()}</span>
            </h5>
          </div>
          <div>
            <i style={{ cursor: 'pointer' }} onClick={() => editEntryHandleShow(entry)} className="fa-solid fa-pen-to-square text-dark me-5"></i>
            <i style={{ cursor: 'pointer' }} onClick={() => handleDeleteEntry(entry.date)} className="fa-regular fa-trash-can text-dark"></i>
          </div>
        </div>
      ))}

      <Modal centered show={viewEntryShow} onHide={viewEntryHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>VIEW ENTRY</h1>
            <h5 className='ms-auto'>{new Date(selectedEntry?.date).toLocaleDateString()}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedEntry?.content}</p>
          <span>MOOD: {selectedEntry?.mood}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={viewEntryHandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={editEntryShow} onHide={editEntryHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEntryTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={selectedEntry?.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEntryContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                name="content"
                value={selectedEntry?.content}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEntryMood" className="mt-3">
              <Form.Label>Mood</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mood"
                name="mood"
                value={selectedEntry?.mood}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editEntryHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JournalList;
