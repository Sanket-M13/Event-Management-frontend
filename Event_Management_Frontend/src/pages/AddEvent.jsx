import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { api } from "../api/axiosConfig";
import "../styles/AddEvent.css"; 

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

  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!form.title.trim()) temp.title = "Title is required";
    if (!form.organization.trim()) temp.organization = "Organization is required";
    if (!form.description.trim()) temp.description = "Description is required";
    if (!form.city.trim()) temp.city = "City is required";
    if (!form.venue.trim()) temp.venue = "Venue is required";

    if (!form.startOn) temp.startOn = "Start date is required";
    if (!form.endOn) temp.endOn = "End date is required";

    if (form.startOn && form.endOn && new Date(form.endOn) < new Date(form.startOn)) {
      temp.endOn = "End date must be after Start date";
    }

    if (!form.capacity || form.capacity <= 0)
      temp.capacity = "Capacity must be greater than 0";

    if (!form.price || form.price <= 0)
      temp.price = "Price must be greater than 0";

    if (!form.categoryName)
      temp.categoryName = "Select a category";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const managerId = localStorage.getItem("userId");

    const finalPayload = {
      ...form,
      managerId: managerId,
    };

    try {
      await api.post(`/manager/${managerId}`, finalPayload);
      alert("Event Added Successfully!");

      setForm({
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
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to add event");
    }
  };

  return (
    <Container className="add-event-wrapper">
      <Card className="glass-card-add p-4 shadow-lg">
        <h2 className="text-center mb-4 add-event-title">Add New Event</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Organization</Form.Label>
            <Form.Control
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
            />
            {errors.organization && <p className="error-text">{errors.organization}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
            />
            {errors.venue && <p className="error-text">{errors.venue}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={form.startOn}
              onChange={(e) => setForm({ ...form, startOn: e.target.value })}
            />
            {errors.startOn && <p className="error-text">{errors.startOn}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={form.endOn}
              onChange={(e) => setForm({ ...form, endOn: e.target.value })}
            />
            {errors.endOn && <p className="error-text">{errors.endOn}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
            {errors.capacity && <p className="error-text">{errors.capacity}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={form.categoryName}
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
            {errors.categoryName && (
              <p className="error-text">{errors.categoryName}</p>
            )}
          </Form.Group>

          <Button type="submit" className="btn-gradient w-100 mt-3">
            Add Event
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddEvent;
