import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ProductForm from "./components/ProductForm";
import NotFound from "./components/NotFound";
import AccessDenied from "./components/AccessDenied";
import ProtectedRoute from "./routes/ProtectedRoute";
import { getStoredUser } from "./services/authService";
import { initSampleProducts } from "./services/productService";

export default function App() {
  const [user, setUser] = useState(getStoredUser());
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // init sample products on first run
    initSampleProducts();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={() => setUser(null)} theme={theme} setTheme={setTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/products" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} requiredRole="Manager">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute user={user}>
                <Products user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/new"
            element={
              <ProtectedRoute user={user} requiredRole="Manager">
                <ProductForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/edit/:id"
            element={
              <ProtectedRoute user={user} requiredRole="Manager">
                <ProductForm />
              </ProtectedRoute>
            }
          />

          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
