import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, lowStock: 0, categories: {} });

  useEffect(() => {
    async function load() {
      const products = await getProducts();
      const total = products.length;
      const lowStock = products.filter(p => p.stock <= 20).length;
      const categories = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {});
      setStats({ total, lowStock, categories });
    }
    load();
  }, []);

  return (
    <div className="card">
      <h2>Manager Dashboard</h2>
      <div className="grid">
        <div className="stat">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.lowStock}</div>
          <div className="stat-label">Low Stock (&le; 20)</div>
        </div>
        <div className="stat">
          <div className="stat-number">—</div>
          <div className="stat-label">Categories</div>
          <ul>
            {Object.entries(stats.categories).map(([k,v]) => <li key={k}>{k}: {v}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
