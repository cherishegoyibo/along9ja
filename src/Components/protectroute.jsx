import React from "react";
import { Route, Navigate } from "react-router-dom";

// ProtectedRoute checks if the user is logged in
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if no user
  }

  return children; // Allow access to children if user is logged in
};

export default ProtectedRoute;
