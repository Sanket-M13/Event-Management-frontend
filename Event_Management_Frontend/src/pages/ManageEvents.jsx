import { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import "../styles/ManageEvents.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const managerId = localStorage.getItem("userId");

  const [showEdit, setShowEdit] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [showRegs, setShowRegs] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);


  // Load All Events Created by Manager
  const loadEvents = async () => {
    try {
      const resp = await api.get(`/manager/event/${managerId}`);
      setEvents(resp.data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  // Load event for editing
  const handleEdit = async (event) => {
    try {
      const resp = await api.get(`/user/event/${event.id}`);
      setCurrentEvent(resp.data);
      setShowEdit(true);
    } catch (err) {
      console.error("Failed to load event details", err);
    }
  };

  // Save edited details
  const saveChanges = async () => {
    try {
      const payload = {
        ...currentEvent,
        managerId: managerId,
        categoryName: currentEvent.categoryName,
        startOn: currentEvent.startOn,
        endOn: currentEvent.endOn,
        status: currentEvent.status,
        isActive: currentEvent.isActive,
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


  const viewRegistrations = async (eventId) => {
    try {
      setSelectedEventId(eventId);
      const resp = await api.get(`/manager/event/${eventId}/attendees`);
      setRegistrations(resp.data);
      setShowRegs(true);
    } catch (err) {
      console.error("Failed to load registrations", err);
      alert("Unable to fetch registration list");
    }
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
          <p className="event-city">
            <strong>City:</strong> {event.city}
          </p>

          <div className="button-row">
            <Button
              variant="outline-warning" // Changed to outline
              className="btn-edit"
              onClick={() => handleEdit(event)}
            >
              Edit
            </Button>

            <Button
              variant="danger"
              className="btn-delete"
              onClick={() => deleteEvent(event.id)}
            >
              Delete
            </Button>

            <Button
              variant="custom" // Custom variant to ensure gradient works without bootstrap conflict
              className="btn-register btn-gradient" // Added btn-gradient class
              onClick={() => viewRegistrations(event.id)}
            >
              View Registrations
            </Button>
          </div>
        </Card>
      ))}

      {/* -------------------------- EDIT MODAL -------------------------- */}
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
                    setCurrentEvent({
                      ...currentEvent,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={currentEvent.city}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      city: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={currentEvent.price}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  value={currentEvent.venue}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      venue: e.target.value,
                    })
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
                      description: e.target.value,
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
            <Button variant="custom" className="btn-gradient" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* -------------------------- REGISTRATIONS MODAL -------------------------- */}
      <Modal show={showRegs} onHide={() => setShowRegs(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registered Users</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {registrations.length === 0 ? (
            <p>No users have registered for this event.</p>
          ) : (
            registrations.map((user, index) => (
              <Card key={index} className="mb-3 p-3 reg-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ fontSize: "1.1rem" }}>{user.name}</strong>
                    <p className="mb-1">
                      <strong>Email:</strong> {user.emailId}
                    </p>
                    <p className="mb-1">
                      <strong>Mobile:</strong> {user.phone}
                    </p>
                  </div>

                  {/* Cancel Registration */}
                  <Button
                    variant="outline-danger"
                    className="cancel-btn"
                    onClick={async () => {
                      if (!window.confirm("Cancel this user’s registration?")) return;

                      try {
                        await api.patch(
                          `/manager/event/${selectedEventId}/attendees/${user.userId}`
                        );

                        alert("Registration cancelled!");

                        // refresh list
                        viewRegistrations(selectedEventId);
                      } catch (err) {
                        console.error("Failed to cancel registration", err);
                        alert("Error while cancelling registration");
                      }
                    }}
                  >
                    Cancel
                  </Button>

                </div>
              </Card>
            ))
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegs(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageEvents;