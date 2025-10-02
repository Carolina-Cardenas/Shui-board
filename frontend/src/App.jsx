import React, { useState, useEffect } from "react";
import MessageForm from "./Components/MessageForm";
import MessageList from "./Components/MessageList";
import EditMessage from "./Components/EditMessage";
import {
  getMessages,
  createMessage,
  updateMessage as apiUpdateMessage,
} from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);

  //  Cargar mensajes desde el backend al iniciar
  useEffect(() => {
    getMessages()
      .then((data) => {
        setMessages(data); // El backend devuelve el array desde DynamoDB
      })
      .catch((err) => console.error("Error loading messages:", err));
  }, []);

  //  Crear mensaje nuevo (con backend)
  const addMessage = async (newMsg) => {
    try {
      const saved = await createMessage(newMsg); // Envia { username, text }
      setMessages([saved, ...messages]); // Agregar al estado lo que devuelve Lambda
    } catch (err) {
      console.error("Error creating message:", err);
    }
  };

  // Editar mensaje existente (con backend)
  const updateMessage = async (id, updatedText) => {
    try {
      const updated = await apiUpdateMessage(id, updatedText);
      setMessages(messages.map((msg) => (msg.id === id ? updated : msg)));
      setEditingMessage(null);
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  return (
    <div className="app">
      <MessageForm onSubmit={addMessage} />

      {editingMessage ? (
        <EditMessage
          message={editingMessage}
          onSave={updateMessage}
          onCancel={() => setEditingMessage(null)}
        />
      ) : (
        <MessageList messages={messages} onEdit={setEditingMessage} />
      )}
    </div>
  );
}

export default App;
