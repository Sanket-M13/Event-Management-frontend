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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (touched[e.target.name]) validateField(e.target.name, e.target.value);
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let msg = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) msg = "This field is required";
        break;

      case "emailId":
        if (!value) msg = "Email is required";
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if (!emailRegex.test(value)) msg = "Invalid email format";
        }
        break;

      case "password":
        if (!value) msg = "Password is required";
        else if (value.length < 6)
          msg = "Password must be at least 6 characters";
        break;

      case "phone":
        if (!value) msg = "Phone is required";
        else if (!/^\d{10}$/.test(value))
          msg = "Phone must be 10 digits";
        break;

      case "address":
        if (!value.trim()) msg = "Address is required";
        break;

      case "role":
        if (!value) msg = "Please select a role";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(form).forEach((field) => {
      validateField(field, form[field]);
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    const hasError = Object.values(errors).some((e) => e);
    if (hasError) return;

    try {
      await api.post("/auth/signup", form);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <Container className="register-wrapper d-flex align-items-center justify-content-center">
      <Row className="register-container shadow-lg">

        <Col md={6} className="p-4 d-flex align-items-center">
          <Card className="glass-card w-100 p-4">

            <h2 className="text-center mb-3 register-title">Create Account</h2>
            <p className="text-center text-light opacity-75 mb-4">
              Join the EventHub community 🎉
            </p>

            {success && <p className="text-success text-center">{success}</p>}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">First Name</Form.Label>
                    <Form.Control
                      className={`input-glass ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter first name"
                    />
                    {touched.firstName && errors.firstName && (
                      <small className="text-danger">{errors.firstName}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Last Name</Form.Label>
                    <Form.Control
                      className={`input-glass ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter last name"
                    />
                    {touched.lastName && errors.lastName && (
                      <small className="text-danger">{errors.lastName}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Email</Form.Label>
                <Form.Control
                  className={`input-glass ${touched.emailId && errors.emailId ? "is-invalid" : ""}`}
                  type="text"
                  name="emailId"
                  value={form.emailId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter email"
                />
                {touched.emailId && errors.emailId && (
                  <small className="text-danger">{errors.emailId}</small>
                )}
              </Form.Group>

          
              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Password</Form.Label>
                <Form.Control
                  className={`input-glass ${touched.password && errors.password ? "is-invalid" : ""}`}
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Phone</Form.Label>
                <Form.Control
                  className={`input-glass ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter phone number"
                />
                {touched.phone && errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Address</Form.Label>
                <Form.Control
                  className={`input-glass ${touched.address && errors.address ? "is-invalid" : ""}`}
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter address"
                />
                {touched.address && errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label-custom">Role</Form.Label>
                <Form.Select
                  className={`input-glass ${touched.role && errors.role ? "is-invalid" : ""}`}
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select role</option>
                  <option value="ROLE_PARTICIPANT">Participant</option>
                  <option value="ROLE_MANAGER">Manager</option>
                </Form.Select>
                {touched.role && errors.role && (
                  <small className="text-danger">{errors.role}</small>
                )}
              </Form.Group>

              <Button type="submit" className="btn-gradient w-100 mt-2">
                Register
              </Button>

            </Form>
          </Card>
        </Col>

        <Col md={6} className="register-image d-none d-md-flex"></Col>

      </Row>
    </Container>
  );
};

export default Register;
