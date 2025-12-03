import { Navigate } from "react-router-dom";

export const RoleRoute = ({ allowedRoles, children }) => {

  const rawRole = localStorage.getItem("role") || "";

  // Normalize the role → remove quotes, spaces, and convert to upper case
  const role = rawRole.trim().replace(/[[\]"]/g, "").toUpperCase();



  // Normalize allowed roles
  const normalizedAllowed = allowedRoles.map(r =>
    r.trim().replace(/[[\]"]/g, "").toUpperCase()
  );

  if (!normalizedAllowed.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
