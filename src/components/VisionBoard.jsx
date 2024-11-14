import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { addImageToVisionBoardAPI, deleteImageFromVisionBoardAPI, fetchUserAPI } from '../services/allAPI'; // Import the API functions

const VisionBoard = () => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      try {
        const user = await fetchUserAPI(userId);
        setImages(user.visionBoard || []);
      } catch (error) {
        alert('Failed to fetch vision board images. Please try again.');
      }
    };
    fetchImages();
  }, []);

  const handleAddImage = async () => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;
    try {
      await addImageToVisionBoardAPI(userId, imageUrl);
      setImages([...images, imageUrl]);
      setImageUrl('');
      setShow(false);
    } catch (error) {
      alert('Failed to add image. Please try again.');
    }
  };

  const handleRemoveImage = async (index) => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;
    try {
      await deleteImageFromVisionBoardAPI(userId, index);
      setImages(images.filter((_, i) => i !== index));
    } catch (error) {
      alert('Failed to delete image. Please try again.');
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row className='mb-3'>
        <h1 className='text-light'>Vision Board</h1>
        <div className='d-flex align-items-center justify-content-between'>
          <h3 className='text-light'>Gallery</h3>
          <Button onClick={handleShow} className='ms-3'>
            Add Image
            <i className="fa-regular fa-images ms-2"></i>
          </Button>
        </div>
        <hr />
      </Row>
      <Row>
        {images.map((image, index) => (
          <Col key={index} style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} sm={3}>
            <img width={'100%'} src={image} alt="" />
            <Button onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none' }}>
              <i style={{ cursor: 'pointer' }} className="fa-regular fa-trash-can text-dark"></i>
            </Button>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddImage}>
            Add Image
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VisionBoard;
