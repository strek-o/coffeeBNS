const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path, token) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { ...authHeader(token) },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }
  return response.json();
}

export async function apiPost(path, body, token) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(token) },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }
  return response.json();
}
