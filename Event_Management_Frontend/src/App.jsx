import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/Contact";
import AddEvent from "./pages/AddEvent";
import ManageEvents from "./pages/ManageEvents";
import Registrations from "./pages/Registrations";
import RegisterEvent from "./pages/RegistrationEvent";

import MyEvents from "./pages/MyEvents";


import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminManagers from "./pages/admin/AdminManagers";
import ManagerEvents from "./pages/admin/ManagerEvents";








function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/organizer/events/add" element={<AddEvent />} />
        <Route path="/organizer/events/manage" element={<ManageEvents />} />
        <Route path="/organizer/events/registrations" element={<Registrations />} />
        <Route path="/events/:eventId/register" element={<RegisterEvent />} />
        <Route path="/my-events" element={<MyEvents />} />

        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/managers" element={<AdminManagers />} />
        <Route path="/admin/managers/:managerId/events" element={<ManagerEvents />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
