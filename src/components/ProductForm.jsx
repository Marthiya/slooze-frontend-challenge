import React, { useEffect, useState } from "react";
import { createProduct, getProductById, updateProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const p = await getProductById(id);
        setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock });
      } catch (e) {
        alert("Product not found");
        navigate("/products");
      }
    })();
  }, [id, isEdit, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateProduct(id, { ...form, price: Number(form.price), stock: Number(form.stock) });
      } else {
        await createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
      }
      navigate("/products");
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card center-card">
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />

        <label>Category</label>
        <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required placeholder="Veg / Non-Veg / Sweets" />

        <label>Price</label>
        <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />

        <label>Stock</label>
        <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />

        <div style={{display:"flex", gap:10}}>
          <button className="btn primary" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
          <button type="button" className="btn" onClick={() => navigate("/products")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
