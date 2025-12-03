import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Card, Button, Row, Col } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import "../styles/MyEvents.css";

const MyEvents = () => {
  const userId = localStorage.getItem("userId");

  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  const loadUpcoming = async () => {
    try {
      const resp = await api.get(`/user/${userId}/events/upcoming`);
      console.log(resp);
      
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


  const generatePremiumTicket = async (ev) => {
  try {
    const serial = "TKT-" + Math.floor(100000 + Math.random() * 900000);
    const userName = localStorage.getItem("userName") || "User";
    const lastName = localStorage.getItem("lastName");

    const qrData = await QRCode.toDataURL(
      `${serial}|${userName}|${ev.title}|${ev.startOn}`
    );

    const doc = new jsPDF("p", "mm", "a4");

  
    doc.setFillColor(33, 57, 112); 
    doc.rect(0, 0, 210, 28, "F");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("EVENT TICKET", 105, 18, { align: "center" });

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(15, 40, 180, 140);


    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(ev.title, 25, 55);

    doc.setFontSize(12);

    let y = 70;

    const fields = [
      `Ticket ID: ${serial}`,
      `Name: ${userName} ${lastName}`,
      `Organization: ${ev.organization}`,
      `City: ${ev.city}`,
      `Date and time: ${new Date(ev.startOn).toLocaleString()}`
    ];

    fields.forEach((line) => {
      doc.text(line, 25, y);
      y += 10;
    });


    doc.addImage(qrData, "PNG", 140, 70, 40, 40);

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(11);
    doc.text("Scan QR at the event entrance", 160, 115, { align: "center" });

    doc.save(`${ev.title}-Ticket.pdf`);
  } catch (err) {
    console.error("Ticket generation failed:", err);
  }
};

  return (
    <Container className="my-events-page mt-4">
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
                    <Button
                      variant="info"
                      className="mt-2"
                      onClick={() => generatePremiumTicket(ev)}
                    >
                      Generate Ticket
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
