import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { api } from "../../api/axiosConfig";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const resp = await api.get("/admin/events");
    setEvents(resp.data);
  };

  const deactivateEvent = async (id) => {
    if (!window.confirm("Deactivate this event?")) return;

    await api.patch(`/admin/events/${id}/deactivate`);
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container className="mt-4 pt-5">
      <h2 className="fw-bold mb-3">All Events</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>City</th>
            <th>Price</th>
            <th>Status</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td>{ev.city}</td>
              <td>₹{ev.price}</td>
              <td>{ev.status}</td>
              <td>{ev.active ? "Yes" : "No"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deactivateEvent(ev.id)}
                  disabled={!ev.active}
                >
                  Deactivate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminEvents;
