import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { api } from "../api/axiosConfig";

const RegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [showPayment, setShowPayment] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Step 1: validate name + email and open fake payment popup
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    setShowPayment(true);
  };

  // Step 2: fake payment, then call backend to register
  const handleFakePayment = async () => {
    setProcessingPayment(true);

    // simulate payment delay
    setTimeout(async () => {
      setProcessingPayment(false);
      setShowPayment(false);
      alert("💳 Payment Successful!");

      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("User not logged in. userId not found in localStorage.");
          return;
        }

        const resp = await api.post(`/user/${userId}/events/${eventId}/register`);
        console.log(resp.data);

        alert("✅ Event registration successful!");
        navigate("/my-events");


        // optional: go back to event details or events list
        // navigate(`/user/event/${eventId}`);
      } catch (err) {
        console.error(err);
        alert("❌ Something went wrong while registering for the event.");
      }
    }, 1500);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register for Event</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Proceed to Payment
        </Button>
      </Form>

      {/* Fake Payment Popup */}
      <Modal
        show={showPayment}
        onHide={() => (!processingPayment ? setShowPayment(false) : null)}
        centered
      >
        <Modal.Header closeButton={!processingPayment}>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Amount to pay: ₹100</p>
          <p>Thank you</p>

          <Button
            variant="success"
            className="w-100"
            disabled={processingPayment}
            onClick={handleFakePayment}
          >
            {processingPayment ? "Processing..." : "Pay & Confirm Registration"}
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RegisterEvent;
