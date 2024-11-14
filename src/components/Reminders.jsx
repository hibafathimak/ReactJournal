import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { addReminderToUserAPI, deleteReminderFromUserAPI } from '../services/allAPI'; // Import the API functions

const Reminders = () => {
    const [addReminder, setAddReminder] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [reminder, setReminder] = useState("");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // Fetch reminders from the server when the component mounts
        const fetchReminders = async () => {
            const userId = JSON.parse(sessionStorage.getItem("user")).id;
            try {
                const user = await fetchUserAPI(userId);
                setReminders(user.reminders || []);
            } catch (error) {
                console.log('Failed to fetch reminders. Please try again.');
            }
        };
        fetchReminders();
    }, []);

    const handleReminderClose = () => setAddReminder(false);
    const handleReminderShow = () => setAddReminder(true);

    const handleReminderSubmit = async (e) => {
        e.preventDefault();
        const reminderData = { reminder, date };
        const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
        try {
            await addReminderToUserAPI(userId, reminderData);
            setReminders([...reminders, reminderData]);
            setReminder("");
            setDate(new Date());
            handleReminderClose();
        } catch (error) {
            alert('Failed to add reminder. Please try again.');
        }
    };

    const deleteReminder = async (indexToDelete) => {
        const userId = JSON.parse(sessionStorage.getItem("user")).id; // Get the user ID from session storage
        try {
            await deleteReminderFromUserAPI(userId, indexToDelete);
            setReminders(reminders.filter((_, index) => index !== indexToDelete));
        } catch (error) {
            alert('Failed to delete reminder. Please try again.');
        }
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h1>Reminders</h1>
                <span className='fs-5'>
                    <i onClick={handleReminderShow} style={{ cursor: 'pointer'}} className='fa-solid fa-pen'></i>
                </span>
            </div>
            <Modal centered show={addReminder} onHide={handleReminderClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD REMINDER</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
                    <Form>
                        <Form.Group controlId="formReminder">
                            <Form.Label>Reminder</Form.Label>
                            <Form.Control type="text" placeholder="Enter reminder" value={reminder} onChange={(e) => setReminder(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formDatetime">
                            <Form.Label>Date and Time</Form.Label>
                            <Datetime value={date} onChange={setDate} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReminderClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReminderSubmit}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
            <ul>
                {reminders.map((reminderObj, index) => (
                    <li key={index} className="d-flex justify-content-between align-items-center">
                        <span>
                            {reminderObj.reminder} on {new Date(reminderObj.date).toLocaleDateString()}
                        </span>
                        <i onClick={() => deleteReminder(index)} style={{ cursor: 'pointer' }} className="ms-2 fa-regular fa-trash-can text-dark"></i>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Reminders;
