import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") ?? "";

  if (!token) {
    console.log("No token, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(`Role ${role} not allowed, redirecting...`);
    if (role === "admin") {
      return <Navigate to="/dash" replace />;
    } else if (role === "user") {
      return <Navigate to="/home" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;