
const BASE_URL = "https://final-project-backend.<yourname>.workers.dev/api";



export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);
  return data;
}


export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  localStorage.setItem("token", data.token);
  return data;
}


function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}


export async function getItems() {
  const res = await fetch(`${BASE_URL}/items`, {
    headers: authHeaders(),
  });

  return res.json();
}


export async function createItem(item) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(item),
  });

  return res.json();
}


export async function updateItem(id, item) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(item),
  });

  return res.json();
}


export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return res.json();
}
