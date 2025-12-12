import React from "react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="card center-card">
      <h2>Access Denied</h2>
      <p>You don't have permission to view this page.</p>
      <Link to="/products" className="btn">Back to Products</Link>
    </div>
  );
}
