import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosConfig";
import "../styles/EventsTheme.css";   // <-- external CSS

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const loadEvents = async () => {
    try {
      const response = await api.get("/user/listEvents");
      setEvents(response.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container className="pt-5 mt-5">
      <h2 className="text-center mb-5 events-title">Upcoming Events</h2>

      <Row>
        {events.map((event, index) => (
          <Col key={index} md={4} className="mb-4">

            <Card
              className="event-card-theme"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="event-img-box">
                <span>No Image</span>
              </div>

              <Card.Body>
                <Badge bg="primary" className="mb-2">LIVE</Badge>

                <Card.Title className="fw-bold text-white">
                  {event.title}
                </Card.Title>

                <Card.Text className="text-light opacity-75">
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
