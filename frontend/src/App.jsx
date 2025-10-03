import React, { useState, useEffect } from "react";
import MessageForm from "./Components/ MessageForm";
import MessageList from "./Components/MessageList";
import EditMessage from "./Components/EditMessage";
import {
  getMessages,
  createMessage,
  updateMessage as apiUpdateMessage,
} from "../api.js";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);

  useEffect(() => {
    getMessages()
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Error loading messages:", err));
  }, []);

  //  Crear mensaje nuevo (con backend)
  const addMessage = async (newMsg) => {
    try {
      const saved = await createMessage(newMsg);
      setMessages([saved, ...messages]);
    } catch (err) {
      console.error("Error creating message:", err);
    }
  };

  // Editar mensaje existente (con backend)
  const updateMessage = async (id, updatedText) => {
    try {
      const updated = await apiUpdateMessage({ id, text: updatedText });
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
