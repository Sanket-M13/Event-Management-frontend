import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosConfig";

const ManagerEvents = () => {
  const { managerId } = useParams();
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const resp = await api.get(`/admin/managers/${managerId}/events`);
    console.log(resp);
    
    setEvents(resp.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container className="mt-4 pt-5">
      <h2 className="fw-bold mb-3">Manager {managerId} - Events</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>City</th>
            <th>Status</th>
            <th>Active</th>
          </tr>
        </thead>

        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td>{ev.city}</td>
              <td>{ev.status}</td>
              <td>{ev.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManagerEvents;
