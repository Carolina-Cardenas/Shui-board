const API_URL = "https://xxxxxx.execute-api.eu-north-1.amazonaws.com"; // reemplaza con tu endpoint

export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`);
  return res.json();
}

export async function createMessage(message) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  return res.json();
}

export async function updateMessage(id, text) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
}
