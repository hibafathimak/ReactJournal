import React from 'react';
import { Carousel, Card, Container } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      feedback: "This journaling app has transformed my daily routine. I love being able to look back and see my progress!",
      image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
      location: "New York, USA"
    },
    {
      name: "John Smith",
      feedback: "Easy to use and beautifully designed. Journaling has never been so enjoyable!",
      image: "https://img.freepik.com/free-photo/young-bearded-man-with-round-glasses-denim-shirt_273609-12127.jpg",
      location: "Toronto, Canada"
    },
    {
      name: "Maria Garcia",
      feedback: "A perfect tool for self-reflection and personal growth. Highly recommended!",
      image: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
      location: "Madrid, Spain"
    }
  ];

  return (
    <Container className="my-5 py-5">
      <h2 className="text-center text-light mb-4">What Our Users Say</h2>
      <Carousel indicators={false} controls={true} interval={5000}>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index} className="text-center">
            <Card className="mx-auto shadow-sm border-0 bg-primary" style={{ maxWidth: '600px' }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={testimonial.image}
                  alt={`${testimonial.name}'s photo`}
                  className="rounded-circle mx-auto"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <Card.Text className="mt-4 text-light fst-italic">
                  "{testimonial.feedback}"
                </Card.Text>
                <Card.Title className="mt-3 text-light">{testimonial.name}</Card.Title>
                <Card.Subtitle className="text-muted">{testimonial.location}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
