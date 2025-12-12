// mock auth service: returns a token-like object and role
const USERS = [
  { email: "manager@slooze.com", password: "manager123", role: "Manager", name: "Manager M" },
  { email: "storekeeper@slooze.com", password: "keeper123", role: "StoreKeeper", name: "Store Keeper S" },
];

const STORAGE_KEY = "slooze_user";

export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = USERS.find(u => u.email === email && u.password === password);
      if (!found) {
        reject(new Error("Invalid credentials"));
      } else {
        const user = { email: found.email, role: found.role, name: found.name, token: "mock-token-" + Date.now() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      }
    }, 400);
  });
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getStoredUser() {
  const s = localStorage.getItem(STORAGE_KEY);
  return s ? JSON.parse(s) : null;
}
