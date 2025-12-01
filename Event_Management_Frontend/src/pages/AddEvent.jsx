import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { api } from "../api/axiosConfig";

const AddEvent = () => {
  const [form, setForm] = useState({
    title: "",
    organization: "",
    description: "",
    city: "",
    venue: "",
    startOn: "",
    endOn: "",
    capacity: "",
    price: "",
    categoryName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const managerId = localStorage.getItem("userId");

    const finalPayload = {
      ...form,
      managerId: managerId,
    };

    try {
      const resp = await api.post(`/manager/${managerId}`, finalPayload);
      console.log(resp.data);
      alert("Event Added Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add event");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Event</h2>

      <Form onSubmit={handleSubmit} className="mt-3">

        {/* TITLE */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>

        {/* ORGANIZATION */}
        <Form.Group className="mb-3">
          <Form.Label>Organization</Form.Label>
          <Form.Control
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        {/* CITY */}
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </Form.Group>

        {/* VENUE */}
        <Form.Group className="mb-3">
          <Form.Label>Venue</Form.Label>
          <Form.Control
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
          />
        </Form.Group>

        {/* START DATE */}
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="datetime-local"
            onChange={(e) => setForm({ ...form, startOn: e.target.value })}
          />
        </Form.Group>

        {/* END DATE */}
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            onChange={(e) => setForm({ ...form, endOn: e.target.value })}
          />
        </Form.Group>

        {/* CAPACITY */}
        <Form.Group className="mb-3">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          />
        </Form.Group>

        {/* PRICE */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
          >
            <option value="">-- Select Category --</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Health">Health</option>
            <option value="Arts">Arts</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Finance">Finance</option>
          </Form.Select>
        </Form.Group>


        <Button type="submit" variant="primary">Add Event</Button>
      </Form>
    </Container>
  );
};

export default AddEvent;
