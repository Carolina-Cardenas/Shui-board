const API_URL = "https://qrt7gynw46.execute-api.eu-north-1.amazonaws.com";

export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`);
  if (!res.ok) throw new Error("Error getting messages");
  return res.json();
}

export async function createMessage({ username, text }) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text }),
  });
  if (!res.ok) throw new Error("Error creating message");
  return res.json();
}

export async function updateMessage({ id, text }) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Error updating message");
  return res.json();
}
