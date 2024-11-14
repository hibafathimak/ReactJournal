// src/components/JournalEntry.jsx

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { addEntryToUserAPI } from '../services/allAPI'; // Import the new function
import { useEntries } from '../contexts/EntriesContext'; // Import the context

const JournalEntry = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('');
    const { entries, setEntries } = useEntries(); // Use the context

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleMoodChange = (e) => setMood(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const entryData = {
            title,
            content,
            mood,
            date: new Date().toISOString(),
        };
        const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
        try {
            await addEntryToUserAPI(userId, entryData);
            setEntries([...entries, entryData]); // Add new entry to the context
            alert('Entry added successfully!');
            onClose(); // Close the modal after adding the entry
        } catch (error) {
            alert('Failed to add entry. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleTitleChange} className='form-control bg-light mb-3' placeholder='ENTER TITLE' value={title} />
            <textarea onChange={handleContentChange} style={{ backgroundColor: 'wheat' }} className='form-control bg-light mb-3' type="text" placeholder='ENTRY TEXT' value={content} />
            <span>MOOD : </span>
            <Form.Group controlId="entryMood" className="mb-3">
                <Form.Select value={mood} onChange={handleMoodChange} aria-label="Mood Selector">
                    <option value="">Select your mood</option>
                    <option value="happy">Happy 😊</option>
                    <option value="sad">Sad 😢</option>
                    <option value="anxious">Anxious 😰</option>
                    <option value="excited">Excited 😄</option>
                    <option value="neutral">Neutral 😐</option>
                </Form.Select>
            </Form.Group>
            <button type="submit" className="btn btn-primary mt-3">Add Entry</button>
        </form>
    );
};

export default JournalEntry;
