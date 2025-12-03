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
import Registrations from "./pages/ViewEventRegistrations";
import RegisterEvent from "./pages/RegistrationEvent";
import MyEvents from "./pages/MyEvents";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminManagers from "./pages/admin/AdminManagers";
import ManagerEvents from "./pages/admin/ManagerEvents";

import { RoleRoute } from "./components/RoleRoute";
import ViewEventRegistrations from "./pages/ViewEventRegistrations";

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Profile & User Dashboard (no ProtectedRoute) */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-events" element={<MyEvents />} />

        {/* Event Registration */}
        <Route path="/events/:eventId/register" element={<RegisterEvent />} />

        {/* Manager Routes */}
        <Route
          path="/organizer/events/add"
          element={
            <RoleRoute allowedRoles={["ROLE_MANAGER"]}>
              <AddEvent />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/events/manage"
          element={
            <RoleRoute allowedRoles={["ROLE_MANAGER"]}>
              <ManageEvents />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/events/registrations"
          element={
            <RoleRoute allowedRoles={["ROLE_MANAGER"]}>
              <Registrations />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/events/:eventId/registrations"
          element={
            <RoleRoute allowedRoles={["ROLE_MANAGER"]}>
              <ViewEventRegistrations />
            </RoleRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminUsers />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminEvents />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/managers"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminManagers />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/managers/:managerId/events"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <ManagerEvents />
            </RoleRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
