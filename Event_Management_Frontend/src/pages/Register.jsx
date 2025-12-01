import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phone: "",
    address: "",
    role: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/signup", form);
      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="register-wrapper d-flex align-items-center justify-content-center">
      <Row className="register-container shadow-lg">

        {/* LEFT FORM SECTION */}
        <Col md={6} className="p-4 d-flex align-items-center">
          <Card className="glass-card w-100 p-4">

            <h2 className="text-center mb-3 register-title">Create Account</h2>
            <p className="text-center text-light opacity-75 mb-4">
              Join the EventHub community 🎉
            </p>

            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}

            <Form onSubmit={handleSubmit}>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">First Name</Form.Label>
                    <Form.Control
                      className="input-glass"
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Last Name</Form.Label>
                    <Form.Control
                      className="input-glass"
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Email</Form.Label>
                <Form.Control
                  className="input-glass"
                  type="email"
                  name="emailId"
                  value={form.emailId}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Password</Form.Label>
                <Form.Control
                  className="input-glass"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Phone</Form.Label>
                <Form.Control
                  className="input-glass"
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Address</Form.Label>
                <Form.Control
                  className="input-glass"
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label-custom">Role</Form.Label>
                <Form.Select
                  className="input-glass"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="ROLE_PARTICIPANT">Participant</option>
                  <option value="ROLE_MANAGER">Manager</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" className="btn-gradient w-100 mt-2">
                Register
              </Button>

            </Form>
          </Card>
        </Col>

        {/* RIGHT IMAGE SECTION */}
        <Col md={6} className="register-image d-none d-md-flex"></Col>

      </Row>
    </Container>
  );
};

export default Register;
