import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosConfig";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const loadEvent = async () => {
    try {
      const response = await api.get(`/user/event/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error loading event details:", error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  if (!event) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4 event-details-card">

        {/* Image Placeholder */}
        <div className="event-details-image">
          <span>No Image</span>
        </div>

        {/* TITLE */}
        <h2 className="fw-bold mt-3">{event.title}</h2>

        {/* ORGANIZATION */}
        <p className="text-muted">
          <strong>Organization:</strong> {event.organization}
        </p>

        {/* DESCRIPTION */}
        <p className="text-muted">
          <strong>Description:</strong> {event.description}
        </p>

        {/* CITY */}
        <p className="text-muted">
          <strong>City:</strong> {event.city}
        </p>

        {/* VENUE */}
        <p className="text-muted">
          <strong>Venue:</strong> {event.venue}
        </p>

        {/* START DATE */}
        <p className="text-muted">
          <strong>Start Date:</strong>{" "}
          {new Date(event.startOn).toLocaleString()}
        </p>

        {/* END DATE */}
        <p className="text-muted">
          <strong>End Date:</strong>{" "}
          {new Date(event.endOn).toLocaleString()}
        </p>

        {/* CAPACITY */}
        <p className="text-muted">
          <strong>Capacity:</strong> {event.capacity}
        </p>

        {/* PRICE */}
        <p className="text-muted">
          <strong>Price:</strong> ₹{event.price}
        </p>

        {/* CATEGORY */}
        <p className="text-muted">
          <strong>Category:</strong> {event.categoryName}
        </p>

        <Button
          variant="success"
          size="lg"
          className="mt-3 w-100"
          onClick={() => navigate(`/events/${event.id}/register`)}
        >
          Register for Event
        </Button>

      </Card>
    </Container>
  );
};

export default EventDetails;
