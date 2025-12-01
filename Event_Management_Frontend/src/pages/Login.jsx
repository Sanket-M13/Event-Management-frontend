import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signin", { email, password });

      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("userName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.emailId);
      localStorage.setItem("token", response.data.jwt);

      alert("Login successful!");
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <Container className="login-wrapper d-flex align-items-center justify-content-center">
      <Row className="login-container shadow-lg">

        {/* LEFT FORM SECTION */}
        <Col md={6} className="p-4 d-flex align-items-center">
          <Card className="glass-card w-100 p-4">

            <h2 className="text-center mb-3 login-title">Welcome Back</h2>
            <p className="text-center text-light opacity-75 mb-4">
              Login to continue your journey 🚀
            </p>

            {error && <p className="text-danger text-center">{error}</p>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label-custom">Email</Form.Label>
                <Form.Control
                  className="input-glass"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label-custom">Password</Form.Label>
                <Form.Control
                  className="input-glass"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" className="btn-gradient w-100 mt-2">
                Login
              </Button>
            </Form>

          </Card>
        </Col>

        {/* RIGHT IMAGE SECTION */}
        <Col md={6} className="login-image d-none d-md-flex"></Col>

      </Row>
    </Container>
  );
};

export default Login;
