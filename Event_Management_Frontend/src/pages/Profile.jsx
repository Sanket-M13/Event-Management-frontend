import { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import "../styles/Profile.css";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phone: "",
    address: "",
    password: ""
  });

  const [showEdit, setShowEdit] = useState(false);

  // Load user profile from backend
  const loadProfile = async () => {
    try {
      const resp = await api.get(`/user/${userId}`);
      setProfile(resp.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await api.patch(`/user/${userId}`, profile);
      alert("Profile updated successfully!");
      setShowEdit(false);

      localStorage.setItem("userName", profile.firstName);
      localStorage.setItem("lastName", profile.lastName);
      localStorage.setItem("email", profile.emailId);

      loadProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <Container className="profile-page mt-5">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h3 className="mb-4 text-center">My Profile</h3>

        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.emailId}</p>
        <p><strong>Phone:</strong> {profile.phone || "Not Provided"}</p>
        <p><strong>Address:</strong> {profile.address || "Not Provided"}</p>

        <Button variant="primary" className="mt-3 w-100" onClick={() => setShowEdit(true)}>
          Edit Profile
        </Button>
      </Card>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="emailId"
                value={profile.emailId}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password (leave blank to keep same)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={handleChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>

          <Button variant="success" onClick={saveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
