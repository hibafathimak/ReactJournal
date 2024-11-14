import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Features.css';

const FeaturesSection = () => {
  return (
    <Container className="text-center my-1 features-section">
      <h2 className="mb-5 text-light">Our Features</h2>
      <Row className='mb-5'>
        <Col md={4}>
          <div className="feature-card">
            <i className="fa fa-edit feature-icon text-primary"></i>
            <h3>Easy Journaling</h3>
            <p>Effortlessly capture your thoughts, moments, and ideas with our user-friendly editor.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card ">
            <i className="fa fa-calendar-check feature-icon text-primary"></i>
            <h3>Reminders & Mood Tracker</h3>
            <p>Track your daily moods and reflect on your emotional journey over time.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <i className="fa fa-image feature-icon text-primary"></i>
            <h3>Vision Board</h3>
            <p>Create a visual representation of your goals and inspirations with our vision board feature.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturesSection;
