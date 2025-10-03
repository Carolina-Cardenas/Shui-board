import React, { useState } from "react";
import "../Styles/MessagesForm.css";

const MessageForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !text) return;
    onSubmit({ username, text });
    setUsername("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        placeholder="Skriv ett meddelande..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Publicera</button>
    </form>
  );
};

export default MessageForm;
