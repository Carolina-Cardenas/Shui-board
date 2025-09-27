import React, { useState, useEffect } from "react";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

function App() {
  const [messages, setMessages] = useState([]);

  // Temporal: datos falsos hasta que tengamos el backend
  useEffect(() => {
    setMessages([
      {
        id: 1,
        username: "Carolina",
        text: "Hola a todos!",
        createdAt: "2025-09-26",
      },
      {
        id: 2,
        username: "Alex",
        text: "Estoy aprendiendo React ",
        createdAt: "2025-09-26",
      },
    ]);
  }, []);

  const addMessage = (newMsg) => {
    const msg = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...newMsg,
    };
    setMessages([msg, ...messages]);
  };

  return (
    <div className="app">
      <h1>Shui – Anslagstavla</h1>
      <MessageForm onSubmit={addMessage} />
      <MessageList messages={messages} />
    </div>
  );
}

export default App;
