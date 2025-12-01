import { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { api } from "../../api/axiosConfig";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const resp = await api.get("/admin/users");
    setUsers(resp.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deactivateUser = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;

    await api.patch(`/admin/users/${id}/deactivate`);
    loadUsers();
  };

  const openEditModal = (user) => {
    setSelectedUser({ ...user }); // clone user data
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

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
    <Container className="mt-4 pt-6 pb-3">
      <h2 className="fw-bold mb-3">All Users</h2>

      <Table striped bordered hover>
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
                <Button variant="warning" onClick={() => openEditModal(u)}>
                  Edit
                </Button>

                <Button
                  variant="danger"
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

      {/* ================= EDIT USER MODAL ================= */}
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
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default AdminUsers;
