import React from "react";

const MessageList = ({ messages }) => {
  if (messages.length === 0) {
    return <p>Du har inga meddelanden att visa.</p>;
  }

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg.id} className="message">
          <p>{msg.text}</p>
          <small>
            {msg.username} – {msg.createdAt}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
