import React from "react";
import "../Styles/MessageList.css";

const MessageList = ({ messages, onEdit }) => {
  if (messages.length === 0) {
    return <p>Du har inga meddelanden att visa.</p>;
  }

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg.id} className="message">
          <p>{msg.text}</p>
          <small>
            {msg.username} – {new Date(msg.createdAt).toLocaleString()}
          </small>
          <br />
          <button onClick={() => onEdit(msg)}>Redigera</button>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
