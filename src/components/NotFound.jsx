import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="card center-card">
      <h2>404 — Not Found</h2>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}
