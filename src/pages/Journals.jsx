import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Footer from '../components/Footer';
import JournalEntry from '../components/JournalEntry';
import JournalList from '../components/JournalList';
import Reminders from '../components/Reminders';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import MoodTracker from '../components/MoodTracker';
import VisionBoard from '../components/VisionBoard';
import {  saveUserThemeAPI } from '../services/allAPI'; // Import the theme API functions

const Journals = () => {
  const userId = JSON.parse(sessionStorage.getItem("user")).id;

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}-${date}-${year}`;
  }

  const [currentDate, setCurrentDate] = useState(getDate());
  const [addEntryShow, setAddEntryShow] = useState(false);
  const entryhandleClose = () => setAddEntryShow(false);
  const entryhandleShow = () => setAddEntryShow(true);
  const name = JSON.parse(sessionStorage.getItem("user")).name;

  const defaultTheme = { 
    bgColor: '#A0D683', 
    bgImage: "https://64.media.tumblr.com/86d527e947135567f1b759deba2c12b3/8dd9ec8e84e90a09-11/s1280x1920/0ab392e5e2d6fc7ed047fb0ff6b84c75bf47d937.jpg",
    profileImg: "https://i.pinimg.com/564x/8a/dc/57/8adc57bcd3d3af88f34ff524fe7a136f.jpg"
  };
  
  const themes = {
    theme1: { bgColor: '#A0D683', bgImage: "https://64.media.tumblr.com/86d527e947135567f1b759deba2c12b3/8dd9ec8e84e90a09-11/s1280x1920/0ab392e5e2d6fc7ed047fb0ff6b84c75bf47d937.jpg", profileImg: 'https://i.pinimg.com/564x/8a/dc/57/8adc57bcd3d3af88f34ff524fe7a136f.jpg' },
    theme2: { bgColor: "#a1785c", bgImage: 'https://i.pinimg.com/originals/d4/ad/6f/d4ad6f97bd3663dcd0b7aaeff68b871f.png', profileImg: 'https://i.pinimg.com/736x/7d/ca/72/7dca72edb2f704722b77714e9156f0a9.jpg' },
    theme3: { bgColor: '#987D9A', bgImage: 'https://www.agood.com/cdn/shop/articles/how-to-start-a-diary-banner.jpg?v=1689687000&width=1500', profileImg: 'https://i.pinimg.com/236x/8e/86/c8/8e86c80bb3ba1d335e2ae42cc391c4cf.jpg' }
  };

  const [theme, setTheme] = useState(defaultTheme);

  const handleSelect = async (themeKey) => {
    const selectedTheme = themes[themeKey];
    setTheme(selectedTheme);
    await saveUserThemeAPI(userId, selectedTheme); // Save the selected theme to the server
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const savedTheme = await fetchUserThemeAPI(userId);
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error('Failed to fetch user theme:', error);
      }
    };
    fetchTheme();
  }, [userId]);

  return (
    <>
      <Header logOut={true} />
      <div style={{ minHeight: '100vh' }} className='w-100 pe-5 ps-5 bg-primary border-bottom pb-5 text-light'>
        <div className='d-flex w-100' style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
          <img className='w-100' style={{ height: '100%', overflow: 'hidden', position: 'relative' }} src={theme.bgImage} alt="" />
          <DropdownButton className='position-absolute z-3 top-0 end-0 mt-3 me-4' id="dropdown-basic-button" title="Select Theme" onSelect={handleSelect}>
            <Dropdown.Item eventKey="theme1">Theme 1</Dropdown.Item>
            <Dropdown.Item eventKey="theme2">Theme 2</Dropdown.Item>
            <Dropdown.Item eventKey="theme3">Theme 3</Dropdown.Item>
          </DropdownButton>
        </div>
        <img width={'120px'} style={{ marginTop: '380px', marginLeft: '150px' }} className='border position-absolute rounded-circle z-3 top-0 start-0 img-fluid' src={theme.profileImg} alt="" />
        <h3 style={{ marginLeft: '280px' }} className='text-light mt-4'>{name}</h3>
        <div className="w-100 px-3 my-5 d-flex justify-content-between">
          <h1 className='mt-5 pt-5 text-light'> My Journals</h1>
          <h1 style={{ height: '50px', color: theme.bgColor }} className='pt-2 pb-5 px-3 rounded shadow border me-3 '>
            {currentDate}
          </h1>
        </div>
        <Row className='p-5 w-100'>
          <Col className='' sm={4}>
            <div style={{ backgroundColor: theme.bgColor }} className='text-light rounded-1 shadow p-3'>
              <Reminders />
            </div>
          </Col>
          <Col sm={8}>
            <div style={{ backgroundColor: "white" }} className='rounded-1 shadow p-4'>
              <div className='d-flex justify-content-between'>
                <h1>ALL ENTRIES</h1>
                <h5>
                  ADD ENTRY <i onClick={entryhandleShow} style={{ cursor: 'pointer' }} className="ms-2 fa-regular fa-square-plus"></i>
                </h5>
              </div>
              <JournalList />
            </div>
            <Modal centered show={addEntryShow} onHide={entryhandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>ADD ENTRY</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
                <JournalEntry onClose={entryhandleClose} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={entryhandleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <div className='d-flex px-5'>
          <div style={{ width: '75%' }} className='me-3 p-3 border rounded'>
            <VisionBoard />
          </div>
          <div style={{ width: '25%', backgroundColor: theme.bgColor }} className='mx-3 p-3 border rounded'>
            <MoodTracker />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Journals;
