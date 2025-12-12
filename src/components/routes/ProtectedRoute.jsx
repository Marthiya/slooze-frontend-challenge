import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children, requiredRole }) {
  // not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // role mismatch
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/access-denied" />;
  }

  return children;
}
