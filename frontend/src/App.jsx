import React, { useState, useEffect } from "react";
import MessageForm from "./Components/MessageForm";
import MessageList from "./Components/MessageList";
import EditMessage from "./Components/EditMessage";

function App() {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);

  // useEffect(() => {
  //  getMessages().then(setMessages).catch(console.error);
  //}, []);

  // Temporal: datos mock (hasta conectar con backend)
  useEffect(() => {
    setMessages([
      {
        id: "1",
        username: "Carolina",
        text: "Hola a todos!",
        createdAt: "2025-09-26T12:00:00Z",
      },
      {
        id: "2",
        username: "Alex",
        text: "Estoy aprendiendo React",
        createdAt: "2025-09-26T12:10:00Z",
      },
    ]);
  }, []);

  // Crear mensaje nuevo
  const addMessage = (newMsg) => {
    const msg = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...newMsg,
    };
    setMessages([msg, ...messages]);
  };

  // Editar mensaje
  const updateMessage = (id, updatedText) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, text: updatedText } : msg
      )
    );
    setEditingMessage(null);
  };

  return (
    <div className="app">
      <h1>Shui – Anslagstavla</h1>
      <MessageForm onSubmit={addMessage} />

      {editingMessage && (
        <EditMessage
          message={editingMessage}
          onSave={updateMessage}
          onCancel={() => setEditingMessage(null)}
        />
      )}

      <MessageList messages={messages} onEdit={setEditingMessage} />
    </div>
  );
}

export default App;
