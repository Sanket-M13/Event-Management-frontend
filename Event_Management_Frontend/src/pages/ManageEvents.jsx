import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { api } from "../api/axiosConfig";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const managerId = localStorage.getItem("userId");

  const loadEvents = async () => {
    const resp = await api.get(`/manager/event/${managerId}`);
    setEvents(resp.data);
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await api.patch(`/manager/event/${id}/delete`);
    loadEvents();
  };
  
  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Manage My Events</h2>

      {events.map((event) => (
        <Card key={event.id} className="p-3 mb-3 shadow-sm">
          <h4>{event.title}</h4>
          <p>City: {event.city}</p>

          <div className="d-flex gap-2">
            <Button variant="warning">Edit</Button>
            <Button variant="danger" onClick={() => deleteEvent(event.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default ManageEvents;
