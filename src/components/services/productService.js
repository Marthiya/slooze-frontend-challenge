const PRODUCTS_KEY = "slooze_products_v1";

export function initSampleProducts() {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    const sample = [
      { id: "p1", name: "Gulab Jamun", category: "Sweets", price: 50, stock: 100 },
      { id: "p2", name: "Mutton Biryani", category: "Non-Veg", price: 250, stock: 20 },
      { id: "p3", name: "Paneer Masala", category: "Veg", price: 150, stock: 40 },
    ];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sample));
  }
}

function readAll() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getProducts() {
  return new Promise((res) => {
    setTimeout(() => res(readAll()), 250);
  });
}

export function getProductById(id) {
  return new Promise((res, rej) => {
    const p = readAll().find(x => x.id === id);
    setTimeout(() => (p ? res(p) : rej(new Error("Not found"))), 200);
  });
}

export function createProduct(data) {
  return new Promise((res) => {
    const arr = readAll();
    const newP = { ...data, id: "p" + Date.now() };
    arr.push(newP);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(arr));
    setTimeout(() => res(newP), 200);
  });
}

export function updateProduct(id, data) {
  return new Promise((res, rej) => {
    const arr = readAll();
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return rej(new Error("Not found"));
    arr[idx] = { ...arr[idx], ...data };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(arr));
    setTimeout(() => res(arr[idx]), 200);
  });
}

export function deleteProduct(id) {
  return new Promise((res) => {
    const arr = readAll().filter(x => x.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(arr));
    setTimeout(() => res(true), 150);
  });
}
