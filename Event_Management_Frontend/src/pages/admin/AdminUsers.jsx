import { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { api } from "../../api/axiosConfig";
import "../../styles/AdminUsers.css"; // <-- IMPORT CSS

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load All Users
  const loadUsers = async () => {
    try {
      const resp = await api.get("/admin/users");
      setUsers(resp.data);
    } catch (err) {
      console.error("Error loading users", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Deactivate User
  const deactivateUser = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;

    try {
      await api.patch(`/admin/users/${id}/deactivate`);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to deactivate user");
    }
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser({ ...user });
    setShowEdit(true);
  };

  // Update fields in modal
  const handleEditChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  // Save Updated User
  const saveUser = async () => {
    try {
      await api.put(`/admin/users/${selectedUser.id}`, selectedUser);
      alert("User updated successfully!");
      setShowEdit(false);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Error updating user");
    }
  };

  return (
    <Container className="admin-users-wrapper">

      <h2 className="admin-users-title">All Users</h2>

      <Table striped bordered hover className="table-custom">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.emailId}</td>
              <td>{u.role}</td>
              <td>{u.active ? "Yes" : "No"}</td>

              <td className="d-flex gap-2">
                <Button
                  className="btn-edit"
                  onClick={() => openEditModal(u)}
                >
                  Edit
                </Button>

                <Button
                  className="btn-delete"
                  onClick={() => deactivateUser(u.id)}
                  disabled={!u.active}
                >
                  Deactivate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  value={selectedUser.firstName}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  value={selectedUser.lastName}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="emailId"
                  value={selectedUser.emailId}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={selectedUser.phone}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={selectedUser.address}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={selectedUser.role}
                  onChange={handleEditChange}
                >
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_PARTICIPANT">Participant</option>
                  <option value="ROLE_MANAGER">Manager</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-cancel" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>

          <Button className="btn-save" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default AdminUsers;
