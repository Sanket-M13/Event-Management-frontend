import { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import "../styles/ManageEvents.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const managerId = localStorage.getItem("userId");

  const [showEdit, setShowEdit] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const loadEvents = async () => {
    try {
      const resp = await api.get(`/manager/event/${managerId}`);
      setEvents(resp.data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  // Fetch full event before editing
  const handleEdit = async (event) => {
    try {
      const resp = await api.get(`/user/event/${event.id}`); // FULL EVENT BODY
      setCurrentEvent(resp.data);
      setShowEdit(true);
    } catch (err) {
      console.error("Failed to load event details", err);
    }
  };

  // Save updated event
  const saveChanges = async () => {
    try {
      const payload = {
        ...currentEvent,
        managerId: managerId,  // required
        categoryName: currentEvent.categoryName, // required
        startOn: currentEvent.startOn,           // required
        endOn: currentEvent.endOn,               // required
        status: currentEvent.status,             // required
        isActive: currentEvent.isActive          // required
      };

      await api.put(`/manager/event/${currentEvent.id}`, payload);

      alert("Event updated successfully!");
      setShowEdit(false);
      loadEvents();

    } catch (err) {
      console.error(err);
      alert("Failed to update event.");
    }
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
    <Container className="manage-wrapper">
      <h2 className="manage-title">Manage My Events</h2>

      {events.length === 0 && (
        <p className="no-events">No events created yet.</p>
      )}

      {events.map((event) => (
        <Card key={event.id} className="manage-card">
          <h4 className="event-title">{event.title}</h4>
          <p className="event-city"><strong>City:</strong> {event.city}</p>

          <div className="button-row">
            <Button variant="warning" className="btn-edit"
              onClick={() => handleEdit(event)}>
              Edit
            </Button>
            <Button variant="danger" className="btn-delete"
              onClick={() => deleteEvent(event.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}

      {currentEvent && (
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={currentEvent.title}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={currentEvent.city}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, city: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={currentEvent.price}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, price: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  value={currentEvent.venue}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, venue: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={currentEvent.description}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      description: e.target.value
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ManageEvents;
