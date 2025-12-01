import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { api } from "../api/axiosConfig";

const ViewEventRegistrations = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET All registrations of an event
  const loadRegistrations = async () => {
    try {
      const resp = await api.get(`/manager/event/${eventId}/attendees`);
      setRegistrations(resp.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading registrations", error);
      setLoading(false);
    }
  };

  // Cancel a specific attendee registration
  const cancelUserRegistration = async (attendeeId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?"))
      return;

    try {
      await api.patch(`/manager/event/${eventId}/attendees/${attendeeId}`);
      alert("Registration canceled!");
      loadRegistrations();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel registration");
    }
  };

  // Cancel entire event
  const cancelEvent = async () => {
    if (!window.confirm("Are you sure you want to CANCEL the entire event?"))
      return;

    try {
      await api.patch(`/manager/event/${eventId}`);
      alert("Event canceled successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to cancel event");
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Event Registrations</h2>
      <p>Event ID: {eventId}</p>

      <Button variant="danger" className="mb-3" onClick={cancelEvent}>
        Cancel Entire Event
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : registrations.length === 0 ? (
        <p>No attendees registered for this event.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Attendee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((attendee) => (
              <tr key={attendee.id}>
                <td>{attendee.id}</td>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.registeredOn?.split("T")[0]}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => cancelUserRegistration(attendee.id)}
                  >
                    Cancel Registration
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewEventRegistrations;
