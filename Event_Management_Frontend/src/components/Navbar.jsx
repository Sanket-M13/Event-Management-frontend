import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar shadow-sm fixed-top"
      variant="dark"
    >
      <Container>

        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          📅 Event Hub
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* Left Links */}
          <Nav className="me-auto ms-3">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/events" className="nav-link-custom">Events</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>

          {/* Admin Panel */}
          {role === "ROLE_ADMIN" && (
            <Nav className="me-3">
              <Nav.Link as={Link} to="/admin/users" className="nav-link-custom">Users</Nav.Link>
              <Nav.Link as={Link} to="/admin/events" className="nav-link-custom">Events</Nav.Link>
              <Nav.Link as={Link} to="/admin/managers" className="nav-link-custom">Managers</Nav.Link>
            </Nav>
          )}

          {/* Organizer Panel */}
          {isLoggedIn && role === "ROLE_MANAGER" && (
            <Nav className="me-3">
              <NavDropdown
                title={<span className="text-white">My Events</span>}
                id="organizer-events-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/organizer/events/add">
                  ➕ Add Event
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/organizer/events/manage">
                  📝 Manage Events
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/organizer/events/registrations">
                  👥 View Registrations
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {/* RIGHT SIDE */}
          {!isLoggedIn ? (
            <div className="d-flex gap-2">
              <Button as={Link} to="/login" variant="outline-light">
                Login
              </Button>
              <Button as={Link} to="/register" variant="light">
                Register
              </Button>
            </div>
          ) : (
            <NavDropdown
              title={
                <span style={{ color: "#fff", fontWeight: "600" }}>
                  👤 Welcome, <span style={{ color: "#a5b4fc" }}>{firstName}</span>
                </span>
              }
              align="end"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/profile">🧾 Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/my-events">📊 My Dashboard</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
            </NavDropdown>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
