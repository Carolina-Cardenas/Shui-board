const API_URL = "https://l9o9xeeppf.execute-api.eu-north-1.amazonaws.com";

// Obtener todos los mensajes
export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`);
  if (!res.ok) throw new Error("Error getting messages");
  return res.json();
}

// POST - Crear mensaje
export async function createMessage(username, text) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text }),
  });
  if (!res.ok) throw new Error("Error creating message");
  return res.json();
}

// PUT - Actualizar mensaje por ID
export async function updateMessage(id, newText) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newText }),
  });
  if (!res.ok) throw new Error("Error updating message");
  return res.json();
}
