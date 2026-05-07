const BASE_URL = 'https://your-backend-domain.workers.dev'; // change this

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json(); // { token }
}

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

export async function getItems() {
  const res = await fetch(`${BASE_URL}/items`, {
    headers: authHeaders()
  });
  return res.json();
}

export async function createItem(item) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function updateItem(id, item) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return res.json();
}
export async function signup(email, password) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error('Signup failed');
  return res.json();
}
