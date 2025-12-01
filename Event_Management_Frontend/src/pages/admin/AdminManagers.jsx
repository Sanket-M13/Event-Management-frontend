import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axiosConfig";

const AdminManagers = () => {
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  const loadManagers = async () => {
    const resp = await api.get("/admin/managers");
    console.log(resp.data);
    
    setManagers(resp.data);
  };

  useEffect(() => {
    loadManagers();
  }, []);

  return (
    <Container className="mt-4 pt-5">
      <h2 className="fw-bold mb-3">All Managers</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Events</th>
          </tr>
        </thead>

        <tbody>
          {managers.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.firstName} {m.lastName}</td>
              <td>{m.emailId}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/admin/managers/${m.id}/events`)}
                >
                  View Events
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminManagers;
