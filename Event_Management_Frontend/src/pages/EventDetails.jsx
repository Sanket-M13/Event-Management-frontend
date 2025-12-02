import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const loadEvent = async () => {
    try {
      const response = await api.get(`/user/event/${id}`);
      console.log("Event Details:", response.data);
      setEvent(response.data);
    } catch (error) {
      console.error("Error loading event details:", error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  if (!event) return <h3 className="text-center mt-5">Loading...</h3>;

  const imageUrl = event.categoryImage
    ? event.categoryImage
    : "/event-images/default.jpg";

  return (
    <Container className="mt-5 pt-5">
      <Card className="event-details-card shadow-lg p-4">

        <div className="event-details-image-wrapper">
          <img
            src={imageUrl}
            className="event-details-image"
            alt={event.title}
          />
        </div>

        <h2 className="fw-bold mt-3 event-title-text">{event.title}</h2>

        <p><strong>Organization:</strong> {event.organization}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>City:</strong> {event.city}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Start Date:</strong> {new Date(event.startOn).toLocaleString()}</p>
        <p><strong>End Date:</strong> {new Date(event.endOn).toLocaleString()}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>
        <p><strong>Price:</strong> ₹{event.price}</p>
        <p><strong>Category:</strong> {event.categoryName}</p>

        <Button
          className="btn-gradient w-100 mt-3"
          size="lg"
          onClick={() => navigate(`/events/${event.id}/register`)}
        >
          Register for Event
        </Button>

      </Card>
    </Container>
  );
};

export default EventDetails;
