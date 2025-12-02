import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    setEmailTouched(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    setPasswordTouched(true);

    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (emailError || passwordError || !email || !password) {
      setLoginError("Please fix errors before logging in.");
      return;
    }

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
      setLoginError("Invalid email or password");
    }
  };

  return (
    <Container className="login-wrapper d-flex align-items-center justify-content-center">
      <Row className="login-container shadow-lg">

        <Col md={6} className="p-4 d-flex align-items-center">
          <Card className="glass-card w-100 p-4">

            <h2 className="text-center mb-3 login-title">Welcome Back</h2>

            {loginError && <p className="text-danger text-center">{loginError}</p>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Email</Form.Label>
                <Form.Control
                  type="text"
                  className={`input-glass ${emailTouched && emailError ? "is-invalid" : ""}`}
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailTouched && emailError && (
                  <small className="text-danger">{emailError}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Password</Form.Label>
                <Form.Control
                  type="password"
                  className={`input-glass ${passwordTouched && passwordError ? "is-invalid" : ""}`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
                {passwordTouched && passwordError && (
                  <small className="text-danger">{passwordError}</small>
                )}
              </Form.Group>

              <Button type="submit" className="btn-gradient w-100 mt-2">
                Login
              </Button>
            </Form>

          </Card>
        </Col>

        <Col md={6} className="login-image d-none d-md-flex"></Col>

      </Row>
    </Container>
  );
};

export default Login;
