import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Card, Button, Row, Col } from "react-bootstrap";
import { api } from "../api/axiosConfig";

const MyEvents = () => {
  const userId = localStorage.getItem("userId");

  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  const loadUpcoming = async () => {
    try {
      const resp = await api.get(`/user/${userId}/events/upcoming`);
      setUpcoming(resp.data);
    } catch (err) {
      console.error("Error loading upcoming events:", err);
    }
  };

  const loadCompleted = async () => {
    try {
      const resp = await api.get(`/user/${userId}/events/completed`);
      setCompleted(resp.data);
    } catch (err) {
      console.error("Error loading completed events:", err);
    }
  };

  const loadAll = () => {
    loadUpcoming();
    loadCompleted();
  };

  useEffect(() => {
    loadAll();
  }, []);

  const cancelRegistration = async (eventId) => {
    if (!window.confirm("Cancel registration for this event?")) return;

    try {
      await api.patch(`/user/${userId}/events/${eventId}/register`);
      alert("Registration cancelled!");
      loadUpcoming(); 
    } catch (err) {
      console.error(err);
      alert("Failed to cancel registration");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-3">My Events</h2>

      <Tabs defaultActiveKey="upcoming" className="mb-3">

        <Tab eventKey="upcoming" title="Upcoming Events">
          {upcoming.length === 0 ? (
            <p>No upcoming events registered.</p>
          ) : (
            <Row>
             {[...new Map(upcoming.map(ev => [ev.id, ev])).values()].map(ev => (
                <Col md={6} key={ev.id} className="mb-3">
                  <Card className="shadow-sm p-3">
                    <h4>{ev.title}</h4>
                    <p><strong>Organization:</strong> {ev.organization}</p>
                    <p><strong>City:</strong> {ev.city}</p>
                    <p><strong>Price:</strong> ₹{ev.price}</p>
                    <p><strong>Date:</strong> {new Date(ev.startOn).toLocaleString()}</p>

                    <Button
                      variant="danger"
                      onClick={() => cancelRegistration(ev.id)}
                    >
                      Cancel Registration
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="completed" title="Completed Events">
          {completed.length === 0 ? (
            <p>No completed events.</p>
          ) : (
            <Row>
              {completed.map((ev) => (
                <Col md={6} key={ev.id} className="mb-3">
                  <Card className="shadow-sm p-3">
                    <h4>{ev.title}</h4>
                    <p><strong>Organization:</strong> {ev.organization}</p>
                    <p><strong>City:</strong> {ev.city}</p>
                    <p><strong>Price:</strong> ₹{ev.price}</p>
                    <p><strong>Date:</strong> {new Date(ev.startOn).toLocaleString()}</p>

                    <span className="badge bg-success">Completed</span>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

      </Tabs>
    </Container>
  );
};

export default MyEvents;
