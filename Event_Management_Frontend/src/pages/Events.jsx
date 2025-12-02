import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosConfig";
import "../styles/EventsTheme.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const loadEvents = async () => {
    try {
      const response = await api.get("/user/listEvents");
      console.log(response.data);
      setEvents(response.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Fallback image (if categoryImage is null or missing)
  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200";

  return (
    <Container className="pt-5 mt-5">
      <h2 className="text-center mb-5 events-title">Upcoming Events</h2>

      <Row>
        {events.map((event) => (
          <Col key={event.id} md={4} className="mb-4">
            <Card
              className="event-card-theme"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="event-img-box">
                <img
                  src={event.categoryImage}
                  alt={event.title}
                />
              </div>

              <Card.Body>
                <Card.Title className="fw-bold">{event.title}</Card.Title>
                <Card.Text>
                  <strong>City:</strong> {event.city} <br />
                  <strong>Price:</strong> ₹{event.price} <br />
                  <strong>Date:</strong> {new Date(event.startOn).toLocaleDateString()}
                </Card.Text>

                <Button
                  className="btn-gradient w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/events/${event.id}/register`);
                  }}
                >
                  Register
                </Button>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
