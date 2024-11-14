// src/components/MoodTracker.jsx

import React, { useEffect } from 'react';
import { Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useEntries } from '../contexts/EntriesContext'; // Import the context
import { fetchMoodEntriesAPI } from '../services/allAPI'; // Import the API function

const MoodTracker = () => {
    const { entries, setEntries } = useEntries(); // Use the context

    useEffect(() => {
        const fetchData = async () => {
            const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
            try {
                const fetchedEntries = await fetchMoodEntriesAPI(userId);
                setEntries(fetchedEntries);
            } catch (error) {
                alert('Failed to fetch mood entries. Please try again.');
            }
        };
        fetchData();
    }, [setEntries]);

    return (
        <>
            <Row className=' mb-3'>
                <h2 className="text-center text-light">Mood Tracker</h2>
                <hr />
            </Row>
            <Row>
                <div className="mt-2">
                    <div className="">
                        {entries.map((entry, index) => (
                            <div key={index} className="mb-3 text-light d-flex justify-content-between">
                                <div><strong>Mood:</strong> {entry.mood}</div>
                                <div><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Row>
        </>
    );
};

export default MoodTracker;
