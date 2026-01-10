// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const typeUser = localStorage.getItem("type_user");

  // belum login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // login tapi role tidak sesuai
  if (allowedRoles && !allowedRoles.includes(typeUser)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
