import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";

export default function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const p = await getProducts();
    setProducts(p);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    load();
  }

  return (
    <div className="card">
      <h2>Products</h2>
      {loading ? <div>Loading...</div> : (
        <>
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="btn small" onClick={() => alert(JSON.stringify(p, null, 2))}>View</button>
                    {user?.role === "Manager" && (
                      <>
                        <Link to={`/products/edit/${p.id}`} className="btn small">Edit</Link>
                        <button className="btn small danger" onClick={() => handleDelete(p.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div>No products yet.</div>}
        </>
      )}
    </div>
  );
}
